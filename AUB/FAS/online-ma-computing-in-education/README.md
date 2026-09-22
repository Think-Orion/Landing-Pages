# Online MA in Computing in Education

American University of Beirut · Faculty of Arts and Sciences · 100% online, asynchronous.

Three pages make up the funnel for this program. All three are self-contained
`_dc.html` files carrying the DC template filenames unchanged.

| Page | File | Status | Indexing |
|---|---|---|---|
| Cold audience | `Cold_Audience_dc.html` | ✅ built | **`noindex, follow`** |
| In-market hero form | `In-Market_Hero_Form_dc.html` | ✅ built | **`noindex, follow`** |
| Thank you | `Thank_You_dc.html` | ✅ built | **`noindex, follow`** |

All three pages are noindex by client decision — they are paid-traffic only. That is
what makes it safe for the two landing pages to share one FAQ set; see "FAQs".

The three page bodies were drafted against the client-approved Online Education
diploma builds and arrived complete. What this folder adds on top is the repo's
standing head/indexing/tracking block, the decoded image assets, the social share
image, and the QA pass recorded at the bottom of this file.

Since the initial setup the client has asked for several changes, all applied: the cold
hero dropped its form in favour of a full-bleed photo and gained a "See how it works"
secondary CTA, the in-market Opportunity section gained a photo with its copy column
re-aligned to it, and the two landing pages now share one FAQ set with indexing turned
off. See "Cold hero", "In-market Opportunity section", "FAQs" and "Assets".

## Program facts used across the pages

| Fact | Value | Source |
|---|---|---|
| Credits | 30 (9 core courses × 3 credits + 3-credit capstone) | Derived — see "Credit maths" |
| Tuition | $450 / credit → $13,500 total | Approved diploma builds ($450/credit) |
| Duration | 1.5–2 years, ~7 weeks per course | Approved diploma builds (7 weeks/course) |
| Format | 100% online, asynchronous, no fixed class times | Factsheet prose, ×3 |
| Credential | AUB MA + Microsoft Certified Educator (MCE), MCE at no extra cost | Approved diploma builds |
| Recognition | NYSED-recognized; **not** accredited by the Lebanese MoE | Approved diploma builds |
| Admissions | Bachelor's (any field) from a recognized institution, min GPA 3.0, English proficiency, two recommendation letters | Factsheet + approved diploma builds |
| Diploma pathway | All 12 Graduate Diploma in Online Education credits transfer into this MA | Factsheet, footnote ** |
| Waivers | Students with an education or computer science background can apply to have credits waived | Factsheet, footnote * |
| Intake | Fall 2026–2027 | AUB review round — was "Fall 2026" |
| Advisor | Mike (Mike Wakim), Online Program Recruiter | Factsheet contact block |

### Credit maths

The factsheet's curriculum table lists **11 courses plus a capstone project** and
carries **no credit column and no tuition figure**. The pages present the degree as
**30 credits / 9 core courses + project**, treating `EDUC 300` (education) and
`CMPS 302` (computer science) as the two exemptible prerequisites named in the
factsheet's waiver footnote. 12 items × 3 credits = 36; less the two waivable
prerequisites = 30.

**This reconciliation is unconfirmed and it drives the headline price.** If a given
applicant does not have both prerequisites waived, the degree is 36 credits and
$16,200, not 30 credits and $13,500 — and the factsheet says the program is open to
graduates of *any* field, so the un-waived case is not the exception. Confirm the
default credit load with AUB before launch. See "Open client-fill items".

## Brand colours

Comms supplied the approved AUB values in the September review. Everything in the old
burgundy family was mapped onto the two named shades:

| Role | Now | Was |
|---|---|---|
| Main Berytus red — fills, buttons, headings, links, `theme-color` | **`#840132`** | `#8B1333` |
| Darker shade — button hover, deep section fills, the cold hero scrim | **`#6A132C`** | `#6B0F27`, `#5E0C22`, `#3A0A16` |

Three notes on the mapping:

- **The in-market nav button used to go *lighter* on hover** (`#A81A42`), which was the
  only place in the build that did. It now darkens to `#6A132C` like every other button,
  so the whole page set uses the two approved values and nothing else.
- **The cold hero scrim changed base and needed re-tuning.** `#6A132C` is a good deal
  lighter than the near-black burgundy it replaced, so at the old alphas the sub-heading
  fell from 7.2:1 to 5.9:1 — still AA, but below the AAA line the previous review round
  earned. The alphas went up to compensate; see "Hero text contrast".
- **The pink tints are untouched** (`#F0BECC`, `#E8A0B4`, `#EAD3DA`, `#D9BCC5`, `#F6E9EC`,
  `#FBF4F6`). They are accent and wash colours on icons, rules and tinted panels, and
  Comms named only the two reds. If those tints should be re-derived from `#840132`, that
  is a separate pass — say the word.

