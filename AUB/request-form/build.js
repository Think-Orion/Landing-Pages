const fs = require('fs');
const d = require('docx');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, LevelFormat,
  PageBreak, ExternalHyperlink,
} = d;

const DIR = __dirname + '/assets';
const BURG = '840132';
const GREY = '747474';
const INK = '151515';
const LINE = 'D9D9D9';
const FILL = 'F4F4F4';

const TABLE_W = 9000;
const COL = [3100, 5900];

const img = (name, h) => new Paragraph({
  spacing: { before: 160, after: 160 },
  children: [new ImageRun({
    type: 'jpg',
    data: fs.readFileSync(`${DIR}/${name}`),
    transformation: { width: 600, height: h },
  })],
});

const h1 = (t) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 360, after: 140 },
  children: [new TextRun({ text: t, bold: true, size: 30, color: INK, font: 'Calibri' })],
});

const h2 = (t) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 280, after: 100 },
  children: [new TextRun({ text: t, bold: true, size: 24, color: BURG, font: 'Calibri' })],
});

const p = (t, opts = {}) => new Paragraph({
  spacing: { after: opts.after === undefined ? 120 : opts.after },
  children: [new TextRun({
    text: t, size: opts.size || 21, color: opts.color || '2E2E2E',
    italics: !!opts.italics, bold: !!opts.bold, font: 'Calibri',
  })],
});

const eyebrow = (t) => new Paragraph({
  spacing: { before: 240, after: 60 },
  children: [new TextRun({ text: t.toUpperCase(), bold: true, size: 16, color: BURG, characterSpacing: 40, font: 'Calibri' })],
});

const bullet = (t) => new Paragraph({
  numbering: { reference: 'dots', level: 0 },
  spacing: { after: 70 },
  children: [new TextRun({ text: t, size: 21, color: '2E2E2E', font: 'Calibri' })],
});

const link = (label, url) => new Paragraph({
  spacing: { after: 90 },
  children: [
    new TextRun({ text: label + '  ', size: 21, bold: true, color: INK, font: 'Calibri' }),
    new ExternalHyperlink({
      link: url,
      children: [new TextRun({ text: url, size: 17, color: BURG, underline: {}, font: 'Calibri' })],
    }),
  ],
});

const noBorders = {
  top: { style: BorderStyle.NONE, size: 0 }, bottom: { style: BorderStyle.NONE, size: 0 },
  left: { style: BorderStyle.NONE, size: 0 }, right: { style: BorderStyle.NONE, size: 0 },
};
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const cellBorders = { top: thin, bottom: thin, left: thin, right: thin };

const cell = (children, width, opts = {}) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  borders: cellBorders,
  shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill, color: 'auto' } : undefined,
  margins: { top: 90, bottom: 90, left: 120, right: 120 },
  children,
});

// A two-column "field / your answer" table.
const fieldTable = (rows) => new Table({
  width: { size: TABLE_W, type: WidthType.DXA },
  columnWidths: COL,
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell([p('Field', { bold: true, size: 19, color: 'FFFFFF' })], COL[0], { fill: BURG }),
        cell([p('Your answer', { bold: true, size: 19, color: 'FFFFFF' })], COL[1], { fill: BURG }),
      ],
    }),
    ...rows.map(([label, hint]) => new TableRow({
      children: [
        cell([
          p(label, { bold: true, size: 20, after: hint ? 40 : 0 }),
          ...(hint ? [p(hint, { size: 16, color: GREY, italics: true, after: 0 })] : []),
        ], COL[0], { fill: FILL }),
        cell([p('', { after: 0 }), p('', { after: 0 })], COL[1]),
      ],
    })),
  ],
});

// A repeating block table (e.g. one course, one instructor) with N blank copies.
const blockTable = (labels, copies, label) => {
  const rows = [];
  for (let i = 1; i <= copies; i++) {
    rows.push(new TableRow({
      children: [new TableCell({
        width: { size: TABLE_W, type: WidthType.DXA },
        columnSpan: 2,
        borders: cellBorders,
        shading: { type: ShadingType.CLEAR, fill: 'E8E8E8', color: 'auto' },
        margins: { top: 70, bottom: 70, left: 120, right: 120 },
        children: [p(`${label} ${i}`, { bold: true, size: 19, after: 0 })],
      })],
    }));
    labels.forEach(([l, hint]) => rows.push(new TableRow({
      children: [
        cell([
          p(l, { bold: true, size: 20, after: hint ? 40 : 0 }),
          ...(hint ? [p(hint, { size: 16, color: GREY, italics: true, after: 0 })] : []),
        ], COL[0], { fill: FILL }),
        cell([p('', { after: 0 }), p('', { after: 0 })], COL[1]),
      ],
    })));
  }
  return new Table({ width: { size: TABLE_W, type: WidthType.DXA }, columnWidths: COL, rows });
};

