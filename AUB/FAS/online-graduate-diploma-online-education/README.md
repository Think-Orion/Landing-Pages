# Online Graduate Diploma in Online Education

**Client:** AUB · **Faculty:** FAS (Faculty of Arts and Sciences)

Landing pages for this program. Assets in `assets/` are shared across all three.

| Page | File | Status | Indexing |
|---|---|---|---|
| Cold audience | `Cold_Audience_dc.html` | ✅ built | **`noindex, follow`** |
| In-market hero form | `In-Market_Hero_Form_dc.html` | ✅ built | **`noindex, follow`** |
| Thank you | `Thank_You_dc.html` | ✅ built | **`noindex, follow`** |

**All three pages are `noindex, follow`** per the client decision not to allow these paid pages
to be crawled. That reverses the earlier constraint: the two landing pages now carry an
**identical** seven-question FAQ set, which is safe precisely because neither is indexed, so
duplicate `FAQPage` data cannot compete with itself.

The `FAQPage` schema is therefore inert on both, and left in place only so nothing needs
rebuilding if the decision reverses. **If either page is ever set to index, the FAQ sets must be
differentiated again** — the in-market page's previous program-aware set is recorded in its
client-fill comment block. Canonical also stops being load-bearing on unindexed pages, though
`og:image` still matters because social crawlers are not search crawlers.

---

## Thank-you page

Two steps (book the call, grab the factsheet) plus graduate testimonials and a sticky
booking bar. The template's Step 3 survey was removed at client request, so survey handlers
are stripped from the DC script. Booking goes to Mike's Microsoft Bookings calendar.

Head handling differs from the two landing pages, deliberately:

- **`robots: noindex, follow`.** A thank-you page must never be indexed — it would rank for
  brand queries, expose the post-conversion state in search results, and inflate conversion
  counts with organic arrivals that never submitted the form. `follow` keeps link equity
  flowing to aub.edu.lb.
- **No canonical.** Meaningless alongside `noindex`, and a canonical pointing elsewhere
  would contradict the directive.
- **No Open Graph.** The page is post-conversion and unindexed, so it should never be shared
  or previewed socially; adding `og:*` would invite exactly that.
- **GTM matters most here.** A thank-you pageview is the usual conversion signal, so this is
  the install worth verifying in GTM preview mode before spend starts.

### The factsheet

`assets/Graduate_diploma_in_online_education_factsheet_2025.pdf` — **1.8MB, down from
22.2MB.** 77% of the original file was a single 2551×14099px PNG reused as the background on
all four pages; it was resampled to 150dpi at JPEG q82 using PyMuPDF's `rewrite_images`. All
four pages and all 4,153 characters of selectable text survive, and page renders are visually
indistinguishable from the original.

The 22.2MB original is **not** in the repo — a binary that size bloats git history
permanently, and the client holds the source of truth. The download button links to the
compressed copy at a relative path and opens in a new tab, as approved.

Same sticky-bar defect as the cold page: this page has no at-footer check, so the booking bar
covered the footer legal links. Footer carries `padding-bottom:104px`; verified by hit test at
both widths.

---

## In-market hero form page

Higher-intent variant: hero-embedded form, no advisor or journey section, static 2-column
testimonial grid, burgundy 4-item trust bar, "Apply Now" in nav and sticky bar.

Same technical pass as the cold page — robots, favicon links, Open Graph and Twitter card,
commented-out canonical/`og:url`/`og:image`, the Stape GTM install, and footer legal links.
Differences worth knowing:

- **No `loading="lazy"`** — the page has no real `<img>` tags at all. The hero background
  and all four faculty portraits are `image-slot` placeholders, so there is nothing to lazy
  load. 56KB before the pass, 63KB after, with no embedded images.
- **One Vala mount** (`#vala-funnel`) rather than the cold page's two.
- **Credential Gap photo** — `assets/credential-gap-*`, client image 1 cropped 4:3 → 3:2 and
  exported at two widths in WebP and JPEG (65KB / 24KB WebP, from a 4.4MB source PNG). Sits
  below the section H2, lazy-loaded with explicit `width`/`height` to reserve space.
- **Five `image-slot` placeholders**, not four — the hero background is one of them, so in
  a raw browser the hero shows only its dark gradient with no photo behind it.
- **No footer padding needed.** This page's sticky-CTA logic already hides the bar when the
  footer is in view (`atFooter`), so the legal links are clickable without the clearance the
  cold page required. Verified by hit test at both widths.

Two defects found and fixed during the pass:

1. **The `<title>` contained `(Hero Form)`** — an internal template label that would have
   appeared in search results and browser tabs. Removed.