## Head, indexing and tracking

Applied to all three pages, matching the Online Education builds.

| Tag | State |
|---|---|
| `robots` | **All three pages: `noindex, follow`.** Client decision — these are paid-traffic landing pages and are deliberately kept out of the index. `follow` keeps link equity flowing to aub.edu.lb. This is load-bearing: it is the reason the two landing pages may share an FAQ set. If indexing is ever switched back on, the FAQ sets must be split again first. |
| `canonical` | **Commented out.** The live URL is unknown at handoff, and a canonical pointing at a placeholder can misdirect indexing, whereas an absent one is safe — engines self-canonicalise. Uncomment and fill before launch. |
| Favicon | Root-relative paths (`/favicon.ico`, `/favicon-32x32.png`, `/favicon-16x16.png`, `/apple-touch-icon.png`, `/site.webmanifest`) plus `<meta name="theme-color" content="#840132">`. Files ship in `assets/favicon/` and must be deployed to the **domain root** — they will not appear in a raw-repo preview from a subfolder, which is expected. |
| Open Graph | `og:type`, `og:site_name`, `og:locale`, `og:title`, `og:description` live on both landing pages. `og:url`, `og:image` and its width/height/alt are **commented out** pending the live URL — a broken `og:image` renders a share as a blank card. The image file itself is supplied. The thank-you page carries no OG tags, matching the diploma build. |
| Twitter card | `summary_large_image`, title and description live; `twitter:image` commented out alongside `og:image`. |
| GTM | **Live.** Stape server-side container `GTM-KZDZDJJ`, loaded first-party from `trk.aub.edu.lb`. Pasted verbatim as supplied by AUB ops — the obfuscated query parameter *is* the container reference and must not be reformatted or re-encoded. |