const callout = (title, lines) => new Table({
  width: { size: TABLE_W, type: WidthType.DXA },
  columnWidths: [TABLE_W],
  rows: [new TableRow({
    children: [new TableCell({
      width: { size: TABLE_W, type: WidthType.DXA },
      borders: {
        top: { style: BorderStyle.NONE, size: 0 }, bottom: { style: BorderStyle.NONE, size: 0 },
        right: { style: BorderStyle.NONE, size: 0 },
        left: { style: BorderStyle.SINGLE, size: 18, color: BURG },
      },
      shading: { type: ShadingType.CLEAR, fill: FILL, color: 'auto' },
      margins: { top: 140, bottom: 140, left: 200, right: 160 },
      children: [
        p(title, { bold: true, size: 21, after: lines.length ? 90 : 0 }),
        ...lines.map((l, i) => p(l, { size: 20, after: i === lines.length - 1 ? 0 : 70 })),
      ],
    })],
  })],
});

const rule = () => new Paragraph({
  spacing: { before: 120, after: 120 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE } },
  children: [new TextRun({ text: '' })],
});

const children = [];

/* ---------- Cover ---------- */
children.push(
  new Paragraph({
    spacing: { before: 600, after: 60 },
    children: [new TextRun({ text: 'AUB ONLINE', bold: true, size: 18, color: BURG, characterSpacing: 60, font: 'Calibri' })],
  }),
  new Paragraph({
    spacing: { after: 140 },
    children: [new TextRun({ text: 'Landing Page Request Form', bold: true, size: 52, color: INK, font: 'Calibri' })],
  }),
  p('One form per programme. Complete it, send it back with your image folder, and we build the funnel from it.', { size: 24, color: GREY }),
  rule(),
  p('Prepared by Think Orion  ·  October 2026  ·  Version 1.0', { size: 18, color: GREY }),
);

children.push(h1('What this form produces'));
children.push(p('Every AUB Online programme gets the same three-page funnel. The example images in this form are the live pages for the MA in Computing in Education, Faculty of Arts and Sciences — the first programme built to this pattern.'));
children.push(p('You do not need to write any copy. Give us the facts and the assets; we write, design, build and test the pages, and send you a preview link to review before anything goes live.'));

children.push(h2('1. Cold-audience page'));
children.push(p('The long page, for people who have never heard of the programme. It carries the full argument: what the qualification is, who it is for, the curriculum, the faculty, the cost, the entry requirements and the FAQs.', { after: 60 }));
children.push(img('cold-hero.jpg', 342));

children.push(h2('2. In-market page'));
children.push(p('The short page, for people already searching for this qualification. The form sits in the hero so an interested visitor never has to scroll to enquire.', { after: 60 }));
children.push(img('inmarket-hero.jpg', 342));

children.push(h2('3. Thank-you page'));
children.push(p('What the enquirer sees after submitting. It sets expectations for the callback, offers a self-booking link, and keeps selling while the lead is warm.', { after: 60 }));
children.push(img('thankyou.jpg', 342));

children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1('The sections you are filling in'));
children.push(p('Three sections of the page are built almost entirely from what you supply. These are where this form spends most of its questions, so it is worth seeing what they become.'));

children.push(h2('Curriculum'));
children.push(p('Every course, each one expanding to a short description and the instructor who teaches it.', { after: 60 }));
children.push(img('cold-curriculum.jpg', 105));

children.push(h2('Faculty'));
children.push(p('Every instructor, with a portrait and a role line. Clicking a card opens that person’s full biography in a panel, so a long academic CV never crowds the page.', { after: 60 }));
children.push(img('cold-faculty.jpg', 254));

children.push(h2('Student testimonials'));
children.push(p('Real quotes from real students, named, with photographs where they have agreed to it.', { after: 60 }));
children.push(img('cold-testimonials.jpg', 169));

children.push(h2('See them working'));
children.push(p('The pages are interactive — open these and click through the curriculum, the faculty cards and the sliders.', { after: 120 }));
children.push(link('Cold audience', 'https://raw.githack.com/Think-Orion/landing-pages/claude/aub-fas-ma-computing-education-6bcyjd/AUB/FAS/online-ma-computing-in-education/Cold_Audience_dc.html'));
children.push(link('In-market', 'https://raw.githack.com/Think-Orion/landing-pages/claude/aub-fas-ma-computing-education-6bcyjd/AUB/FAS/online-ma-computing-in-education/In-Market_Hero_Form_dc.html'));
children.push(link('Thank you', 'https://raw.githack.com/Think-Orion/landing-pages/claude/aub-fas-ma-computing-education-6bcyjd/AUB/FAS/online-ma-computing-in-education/Thank_You_dc.html'));
children.push(p('These are working previews, not the published pages.', { size: 17, color: GREY, italics: true }));

