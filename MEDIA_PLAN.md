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

### Gutters page media

- **Page hero background:** `public/media/placeholder-page-hero-gutters.svg`
  - flat `#1b1c1a` field. Same shared `PageHero.astro` spec as the other
  service pages (full-bleed landscape, dark scrim, eager loading) - a
  distinct placeholder file so this page doesn't visually match the
  roofing pages' heroes once real photos exist.
- **Recent Work project spotlight:** `public/media/placeholder-project-gutters.svg`
  - flat `#1f201d` field, 16:9, same `ServiceProjectSpotlight.astro`
  spec as the roofing pages (max-height 65vh on desktop). Metadata is
  "Gutters · Location TBD" - deliberately not specifying cleaning,
  repair, or installation as the eventual real project type until the
  client supplies it, and no location, material, or scope should be
  invented before then. No detail photo band was added to this page -
  the Overview + Three Ways We Can Help stretch (~1031px combined) read
  fine without one; revisit only if that changes.

### Financing page media

- **Page hero background:** `public/media/placeholder-page-hero-financing.svg`
  - flat `#20211d` field. Same shared `PageHero.astro` spec as the other
  interior pages (full-bleed landscape, dark scrim, eager loading) - a
  distinct placeholder file so this page doesn't visually match any
  service page's hero once real photos exist. No other media on this
  page by design - the large typographic offer treatment and the
  Getting Started section are intentionally type-only, not gaps.

---

## Not yet built

Trust section (`TrustSection.astro`) is text/stat-only by design - no
media slot there currently. Homepage sections (Hero through Footer) are
all built. The Materials & Certifications section on service pages is
intentionally typography-only (no photo) by design, not a placeholder
gap - see `CertificationsSection.astro` (not used on the Gutters page -
see below). The "What We Fix" coverage list on Roof Repair
(`ServiceCoverageList.astro`) and the "Three Ways We Can Help" list on
Gutters (`ServiceTriad.astro`) are also intentionally typography-only,
same reasoning. The Gutters page intentionally omits Materials &
Certifications entirely - GAF/CertainTeed are roofing-manufacturer
credentials that don't certify gutter work, and no substitute
gutter-specific credential section was added without a verified fact to
support it. The Gutters page also no longer includes the `FinancingCallout`
section - the client does not believe Wisetack financing currently
extends to gutter projects, so the callout (which implied it did by its
placement) was removed rather than reworded. `FinancingCallout` remains
in place on Roof Replacement and Roof Repair. Remaining pages (Insurance Claim Assistance and
Projects) will each get entries here as they're built.

---

### About page media