`og:title` differs between the two landing pages on purpose ("Teach technology.
Design learning." vs "…Apply now.") so the two share cards are distinguishable.

## FAQs

Both landing pages carry the **same seven FAQs**, mirrored in `FAQPage` JSON-LD that
matches the visible copy byte-for-byte.

This is deliberate and it depends on the indexing decision. Duplicate `FAQPage` schema
across two pages splits search signals only when both pages are crawlable — with both
set to `noindex`, there is no signal to split. The client confirmed these pages are
paid-traffic only and are not to be crawled, so the in-market page was aligned to the
cold set rather than kept distinct.

**The two settings are coupled. If `robots` is ever flipped back to `index`, split the
FAQ sets in the same change.** An earlier revision of this build carried seven distinct
in-market questions and can be recovered from git history if that day comes:

```
git log --oneline -- AUB/FAS/online-ma-computing-in-education/In-Market_Hero_Form_dc.html
```

The section headings still differ by page type — "Everything you need to know before you
decide." on cold, "Your questions, answered." on in-market — because those are section
labels, not FAQ content.

## Cold hero

The hero no longer carries a lead form. It is a full-bleed photo with the headline,
description, a single **Speak to an Advisor** CTA and the three-stat strip, and the
eyebrow pill ("Now Enrolling · Fall 2026–2027") is gone.

Consequences worth knowing:

- **The headline accent is solid white italic, not pink.** Comms found the pink
  ("Design learning." in `#F0BECC`) odd on the hero visual. The italic alone now carries
  the distinction, which is the more confident editorial treatment and removes a second
  colour from the most important line on the page. The `<em>` carries a `hl-accent` class
  so alternatives are a one-line change; two others were rendered for Comms (white with a
  pink underline rule, and a warm off-white).
- **The page now has one form, not two.** The advisor section's form is the only one, and
  `#vala-funnel` was moved onto it — the hero form held the page's only DC mount. The
  earlier open question about whether the embed supports two instances is moot.
- **The CTA and stat band match the diploma.** The primary button is a pill
  (`border-radius:999px`, `15px 30px`), and the three proof numbers moved out of the
  680px copy column into a full-width band pinned to the bottom of the hero: a single
  top rule, no vertical dividers between cells, and a "Scroll to explore" cue on the
  right that anchors to `#how-it-works` like the secondary CTA. The hero container
  stopped centring everything — the copy block takes the free space and centres inside
  it, the band sits under it. One deliberate difference: the diploma's button hover goes
  *lighter* (`#A10841`), which is outside the two shades Comms approved, so ours darkens
  to `#6A132C` like every other button in the set.
- **The hero carries two CTAs.** `Speak to an Advisor` (primary, burgundy) scrolls to
  `#form`. **`See how it works`** (secondary, white text with an arrow) is a plain
  in-page anchor to `#how-it-works`, the premise section directly below the hero
  ("You don't need a computer science background."). It is deliberately not a DC
  handler: `html{scroll-behavior:smooth}` already animates an anchor jump, so the link
  needs no JS and still works if the DC runtime never processes the page.
- **Why that anchor.** The client named "The Opportunity — Education and Computer Science
  belong in one degree." as the target, but that section only exists on the **in-market**
  page. They confirmed the cold page's positional equivalent instead: the premise section
  is the first explanatory block below the hero, carries the classroom/MCE photo, and
  makes the same education-plus-computer-science argument.
- **The nav button and sticky bar still resolve to `#form`.**
- **The nav and sticky CTAs read "Chat with an Advisor".** AUB asked for "with" in place
  of "to" on the nav button; the sticky bar was changed to match, since leaving the two
  phrasings side by side on one page would read as an oversight. The hero primary stays
  "Speak to an Advisor", so no single phrase appears three times in a viewport.
- **The scrim is tuned, not eyeballed.** Its gradient stops are anchored in pixels
  rather than percentages, because the copy column is a fixed 680px while a percentage
  gradient tracks the viewport — that mismatch put the copy over the light end of the
  wash at tablet widths. Current measurements are under "Hero text contrast" below.

## In-market Opportunity section

The copy column is placed in the **same grid row** as the photo, so their tops align. It
is not nudged down with a margin: the heading runs to two lines at some widths and three
at others, and any fixed offset would drift as it re-wraps. Placement rules apply only
from 900px; below that the grid collapses to a single column and the rules drop out,
giving heading → photo → copy → facts in DOM order with no leftover offset.

Verified: photo top and copy top differ by **0px** at 900, 1024, 1280 and 1440, and the
section stacks cleanly at 390 and 768.

## Hero text contrast

AUB reported the white hero copy as "faded" and "not easily legible" on both landing
pages, naming the sub-headings and the small labels under the cold hero's numbers. Two
changes fixed it, and a later one improved it again.

1. **The copy is solid white, not translucent.** Every flagged element was drawing at
   partial opacity — the cold sub-heading at 88%, its stat labels at 66%, the in-market
   sub-heading at 76% and its benefit bullets at 90%. All are now `#fff`, with a soft
   `text-shadow` so the type lifts off the busier parts of the photo. The stat labels keep
   their place in the hierarchy through size, uppercase and letter-spacing rather than
   through being dimmed, which is what made them look washed out.
2. **The scrim is a flat black wash**, `rgba(0,0,0,.64)` plus a vertical depth gradient,
   matching the Online Education diploma hero. Comms asked for black rather than a
   burgundy tint.

The flat wash is not only on-brand, it measures better than the burgundy gradient it
replaced — 8.82:1 at the weakest point against 7.37:1 before — and it removed a whole
class of fragility. The burgundy version was a directional gradient whose stops had to be
anchored in pixels, because the copy column is a fixed width while a percentage gradient
tracks the viewport; get that wrong and the copy drifts onto the light end of the wash at
some widths, which is exactly what happened at tablet sizes during an earlier round. A
flat wash is uniform, so there is nothing to drift onto.

Measured against the lightest pixel directly beneath each element:

| Element | Before the fixes | Burgundy scrim | Flat black `.64` |
|---|--:|--:|--:|
| Cold sub-heading, 1440 | 5.49:1 | 7.37:1 | **9.94:1** |
| Cold sub-heading, 390 | 9.27:1 | 10.75:1 | **8.82:1** |
| Cold stat labels, 1440 | 6.25:1 | 11.97:1 | **17.75:1** |
| Cold stat labels, 390 | 6.76:1 | 12.50:1 | **17.48:1** |
| In-market sub-heading, 1440 | 10.74:1 | — | **18.16:1** |
| In-market bullets, 1440 | 14.77:1 | — | **18.15:1** |

Everything clears **AAA (7:1)**; the AA floor is 4.5:1. Figures ignore the `text-shadow`,
so perceived legibility is a little better than the numbers suggest. The in-market hero is
unaffected by the scrim change — it has its own dark ground, not a photo wash.

The H1 is not in the table. Its plain lines sit on the same scrim as the sub-heading and
are large-scale text (60px bold, a 3:1 floor rather than 4.5:1), and its highlighted line
has an opaque `#840132` box behind it, where white measures 10.34:1.

Also lifted while in there, same faded-white problem in the same viewport: the in-market
dark nav's "Faculty of Arts and Sciences" (75% → 94%) and its intake label (60% → 92%),
the line under the in-market form (55% → 90%), and the hero divider rules on both pages.
The journey accordions further down the in-market page keep their original dividers — they
sit on solid dark, not on a photo.

## Hero typography

### Line pitch — measured, and no change was needed

The brief assumed the cold H1 uses the word-stagger reveal (`.hw` spans set to
`display:inline-block`), which inflates each line box to about 1.15x the font size and
would leave the two heroes at different pitches despite the same declared `line-height`.

**Neither H1 in this build uses that pattern.** Both are plain text — the cold one wraps
naturally, the in-market one uses an explicit `<br />` — and both declare `line-height:1.05`.
Measured baseline-to-baseline:

| Page | font-size | declared | measured pitch | ratio |
|---|--:|--:|--:|--:|
| Cold | 60px | 1.05 | 63px | **1.050** |
| In-market | 46px | 1.05 | 49px | **1.065** (48.3px, rounded up by the renderer) |

They already match. Copying a 1.15 figure across would have *inflated* the in-market
pitch by ~11% and broken the match, so the declared values were left alone.

The 1.15-ish number does show up in the measurements, as the `getClientRects()` height
(70px cold / 54px in-market). That is the font's own em box — Libre Franklin's ascent plus
descent — not the line pitch. Worth knowing, because it is the number that looks like it
confirms the inflation theory when it does not.

### Font-size clamps — both reduced

| Page | Was | Now | Why |
|---|---|---|---|
| In-market | `clamp(30px,4.4vw,52px)` | `clamp(30px,3.9vw,46px)` | The headline column is 517px at 1440px, and the longest line measured 505px — **97.8% full**. It fitted, but on a 12px cushion. Now 86%. |
| Cold | `clamp(34px,5.2vw,60px)` | `clamp(28px,5.2vw,60px)` | At 320px the H1 set as **four lines**, not two: 284px of column against a 323px longest line. Now 92% and two lines. |

**Caveat on every width measurement here:** the sandbox cannot reach
`fonts.googleapis.com`, so Libre Franklin never loads and the numbers were taken against
the fallback (`system-ui`). `document.fonts.size` is 0 while `document.fonts.check()` still
returns true, which is misleading. The clamps were set to leave real headroom rather than
to sit on a thin margin precisely because the measuring font is not the shipping font.
Worth a glance on a machine that can load the real face.

Verified 320, 360, 390, 414, 480, 600, 768, 820, 900, 1024, 1180, 1280, 1440, 1600 and
1920: **two lines on both pages at every width, the highlighted phrase never broken, and
`scrollWidth <= clientWidth` throughout.**

## Hero certification messaging

Comms flagged that the MCE messaging was taking too much hero real estate. Target was one
mention above the fold plus the trust-strip badge; both pages now hit it exactly.

| Slot | Cold | In-market |
|---|---|---|
| Sub-heading | Two sentences merged into one, certification demoted to a trailing clause — **the one mention** | Certification dropped; leads on the AUB master's and spends the space on 30 credits, 9 courses, capstone, delivery mode |
| Hero bullets | n/a | Reordered: NYSED credential first, certification last and cut to "MCE certificate included" — **the one mention** |
| Stat strip | Third stat was "MCE / Microsoft certification, free"; now **"18–24 / Months to graduate"** | n/a |
| Form card sub-line | n/a | Was "Your AUB master's and the MCE certificate, for $13,500 in total"; now "18–24 months, 100% online, $13,500 in total" |
| Trust strip | Badge kept | Badge kept |

Counted from the rendered hero text: **one distinct certification mention per page**, down
from two on cold and three on in-market.

`description`, `og:description` and `twitter:description` follow the new sub-headings. All
three tags carried identical strings per page, so they moved together — changing og and
twitter alone would have left the meta description telling a different story.

Everything below the fold is untouched: the comparison table, the programme sections and
the FAQ all still carry the certification in full. The problem was hero space, not the claim.

## Logos

The nav crest used to be a hand-drawn inline `<svg>` — a shield path with the motto set
as live `<text>`. It is now the official lockup, from the artwork Comms supplied.

| File | Used on | Size |
|---|---|---|
| `logo-fas-380.png` / `.webp` | Nav, **cold** and **thank-you** (light navs) | 6.1KB / 5.1KB |
| `logo-fas-white-380.png` / `.webp` | Nav, **in-market** (nav sits on `rgba(23,21,20,.92)`) | 16.7KB / 9.7KB |
| `logo-aub-concise-white-300.png` / `.webp` | Footer, all three pages | 35.3KB / 20.5KB |

All six are byte-identical to the Online Education diploma build, so the two page sets
carry exactly the same marks.

**The reversed versions are derived, and the precondition was checked first.** Filling a
mark's alpha channel with white only works if its knockouts are transparent rather than
opaque white — otherwise the fill floods them and the seal detail is lost. Counting opaque
white pixels in both supplied files returned **0**, so the derivation is sound.

**The reversed art is deliberately not palettised.** Quantising to 32 colours halves the
file size, but on white-on-transparent artwork it collapses the alpha ramp from 256 levels
to 8, which bands the antialiased edges of the seal's ring text and the cedar. The standard
burgundy lockup *is* palettised (28 alpha levels, no visible cost). Measured both ways
before choosing.

## Footer

Identical markup on all three pages, byte for byte.

- **The AUB concise mark** sits first in the footer, centred, directly above the copyright
  line. `alt=""` on purpose: the line underneath already reads "American University of
  Beirut", so announcing it again would just repeat the institution to a screen reader.
  Intrinsic `width`/`height` are the asset's real pixels (300x283), not the display size,
  so the browser reserves the right space before the image loads and the footer does not
  jump. Display height comes from CSS. `loading="lazy"` and `decoding="async"` — it is
  below the fold on every page.
- **Ground is `#6A132C`**, the approved darker AUB shade. The reversed mark needs it.
- **Legal links were missing entirely** and have been added: Privacy Policy, Terms of Use,
  Non-Discrimination, all `[BRACKETED]` pending AUB's own URLs. These pages collect name,
  email and phone, and Google Ads requires lead-gen destinations to carry a reachable
  privacy disclosure — a missing one is a common disapproval cause. Link AUB's existing
  policies; do not author new ones.

### The sticky bar was covering the privacy link

A fixed `padding-bottom:104px` is not enough on these pages. The cold page's CTA bar wraps
as the viewport narrows — **105px tall at 390px, 123px at 360px, 141px at 320px** — so at
320px it overlapped the privacy link by **12px**, while 390px cleared it by only 3px.

Footer padding therefore moved out of the inline style into `.pg-footer`, with a bump below
420px. It lives in CSS rather than inline so no `!important` is needed to beat an inline
style. Clearance is now 34px at 320px, 51px at 360px and 49px at 390px, worst case across
all three pages.

## Hero headline treatment

Both H1s now use the diploma's construction and treatment: **"Earn your AUB / [master's
degree] / in Computing / in Education"**, with a burgundy `.hl` highlight on the credential
and, on the cold page, the `.hw` word-stagger reveal (CSS only, fully disabled under
`prefers-reduced-motion`). `og:title` and `twitter:title` follow the headline on both pages.

