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

### Family/brand video — `FamilySection.astro` ("The Family Behind Triple R")

The first genuinely real (non-generic-placeholder-forever) content video
planned for the site - a real ~34s vertical video of Rogelio Ramirez
explaining what Triple R stands for, provided by the client. Not yet
delivered as of this entry; a neutral placeholder is in place.

- **Asset type:** Video (watchable/sound-on, not decorative loop - built
  with the new `PlayableVideo` component, not `LazyVideo`)
- **Aspect ratio (desktop and mobile, same asset):** 9:16 portrait - the
  source is natively vertical, so no separate crop is needed the way the
  Hero's landscape asset needs a mobile-specific crop
- **Recommended shot:** Already exists - the client's ~34s video of Rogelio
  explaining what Triple R stands for. Related videos (how he got into
  roofing, starting from zero, meeting the team) are reserved for the
  About page, not this section.
- **Autoplay:** No, under any circumstance. Poster + a click-to-play
  affordance; only plays (with sound) after a direct user click.
- **Loading priority:** Lazy - poster only until the visitor clicks;
  nothing else loads until then.
- **Poster requirement:** A clean still frame from the video, or a
  separate photo of Rogelio if one reads better as a first impression.
- **Current placeholder:** `public/media/placeholder-family-portrait.svg`
  - flat `#151515` field, 9:16, no source configured
  (`src`/`muxPlaybackId` both unset), so the play button renders for
  layout review but is inert (no click handler attached) until a real
  source exists.
- **Known caveat:** the client's existing export has burned-in
  social-style captions/text. A cleaner export without that overlay is
  preferred if the client can provide one; the component doesn't need any
  changes either way, just a different `src`/`muxPlaybackId` value.

---

### Featured Work — `FeaturedWorkSection.astro` ("Recent projects.")

A horizontal, scroll-snapped sequence of large project photos - built as
an architecture/build-firm-style portfolio, not a 3-card gallery grid.
Four placeholder projects are in place now; the real count and content
will be whatever the client provides.

- **Asset type:** Photo (static)
- **Aspect ratio:** 3:2 landscape, for every project, desktop and mobile
- **Recommended shot:** A strong finished-project or in-progress shot per
  job - similar direction to the Services section's recommended shots
  (tear-off/replacement in progress, a detailed repair shot, a gutter
  install), but specific to real completed projects rather than generic
  service photography
- **Autoplay:** N/A (static photo)
- **Loading priority:** Lazy for all items - none are guaranteed to be
  in the initial viewport given the horizontal peek layout
- **Current placeholder:** `public/media/placeholder-project-{1,2,3,4}.svg`
  - four distinct flat neutral shades, 3:2, so the horizontal scroll-snap
  and peek behavior are genuinely visible/verifiable before real
  photography exists