- **Family video:** `public/media/placeholder-about-family-video.svg`
  - flat `#1c1c19` field, 9:16, built with `PlayableVideo.astro` (same
  component, same click-to-play/sound-on/no-autoplay behavior as the
  homepage `FamilySection` instance) - no `src`/`muxPlaybackId` configured
  yet, so the play control renders inert for layout review. This is the
  same single confirmed ~34s family/Triple-R clip already referenced in
  the homepage `FamilySection` media entry above, sized much larger here
  (the page's visual centerpiece, `clamp(300px, 42vw, 480px)` wide) since
  this is the story page it belongs to. The caption directly below it
  shares that same width/center via a `--family-video-width` custom
  property, so it reads as attached to the frame rather than merely
  centered somewhere near it.
  - **Poster:** per the client, use a still frame from the existing video
  for now (not a separate portrait) - still needs to be pulled from the
  actual footage once delivered.
  - **Known caveat:** carries the same burned-in-captions caveat as the
  homepage entry - using the existing export as-is for layout purposes
  until a cleaner one is available.
  - No other media added to this page - "What We Do" stays text-only by
  the client's choice, not a placeholder gap; revisit only if a real
  family/job-site photo becomes available.

---

### Tile Roofing page media

- **Page hero background:** `public/media/placeholder-page-hero-tile.svg`
  - flat `#1e1c19` field. Same shared `PageHero.astro` spec as the other
  service pages (full-bleed landscape, dark scrim, eager loading) - a
  distinct placeholder file so this page doesn't visually match the
  other roofing pages' heroes once real photos exist.
- **Recent Work project spotlight:** `public/media/placeholder-project-tile.svg`
  - flat `#232019` field, 16:9, same `ServiceProjectSpotlight.astro` spec
  as the other service pages (max-height 65vh on desktop). Metadata is
  "Tile Roofing · Location TBD" - the client has confirmed real completed
  tile projects exist and will provide photos/details later, but no
  location, tile material, or scope (repair, reset, or replacement)
  should be invented before then.
- No Materials & Certifications section on this page - GAF and
  CertainTeed SELECT ShingleMaster are shingle-specific credentials (see
  the CertainTeed program's own name) and the client has confirmed no
  tile-specific manufacturer certification exists, so neither is
  presented as backing tile-roofing work anywhere on this page.

---

### Moss Removal page media

- **Page hero background:** `public/media/placeholder-page-hero-moss.svg`
  - flat `#1a1d19` field. Same shared `PageHero.astro` spec as the other
  service pages (full-bleed landscape, dark scrim, eager loading) - a
  distinct placeholder file so this page doesn't visually match the
  other service pages' heroes once real photos exist.
- **Before & After pair:** `public/media/placeholder-moss-before.svg` and
  `public/media/placeholder-moss-after.svg`
  - flat `#1f221c` / `#25281f` fields, 4:3, page-specific inline markup
  (not a shared component yet - extract one only if a second page needs
  the same before/after treatment). Each frame carries a small "Before"
  / "After" label in the corner; keep those labels in place once real
  photography replaces the placeholders. The client has confirmed real
  completed moss-removal work exists and will provide photos later, but
  no location, roof type, method, or scope should be invented before
  then.
- No Recent Work spotlight on this page - the Before & After pair serves
  that role more directly for a removal/maintenance service than a
  single project photo would.
- No Financing section and no FAQ on this page - no evidence financing
  applies to a service this size, and the only safe FAQ answers
  (licensed/insured/BBB, free estimates) are already covered elsewhere
  and didn't justify a thin accordion just for consistency with other
  service pages.

---

### Solar Panel Cleaning page media

- **Page hero background:** `public/media/placeholder-page-hero-solar.svg`
  - flat `#191c1e` field. Same shared `PageHero.astro` spec as the other
  service pages (full-bleed landscape, dark scrim, eager loading) - a
  distinct placeholder file so this page doesn't visually match the
  other service pages' heroes once real photos exist.
- **Before & After pair:** `public/media/placeholder-solar-before.svg` and
  `public/media/placeholder-solar-after.svg`
  - flat `#1c1f21` / `#20262a` fields, 4:3, same page-specific before/after
  markup as Moss Removal. Each frame carries a small "Before" / "After"
  label in the corner; keep those labels in place once real photography
  replaces the placeholders. The client has confirmed real completed
  solar-panel-cleaning work exists and will provide photos later, but no
  location, panel type, or scope should be invented before then.
  - This is now the second page using the identical before/after
  pattern (markup + styles) as Moss Removal - a candidate for extracting
  into a shared component if a third page ever needs it, but not done
  now since it wasn't asked for and each instance is still small.
- No Recent Work spotlight, no Financing section, and no FAQ on this
  page - same reasoning as Moss Removal: the before/after pair
  demonstrates the service more directly than a single project photo,
  nothing confirms financing applies to a service this size, and the
  only safe FAQ answers are already covered elsewhere.

---

## Site-wide media & motion system

Approved system design (media/motion audit) - governs how real media
gets slotted in and how the scroll-reveal system behaves, going
forward. Doesn't replace the per-page entries above; read this first,
then the specific page for its exact crop/placeholder details.

### Recent Work / large media-placeholder tiers

Applies to every "Recent Work"-shaped slot (`ServiceProjectSpotlight` on
Roof Replacement, Roof Repair, Gutters, Tile Roofing; the Before & After
pairs on Moss Removal and Solar Panel Cleaning). The treatment is
decided by how much real content actually exists for that page - never
build a gallery from insufficient content.

| Real content available | Treatment | Component |
|---|---|---|
| One good photo | Single large spotlight (current default) | `ServiceProjectSpotlight` |
| One short clip (~15-30s) instead of a photo | Same frame/aspect, swapped to video | `PlayableVideo`, click-to-play, no autoplay |
| A genuine matched before/after pair for one job | Two-frame comparison | The existing Before & After pattern (Moss Removal / Solar Panel Cleaning) |
| 3+ real, good photos for one service | Small gallery | Extract `FeaturedWorkSection`'s scroll-snap pattern into a shared, parameterized component rather than inventing a second gallery |

A gallery with only 1-2 photos reads as thin - stay on the spotlight
tier until there are genuinely 3+.

### Crop / aspect-ratio guidance

- **Homepage Hero**: full-bleed, wide landscape (~16:9-2:1), subject
  centered. Same source can serve both breakpoints via `object-fit:
  cover`, but request a crop-tolerant (centered-subject) shot from the
  client - only shoot a dedicated mobile crop if the real footage turns
  out to have an off-center subject.
- **Every interior `PageHero`**: full-bleed landscape, dark scrim. No
  separate mobile crop needed - the hero is short (max ~460px) at both
  breakpoints, so a wide centered-subject photo crops fine at both.
- **`ServiceProjectSpotlight` / Before & After frames**: 16:9 and 4:3
  respectively, as already built. Object-fit: cover handles reasonable
  source variation; ask for landscape-oriented submissions for
  `FeaturedWorkSection` specifically (see below).
- **`FeaturedWorkSection` (homepage gallery)**: fixed 3:2 at both
  breakpoints. Flag: if real photos come in portrait-shot, cover-cropping
  to 3:2 will lose context - prefer landscape-oriented submissions for
  this section.
- **About's family video**: native 9:16, same source at every
  breakpoint, no separate crop needed (portrait video scales cleanly).

### Where NOT to add media (confirmed still correct)

Trust, Process, homepage Financing, Financing page's Offer section,
`ServiceIncludes` / `ServiceCoverageList` / `ServiceTriad` everywhere
they appear, `CertificationsSection`, About's name-reveal, About's What
We Do, Contact, Thank You, Services hub. Adding photos/icons to any of
these turns a restrained typographic section into a generic
icon-card/badge layout - don't.

### Autoplay rules

- At most **one** autoplaying video per page, and only when it's a true
  above-the-fold hero (currently: the homepage Hero only).
- Every other video (About/homepage Family, and any future Recent Work
  video upgrade) is click-to-play via `PlayableVideo` - sound-on,
  never autoplay.
- `prefers-reduced-motion: reduce` skips video entirely on the Hero;
  the poster is the whole experience for those users.
- Mobile keeps the same rule; `playsinline` is already set for iOS
  inline autoplay. A `navigator.connection`/`saveData` check to skip
  Hero autoplay on slow/metered connections is a good later addition,
  not yet implemented - see "Deferred" below.

### Poster requirements

Every video needs a real frame from that actual clip as its poster
(never a generic stand-in still), cropped to the exact aspect ratio of
the video so playback start never causes a layout jump.

### Scroll-reveal motion system (implemented)

A progressive-enhancement reveal system now runs site-wide via three
data attributes and one shared observer (`BaseLayout.astro` + the
"Scroll reveal" block in `base.css`):

- `data-reveal` - the default: fade + `translateY(16px→0)`, `600ms`,
  `var(--ease-out)`. Used for below-the-fold section intros/content
  blocks everywhere (Overview blocks, FAQ intros, Financing callouts,
  Trust, About sections except the name-reveal, Services hub category
  blocks, etc).
- `data-reveal-group` + `data-reveal-item` (with `style="--i: N"` per
  item) - the same fade/translate, staggered `+60ms` per item (reusing
  Header's own nav-stagger value). **Only for small, clearly-grouped
  sets (3-5 items)**: `ServiceTriad`'s 3 items, `ServiceIncludes`'/
  `ServiceCoverageList`'s rows, `ProcessSection`'s 4 steps, `FAQSection`'s
  items, the homepage Services list/accordion. Longer lists (e.g. the
  Services hub's row lists) get a single `data-reveal` on the category
  as one block, never a per-row stagger.
- `data-reveal-media` - fade + `scale(1.03→1)`, `750ms`, reusing Hero's
  own `hero-media-in` gesture. Used on `ServiceProjectSpotlight`'s image,
  `PhotoBand`'s image, Before & After frames, `FeaturedWorkSection`'s
  frames, and About's family video wrapper. **Must go on an element
  whose parent (not itself) owns `overflow: hidden`** - putting the
  scale transform on a full-bleed frame that also owns its own
  `overflow: hidden` lets the transform bleed past the viewport edge
  and cause horizontal scroll (hit this once on `ServiceProjectSpotlight`
  and `PhotoBand`, fixed by moving the attribute to the inner `<img>`).

**Fails safe by design**: the default CSS state (no `.js-motion` class
on `<html>`) is fully visible. A synchronous inline script in
`BaseLayout.astro`'s `<head>` only adds `.js-motion` when
`prefers-reduced-motion` isn't set; a second, deferred script attaches
one shared `IntersectionObserver` (`rootMargin: "0px 0px 200px 0px"`,
so reveals start ~200px before an element reaches the viewport - this
is what keeps fast scrolling from feeling like it's waiting on the
page). If JS never loads, or reduced-motion is set, nothing in this
system ever applies - content is visible from the first paint either
way. `reset.css`'s existing global `prefers-reduced-motion` kill-switch
is a second, independent safety net underneath this one.

**Watch for when adding new `data-reveal*` attributes**: if the target
element already has its own `transition:` declaration (e.g. a hover
effect, like `.services__row`'s `padding-left` or the Services hub's
`.category__row`), don't rely on the global attribute selector's
transition alone - merge the reveal's `opacity`/`transform` timing
into that component's own `transition:` shorthand, or the two rules can
fight over the cascade and silently drop one animation. (Services hub's
`.category__row` avoided this entirely by not getting a reveal attribute
at all - it's part of a long list, covered by the category-level
`data-reveal` instead.)

### Deferred (explicitly not done in this pass)

- Accordion open/close height-smoothing for native `<details>` (FAQ,
  mobile Services accordion) - kept as instant native toggle. Revisit
  during final polish.
- Migrating placeholder media to `astro:assets` for responsive
  `srcset`/format generation - do this once real photos/video start
  replacing placeholders, not against SVG placeholders.
- `navigator.connection`/`saveData`-aware autoplay skip for the Hero
  video - add once real Hero video exists.

---

## Projects page media

Highly visual by design - unlike the service pages, real project media
is meant to carry most of this page. Only the featured project exists
right now - no additional projects have been provided, so `PROJECTS`
holds a single entry (no invented name, location, roof type, material,
or scope). Uses the tiered Recent Work system above rather than forcing
every project into one template.

**Empty-state behavior:** the grid section (everything after the
featured project) only renders when there's at least one non-featured
project; with zero, it contributes no markup and no height, and the
featured project's existing bottom padding lands directly against the
Final CTA's own padding, so the page never shows a reserved-but-empty
gap. As soon as a second project is added to `PROJECTS`, the grid
section and the pair/pair/spotlight rhythm appear on their own.

### Data shape (`src/pages/projects/index.astro`)

Each project stores `serviceType`, `location`, `description`,
`materialType`, `completedDate`, `featured`, `media`, and `href` - but
**only `serviceType`, `location`, and (for the featured project only)
`description` are ever rendered**. `materialType` and `completedDate`
are stored for later and deliberately not displayed yet; don't wire
them into the template just because the field exists - only once the
client asks for them to be visible.

### Featured project

- **Asset type:** Any tier (photo/video/before-after) - whichever is
  strongest for the project you want leading the page.
- **Desktop:** 16:9, full width of the container (not the viewport -
  this isn't a `ServiceProjectSpotlight`-style 100vw bleed), capped at
  `max-height: 75vh` - the single largest, most dominant image on the
  page, no border/shadow/card treatment.
- **Mobile:** same 16:9 source via `object-fit: cover`, no separate
  crop needed.
- **Current placeholder:** `public/media/placeholder-project-featured.svg`,
  flat `#1e1c19` field.

### Grid tiles (pair / pair / spotlight rhythm)

- **Pair-row tiles:** 4:3, side by side on desktop (≥700px), stacked on
  mobile.
- **Spotlight-row tiles:** 16:9, full width of the container, capped at
  `max-height: 65vh` on desktop (same cap `ServiceProjectSpotlight`
  uses).
- **Current placeholder:** `public/media/placeholder-project-grid.svg`,
  flat `#232019` field, reused across all grid tiles regardless of
  pair/spotlight slot (`object-fit: cover` handles the different
  container aspect ratios from one source) - these are anonymous "TBD"
  projects, not distinct named pages, so a shared placeholder is
  appropriate here unlike other pages.
- **The rhythm is purely position-based** (two pair-rows, then one
  full-width spotlight row, repeating - scales to any project count
  without redesign). A before/after or gallery-tier project needs the
  full-width room a spotlight slot gives it - **place such a project at
  a position where the rhythm lands on a spotlight row** rather than
  expecting the layout to auto-detect and reassign it; the loop doesn't
  do type-aware repositioning.
- **Gallery tier (3+ real photos for one project):** shows one cover
  photo plus a quiet "+N more photos" note in the corner - the rest of
  that project's photos aren't otherwise accessible until it gets an
  individual project page (see below). Supported at both pair and
  spotlight tile sizes, since a single cover photo plus a small text
  overlay reads fine even at the narrower pair width - unlike
  before-after, it doesn't need the full-width room to make sense.
- A before-after project that lands in a pair slot (an authoring
  mistake, not something the rhythm auto-corrects) degrades safely: the
  tile shows no image, but its caption still renders and nothing
  breaks. Reposition it in `PROJECTS` so the rhythm lands it on a
  spotlight row instead of adding special-case layout for it.

### Before & After

Only ever use the "before-after" tier for a genuine matched pair from
one real job - never a staged or generic pairing. Now built as a shared
component (`BeforeAfter.astro`, extracted from the identical inline
version on Moss Removal/Solar Panel Cleaning once a third use case hit
- those two pages keep their existing inline versions untouched).

### Video

Click-to-play via `PlayableVideo`, same as everywhere else - never
autoplay on this page. (The only page-level autoplay exception sitewide
remains the homepage Hero.)

### Individual project pages

Not built yet. Recommended eventually for select standout
projects only (not every project) - particularly ones with enough
real photos to justify a case-study page (the natural home for a
gallery-tier project's full photo set). The hub is already structured
for this without a rebuild: a project's `href` is `undefined` until a
detail page exists; the tile is a plain non-interactive block until
then, and simply becomes a link the moment `href` is set to a real
`/projects/<slug>` path.

### Homepage cross-link

`FeaturedWorkSection` (the homepage's "Recent projects." teaser) now
has a subtle "View all projects" link to `/projects`, and the Footer's
"Recent Projects" link now points to `/projects` instead of the old
`/#featured-work` homepage anchor.

---

## Roof Maintenance & Leak Prevention page media

- **Detail photo:** `public/media/placeholder-detail-maintenance.svg`
  - flat `#1d201c` field, built with the shared `PhotoBand.astro`
  component (same spec as its other uses: mobile fixed ~16:9 crop,
  desktop `clamp(160px, 24vh, 280px)` viewport-driven height). This is
  the page's only supporting image - it isn't filling a long-text-stretch
  gap like `PhotoBand`'s other uses, it's the one real visual moment on a
  deliberately short page, so it earns its place rather than being
  decorative.
- **Recommended shot:** A close/detail shot of maintenance work actually
  in progress - ideally roof metals (flashing), a vent, or another
  potential leak area being addressed, since that's the one confirmed
  example of what this service can involve. Closer and more specific
  than a wide establishing shot - this band is meant to read as "here's
  the actual work," not a generic roof-from-a-distance photo.
- **No page hero image needed:** this page intentionally has no
  `PageHero` - it opens with a text-only dark statement hero (same move
  About's name-reveal already makes), so it doesn't need a background
  photo before launch.
- **No Recent Work spotlight:** no real project photos are confirmed yet
  for this specific service - add one later (matching
  `ServiceProjectSpotlight`'s existing pattern) once real photos exist,
  rather than shipping a placeholder spotlight now.