**Why four rows and not the diploma's three.** The diploma's longest line is "in online
education" at 19 characters. The MA's equivalent, "in Computing in Education", is 25, and
holding it on one line forced the H1 clamp down to `clamp(20px,3.5vw,40px)` — a third off
the hero size. Splitting it across two rows keeps every line at 15 characters or fewer and
the full 60px. Putting the whole programme name inside the highlight and letting it wrap
does not work here: `.hw` makes each span `display:inline-block`, and an inline-block will
not wrap, so a long phrase overflows instead (silently, because the hero clips).

The in-market H1 carries **explicit `<br />` breaks** for the same reason the cold page has
them. Left to wrap on its own it swung between 2, 3 and 4 rows across the width range, and
at 480px the highlight itself split across two rows. Both pages now set as four rows at
every width from 320 to 1920.

**This is what makes the earlier line-pitch brief apply.** `.hw` sets each word
`display:inline-block`, which inflates every line box to about 1.15x the font size. Before
this change both H1s were plain text and both rendered at their declared 1.05, so there was
nothing to reconcile. Now the cold page renders at 1.15 despite still declaring 1.05, so the
in-market H1 — plain text plus `<br />` — had its declared `line-height` raised from 1.05
to **1.15** to sit at the same pitch. Measured after the change:

