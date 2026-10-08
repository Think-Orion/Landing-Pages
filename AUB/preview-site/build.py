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


def card(fac, prog, published, title, blurb):
    href = '%s/%s/%s' % (fac['code'], prog['slug'], published)
    return ('        <li><a class="card" href="%s"><strong>%s</strong>'
            '<span>%s</span><span class="go">Open preview &rsaquo;</span></a></li>'
            % (href, html.escape(title), html.escape(blurb)))


def build(out):
    data = json.load(open(os.path.join(HERE, 'programmes.json'), encoding='utf-8'))
    if os.path.isdir(out):
        shutil.rmtree(out)
    os.makedirs(out)
    open(os.path.join(out, '.nojekyll'), 'w').close()
    shutil.copytree(os.path.join(HERE, 'brand'), os.path.join(out, 'brand'), dirs_exist_ok=True)

    total = live = 0
    sections = []
    for fac in data['faculties']:
        built = [p for p in fac['programmes'] if p.get('status') == 'live']
        planned = [p for p in fac['programmes'] if p.get('status') != 'live']
        total += len(fac['programmes'])
        live += len(built)

        rows = ['      <section class="fac">',
                '        <h2>%s <span class="code">%s</span></h2>'
                % (html.escape(fac['name']), html.escape(fac['code']))]
        for prog in built:
            copy_programme(fac, prog, out)
            rows.append('        <h3>%s</h3>' % html.escape(prog['name']))
            if prog.get('meta'):
                rows.append('        <p class="meta">%s</p>' % html.escape(prog['meta']))
            rows.append('        <ul>')
            for _, published, title, blurb in PAGES:
                rows.append(card(fac, prog, published, title, blurb))
            rows.append('        </ul>')
        if planned:
            rows.append('        <p class="soon-label">Not yet built</p>')
            rows.append('        <ul class="soon">')
            for prog in planned:
                note = ' <em>%s</em>' % html.escape(prog['note']) if prog.get('note') else ''
                rows.append('          <li>%s%s</li>' % (html.escape(prog['name']), note))
            rows.append('        </ul>')
        rows.append('      </section>')
        sections.append('\n'.join(rows))

    page = TEMPLATE.replace('{{SECTIONS}}', '\n\n'.join(sections)) \
                   .replace('{{LIVE}}', str(live)).replace('{{TOTAL}}', str(total)) \
                   .replace('{{FACULTIES}}', str(len(data['faculties'])))
    open(os.path.join(out, 'index.html'), 'w', encoding='utf-8').write(page)
    print('built %s — %d of %d programmes live across %d faculties'
          % (out, live, total, len(data['faculties'])))


TEMPLATE = open(os.path.join(HERE, 'index-template.html'), encoding='utf-8').read() \
    if os.path.exists(os.path.join(HERE, 'index-template.html')) else ''

if __name__ == '__main__':
    TEMPLATE = open(os.path.join(HERE, 'index-template.html'), encoding='utf-8').read()
    build(sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, '_site'))
