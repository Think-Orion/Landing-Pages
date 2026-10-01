# Porting the October AUB Comms round to the Online Education diploma pages

Everything below was applied to **MA in Computing in Education** between commits `8d65ba9`
and `d689446` on branch `claude/aub-fas-ma-computing-education-6bcyjd`. This brief carries
it across to the **Graduate Diploma in Online Education** build.

## Before you start

**It is the same repository, not a different one.** Both page sets live in
`Think-Orion/landing-pages`:

| Build | Path | Branch |
|---|---|---|
| MA in Computing in Education (source of these changes) | `AUB/FAS/online-ma-computing-in-education/` | `claude/aub-fas-ma-computing-education-6bcyjd` |
| Graduate Diploma in Online Education (target) | `AUB/FAS/online-graduate-diploma-online-education/` | `claude/aub-fas-online-education-lp-gsj7lm` |

So you can diff the two directly rather than working from description:

```
git fetch origin
git diff origin/claude/aub-fas-online-education-lp-gsj7lm \
         origin/claude/aub-fas-ma-computing-education-6bcyjd \
  -- AUB/FAS/
```

**Do not copy the MA files over the diploma files.** The copy differs throughout — 12
credits over 4 courses against 30 over 9, nine months against 1.5–2 years, different FAQs,
different faculty. Apply the changes, don't transplant the pages.

**State of the target, verified:** the diploma pages are at the pre-October baseline. They
still carry the full warm/beige ramp, all six pink tints, white veils on burgundy, three
different nav treatments and rounded buttons. Every section below applies except where
marked.

**All the logo assets you need are already in the diploma `assets/` folder** —
`logo-fas-white-380.{png,webp}` and `logo-aub-concise-white-300.{png,webp}`. Nothing new
to produce.

---

## 1. Neutral palette — beige out, true grey in

AUB Comms sampled their own Online subpages at **`#F4F4F4`**, a true neutral (R=G=B),
against our `#F8F5F1` beige. The trap: the beige was not only the background. The whole
neutral ramp was warm, so changing only the ground leaves beige borders and beige-grey body
text on neutral grey, which reads muddier than either choice alone. Change the ramp
together.

Every value is **luminance-matched** to what it replaces, so existing contrast ratios
survive unchanged. Do these as one regex pass, not sequentially, or mappings cascade.

| Was | Now | Role |
|---|---|---|
| `#F8F5F1` | `#F4F4F4` | page tint — Comms' sampled target, not the luminance match |
| `#E6E1DB` | `#E2E2E2` | borders and rules |
| `#EDE7E0` | `#E8E8E8` | panels and dividers |
| `#7A736F` | `#747474` | muted body text |
| `#45403D` | `#404040` | body text |
| `#171514` | `#151515` | near-black ground |
| `#F0BECC` | `#CBCBCB` | icons and eyebrow text on dark |
| `#D9BCC5` | `#C4C4C4` | timeline dot |
| `#E8A0B4` | `#B4B4B4` | small dot on dark |
| `#F6E9EC` | `#EDEDED` | table header cell fill |
| `#EAD3DA` | `#D9D9D9` | table borders |
| `#FBF4F6` | `#F6F6F6` | tinted box fill |

Also:
- `rgba(240,190,204,α)` → `rgba(255,255,255,α)` — translucent tint circles behind icons
- `rgba(23,21,20,α)` → `rgba(21,21,21,α)` — the warm-dark washes. **Easy to miss**: the hex
  pass does not catch these, and one of them is the in-market nav background.
- Any hero gradient ending in `rgba(106,19,44,α)` → neutral dark. A 72% burgundy over a
  photograph composites to exactly the pink block Comms kept objecting to.
- A burgundy halo such as `rgba(132,1,50,.15)` over white composites to a pink ring — make
  it `rgba(0,0,0,.10)`. The dot itself stays `#840132`.

**Diploma-specific:** that build also has **`#A10841`** on two `style-hover` attributes —
the in-market "Apply Now" and the cold "Speak to an Advisor" both go *lighter* on hover.
Map both to **`#6A132C`** so every button darkens like the rest.

## 2. Header — one burgundy strip on all three pages

Comms asked for one header across every AUB Online page, modelled on the new Executive MBA
site. Sampling their header confirms the strip is `#840131`, which is our approved
`#840132` within rounding — flat, not translucent.

The diploma pages have the same three-way drift the MA pages had:

| Page | Currently | Change to |
|---|---|---|
| Cold | `rgba(255,255,255,.94)` + blur, burgundy lockup | `#840132`, reversed lockup |
| In-market | `rgba(23,21,20,.92)` + blur, reversed lockup | `#840132`, reversed lockup |
| Thank-you | solid `#fff`, burgundy lockup | `#840132`, reversed lockup |

