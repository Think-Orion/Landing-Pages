#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build the client preview site.

Reads programmes.json, copies every programme marked "live" into the output
folder, and writes a Think Orion branded hub that links to all of them.

    python3 AUB/preview-site/build.py            # builds into ./_site
    python3 AUB/preview-site/build.py <folder>   # builds somewhere else

Adding a programme means adding it to programmes.json and running this again.
Nothing else needs editing.
"""
import html, json, os, shutil, sys

HERE = os.path.dirname(os.path.abspath(__file__))
AUB = os.path.dirname(HERE)
ROOT = os.path.dirname(AUB)

PAGES = [
    ('Cold_Audience_dc.html', 'cold-audience.html', 'Cold audience',
     'The long page: the full argument, curriculum, faculty and FAQs.'),
    ('In-Market_Hero_Form_dc.html', 'in-market.html', 'In-market',
     'The short page, with the form in the hero.'),
    ('Thank_You_dc.html', 'thank-you.html', 'Thank you',
     'What an enquirer sees after submitting.'),
]


def copy_programme(fac, prog, out):
    src = os.path.join(AUB, fac['code'], prog['slug'])
    dst = os.path.join(out, fac['code'], prog['slug'])
    os.makedirs(dst, exist_ok=True)
    for original, published, _, _ in PAGES:
        shutil.copy2(os.path.join(src, original), os.path.join(dst, published))
    shutil.copytree(os.path.join(src, 'assets'), os.path.join(dst, 'assets'), dirs_exist_ok=True)
    return dst


def slugify(code):
    return code.lower()


def render(out, path, title, heading, intro, stats, nav, sections):
    page = (TEMPLATE.replace('{{PAGETITLE}}', title)
                    .replace('{{HEADING}}', heading)
                    .replace('{{INTRO}}', intro)
                    .replace('{{STATS}}', stats)
                    .replace('{{NAV}}', nav)
                    .replace('{{SECTIONS}}', sections))
    # a faculty page sits one level down, so its asset paths need a step up
    if '/' in path:
        page = page.replace('src="brand/', 'src="../brand/')
    full = os.path.join(out, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, 'w', encoding='utf-8').write(page)


def stat(label, value):
    return '      <div><dt>%s</dt><dd>%s</dd></div>' % (label, value)


def faculty_section(fac, out, depth, copy=True):
    """One faculty's block. depth is how far the links sit below the page."""
    built = [p for p in fac['programmes'] if p.get('status') == 'live']
    planned = [p for p in fac['programmes'] if p.get('status') != 'live']
    prefix = '' if depth else fac['code'] + '/'
    rows = ['      <section class="fac" id="%s">' % fac['code'],
            '        <h2>%s <span class="code">%s</span></h2>'
            % (html.escape(fac['name']), html.escape(fac['code']))]
    for prog in built:
        if copy:
            copy_programme(fac, prog, out)
        rows.append('        <h3>%s</h3>' % html.escape(prog['name']))
        if prog.get('meta'):
            rows.append('        <p class="meta">%s</p>' % html.escape(prog['meta']))
        rows.append('        <ul>')
        for _, published, title, blurb in PAGES:
            href = '%s%s/%s' % (prefix, prog['slug'], published)
            rows.append('        <li><a class="card" href="%s"><strong>%s</strong>'
                        '<span>%s</span><span class="go">Open preview &rsaquo;</span></a></li>'
                        % (href, html.escape(title), html.escape(blurb)))
        rows.append('        </ul>')
    if planned:
        rows.append('        <p class="soon-label">Not yet built</p>')
        rows.append('        <ul class="soon">')
        for prog in planned:
            note = ' <em>%s</em>' % html.escape(prog['note']) if prog.get('note') else ''
            rows.append('          <li>%s%s</li>' % (html.escape(prog['name']), note))
        rows.append('        </ul>')
    rows.append('      </section>')
    return '\n'.join(rows), len(built), len(fac['programmes'])


def build(out):
    data = json.load(open(os.path.join(HERE, 'programmes.json'), encoding='utf-8'))
    if os.path.isdir(out):
        shutil.rmtree(out)
    os.makedirs(out)
    open(os.path.join(out, '.nojekyll'), 'w').close()
    shutil.copytree(os.path.join(HERE, 'brand'), os.path.join(out, 'brand'), dirs_exist_ok=True)

    sections, links, total, live = [], [], 0, 0
    for fac in data['faculties']:
        block, nlive, ntotal = faculty_section(fac, out, depth=0)
        sections.append(block)
        total += ntotal
        live += nlive
        links.append('      <a href="#%s">%s<span class="n">%d of %d built</span></a>'
                     % (fac['code'], html.escape(fac['name']), nlive, ntotal))

    nav = ('  <nav class="rail" aria-label="Faculties">\n    <p>Faculties</p>\n'
           '    <div class="links">\n%s\n    </div>\n  </nav>' % '\n'.join(links))
    render(out, 'index.html',
           'Think Orion \u2014 AUB Online Landing Page Previews',
           'AUB Online \u2014 <em>landing page previews</em>',
           'Working previews for review, not the published pages.',
           '\n'.join([stat('Programmes', '%d built of %d' % (live, total)),
                      stat('Faculties', str(len(data['faculties'])))]),
           nav, '\n\n'.join(sections))

    # One page per faculty, so a faculty can be sent a link that shows only
    # their own programmes.
    for fac in data['faculties']:
        block, nlive, ntotal = faculty_section(fac, out, depth=1, copy=False)
        render(out, '%s/index.html' % fac['code'],
               'Think Orion \u2014 %s landing page previews' % fac['name'],
               '%s \u2014 <em>landing page previews</em>' % html.escape(fac['name']),
               'Working previews for review, not the published pages.',
               '\n'.join([stat('Faculty', html.escape(fac['code'])),
                          stat('Programmes', '%d built of %d' % (nlive, ntotal))]),
               '', block)

    print('built %s \u2014 %d of %d programmes live across %d faculties, plus a page per faculty'
          % (out, live, total, len(data['faculties'])))


TEMPLATE = open(os.path.join(HERE, 'index-template.html'), encoding='utf-8').read() \
    if os.path.exists(os.path.join(HERE, 'index-template.html')) else ''

if __name__ == '__main__':
    TEMPLATE = open(os.path.join(HERE, 'index-template.html'), encoding='utf-8').read()
    build(sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, '_site'))