children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1('How to fill this in'));
children.push(callout('Six rules that save a fortnight', [
  '1.  One form per programme. Do not combine two programmes in one form, even where they share courses.',
  '2.  Photographs go in a separate folder, never pasted into this document. Name each file after the person: faculty-baytiyeh.jpg, student-othman.jpg. A photo pasted into a Word file arrives with no name attached to it, and we cannot tell who is who.',
  '3.  Write TBC rather than guessing. A blank we chase is cheap; a wrong fact that reaches a published page is not.',
  '4.  Give us the full text, not a summary. We shorten; we cannot lengthen. This is especially true of biographies.',
  '5.  Every number needs an owner. Fees, credits and durations must come from someone who can approve them, because they end up on a page that people make decisions from.',
  '6.  Consent before photographs. No student quote or photograph goes on a page without written permission. See section J.',
]));

children.push(h2('What to send back'));
children.push(bullet('This document, completed, as a .docx or a Google Doc link — whichever is easier for you.'));
children.push(bullet('One folder (or zip) of photographs, named as described above.'));
children.push(bullet('Any existing material you already have: a factsheet PDF, a prospectus page, an approved fee schedule, a brochure. Even an out-of-date one helps.'));
children.push(p('Send it to your Think Orion contact. We will come back within two working days with a list of anything missing, and a preview link once the pages are built.', { after: 60 }));

children.push(new Paragraph({ children: [new PageBreak()] }));

/* ---------- The request blocks ---------- */
children.push(h1('A.  Programme at a glance'));
children.push(fieldTable([
  ['Faculty', 'e.g. Faculty of Arts and Sciences'],
  ['Programme name in full', 'Exactly as it should appear on the page'],
  ['Award', 'MA, MSc, Graduate Diploma, Certificate…'],
  ['Credits', 'Total credits to complete'],
  ['Duration', 'Typical and maximum, e.g. 18-24 months'],
  ['Total cost', 'And cost per credit if you quote one'],
  ['Scholarships or payment plans', 'What exists, and who qualifies'],
  ['Delivery', 'Fully online, blended, synchronous or asynchronous'],
  ['Language of instruction', ''],
  ['Next intake', 'Term and year, e.g. Spring 2026-2027'],
  ['Application deadline', ''],
  ['Accreditation or recognition', 'Any body that recognises the award'],
  ['Programme page on aub.edu.lb', 'The existing URL, if there is one'],
]));

children.push(h1('B.  Who it is for'));
children.push(p('This is the part that decides whether the page works. Answer in your own words — full sentences are fine, bullet points are fine.'));
children.push(fieldTable([
  ['Who is the ideal student?', 'Role, career stage, country. Be specific.'],
  ['What are they trying to achieve?', 'The outcome they want, not the course content'],
  ['What stops them enrolling?', 'The objection you hear most often'],
  ['What makes this programme different?', 'From the nearest alternative, at AUB or elsewhere'],
  ['What do graduates go on to do?', 'Roles, promotions, destinations'],
  ['Anything we must not say', 'Claims that are not approved, or wording to avoid'],
]));

children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1('C.  Curriculum'));
children.push(p('One block per course. Copy the block as many times as you need. If a course has no confirmed instructor yet, write TBC — we will leave it off the page rather than guess.'));
children.push(blockTable([
  ['Course code and title', 'e.g. EDUC 373 · Instructional Design and Development'],
  ['One or two sentences on what the student learns', 'Plain language, not the catalogue entry'],
  ['Instructor(s)', 'Full name, spelled as it should appear'],
], 3, 'Course'));
children.push(p('', { after: 60 }));
children.push(callout('A warning from the first build', [
  'Our FAS pages credited one instructor in the curriculum and a different one in a student quote, for the same course. Both were real people. Please make sure the instructor named against each course is the person teaching it now.',
]));

children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1('D.  Faculty'));
children.push(p('One block per instructor. We need the complete biography — we shorten it for the card and keep the full text in the panel behind it.'));
children.push(blockTable([
  ['Name, with title', 'Dr., Prof., or none — exactly as they wish to be shown'],
  ['Role line', 'One line, e.g. Professor, Department of Computer Science'],
  ['Full biography', 'Paste the whole thing. We will not add or invent anything.'],
  ['Photo filename', 'The file in your image folder, e.g. faculty-surname.jpg'],
  ['Photo consent given?', 'Yes / No'],
], 3, 'Instructor'));

children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1('E.  Student testimonials'));
children.push(p('Quotes carry more weight than anything we can write. Send more than you think we need — we select the ones that answer the objections in section B.'));
children.push(blockTable([
  ['The quote, in full', 'Their words, as they wrote or said them'],
  ['Student name', 'As they wish to be credited'],
  ['Which programme', 'They may have done more than one'],
  ['Graduate or current student?', ''],
  ['Photo filename', 'If they have agreed to a photograph'],
  ['Written consent held for quote and photo?', 'Yes / No — we cannot publish without it'],
], 3, 'Testimonial'));