| Page | font-size | declared | rendered pitch | ratio |
|---|--:|--:|--:|--:|
| Cold | 60px | 1.05 | 69px | **1.150** |
| In-market | 46px | 1.15 | 53px | **1.152** |

Copying the declared value across would not have matched, exactly as the brief warned.

## Typography

**Roboto, from Google Fonts, one family across all three pages.** AUB asked for it; it is
free, so nothing needs licensing or supplying. Loaded with a single `<link>` — never
`@import`, which blocks rendering and cannot be preconnected — behind the two preconnects
that were already in place:

```
https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700;800&display=swap
```

The stack is `Roboto, system-ui, sans-serif` everywhere. `system-ui` sits ahead of the
generic deliberately: if the webfont fails, the page lands on the OS interface face rather
than something serif-ish.

**Six weights loaded, all six used, and each verified to paint a real face.** A weight the
family does not ship degrades silently into faux bold — the browser smears the outline,
which shows badly at display sizes. Asked of the renderer directly rather than trusting
the CSS:

| Weight | Face painted | Used for |
|---|---|---|
| 300 | Roboto Light | Hero sub-paragraphs and intro copy only, never small body text |
| 400 | Roboto | Body default, mostly inherited |
| 500 | Roboto Medium | Form labels |
| 600 | Roboto SemiBold | Uppercase eyebrows, labels, small meta |
| 700 | Roboto | Headings, buttons, stat numbers, table headers |
| 800 | Roboto ExtraBold | The largest display figures |

### Verifying that the font actually painted

`document.fonts.check()` is not evidence — it returns true for a family that never loaded,
which is how earlier rounds of this build were measured against the fallback face without
anyone noticing. Two things were needed here.

