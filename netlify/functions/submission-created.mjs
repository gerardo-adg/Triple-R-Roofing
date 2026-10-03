/**
 * Meta Conversions API (CAPI) for the /free-estimate quiz.
 *
 * Netlify runs a function named `submission-created` automatically after
 * every verified (non-spam) Netlify Forms submission - no route, nothing
 * to call it. For the `free-estimate-quiz` form it sends a server-side
 * "Lead" to Meta, so leads still count when the browser pixel is blocked
 * (ad blockers, iOS privacy). The quiz generates one `event_id` that both
 * this function and the thank-you page's pixel Lead use, so Meta
 * deduplicates the pair into a single conversion.
 *
 * Environment variables (Netlify -> Site configuration -> Environment
 * variables):
 *   META_CAPI_TOKEN       required - Conversions API access token from
 *                         Events Manager. Without it this function no-ops.
 *   META_TEST_EVENT_CODE  optional - Events Manager "Test events" code.
 *                         While set, events show up under Test Events
 *                         instead of counting as real conversions. Remove
 *                         it once testing is done.
 *   META_GRAPH_VERSION    optional - Graph API version (default below).
 *
 * Personal data is SHA-256 hashed after Meta's normalization rules before
 * it leaves Netlify; IP, user agent, fbp and fbc are sent unhashed, as
 * Meta requires.
 */
import { createHash } from "node:crypto";

const PIXEL_ID = "2460801741112237";
const FORM_NAME = "free-estimate-quiz";
const DEFAULT_GRAPH_VERSION = "v23.0";
const FALLBACK_URL = "https://triplerroofs.com/free-estimate/";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

/** Normalize, then hash; returns undefined for empty values so they're omitted. */
const hashed = (value, normalize = (v) => v.trim().toLowerCase()) => {
  if (typeof value !== "string") return undefined;
  const normalized = normalize(value);
  return normalized ? [sha256(normalized)] : undefined;
};

// Meta wants digits only, with country code. US numbers typed as 10 digits get a leading 1.
const normalizePhone = (value) => {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 ? `1${digits}` : digits;
};

// Meta wants city lowercase with no spaces or punctuation ("elkgrove").
const normalizeCity = (value) => value.toLowerCase().replace(/[^a-z]/g, "");

const nonEmpty = (value) => (typeof value === "string" && value.trim() ? value.trim() : undefined);

export function buildLeadEvent(payload) {
  const data = payload.data ?? {};
  const services = data["services[]"] ?? data.services;
  const createdAt = Date.parse(payload.created_at ?? "");

  const userData = {
    em: hashed(data.email),
    ph: hashed(data.phone, normalizePhone),
    fn: hashed(data.first_name),
    ln: hashed(data.last_name),
    ct: hashed(data.city, normalizeCity),
    st: hashed("ca"),
    country: hashed("us"),
    client_ip_address: nonEmpty(data.ip),
    client_user_agent: nonEmpty(data.user_agent),
    fbp: nonEmpty(data.fbp),
    fbc: nonEmpty(data.fbc),
  };
  // Drop anything empty - Meta rejects empty strings/arrays in user_data.
  for (const key of Object.keys(userData)) {
    if (userData[key] === undefined) delete userData[key];
  }

  const event = {
    event_name: "Lead",
    event_time: Math.floor((Number.isNaN(createdAt) ? Date.now() : createdAt) / 1000),
    action_source: "website",
    event_source_url: nonEmpty(data.referrer) ?? FALLBACK_URL,
    user_data: userData,
    custom_data: {
      content_name: "Free Estimate Quiz",
      services: Array.isArray(services) ? services.join(", ") : nonEmpty(services),
      payment: nonEmpty(data.payment),
    },
  };
  const eventId = nonEmpty(data.event_id);
  if (eventId) event.event_id = eventId;
  return event;
}

export const handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body ?? "{}").payload ?? {};
  } catch {
    return { statusCode: 400, body: "Invalid submission payload" };
  }

  // Only the ad landing page's quiz - the site's Contact form is not a Meta lead.
  if (payload.form_name !== FORM_NAME) {
    return { statusCode: 200, body: "Skipped: not the quiz form" };
  }

  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    console.warn("META_CAPI_TOKEN is not set - skipping Conversions API Lead.");
    return { statusCode: 200, body: "Skipped: no META_CAPI_TOKEN" };
  }

  const body = { data: [buildLeadEvent(payload)] };
  const testCode = process.env.META_TEST_EVENT_CODE;
  if (testCode) body.test_event_code = testCode;

  const version = process.env.META_GRAPH_VERSION || DEFAULT_GRAPH_VERSION;
  const url = `https://graph.facebook.com/${version}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.text();
    if (!response.ok) {
      // Logged only - a Meta error must never affect the lead itself,
      // which Netlify has already stored by the time this runs.
      console.error(`Conversions API error ${response.status}: ${result}`);
    } else {
      console.log(`Conversions API Lead sent: ${result}`);
    }
  } catch (error) {
    console.error("Conversions API request failed:", error);
  }

  return { statusCode: 200, body: "OK" };
};
