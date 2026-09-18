# Think Orion — Landing Pages

HTML landing pages built for Think Orion clients.

## Structure

Folders mirror the real hierarchy: **client → faculty → program**, and each program
folder holds all of its pages plus one shared `assets/` folder.

```
AUB/                                          client
  FAS/                                        faculty
    online-graduate-diploma-online-education/ program
      Cold_Audience_dc.html                   cold-audience LP
      In-Market_Hero_Form_dc.html             in-market LP
      Thank_You_dc.html                       post-submission page
      assets/                                 shared across all three pages
      README.md                               per-program notes
    online-ma-computing-in-education/         program
      ... same three pages, assets/, README.md
```

Folder names are lowercase slugs — no spaces. This keeps preview URLs readable
(`.../AUB/FAS/online-graduate-diploma-online-education/Cold_Audience_dc.html`
rather than a wall of `%20`) and avoids quoting problems in scripts. The full
human-readable program name lives at the top of each program README.

Grouping the three pages together also means shared assets — the advisor portrait,
favicon, and `og:image` — exist once per program instead of being duplicated per page.

## Programs

| Client | Faculty | Program | Cold | In-Market | Thank You |
|---|---|---|:--:|:--:|:--:|
| AUB | FAS | Online Graduate Diploma in Online Education | ✅ | ✅ | ✅ |
| AUB | FAS | Online MA in Computing in Education | ✅ | ✅ | ✅ |

## Conventions

- **Filenames** keep the DC template name (`Cold_Audience_dc.html`,
  `In-Market_Hero_Form_dc.html`, `Thank_You_dc.html`) so each file slots into the
  DC pipeline unchanged.
- **One self-contained file per page.** Everything needed to review the page lives
  inside it.
- **Images:** real photos ship as plain `<img>` tags. `image-slot` elements are
  genuine placeholders — they render only inside the DC preview and are invisible
  in a raw browser. Client-supplied photos may be embedded as data URIs for review
  builds; the decoded originals go in `assets/` and the `src` values swap to hosted
  URLs at launch.
- **Unconfirmed values** are `[BRACKETED]` placeholders, each with a matching line
  in the client-fill comment block at the top of the HTML.
- **Indexing:** cold and in-market pages are `index, follow`; thank-you pages are
  `noindex, follow`. Cold and in-market pages must not share an FAQ set — duplicate
  `FAQPage` JSON-LD on one domain splits search signals.
- **Every page carries** a canonical tag, favicon links, the full Open Graph and
  Twitter card set, `loading="lazy"` on below-fold images, and the GTM container.
- Work happens on a branch and lands via pull request into `main`.

## QA before any page is committed

Rendered in Chromium at 1440×900 and 390×844 with `scrollWidth == clientWidth`
asserted at both widths, HTML tag balance checked, JSON-LD parsed with every schema
answer verified verbatim against the visible copy, and the standalone behaviours
(sticky CTA, FAQ accordions, CTA scroll, testimonial slider) exercised.