```html
<nav style="position:sticky;top:0;z-index:100;background:#840132;border-bottom:1px solid rgba(255,255,255,.15)">
```

Three consequences:

- **Swap the lockup to `logo-fas-white-380`** on cold and thank-you. The burgundy lockup
  then has no remaining reference — leave the files in `assets/`, they cost nothing and any
  future light-ground section needs them.
- **Invert the nav CTA**: white fill, `#840132` text, hover `#F4F4F4`. A burgundy button on
  a burgundy strip is invisible.
- **Drop `backdrop-filter: blur(10px)`** from the two sticky navs. It does nothing once the
  background is opaque and it forces a compositing layer on every scroll frame.

Keep the `rgba(255,255,255,.15)` hairline. On the thank-you page the hero below is
`#6A132C`, and without the rule two burgundies butt together and read as a rendering fault.

## 3. Footer — AUB's social handles

Ground stays `#6A132C`; Comms said the footer could remain as is. Add below a hairline rule,
same five accounts and order as the strip on `aub.edu.lb`:

- `https://www.facebook.com/aub.edu.lb`
- `https://x.com/AUB_Lebanon`
- `https://lb.linkedin.com/school/american-university-of-beirut/`
- `https://www.instagram.com/aub_lebanon`
- `https://www.youtube.com/aubatlebanon`

Copy the markup from the MA build's footer — the three footers there are byte-identical, so
lift one. Requirements that matter: inline `<svg>` with `fill:currentColor` so there is no
extra request and hover inherits from the parent; an `aria-label` on every link, because a
glyph with no text gives a screen reader nothing to announce; a 40px round tap area.

Worth knowing: AUB's own footer is two-tone — `#840132` behind the link columns, `#6A132C`
behind the social strip. We kept ours single-tone because Comms said the footer could stay
as is. Flag it if they want closer alignment.

## 4. The pink is arithmetic — use black veils on burgundy

This is the one that kept coming back, so understand the cause before changing anything.
Those panels were never assigned a pink. They were **white veils over a burgundy ground**,
and white over `#840132` composites upward into pink:

| Veil | Composites to |
|---|---|
| `rgba(255,255,255,.08)` | `#8E1542` |
| `rgba(255,255,255,.16)` | `#982A53` |
| `rgba(255,255,255,.18)` | `#9A2F57` |
| `rgba(255,255,255,.32)` | `#AB5274` |

Replace with a **black** veil, which moves the same panels *down* into deeper burgundy:
`rgba(0,0,0,.20)` fill with a `rgba(0,0,0,.26)` border renders at about `#690028` against a
`#840132` section. White body text gains contrast, because the panel got darker rather than
lighter.

**Only change veils that sit on a burgundy ground.** The identical veils over `#151515`
composite to grey and were never a problem. Check the enclosing `<section>` background for
each one rather than find-and-replacing the string.

**Two exceptions to leave alone.** A `30px × 1px` hairline rule, and a grid using
`gap:1px` with a white background showing between opaque children. Both render as 1px
dividers, not fields. Darkening them makes them vanish against the burgundy.

## 5. Square CTAs

Every button and button-styled link goes to `border-radius: 3px`. Sampling the EMBA
reference, their CTA is 3px on a 61px-tall button — the pill was ours, never theirs.

Labels picked up `letter-spacing: .5px` and a size bump at the same time (nav 13→13.5px,
in-page 14→15px, hero CTA 15→17px at `.6px`).

Leave `border-radius: 50%` alone — those are avatars and icon chips. Cards and image frames
at 6px and 8px were left rounded on the MA build; match whatever the client decides there.

## 6. Lead forms — stop them reading as dropped-in iframes

Three causes, all worth fixing:

- **Fields were white on a white card**, which left the panel with no internal structure at
  all. That is most of the effect. Give them a well:
  ```css
  background: #F4F4F4; border: 1px solid #DCDCDC; border-radius: 3px; padding: 12px 13px;
  ```
  and on focus clear to white with `border-color:#840132` and
  `box-shadow: 0 0 0 3px rgba(132,1,50,.12)`, so the active field is the brightest thing in
  the card.
- **Give every card a cap and a heading block** — `border-top: 3px solid #840132`, a title,
  a one-line subhead, then a `1px solid #E2E2E2` divider. On the MA build the in-market card
  already had this and the cold card did not; check both on the diploma.
- **Soften the drop shadow** to `0 18px 44px rgba(0,0,0,.28)` so the card sits on the
  section instead of floating over it.

**Contrast trap:** tinting the field background drops the placeholder below AA. `#949494`
measures 2.76:1 on `#F4F4F4`. Use **`#6E6E6E`** — 4.64:1.

**For whoever wires the live form:** this styling is on the static review mockup. The real
Vala embed brings its own styles, so the same field treatment has to be applied inside the
embed or the iframe look returns.