2. **The cost FAQ answer was 93% identical to the cold page's**, differing only by three
   synonym swaps. That is duplicate FAQ content on one domain competing with itself.
   Rewritten with every approved figure intact ($450/credit, $5,400 total, 20% Dean's
   Scholarship, 15% alumni and staff, payment plans, employer documentation) but genuinely
   distinct wording. Visible copy and JSON-LD updated together so they stay verbatim.

---

## Cold audience page

Long-form cold-audience LP, built from Think Orion's `Cold_Audience_dc.html` DC
template. Single self-contained file.

### What's in the file

- 7-question FAQ with matching `FAQPage` JSON-LD (visible text and schema are verbatim-identical).
- **One** Vala form host: `#vala-funnel` in the advisor section, below a static field mockup
  that must be replaced by the live embed. The hero form was removed at client request, which
  also retires the open question of whether the embed supports two mounts on one page.
- **Image-led hero.** No eyebrow text, word-by-word heading reveal, gradient and grain
  overlays, `Speak to an Advisor` scrolling to `#form`, and a `Scroll to explore` cue anchored
  to `#program`. All motion is CSS only and fully disabled under `prefers-reduced-motion`.
  The hero photo is client-supplied image 3 from their set, cropped to 16:9 and exported at two
  widths in WebP and JPEG: a desktop pulls 58KB, a phone 25KB, down from a 2.17MB source PNG.
  Overlaid with a flat black scrim at 58% plus a soft top/bottom gradient, per the client's
  reference screenshot. `See how it works` anchors to `#program` — the "You don't need a tech
  background." section — rather than to the form, since it is the reassurance path.
- A standalone `<script>` before `</body>` replicates sticky-CTA / FAQ / CTA-scroll /
  slider behaviour for review outside the DC runtime. Remove once DC wiring is live.

### Head, indexing and tracking

Added to the `<helmet>` block (which is what DC injects into the production `<head>`):

| Tag | State |
|---|---|
| `robots` | `index, follow, max-image-preview:large` — this page carries its own FAQPage schema targeting cold-stage long-tail queries, so it is meant to be indexed. **The Thank You page must be `noindex, follow` instead.** |
| `canonical` | **Commented out.** The live URL is unknown at handoff, and a canonical pointing at a placeholder can misdirect indexing, whereas an absent one is safe. Uncomment and fill before launch. |
| Favicon | Wired to **root-relative** paths (`/favicon.ico`, `/favicon-32x32.png`, `/favicon-16x16.png`, `/apple-touch-icon.png`, `/site.webmanifest`) plus `<meta name="theme-color" content="#8B1333">`. See "Favicon deployment" below. |
| Open Graph | `og:type`, `og:site_name`, `og:locale`, `og:title`, `og:description` are live. `og:url`, `og:image` and its width/height/alt are **commented out** pending the live URL — a broken `og:image` renders social shares as a blank card. |
| Twitter card | `summary_large_image` with title and description live; `twitter:image` commented out with `og:image`. |
| GTM | **Live.** Stape server-side container `GTM-KZDZDJJ`, loaded first-party from `trk.aub.edu.lb`. See "Tag Manager" below. |

#### Favicon deployment

Browsers resolve icon paths against the **domain root**, not the page path. Every file
below must be deployed to the web root of whatever domain serves this page:

```
/favicon.ico
/favicon-16x16.png
/favicon-32x32.png
/apple-touch-icon.png          (180x180)
/android-chrome-192x192.png
/android-chrome-512x512.png
/site.webmanifest
```

All files live in `assets/favicon/` as the canonical copy. **The repo is not the web
host** — committing them here does nothing for the live favicon. They have to be
uploaded to the web root of whatever domain serves the page.

| File | Size | Notes |
|---|---|---|
| `favicon.ico` | 15KB | Bundles 16×16, 32×32, 48×48 |
| `favicon-16x16.png` | 783B | Transparent — correct for browser tabs |
| `favicon-32x32.png` | 2.4KB | Transparent — correct for browser tabs |
| `apple-touch-icon.png` | 29KB | **Flattened onto white** — see below |
| `apple-touch-icon-source-transparent.png` | 32KB | Original as supplied, kept for traceability. Not deployed. |
| `android-chrome-192x192.png` | 35KB | Transparent — fine, Android composites onto `background_color` |
| `android-chrome-512x512.png` | 49KB | Transparent — fine, same reason |
| `site.webmanifest` | 392B | `name`/`short_name` filled in; arrived empty from the generator |

