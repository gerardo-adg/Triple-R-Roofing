# Media plan

Internal reference for every media slot on the site. Placeholders currently
in place are visually neutral (flat color, no visible text/filenames) and
sized/cropped to the same behavior the final asset will use — this doc is
what "final" means for each slot until the real file lands.

Update this file whenever a new media slot is added to a page/component, and
strike through (or move to a "Delivered" section) once a slot is filled with
final media.

---

## Homepage

### Hero background — `src/pages/index.astro` → `Hero.astro`

- **Asset type:** Video (with photo poster fallback if autoplay is blocked
  or `prefers-reduced-motion` is set)
- **Desktop aspect ratio:** Full-bleed, ~100vw × 100svh (roughly 16:9–16:8
  depending on viewport)
- **Mobile aspect ratio/crop:** Full-bleed, ~100vw × 100svh portrait
  (roughly 9:16–9:19). Same landscape asset can be center-cropped via
  `object-fit: cover`, but a **dedicated mobile-cropped or separately shot
  vertical clip is strongly preferred** — the current placeholder uses one
  asset for both, which is a real fallback, not the intended final
  behavior.
- **Recommended shot:** Wide drone establishing shot (flyover/approach of a
  completed roof or job site) or a wide, stable installation shot with the
  roof filling most of the frame. Calm movement — this loops muted behind
  text. 3–6 second usable loop is enough.
- **Autoplay:** Yes — muted, looped, no controls. This is the one video on
  the page allowed to initialize immediately (`hero` prop on `LazyVideo`).
- **Loading priority:** Eager/immediate (`loading="eager"`,
  `fetchpriority="high"` on the poster; video attempts to play on load).
- **Poster requirement:** High-quality still matching the video's opening
  composition — this is what most visitors see first if autoplay is
  blocked, and what everyone sees under `prefers-reduced-motion`.
- **Current placeholder:** `public/media/placeholder-poster.svg` — flat
  `#151515` field, no video source attached yet (`muxPlaybackId`/`src`
  unset on the `<Hero>` call in `index.astro`).

---

### Services media — `ServicesSection.astro` (×3: Roof Replacement, Roof
Repair, Gutters)

Desktop and mobile use genuinely different interaction models here, not
just a resized crop of the same layout — documented separately.

- **Asset type:** Photo (static — video wouldn't earn its cost at either
  size used here)
- **Desktop:** ONE shared media viewport (not three individual
  thumbnails) at **4:5 aspect ratio**, occupying the right ~40% of the
  section. It swaps to the hovered/focused service's image via a clip-path
  wipe reveal. Substantially larger than the old 96px docked thumbnails —
  this is meant to carry real photography/video as a major visual element
  once final assets land.
- **Mobile:** **16:9 aspect ratio**, revealed inside each service's own
  accordion panel when expanded (native `<details name="services-mobile">`
  exclusive group — only one panel's media is ever visible at a time).
- **Recommended shot per service:**
  - Roof Replacement: a real tear-off or full-replacement in progress,
    or a striking finished-roof aerial
  - Roof Repair: a close, detailed shot of a repair/patch in progress —
    hands-on, craftsmanship-forward
  - Gutters: a gutter install or cleaning shot, clearly readable at a
    small size
- **Autoplay:** N/A (static photo)
- **Loading priority:** First desktop viewport image loads eager (it's
  visible on load); the rest, and all mobile accordion images, are lazy.
- **Poster requirement:** N/A
- **Current placeholder:** `public/media/placeholder-service-{1,2,3}.svg` —
  three distinct flat neutral shades (one per service), so the hover/focus
  swap and the accordion behavior are actually visible/verifiable before
  real photography exists — not meant to imply anything about final
  content.
- **Alt text note:** all placeholder images currently use `alt=""`
  (decorative) since they carry no real content yet — once real
  photography lands, each should get a real descriptive `alt` naming what
  the photo shows (not just the service name, which is already in the
  visible heading next to it).

---

## Not yet built

Trust section (`TrustSection.astro`) is text/stat-only by design — no
media slot there currently. Sections beyond Services (Brand/Story,
Featured Project, Process, Reviews, etc.) aren't built yet; each will get
an entry here as it's added.