First, the renderer has to be able to load the font at all. It can reach
`fonts.googleapis.com` from this sandbox, but only serves TTF to an old user-agent (modern
ones get woff2, which fontconfig cannot use), so the faces were fetched with
`-A "Mozilla/4.0"`, dropped in `~/.local/share/fonts` and registered with `fc-cache -f`.

Second, ask Chromium what it painted, via CDP `CSS.getPlatformFontsForNode`. That is what
produced the table above, and it reports the resolved face per weight — "Roboto Light",
"Roboto SemiBold" — so faux rendering would be visible as the wrong face rather than
silently passing.

### What the swap moved

Roboto is narrower than Libre Franklin at the same size, so every page got shorter at
1440px: cold 8557 → **8327**, in-market 5479 → **5219**, thank-you 2289 → **2184**.

That same mechanism moves line breaks, so both H1s were re-swept across 320, 360, 390,
414, 480, 600, 768, 820, 900, 1024, 1180, 1280, 1440, 1600 and 1920. Both still set as
four rows at every width with the highlight on a single row and no horizontal overflow.

It also improved the footer clearance measured in the previous round: the cold page's
sticky CTA bar wraps less in a narrower face, dropping from 105px tall at 390px to 83px
and from 141px at 320px to 105px. The gap above the legal links went from 34–51px to
70–88px.

## Assets

Photos are embedded as data URIs for review builds; the decoded originals live in
`assets/` and the `src` values swap to hosted URLs at launch.

Two photos ship as **real files with a responsive `srcset`** rather than data URIs. Their
sources were 2.8MB and 3.4MB PNGs; inlining those would have been the opposite of the
mobile-speed brief, since base64 inflates by a third, cannot be cached separately and
offers no per-width variants. Paths are relative to the HTML file, so they resolve both
in a githack preview and in any deployment that carries `assets/` alongside the page.
Browsers negotiate AVIF first, then WebP, then JPEG.

| File | Size | Used for |
|---|---|---|
| `assets/hero-cold-elearning-{800,1600}.{avif,webp,jpg}` | 15–121KB each | Cold page full-bleed hero. Mobile AVIF is **15KB**, down from a 2.8MB source |
| `assets/opportunity-coding-{600,1200}.{avif,webp,jpg}` | 20–148KB each | In-market Opportunity section. Mobile AVIF is **20KB**, down from a 3.4MB source |
| `assets/mce-classroom-robotics-1100x1100.jpg` | 155KB | Cold page premise section — educator and students with robotics kits, MCE badge composited top-right |
| `assets/advisor-mike-220x211.jpg` | 6KB | Cold page advisor portrait |
| `assets/factsheet-cover-300x400.jpg` | 33KB | Thank-you page factsheet thumbnail |
| `assets/og-image-1200x630.jpg` | 97KB | Social share card for both landing pages. Cropped from the classroom photo, framed to keep the MCE badge whole and the students' faces in view |
| `assets/favicon/` | 8 files | Root-deploy favicon set, copied from the Online Education build (same institution) |
| `assets/MA_in_Computing_in_Education_Factsheet_2025.pdf` | 2.8MB | Source factsheet, 2 pages |

### Image slots awaiting real photos

`image-slot` elements are genuine placeholders — they render only inside the DC
preview and are invisible in a raw browser. That is expected, not a bug.

| Slot id | Page | Needs |
|---|---|---|
| `hf-hero-bg` | In-market | Hero background photo. The **cold** hero is a real photo now, so this is the last hero placeholder left |
| `cold-fac-1` / `hf-fac-1` | Both | Dr. Hoda Baytiyeh portrait |
| `cold-fac-2` / `hf-fac-2` | Both | Dr. Mahmud Shihab portrait |
| `cold-fac-3` / `hf-fac-3` | Both | Rayan Fayed portrait |
| `cold-fac-4` / `hf-fac-4` | Both | Rana Ghazzi portrait |

## Preview URLs

The repo is public, so `githack` serves these files as real HTML with no token.

**Live on the branch** — re-serves after every push, short cache. Use while reviewing.

| Page | URL |
|---|---|
| Cold audience | `https://raw.githack.com/Think-Orion/landing-pages/claude/aub-fas-ma-computing-education-6bcyjd/AUB/FAS/online-ma-computing-in-education/Cold_Audience_dc.html` |
| In-market | `https://raw.githack.com/Think-Orion/landing-pages/claude/aub-fas-ma-computing-education-6bcyjd/AUB/FAS/online-ma-computing-in-education/In-Market_Hero_Form_dc.html` |
| Thank you | `https://raw.githack.com/Think-Orion/landing-pages/claude/aub-fas-ma-computing-education-6bcyjd/AUB/FAS/online-ma-computing-in-education/Thank_You_dc.html` |