children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1('F.  Admissions'));
children.push(fieldTable([
  ['Entry requirements', 'Degree, grade, experience, English language'],
  ['Documents required to apply', ''],
  ['How to apply', 'The steps, in order'],
  ['Application fee', ''],
  ['Who assesses applications, and how long it takes', ''],
  ['Common reasons applicants are rejected', 'Helps us screen poor-fit leads out early'],
]));

children.push(h1('G.  Advisor and contact'));
children.push(fieldTable([
  ['Advisor name', 'The person whose name appears beside the form'],
  ['Role title', ''],
  ['Photo filename', ''],
  ['Response time we can promise', 'e.g. within 48 hours'],
  ['Call booking link', 'Calendly or similar, if there is one'],
  ['Phone and WhatsApp number', 'If you want them shown'],
]));

children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1('H.  Where the data goes'));
children.push(p('Without these the pages can be built but not launched. If you do not know an answer, tell us who does.'));
children.push(fieldTable([
  ['Where should form submissions go?', 'CRM, endpoint, or the person who manages it'],
  ['Fields the CRM requires', 'So the form matches what your team expects'],
  ['Thank-you page destination', 'Ours, or an existing URL of yours'],
  ['Analytics and tag manager IDs', 'GTM, GA4, Meta pixel, LinkedIn'],
  ['Privacy policy URL', ''],
  ['Terms of use URL', ''],
  ['Cookie or data-protection notice URL', ''],
  ['Factsheet or brochure PDF', 'Filename, or a link to the current version'],
]));

children.push(h1('I.  Brand assets'));
children.push(fieldTable([
  ['Faculty logo', 'Vector if possible, white and full-colour versions'],
  ['Hero photography', 'Any approved imagery of the faculty, campus or students'],
  ['Social media handles for the footer', 'The faculty’s own accounts'],
  ['Any brand rules we must follow', 'Colours, fonts, wording conventions'],
]));

children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1('J.  Approvals and consent'));
children.push(callout('This section is not administrative', [
  'Named quotes and photographs of real students are personal data. We will not publish a student’s name, words or face without written permission held by AUB, and we will ask for it before launch. Faculty photographs need the same.',
]));
children.push(fieldTable([
  ['Who approves the programme facts?', 'Fees, credits, duration, entry requirements'],
  ['Who approves the marketing copy?', ''],
  ['Who holds the student consents?', 'Name and email'],
  ['Who holds the faculty photo consents?', ''],
  ['Is there a legal or compliance review?', 'If so, who and how long it takes'],
  ['Target launch date', ''],
]));

children.push(h1('K.  Anything else'));
children.push(p('Known contradictions, figures still being argued over, things that changed recently, anything that caught you out last time. This box is more useful than it looks.'));
children.push(new Table({
  width: { size: TABLE_W, type: WidthType.DXA },
  columnWidths: [TABLE_W],
  rows: [new TableRow({
    children: [new TableCell({
      width: { size: TABLE_W, type: WidthType.DXA },
      borders: cellBorders,
      margins: { top: 140, bottom: 140, left: 140, right: 140 },
      children: [p(''), p(''), p(''), p(''), p(''), p('', { after: 0 })],
    })],
  })],
}));

children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1('Before you send it back'));
children.push(p('A quick check against the things that most often come back incomplete.'));
children.push(bullet('Section A has a fee and a credit count that agree with each other.'));
children.push(bullet('Every course in section C names an instructor, or says TBC.'));
children.push(bullet('Every instructor in section D has a full biography, not a summary.'));
children.push(bullet('Every photo filename in this form exists in the image folder, spelled identically.'));
children.push(bullet('No photographs have been pasted into this document.'));
children.push(bullet('Section J names a real person against each approval.'));
children.push(bullet('Anything you are unsure of says TBC rather than a best guess.'));

children.push(rule());
children.push(p('Questions about any of this, ask your Think Orion contact before filling in a section you are unsure about. It is always faster than correcting it afterwards.', { color: GREY }));

const doc = new Document({
  creator: 'Think Orion',
  title: 'AUB Online — Landing Page Request Form',
  description: 'Intake form for building AUB Online programme landing pages',
  numbering: {
    config: [{
      reference: 'dots',
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 220 } } },
      }],
    }],
  },
  sections: [{
    properties: { page: { margin: { top: 1134, bottom: 1134, left: 1440, right: 1440 } } },
    children,
  }],
});

Packer.toBuffer(doc).then((b) => {
  fs.writeFileSync(__dirname + '/AUB-Online-Landing-Page-Request-Form.docx', b);
  console.log('written', b.length, 'bytes');
});
