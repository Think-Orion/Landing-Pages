# AUB Online — landing page previews

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