**Why apple-touch-icon was flattened.** Every file in the supplied set is heavily
transparent (the 180×180 was 85% transparent pixels). Browser tabs and Android handle
that correctly, but **iOS ignores alpha on home-screen icons and composites them onto
black** — the burgundy AUB seal would have shipped as a seal on a black square. The
deployed file is now flattened onto white, matching how the seal appears on aub.edu.lb.

`site.webmanifest`'s `theme_color` is still the generator default `#ffffff`; consider
changing it to AUB burgundy `#8B1333` to match the `theme-color` meta tag.

**Favicons will never appear in a raw/githack preview** served from a repo subfolder,
because `/favicon.ico` resolves to the preview host's root. That is expected, not a bug —
verify on a real deployment.

### Tag Manager

Supplied by AUB ops as a **Stape server-side GTM custom loader**, not a standard
`googletagmanager.com` install:

- **Container:** `GTM-KZDZDJJ`
- **Loader:** `https://trk.aub.edu.lb/del06kgsdkznp.js?<obfuscated-param>` — first-party
  subdomain with a randomised filename, which is how Stape's custom loader avoids
  ad-blocker and ITP interference.
- **Placement:** loader is the **first element in `<helmet>`** (the block DC injects into
  the production `<head>`), matching the "as close as possible to the top of `<head>`"
  instruction. The `<noscript>` iframe sits immediately after `</helmet>`, which is where
  the production body content begins.

Ops said **"do not modify this code"**, so both snippets are pasted verbatim. The
obfuscated query parameter *is* the container reference — do not reformat, re-encode, or
pretty-print it. It is verified byte-identical against what ops supplied.

**Open questions for ops:**

- **Consent Mode v2** is unconfirmed. With a server-side container it is handled in the
  container, not on the page — confirm before running EEA traffic.
- **No conversion event fires on form submit yet.** The lead form is still a static mockup
  with no `<form>` tag, no submit handler and no `dataLayer.push`. Ask ops for the expected
  event name and parameters, then wire it when the live Vala embed goes in.
- If Enhanced Conversions for leads is in use, hashed email/phone go to Google — AUB's
  privacy policy needs to cover that, which ties into the footer links below.

### Footer

The footer carries the AUB copyright line, campus address, and links to **Privacy
Policy**, **Terms of Use** and **Non-Discrimination** — URLs are placeholders pointing at
AUB's own existing policies, which the client supplies. We link their policies; we do not
author them.

A privacy notice must be reachable from the point of data collection since this page
takes name, email and phone. Google Ads also requires lead-gen destinations to disclose
data practices, and a missing privacy link is a common disapproval cause on paid pages.

The footer carries `padding-bottom:104px` so the sticky CTA bar cannot cover the legal
links at page bottom — without it the privacy link was unclickable on mobile.

## Assets

Both photos are still embedded as base64 data URIs, so the file reviews standalone
with no external requests. They account for **~81KB — 52% of the file**; swapping
both `src` values to hosted URLs drops it from ~156KB to ~73KB.

The decoded originals are extracted and ready to upload to a CDN:

| File | Size | Used for |
|---|---|---|
| `assets/premise-educator-mce-badge-800x800.jpg` | 54KB | Premise section composite (includes the MCE badge) |
| `assets/advisor-mike-220x211.jpg` | 6KB | Advisor portrait |
| `assets/og-image-1200x630.jpg` | 55KB | Social sharing image for both landing pages |

The sharing image was built from the 800×800 educator/MCE photo: scaled to 630px and centred
on a 1200×630 canvas filled with the photo's own flat background colour (`#8A0437`), so the
join is invisible and nothing was upscaled. Both landing pages reference it by filename in
their commented-out `og:image` tags; only the live domain is outstanding. The thank-you page
has no Open Graph tags by design and does not use it.

Both `<img>` tags now carry `loading="lazy"`, `decoding="async"` and intrinsic
`width`/`height`. Neither is the LCP element — the hero is type and a form, no image —
so lazy-loading both is safe.

**Still needed from AUB** — four faculty portraits, currently `image-slot` placeholders that
render only inside the DC preview:

| Slot id | Portrait |
|---|---|
| `cold-fac-1` | Dr. Hoda Baytiyeh |
| `cold-fac-2` | Dr. Mahmud Shihab |
| `cold-fac-3` | Rayan Fayed |
| `cold-fac-4` | Rana Ghazzi |

Replace each `<image-slot>` with a plain `<img>` once the real photo exists — `image-slot`
elements are invisible in a raw browser.

### AUB review round — applied

- Nav and FAQ CTA changed from "Chat to an Advisor" to **"Chat with an Advisor"** on both
  landing pages. Kept in the design's existing Title Case; the feedback was written lowercase,
  so say if you want `Chat with an advisor` instead.
