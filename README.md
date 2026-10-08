# AUB Online landing page previews

The hub at `index.html` is Think Orion branded — it is our deliverable, shown to the
client — and it links through to the AUB pages themselves, which carry AUB branding.
Brand values come from the Think Orion brand system: purple `#A020F0` as the single
accent, black `#1E1E1E` rather than pure black, off-white `#F8F8F8`, teal `#5BC9DE`
reserved for the eyebrow, Roboto throughout. The wordmark in `brand/` is the approved
logo file, not a reproduction.

The published preview site for the AUB Online funnels, served by GitHub Pages
at https://think-orion.github.io/Landing-Pages/

This branch holds **only built previews**. Nothing is developed here. The source
lives on the two programme branches:

| Folder | Source branch |
|---|---|
| `ma/` | `claude/aub-fas-ma-computing-education-6bcyjd` |
| `diploma/` | `claude/aub-fas-online-education-lp-gsj7lm` |

Each folder is a verbatim copy of that programme's three `_dc.html` pages and
its `assets/`, with the pages renamed for friendlier URLs:

    Cold_Audience_dc.html      -> cold-audience.html
    In-Market_Hero_Form_dc.html -> in-market.html
    Thank_You_dc.html           -> thank-you.html

Rebuild it by copying the current files from each programme branch into the
matching folder and pushing. Do not edit the pages here — the change would be
lost on the next rebuild and would not reach the deliverable.

This branch exists because raw.githack rate-limited the previews (HTTP 429):
one cold-page view pulls 35 files, so a handful of reviewers clicking through
six pages exhausted its fair-use cap. GitHub Pages has no such limit, and the
URLs are permanent.