- **Caption content:** Real captions should follow a factual two-line
  structure - project type on the first line (e.g. "FULL ROOF
  REPLACEMENT"), city/location on the second (e.g. "Elk Grove, CA"). Do
  not invent real project types or locations before the client supplies
  them - the current placeholder captions ("Project placeholder" / "Photo
  and details coming soon") are deliberately generic rather than
  fabricated specifics, and should be swapped out project-by-project as
  real photos and details arrive.

---

## Interior pages

### Page hero background — `PageHero.astro` (shared across interior pages)

- **Asset type:** Photo (static, full-bleed behind a dark scrim)
- **Aspect ratio:** Full-bleed, landscape - crops via `object-fit: cover`
  at any viewport, so no separate mobile crop is required the way the
  homepage Hero's landscape asset needs one
- **Recommended shot:** Ideally a distinct, contextually relevant photo
  per page (e.g. a replacement/tear-off shot for the Roof Replacement
  page, a repair close-up for Roof Repair) rather than one generic image
  reused everywhere - not required for launch, but worth planning for
  during the media pass
- **Autoplay:** N/A (static photo, no video - interior heroes are
  intentionally quieter than the homepage Hero)
- **Loading priority:** Eager (`loading="eager"`, `fetchpriority="high"`)
  - always the first thing visible on the page
- **Current placeholder:** `public/media/placeholder-page-hero.svg` -
  flat `#1c1c1c` field, shared by every interior page until real photos
  exist per page

### Project spotlight — `ServiceProjectSpotlight.astro` (Roof Replacement page)

The single large real-project photo between "What's Included" and
"Materials & Certifications" on the Roof Replacement page - explicitly
not a repeat of the homepage's Featured Work carousel.

- **Asset type:** Photo (static)
- **Aspect ratio:** 16:9 landscape, full-bleed edge to edge - distinct
  from Featured Work's 3:2 so the two sections don't read as the same
  device reused. Capped at `max-height: 65vh` on desktop (≥900px) so it
  stays a strong moment without reading as a second full-screen hero;
  uncapped on mobile, where 16:9 was already a reasonable height.
- **Recommended shot:** One strong, real finished (or in-progress) roof
  replacement photo
- **Autoplay:** N/A (static photo)
- **Loading priority:** Lazy (not guaranteed to be in the initial
  viewport)
- **Current placeholder:** `public/media/placeholder-project-roof-replacement.svg`
  - flat `#201f1c` field, 16:9
- **Metadata content:** Two restrained slots, both still placeholders -
  do not fill in with invented specifics before the client supplies them:
  - `meta` - a short tag directly above the image, formatted
    "TYPE · LOCATION" (e.g. eventually "Roof Replacement · Elk Grove,
    CA"). Currently "Roof Replacement · Location TBD" - the type is
    accurate (this is the Roof Replacement page), the location is not
    yet known.
  - `caption` - a fuller one-line description below the image, meant to
    hold the real project's type, location, and material once supplied.
    Currently "Real project photo and details (type, location,
    materials) coming soon."
  Each service page that gets this treatment will need its own real
  photo and metadata; this pattern isn't meant to share one image across
  services.

### Detail photo band — `PhotoBand.astro` (Roof Replacement page, between Overview and What's Included)

A quiet, caption-free full-bleed strip added to break up the long
text-only stretch from the page hero through Overview and What's
Included. Deliberately carries no eyebrow, caption, or copy of any kind
- it's a visual pause, not a content section, so it doesn't turn into a
generic image/text split.

- **Asset type:** Photo (static)
- **Aspect ratio:** Desktop (≥900px) height is viewport-driven
  (`clamp(160px, 24vh, 280px)`) rather than a strict ratio, so any
  landscape crop works there. Mobile (<900px) uses a fixed ~16:9 crop
  (width-relative, not viewport-height-driven) so it reads as a genuine
  photographic moment rather than a shallow sliver - a single wide crop
  that reads reasonably at both should work, but the desktop
  height/crop is intentionally left open to fine-tune once the real
  photo exists.
- **Recommended shot:** A detail or texture shot related to the service
  - close-up, not a full job-site establishing shot (that role belongs to
  the project spotlight below it)
- **Autoplay:** N/A (static photo)
- **Loading priority:** Lazy
- **Current placeholder:** `public/media/placeholder-detail-roof-replacement.svg`
  - flat `#232220` field
- **Reuse note:** This component is generic (`image`/`imageAlt` props
  only) and available to any interior page with the same long-text-
  stretch issue. Also used on Roof Repair (see below) - measured that
  page's Overview + What We Fix stretch at ~1475px of continuous
  text-only content with no break, longer than any single unbroken
  stretch on Roof Replacement, so the band earned its place there too
  rather than being added automatically.

### Roof Repair page media

- **Page hero background:** `public/media/placeholder-page-hero-repair.svg`
  - flat `#1e1d1b` field. Same spec as the shared `PageHero.astro` entry
  above (full-bleed landscape, dark scrim, eager loading) - a distinct
  placeholder file so this page doesn't visually match Roof Replacement's
  hero once real photos exist.
- **Detail photo band:** `public/media/placeholder-detail-roof-repair.svg`
  - flat `#252320` field, between Overview and What We Fix. Same spec as
  Roof Replacement's band (mobile ~16:9, desktop `clamp(160px, 24vh,
  280px)`); a repair-relevant detail/texture shot (a leak, damaged
  shingle, or flashing close-up) suits this better than a wide
  establishing shot.
- **Recent Work project spotlight:** `public/media/placeholder-project-roof-repair.svg`
  - flat `#211f1d` field, 16:9, same `ServiceProjectSpotlight.astro`
  spec as Roof Replacement (max-height 65vh on desktop). Metadata is
  "Roof Repair · Location TBD" - do not fill in a real location,
  material, or scope before the client supplies them.

---

## Not yet built

Trust section (`TrustSection.astro`) is text/stat-only by design - no
media slot there currently. Homepage sections (Hero through Footer) are
all built. The Materials & Certifications section on service pages is
intentionally typography-only (no photo) by design, not a placeholder
gap - see `CertificationsSection.astro`. The "What We Fix" coverage list
on Roof Repair (`ServiceCoverageList.astro`) is also intentionally
typography-only, same reasoning. Remaining service pages (Gutters, Tile
Roofing, Solar Panel Cleaning, Moss Removal, Insurance Claim Assistance),
About, Contact, Financing, and Projects will each get entries here as
they're built.
