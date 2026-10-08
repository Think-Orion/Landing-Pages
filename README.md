# AUB Online — landing pages

Landing page funnels built by Think Orion for the American University of Beirut.
AUB implement them on their own systems; we build and hand over the files.

**You do not need to code to work with this repository.** Everything here is
plain HTML and images. You can open any page by double-clicking it.

---

## Where things are

```
AUB/
  FAS/                         <- one folder per faculty
    online-ma-computing-in-education/     <- one folder per programme
      Cold_Audience_dc.html               \
      In-Market_Hero_Form_dc.html          |  the three pages
      Thank_You_dc.html                   /
      assets/                             <- every image the pages use
      README.md                           <- what is built, what is outstanding
    online-graduate-diploma-online-education/
      ... same shape, plus the handover docs

  request-form/                <- the intake form we send a faculty before building
  _working/                    <- our mockups and notes. Never goes to AUB.
```

**Faculty codes AUB use:** FAS (Arts and Sciences), FHS (Health Sciences),
FM (Medicine), HSON (Hariri School of Nursing), OSB (Olayan School of Business),
FAFS (Agricultural and Food Sciences).

---

## The one rule

**A programme folder contains only what AUB receives.** Zip that folder, send
it, and nothing is missing and nothing is surplus. Anything internal — design
options, references, briefs — lives in `_working/`.

---

## Looking at the pages

Live previews, always current, nothing to install:

**https://think-orion.github.io/Landing-Pages/**

That hub is Think Orion branded and links to every programme. It is rebuilt
from this repository, so it updates when the pages do. The URL is public: fine
for client review, but do not treat it as private.

To look at a page on your own machine instead, download the programme folder
and open the `.html` file in a browser. The images sit beside it, so it works
offline.

---

## Starting a new programme

1. Send the faculty `AUB/request-form/AUB-Online-Landing-Page-Request-Form.docx`.
   It asks for everything needed and is written so a programme team can fill it
   in without us on the call.
2. They return it with a folder of photographs, named after the people in them.
3. Build the programme folder by copying the closest existing one and replacing
   the content.

The request form exists because of what went wrong on the first build:
photographs arriving with no name attached, an instructor credited under two
spellings, a fee quoted two ways, and student quotes that could not be published
until consent was confirmed. Every question in it earns its place.

---

## Handing over to AUB

Each programme folder has a `README.md` saying what is built and what is still
outstanding. The Online Education diploma folder also carries `CLIENT-HANDOFF.md`
and `DEPLOY.md`, which describe the deployment steps; those apply to any
programme, not just that one.

---

## How we work in here

There is **one branch, `main`**, and it holds everything. If you are looking at
this repository on GitHub without changing any settings, you are looking at the
current state of every programme.

It used to be one branch per programme. That caused real confusion — each branch
carried an out-of-date copy of the other programme's folder, and people were
told work was missing when it simply was not on the branch they had open. One
branch means there is only ever one answer to "what is current".

---

## Things that bite

- **Page weight matters.** These are landing pages; they must load fast. Do not
  paste images into the HTML as base64 — put the file in `assets/` and point at
  it. Doing it the other way once made a page 352 KB instead of 137 KB.
- **Images are served twice over**, as WebP with a JPEG fallback. Keep both.
- **Names are checked, not guessed.** Never assign a photograph to a person
  without being told which is which.
- **Nothing with a person's name or face is published without written consent.**
