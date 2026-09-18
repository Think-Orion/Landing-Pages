# Deployment checklist — Online Graduate Diploma in Online Education

Hand this to whoever deploys the page. Items marked **BLOCKING** will visibly break
something if skipped.

---

## 1. Files in this package

Applies to **all three pages** unless noted.

| File | Where it goes |
|---|---|
| `Cold_Audience_dc.html` | Cold-audience page |
| `In-Market_Hero_Form_dc.html` | In-market page |
| `Thank_You_dc.html` | Post-submission page |
| `assets/Graduate_diploma_in_online_education_factsheet_2025.pdf` | Keep it reachable from the thank-you page — see §10 |
| `assets/favicon/*` | **Web root** of the serving domain — not next to the page |
| `assets/og-image-1200x630.jpg` | Host it — the social sharing image for both landing pages |
| `assets/hero-online-educator-{960,1920}.{webp,jpg}` | Host all four — the cold page's hero, served responsively |
| `assets/credential-gap-{600,1200}.{webp,jpg}` | Host all four — the in-market Credential Gap photo |
| `assets/premise-educator-mce-badge-800x800.jpg` | Optional: host it and swap the data URI (see §5) |
| `assets/advisor-mike-220x211.jpg` | Optional: same |

---

## 2. Favicons — BLOCKING for the icon to appear

Every file in `assets/favicon/` must go to the **web root** of the domain serving the
page, because the page references them as root-relative paths (`/favicon.ico`):

```
/favicon.ico
/favicon-16x16.png
/favicon-32x32.png
/apple-touch-icon.png          ← use this one, it is flattened onto white
/android-chrome-192x192.png
/android-chrome-512x512.png
/site.webmanifest
```

Do **not** deploy `apple-touch-icon-source-transparent.png`. It is the original supplied
file, kept only for traceability. iOS ignores transparency on home-screen icons and
composites onto black, so the transparent version would ship as a seal on a black square.

If the page is served from a subdirectory rather than a domain root, tell us — the paths
need changing.

---

## 3. Canonical, og:url, og:image — before launch

**All three pages are now `noindex, follow`** per the client decision not to allow these paid
pages to be crawled. Two consequences:

- **Canonical is no longer load-bearing.** A canonical tag only matters to a page that gets
  indexed, and none of these do. The tags stay commented out; filling them is now optional
  tidiness rather than a launch blocker.
- **The `FAQPage` schema on both landing pages is inert.** It is left in place so nothing has
  to be rebuilt if the decision reverses, and because it costs nothing.

`og:image` still matters — social crawlers are not search crawlers, and link previews work
regardless of `noindex`. That one is worth filling.

The thank-you page has no canonical and no Open Graph tags at all — see §10.

Four tags are **commented out** in the `<head>` because the live URL was unknown at
handoff. Search for `REPLACE-WITH-LIVE-URL` in the HTML. Uncomment each and fill in:

| Tag | Value |
|---|---|
| `<link rel="canonical">` | This page's final absolute URL |
| `og:url` | Same value as canonical |
| `og:image` | Absolute URL to the supplied `og-image-1200x630.jpg` once hosted |
| `twitter:image` | Same value as og:image |

Also uncomment `og:image:width`, `og:image:height` and `og:image:alt` alongside `og:image`.

**They were left commented rather than filled with placeholders on purpose.** A canonical
tag pointing at a placeholder can misdirect indexing, and a broken `og:image` makes every
social share render as a blank card. In both cases an absent tag is safer than a wrong
one, so nothing can ship broken by accident.

`og:image` must be an **absolute URL**. Relative paths and data URIs do not work — social
crawlers fetch it independently of the page.

**The image itself is supplied:** `assets/og-image-1200x630.jpg`, 55KB. It was built from the
same educator and MCE badge photo used on the cold-audience page — the 800×800 source scaled to
630px and centred on a 1200×630 canvas filled with the photo's own background colour
(`#8A0437`), so the join is seamless and nothing was upscaled. Both landing pages already
reference it by that filename; only the domain is missing. The thank-you page carries no Open
Graph tags by design, so it does not use it.

---

## 4. Footer policy links — BLOCKING

Three footer links point at placeholders. Replace with AUB's **existing** policy pages:

- `[AUB PRIVACY POLICY URL]`
- `[AUB TERMS OF USE URL]`
- `[AUB NON-DISCRIMINATION / ACCESSIBILITY URL]`

These do not depend on where the page is hosted — they are absolute URLs on `aub.edu.lb`
that already exist, so they can be filled before handoff.

The privacy link matters beyond tidiness. The page collects name, email and phone, so a
privacy notice has to be reachable from the point of collection. Google Ads also requires
lead-gen destinations to disclose data practices, and a missing privacy link is a common
cause of ad disapproval.

---

## 5. The lead form — BLOCKING for the page to function

The page currently shows a **static mockup** of the lead form. It does not submit
anything: there is no `<form>` tag, the buttons are `type="button"`, and there is no
submit handler.

Mount points ready for the live Vala embed:

- **Cold page:** `#vala-funnel` in the advisor section — **one mount only.** The hero form
  was removed at client request and the hero is now image-led, so the previous
  two-mounts-on-one-page question no longer applies. The remaining mount was renamed from
  `vala-funnel-2` so the DC runtime picks it up.
- **In-market page:** `#vala-funnel` only.