## 7. Hero calibration — cold page only

AUB approved these for the cold page. Measured from their Executive MBA screenshots by
pixel analysis, then solved for the Roboto settings that reproduce the widths and cap
heights. Two captures agreed to within about 4%.

| Element | Was | Set to |
|---|---|---|
| Button corners | 999px pill | 3px |
| Button label | 15px / 0.2px | 17px / 0.6px |
| Button padding | 30 × 15px | 36 × 18px |
| Eyebrow | 11px / 0.218em | 13px / 0.24em |
| Headline | 60px / lh 1.05 | 64px / lh 1.06 |
| Paragraph | 18px / lh 1.68 | 18px / lh 1.70 |
| Strip height | 69px | 86px |

The headline also went **plain white** — the burgundy highlight came off the cold H1
entirely, and the `.hl` and `.hm-hl` CSS was deleted rather than left dead. The eyebrow was
reinstated above it, since with the highlight gone nothing else named the programme above
the fold.

Two values deliberately stop short of the reference. Their headline-to-body ratio is 3.68,
which would put ours at 66px, but their headline is two short lines against our four long
ones. Their strip is 102px at a 1892px capture, proportionally ~97px, but theirs is a
brochure site and ours is sticky on a lead-gen page.

**Caveat to carry forward:** the EMBA site was only available at one viewport width, so
their clamp curve is unknown. If their type is already maxed at 1892px these values are
right; if it is still growing, theirs would be smaller at a 1440 target.

**The diploma headline is shorter** ("graduate diploma in online education", 19 characters
against 25), so re-measure the line count after changing the size rather than assuming it
still breaks the same way.

## 8. Headline highlight band — trim it off the descender

The diploma pages have the identical `.hl` rule, so they have the identical collision.

The cause is not padding. **An inline element's background box is sized by the font's
ascent and descent**, not by line-height or padding. At 46px/1.15 the band stood 59px tall
inside a 53px line box, so its top edge ran into the descender of the line above. No amount
of padding adjustment fixes that.

Trim it with a hard-stop gradient instead:

```css
.hl { background: linear-gradient(to bottom, transparent 0 8%, #840132 8% 92%, transparent 92% 100%);
      color:#fff; padding:.02em .2em .1em;
      -webkit-box-decoration-break:clone; box-decoration-break:clone; }
```

Hard stops at the same position, so there is no gradient fringe. On the MA build that left
4px above the caps, 2px below the descender and a 5px gap to the line above. **Re-measure
on the diploma** — the percentages depend on the font size and the specific glyphs.

## 9. What does NOT apply

**The invisible curriculum-row hover.** On the MA in-market page,
`.jm:hover .jm-title { color:#840132 }` painted the title in its own background colour
because those rows sit inside a `#840132` section, and they went blank on hover.

I checked the diploma build: its `.jm` rows sit on `#F8F5F1` (which becomes `#F4F4F4`
after step 1), and the in-market page has no `.jm` rows at all. **The bug is not present.**
Leave the rule as it is — but if a section is ever moved onto a burgundy ground, the row
hover has to change to a `rgba(255,255,255,.07)` row wash with the title held at `#fff`,
because on a dark ground the title is already white and there is no brighter colour to
move to.

---

## Verification

Run all of these before committing. Each one caught a real problem on the MA build.

1. **Palette sweep.** Walk every element at 1440/1024/768/390/320 and flag any computed
   colour whose RGB channels differ by more than 4, excluding `#840132` and `#6A132C`.
   Those two should be the only non-neutral colours left.
2. **No horizontal overflow** at the same five widths.
3. **Headline line count** at 320→1920. Freeze animations first
   (`*{animation:none!important;transform:none!important;opacity:1!important}`) or you
   measure mid-flight and get false failures.
4. **Band clearance** measured from rendered pixels, not computed styles: hide nothing,
   find the band's top row and the lowest glyph row above it. Beware a loose burgundy
   threshold picking up antialiased text as the band edge — that produced a false
   "touching" result at 320px on the MA build.
5. **Contrast** on anything recoloured, measured by sampling rendered pixels rather than
   trusting computed styles. Comparing two translucent colours without compositing them
   onto what is beneath produces nonsense — it threw twenty false positives on the MA
   hover audit.
6. **FAQ JSON-LD** still parses and every `acceptedAnswer.text` still appears verbatim in
   the visible copy. Edit visible copy and schema together, apostrophes included.
7. **Tag balance** on `div`, `section`, `p`, `span`, `a`, `button`.

## Working method

Use scripted exact-string replacement with count assertions, never hand-editing markup.
Assert the expected number of occurrences before replacing and assert zero survivors after.
A README edit on the MA build silently deleted four sections when a replacement was too
loose; it was caught only by counting headings before and after.
