# The client preview site

Builds the hub at https://think-orion.github.io/Landing-Pages/ — Think Orion
branded, linking to every AUB programme we have built.

## Rebuilding it

```
python3 AUB/preview-site/build.py
```

That writes a `_site/` folder. Its contents go on the `gh-pages` branch, which
is what GitHub Pages serves. The build is reproducible: it copies the current
pages out of each programme folder, so the preview can never drift from the
real files.

## Adding a programme

Edit `programmes.json`. Each programme needs a name and a status:

```json
{ "name": "Diploma in Islamic Studies", "status": "planned" }
```

When its pages are built, change the status and point it at the folder:

```json
{ "name": "Diploma in Islamic Studies",
  "slug": "online-diploma-islamic-studies",
  "meta": "12 credits · 4 courses · $4,800",
  "status": "live" }
```

The slug is the programme's folder name inside its faculty folder. Programmes
marked `planned` are listed on the hub as not yet built, which keeps AUB's full
roadmap visible without implying more is finished than is.

`"note": "right-to-left"` adds a small qualifier after a name, used for the
Arabic edition of the Trade-Based Financial Crime certificate.

## Files here

- `programmes.json` — the roadmap: faculties, programmes, status
- `index-template.html` — the hub's design; `{{SECTIONS}}` is filled by the build
- `build.py` — copies the live programmes and writes the hub
- `brand/` — the approved Think Orion wordmark