**Pinned to a commit** — immutable and permanently cached, so the page cannot shift
under a reviewer mid-comment. Use when sending to the client. Swap the host and the
branch segment for `rawcdn.githack.com` and the full commit SHA:

```
https://rawcdn.githack.com/Think-Orion/landing-pages/<full-commit-sha>/AUB/FAS/online-ma-computing-in-education/<page>.html
```

Get the SHA with `git rev-parse HEAD`. Deliberately not hardcoded here — a pinned URL
in a file that keeps changing goes stale the moment the next commit lands, and a stale
pinned link is worse than none because it looks current.

### What a githack preview will not show

None of these are bugs — they are all artefacts of serving a DC template file
straight from a repo subfolder rather than from a real deployment.

- **`GTM FIRES ON PREVIEW.`** Verified: all three pages request `trk.aub.edu.lb`
  and push to `dataLayer` on a raw load, because the container `<script>` sits
  inside `<helmet>` and scripts execute wherever they appear in the DOM. Every
  preview view lands in AUB's live Stape container, and thank-you page views may
  register as conversions. Filter internal traffic or review in a context you are
  happy to see in the data.
- **Faculty portraits and the in-market hero background are blank.** They are
  `image-slot` placeholders and `image-slot.js` is not in the repo, so they render
  only inside the DC preview. The cold hero and the in-market Opportunity photos are
  real `<picture>` elements on relative paths, so those **do** render in a preview.
- **Favicons are absent.** The paths are root-relative by design, so `/favicon.ico`
  resolves to githack's root, not the repo subfolder. Verify on a real deployment.
- **`support.js` 404s.** That is the DC preview harness. The standalone script at
  the bottom of each file drives the sticky CTA, both accordion sets, CTA scroll
  and the testimonial slider, so every behaviour is still testable.
- **Social share cards will not render** from a githack URL — `og:image` and
  `og:url` are deliberately commented out pending the live domain.

## Open client-fill items

**Resolved:** the FAS lockup and the AUB concise mark are supplied, compressed, committed
and wired in. See "Logos" and "Footer".

**Now open:** the three footer legal URLs (`[AUB PRIVACY POLICY URL]`,
`[AUB TERMS OF USE URL]`, `[AUB NON-DISCRIMINATION / ACCESSIBILITY URL]`) need AUB's own
existing policy pages before launch.

Each page carries its own `CLIENT-FILL` comment block at the top. Consolidated:

1. **Credit load and total price** — the 30-credit / $13,500 headline assumes both
   prerequisites are waived. Confirm the default. This is the highest-impact open
   item on the build. See "Credit maths".
2. **Corporate group discount** — the cost FAQ on both pages states "corporate
   groups of five or more receive 15 to 20% off". This figure appears in no
   approved source and no client-reviewed material. Confirm or strike it.
3. **Weekly time commitment** — "10 to 15 hours per week" has no approved source;
   the diploma builds never quantified it.
4. **"Only online master's in the region"** — the cold hero's exclusivity claim.
   The factsheet supports "exclusive degree" and "interdisciplinary", not
   regional uniqueness. Confirm it is defensible or soften it.
5. **Live sessions vs asynchronous** — the factsheet's PROGRAM FORMAT strip reads
   "100% online courses | LIVE INTERACTIVE SESSIONS | ASYNCHRONOUS". The pages
   commit to fully asynchronous with no fixed class times, following the factsheet
   prose (which says asynchronous three times) and the approved diploma builds.
   Confirm there are no live obligations.
6. **Prerequisite mapping** — `EDUC 300` and `CMPS 302` named as the two
   exemptible prerequisites. The factsheet's waiver footnote names no courses.
7. **Testimonials** — the cold page's two graduate cards are `[BRACKETED]`
   placeholders with suggested angles. Never publish the placeholders.
8. **Faculty bios** — four named faculty, all bios `[BRACKETED]`. Instructor
   attribution in the cold curriculum cards covers `EDUC 371`–`374` only;
   instructors for the remaining courses and the capstone are outstanding.
9. **Intake** — now "Fall 2026–2027", set in an AUB review round. Rendered with an en
    dash to match the other ranges on the page ("1.5–2 years"); the request was written
    with a hyphen. Say the word if a literal hyphen is wanted.
10. **Factsheet download** — the thank-you page's download button is `href="#"`
    pending a hosted URL for the PDF in `assets/`.
11. **Booking link** — the thank-you page points at the Online Education
    Bookings calendar. Confirm the correct calendar for this program and that the
    meeting length matches the "20-minute" wording.
12. **Vala form embed** — the DC runtime mounts `#vala-funnel`. Resolved: the cold
    page has a single form (advisor section) since the hero form was removed, so
    there is one mount and the two-instance question no longer applies.
13. **MoE caveat** — wording mirrors the client-reviewed email sequence. Confirm
    it should appear on paid landing pages.

