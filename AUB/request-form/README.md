# AUB Online — Landing Page Request Form

The intake form we send to a faculty or programme team before building their
funnel. One completed form plus an image folder is everything needed to produce
the three pages.

`AUB-Online-Landing-Page-Request-Form.docx` is the file to send out. It is
generated, not hand-edited — change `build.js` and rebuild, so the screenshots
and the questions stay in step:

```
cd AUB/request-form
npm install docx      # only needed once
node build.js
```

`assets/` holds the worked-example screenshots, taken from the MA in Computing
in Education pages (Faculty of Arts and Sciences), the first programme built to
this pattern. Re-shoot them when the page design changes.

The questions in the form are not generic. Each one exists because its absence
cost time on the FAS build: photographs arriving with no name attached, an
instructor credited twice under two different names, a fee quoted two ways, and
student quotes that could not be published until consent was confirmed.