- Intake label changed from "Fall 2026" to **"Fall 2026-2027"** everywhere it appears across
  all three pages, including the in-market meta description and every sticky bar.
- **Hero contrast raised** on both landing pages after the client reported the white text
  looked faded. Measured rather than eyeballed — rendering each hero with the text hidden,
  sampling the actual backdrop pixels behind every string, and computing the ratio against the
  90th-percentile lightest pixel (worst case for white type):

  | Element | Before | After |
  |---|--:|--:|
  | Cold sub-heading | 8.8 | **14.5** |
  | Cold stat labels (`per credit hour` etc.) | 6.7–7.3 | **14.5–16.6** |
  | Cold scroll cue | 6.5 | **12.4** |
  | In-market sub-heading | 10.8 | **18.2** |
  | In-market hero bullets | 14.9 | **18.2** |
  | In-market sub-form line | 6.0 | **12.9** |

  Every one of these already passed WCAG AA before the change — AA is a floor, not a target,
  and the client was right that they read faded. Changes: sub-headings and bullets to solid
  white, small labels from 60% to 92% at weight 600, a soft `text-shadow` on all hero type, and
  the cold scrim raised 58% → 64%. The text-shadow matters most on the **in-market** hero,
  whose photo is still an image-slot placeholder: today the type sits on a flat dark panel, so
  those ratios will drop once a real photograph is behind it.

## Handoff

Two documents, two audiences:

- **`AUB-Online-Education-Launch-Checklist.docx`** — the client-facing checklist as a Word
  document, brand-styled with tick boxes and tables. **This is the file to send to AUB.**
  Generated from `CLIENT-HANDOFF.md`; if the content changes, regenerate rather than editing
  both by hand.
- **`CLIENT-HANDOFF.md`** — the same content in Markdown, for AUB marketing and admissions. Non-technical, plain language,
  organised as: content we need, decisions we need, connecting the leads to the CRM, checks
  that can only be done on a live URL, and what not to change. This is the one to send.
- **`DEPLOY.md`** — for whoever deploys the pages — favicon placement, the four
commented-out URL tags, footer policy links, the Vala form wiring, and what to strip
before launch. Hand it over with the page.

Search the HTML for `REPLACE-WITH-LIVE-URL` to find every tag awaiting the live URL.

## Open client-fill items

The full list lives in the comment block at the top of `Cold_Audience_dc.html`. Headlines:

- Intake shown as **Fall 2026**; the Aug 31, 2026 semester start comes from the AUB MA page
  (the diploma page still shows 2025). Confirm the diploma start date before launch.
- Faculty `[Short bio]` lines to be supplied.
- All testimonial quote blocks are `[TESTIMONIAL / NAME / ROLE]` placeholders with suggested angles.
- Comparison-table figures for the non-AUB columns are indicative ranges — client validates.
- Confirm the correct Vala funnel script for this program, and that the embed supports two mounts.
- Confirm Microsoft brand-usage approval for the MCE badge.
- Confirm the Lebanese MoE recognition wording (mirrors the client-reviewed email sequence)
  belongs on a paid landing page.
- Fill the `[CANONICAL URL]` and `[OG IMAGE URL]` placeholders.
- Confirm with Manno that DC emits the GTM `<noscript>` iframe inside `<body>` rather than
  hoisting it into the head.
- Confirm Consent Mode v2 and the form-submit conversion event with ops (see "Tag Manager").
- Deploy the `assets/favicon/` files to the web root of the serving domain (they are in the
  repo, but the repo does not serve them). Use the flattened `apple-touch-icon.png`.
- Supply AUB's privacy policy, terms of use and non-discrimination URLs for the footer links.
- **Duplicate `viewport` meta is intentional for now.** One sits in the outer `<head>` beside
  `support.js` (the DC preview harness), one in `<helmet>` (the production head). Confirm with
  Manno which one actually ships before deleting either — removing the wrong one breaks the
  DC preview.

### QA status

Rendered in Chromium at 1440×900 and 390×844: no horizontal overflow at either width
(`scrollWidth == clientWidth`), tag balance clean, JSON-LD parses and all 7 Q&A pairs match
the visible copy verbatim. Both lazy images confirmed to decode at their full intrinsic size
(800×800 and 220×211) once scrolled into view, with no layout shift. Standalone behaviour verified — sticky CTA
hides over the hero and over `#form` and shows in between, FAQ accordions open/close with icon
rotation, CTAs scroll to `#form`, slider arrows show on mobile and hide on desktop.