## QA status

Chromium (Playwright), file:// loads, standalone behaviour script active. Re-run after
the hero, Opportunity-image and FAQ changes.

| Check | Result |
|---|---|
| Render 1440×900 | Pass — `scrollWidth == clientWidth` on all three pages |
| Render 390×844 | Pass — `scrollWidth == clientWidth` on all three pages |
| Every `<img>` decodes | Pass — checked after a full scroll pass so `loading="lazy"` images actually fetch |
| Responsive image negotiation | Pass — Chromium picks `hero-cold-elearning-800.avif` at 390px and `-1600.avif` at 1440px; `opportunity-coding-600.avif` at a 560px column |
| No missing assets | Pass — no failed requests apart from the expected `support.js` / `image-slot.js` |
| Hero text contrast | Pass — **every hero text element on both pages clears WCAG AAA (7:1)**, measured against the lightest pixel directly beneath it at 1440 and 390. Weakest is the cold sub-heading at 7.37:1, re-tuned after the brand-colour swap lightened the scrim base |
| Typography | Pass — zero `Libre Franklin` references survive; 62 `font-family` declarations and 3 stylesheet hrefs swapped. CDP `CSS.getPlatformFontsForNode` confirms Roboto painting on h1/h2/body/button/eyebrow across all three pages, and each of the six declared weights resolving to its own real face |
| Headline reflow after the swap | Pass — both H1s still four rows at all 15 widths from 320 to 1920, highlight unbroken, no overflow |
| Hero H1 line pitch | Pass — cold 1.150, in-market 1.152 measured between visual lines, after the `.hw` stagger made the reconciliation necessary |
| Nav + footer logos | Pass — official lockup on all three navs (reversed on the dark in-market nav), concise mark decodes at 300x283 and renders 84px tall with `alt=""` in all three footers |
| Footer legal links | Pass — present on all three pages; sticky bar clears them by 34px at 320px, 51px at 360px, 49px at 390px (was **-12px at 320px**) |
| Footer parity | Pass — footer markup byte-identical across all three pages |
| Hero H1 wrap | Pass — two lines on both pages at 320, 360, 390, 414, 480, 600, 768, 820, 900, 1024, 1180, 1280, 1440, 1600 and 1920, highlighted phrase unbroken, no horizontal overflow |
| Hero certification count | Pass — one distinct mention above the fold per page, plus the trust-strip badge |
| Brand colours | Pass — no `#8B1333`, `#6B0F27`, `#5E0C22`, `#A81A42` or `#3A0A16` left in any page; nav CTAs compute to `rgb(132, 1, 50)` on both landing pages |
| Headline accent | Pass — the hero `<em>` computes to `rgb(255, 255, 255)` on both landing pages; no pink left on either headline |
| Cost FAQ | Pass — ends at "the Comptroller's office", no Dean's Scholarship sentence, on both pages and in both JSON-LD copies |
| Hero secondary CTA | Pass — renders white, label correct, click lands on `#how-it-works` with the heading clear of the top, arrow nudges on hover, and the primary CTA still reaches `#form`. Checked at 1440 and 390 |
| Opportunity alignment | Pass — photo top and copy top differ by 0px at 900, 1024, 1280 and 1440; stacks in DOM order at 390 and 768 |
| Console / page errors | None |
| HTML tag balance | Balanced on all three pages |
| FAQ JSON-LD ↔ visible copy | 7/7 questions and 7/7 answers match byte-for-byte on both landing pages |
| Cold ↔ in-market FAQ sets | Identical by design, both pages `noindex` |
| FAQ accordions | Expand and collapse, icon rotates, on both pages |
| Curriculum accordions | 10 per page, expand on click |
| Sticky CTA | Hidden over the hero, visible mid-page, hides again at the form — both pages |
| Nav CTA | Brings the form into view on both pages (in-market scrolls up, since its form is in the hero — correct) |
| Testimonial slider | Fits at 1440 with arrows hidden; overflows and scrolls at 390 |
| Thank-you page | Two booking links resolve; one `href="#"` placeholder remains, the factsheet download |

The comparison table is wider than a 390px viewport and scrolls inside its own
`overflow-x` container. That is intended — the page itself does not scroll sideways.

Page heights: cold 8290px desktop / 12585px mobile; in-market 5253 / 7934;
thank you 2085 / 2388.

Known and pre-existing, not introduced here: the top nav is `position:sticky;top:0` but
never pins, because a template wrapper (`<div style="width:100%;background:#fff;
overflow-x:hidden">`) makes itself a scroll container and silently disables sticky on its
descendants. The client-approved diploma build behaves identically. Left alone — the
overflow guard is presumably there to prevent sideways scroll, and the `scroll-margin-top:
80px` on anchor targets gives clean clearance either way.