When the form is wired, add the `dataLayer.push` for the conversion event — ask ops for
the expected event name and parameters. Nothing is tracked on submit today.

---

## 6. Tag Manager — already installed, do not modify

Stape server-side container **`GTM-KZDZDJJ`**, loaded first-party from `trk.aub.edu.lb`.
Supplied by AUB ops with "do not modify this code" and pasted verbatim.

Do not reformat, re-encode or pretty-print the obfuscated query parameter — it *is* the
container reference.

Two open questions for ops:

- **Consent Mode v2** — the default consent state normally has to be set on-page, above
  the GTM loader, or by a CMP. Not present yet. Confirm before running EEA traffic.
- **Conversion event** on form submit (see §5).

**Verify the thank-you page tag first.** A thank-you pageview is the usual conversion
signal, so if that one tag is wrong, conversions go uncounted while spend continues. Check
it in GTM preview mode before the campaigns go live.

---

## 7. Remove before launch

- The `<script>` immediately before `</body>` replicates sticky-CTA, FAQ, CTA-scroll and
  slider behaviour for review outside the DC runtime. Remove it once DC wiring is live.
- `<image-slot>` elements are placeholders. They render only in the DC preview and are
  **invisible in a normal browser**. Replace each with a plain `<img>` once real photos
  exist.
  - **Cold page:** 4 faculty portraits — Dr. Hoda Baytiyeh, Dr. Mahmud Shihab, Rayan Fayed,
    Rana Ghazzi.
  - **In-market page:** the same 4 portraits **plus the hero background photo**. Until it is
    supplied the hero shows only its dark gradient.
  - **Cold page hero photo: supplied and optimised.** Served through `<picture>` with
    `srcset` — four files, two widths × WebP/JPEG. A desktop downloads **58KB** (1920 WebP), a
    phone **25KB** (960 WebP), with JPEG fallbacks at 125KB / 46KB. Source was a 2.17MB PNG,
    cropped to 16:9 before export. All four must be hosted together or the fallbacks break.
    Loaded eager with `fetchpriority="high"` because it is the likely LCP element — **do not add
    `loading="lazy"` to it,** and do not "simplify" the `<picture>` down to a single `<img>`.
- All testimonial quotes are `[TESTIMONIAL / NAME / ROLE]` placeholders.
- Faculty `[Short bio]` lines are placeholders.

---

## 8. Content still to confirm with the client

- **Intake date.** Shown as **Fall 2026-2027**, per AUB feedback. The Aug 31, 2026 semester
  start came from the AUB MA page; the diploma page still showed 2025. Confirm before launch.
- **Comparison table** figures for the non-AUB columns are indicative ranges.
- **MCE badge** — confirm Microsoft brand-usage approval.
- **Lebanese MoE recognition wording** in the FAQ mirrors the client-reviewed email
  sequence. Confirm it belongs on a paid landing page.
- **Both landing pages now carry an identical seven-question FAQ set.** That is only safe
  because both are `noindex`. **If either page is ever set to index, the two sets must be
  differentiated again** or the pages will compete with each other for the same queries. The
  in-market page's previous, program-aware set is recorded in its client-fill comment block so
  it can be restored.

---

## 9. Known behaviour that is not a bug

- **Favicons will not appear in a `raw.githack.com` or similar preview** served from a repo
  subfolder, because `/favicon.ico` resolves to the preview host's root. Verify on a real
  deployment.
- **Duplicate `viewport` meta.** One sits in the outer `<head>` beside `support.js` (the DC
  preview harness), one in `<helmet>` (the production head), so only one ships. Confirm
  with Manno which before deleting either — removing the wrong one breaks the DC preview.
- The sticky CTA bar is hidden over the hero and over the form section, and shown in
  between. The **cold** and **thank-you** pages carry `padding-bottom:104px` on the footer so
  the bar cannot cover the legal links at page bottom; the **in-market page** hides the bar at
  the footer instead and needs no padding. All three verified by hit test at 1440px and 390px.

---

## 10. Thank-you page specifics

- **`robots: noindex, follow`** — must never be indexed. It would rank for brand queries,
  expose the post-conversion state in search results, and inflate conversion counts with
  organic arrivals that never submitted the form.
- **No canonical, no Open Graph, by design.** Canonical is meaningless alongside `noindex`;
  Open Graph would invite social sharing of a page that should not be shared. Do not "fix"
  these by adding them.
- **Factsheet.** `assets/Graduate_diploma_in_online_education_factsheet_2025.pdf` is a
  compressed copy: **1.8MB, down from the 22.2MB original.** 77% of the original was one
  2551×14099px PNG reused as the background of all four pages, resampled to 150dpi. All four
  pages and all selectable text are intact and renders are visually indistinguishable. The
  22.2MB original is not in the repo — keep the client's copy as the source of truth. The
  download button uses a relative path and opens in a new tab; adjust the href if the PDF is
  hosted elsewhere.
- **Booking link** goes to Mike's Microsoft Bookings calendar in two places (Step 1 card and
  sticky bar). Confirm it is the right service for this program and that the meeting length
  there matches the "20 minutes" wording — Bookings pages are JS apps and cannot be read
  automatically.
- **Confirm the next-step promise.** The hero says a call within 48 hours. Verify with
  admissions that the first touch is a call, not an email, and that 48 hours is accurate.
- **Testimonials** are bracketed placeholders. Never publish them.
