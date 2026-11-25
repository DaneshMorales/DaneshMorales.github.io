let savedTheme;
try {
  savedTheme = localStorage.getItem('theme');
} catch {
  // A theme change can still apply to this page when storage is unavailable.
}

const themeControl = document.createElement('fieldset');
themeControl.className = 'theme-control';
themeControl.setAttribute('aria-label', 'Color theme');
themeControl.innerHTML = `
  <label title="Light mode">
    <input type="radio" name="theme" value="light" aria-label="Light mode">
    <span>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"></path>
      </svg>
    </span>
  </label>
  <label title="Dark mode">
    <input type="radio" name="theme" value="dark" aria-label="Dark mode">
    <span>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20.5 14.1A8.8 8.8 0 0 1 9.9 3.5 9 9 0 1 0 20.5 14.1Z"></path>
      </svg>
    </span>
  </label>
`;
const themeOptions = themeControl.querySelectorAll('input');

function sendThemeToEmbed(frame, theme) {
  frame.contentWindow?.postMessage({ type: 'post-embed:theme', theme }, '*');
}

function applyTheme() {
  // Dark unless the visitor has picked light with the switch.
  const theme = savedTheme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  themeOptions.forEach(option => { option.checked = option.value === theme; });
  document.querySelectorAll('iframe.post-embed-frame').forEach(frame => sendThemeToEmbed(frame, theme));
}

applyTheme();
themeControl.addEventListener('change', event => {
  savedTheme = event.target.value;
  applyTheme();
  try {
    localStorage.setItem('theme', savedTheme);
  } catch {
    // The current page already reflects the new preference.
  }
});

/* =============================================
   Addresses without .html
   Pages are linked as /news, /blog/posts/<slug>, …, which GitHub Pages serves from
   news.html and so on. A visitor who arrives through an old …/news.html link gets
   the same clean address. Only on the live site: a plain local server has no /news.
   ============================================= */
if (location.hostname === 'daneshmorales.github.io' && location.pathname.endsWith('.html')) {
  const cleanPath = location.pathname.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');
  history.replaceState(history.state, '', cleanPath + location.search + location.hash);
}

/* =============================================
   Home page tabs
   About, Publications, Blog and Contact (and the name, like About) scroll to
   their sections without writing #top, #blog, … into the address bar or the
   history. Arriving from
   another page's Contact tab (…/#contact) still lands on the section, and the
   #contact leaves the address once the page has loaded.
   ============================================= */
const sectionTabs = () => [...document.querySelectorAll('.site-header nav a[href^="#"]')];

document.addEventListener('click', event => {
  const link = event.target.closest?.('.site-header a[href^="#"]');
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const hash = link.getAttribute('href');
  if (hash === '#top') {
    event.preventDefault();
    window.scrollTo({ top: 0 });
    return;
  }
  const section = document.getElementById(hash.slice(1));
  if (!section) return;
  event.preventDefault();
  section.scrollIntoView();
  // Keyboard users carry on from the section, as they would after a plain jump link.
  const heading = section.querySelector('h2') ?? section;
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
});

window.addEventListener('load', () => {
  if (!sectionTabs().some(link => link.getAttribute('href') === location.hash)) return;
  // Safari reads the #section to scroll there, so it stays until loading is done.
  setTimeout(() => history.replaceState(history.state, '', location.pathname + location.search));
});

// Citations are numbered by their first appearance in the article.
function initCitations() {
  const dataEl = document.getElementById('post-citations');
  if (!dataEl) return;

  let db;
  try { db = JSON.parse(dataEl.textContent); }
  catch (e) { console.error('Citation JSON parse error:', e); return; }

  const citeSpans = document.querySelectorAll('.cite[data-key]');
  if (!citeSpans.length) return;

  const keyToNum = {};
  let counter = 0;

  // First pass: assign numbers in document order
  citeSpans.forEach(span => {
    span.dataset.key.trim().split(/\s+/).forEach(key => {
      if (!(key in keyToNum)) keyToNum[key] = ++counter;
    });
  });

  // Second pass: render superscripts with IEEE range compression
  citeSpans.forEach(span => {
    const keys = span.dataset.key.trim().split(/\s+/);
    const pairs = keys
      .map(k => ({ key: k, num: keyToNum[k] }))
      .sort((a, b) => a.num - b.num);

    // Group consecutive runs
    const groups = [];
    let run = [pairs[0]];
    for (let i = 1; i < pairs.length; i++) {
      if (pairs[i].num === run[run.length - 1].num + 1) {
        run.push(pairs[i]);
      } else {
        groups.push(run); run = [pairs[i]];
      }
    }
    groups.push(run);

    const rendered = groups.map(g => {
      const first = `<a href="#ref-${g[0].key}" class="cite-link">${g[0].num}</a>`;
      if (g.length === 1) return first;
      const last  = `<a href="#ref-${g[g.length-1].key}" class="cite-link">${g[g.length-1].num}</a>`;
      if (g.length === 2) return `${first}, ${last}`;
      return `${first}&ndash;${last}`;           // 3+ consecutive → range
    }).join(', ');

    const sup = document.createElement('span');
    sup.className = 'cite-sup';
    sup.innerHTML = ` [${rendered}]`;
    span.replaceWith(sup);
  });

  // Build bibliography
  const target = document.getElementById('post-references');
  if (!target) return;

  const ol = document.createElement('ol');
  ol.className = 'ref-list';

  Object.entries(keyToNum)
    .sort((a, b) => a[1] - b[1])
    .forEach(([key, num]) => {
      const c = db[key];
      if (!c) { console.warn(`Citation key "${key}" not in post-citations`); return; }

      const li = document.createElement('li');
      li.id        = `ref-${key}`;
      li.className = 'ref-item';
      li.dataset.num = num;

      // [N] label + content wrapper keep text flowing naturally (no flex columns)
      let html = `<span class="ref-num">[${num}]</span><span class="ref-content">`;
      html += `<span class="ref-authors">${c.authors}.</span> `;
      html += `&ldquo;<span class="ref-title">${c.title}</span>.&rdquo; `;
      if (c.venue)  html += `<em>${c.venue}</em>`;
      if (c.volume) html += `, <strong>${c.volume}</strong>`;
      if (c.number) html += `(${c.number})`;
      if (c.pages)  html += `, pp.&nbsp;${c.pages}`;
      if (c.year)   html += ` (${c.year})`;
      html += '.';
      if (c.note)   html += ` <span class="ref-note">${c.note}</span>`;
      if (c.url)    html += ` <a href="${c.url}" class="ref-url">Source</a>`;
      html += `</span>`;

      li.innerHTML = html;
      ol.appendChild(li);
    });

  target.appendChild(ol);
}

/* =============================================
   Blog post – sidebar Table of Contents
   Reads h2/h3 from .post-body, skips .references-section,
   highlights active heading on scroll.
   ============================================= */
function initTOC() {
  const tocNav = document.getElementById('toc-nav');
  if (!tocNav) return;

  const postBody = document.querySelector('.post-body');
  if (!postBody) return;

  const headings = [...postBody.querySelectorAll('h2, h3')]
    .filter(h => !h.closest('.references-section'));
  if (!headings.length) return;

  // Section numbers such as "1. " and "3.1 " are left out of the contents and the ids.
  const sectionNumber = /^(?:\d+\.)+\d*\s+/;

  headings.forEach((h, i) => {
    if (!h.id) {
      h.id = h.textContent
        .toLowerCase()
        .replace(sectionNumber, '')
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .substring(0, 60) || `section-${i}`;
    }

    const a = document.createElement('a');
    a.href      = `#${h.id}`;
    a.className = `toc-link toc-${h.tagName.toLowerCase()}`;
    a.textContent = h.textContent.replace(sectionNumber, '');
    tocNav.appendChild(a);
  });

  tocNav.closest('details').hidden = false;

  // Highlight active section on scroll
  const tocLinks = tocNav.querySelectorAll('.toc-link');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(a => a.classList.remove('active'));
        const active = tocNav.querySelector(`a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-15% 0px -78% 0px' });

  headings.forEach(h => obs.observe(h));
}

/* =============================================
   Blog post – embedded interactive figures
   Usage: <figure class="post-embed">
            <iframe class="post-embed-frame" src="..." title="..."></iframe>
          </figure>
   The embedded page reports its content height and follows the theme:
     frame → page:  { type: 'post-embed:height', height }
     page  → frame: { type: 'post-embed:theme', theme }
   ============================================= */
function initEmbeds() {
  const frames = [...document.querySelectorAll('iframe.post-embed-frame')];
  if (!frames.length) return;

  window.addEventListener('message', e => {
    const data = e.data;
    if (!data || data.type !== 'post-embed:height' || !Number.isFinite(data.height)) return;
    const frame = frames.find(f => f.contentWindow === e.source);
    if (frame) frame.style.height = `${Math.ceil(data.height)}px`;
  });

  // The frame answers every theme message with its height, which also covers
  // frames that finished loading before this listener was attached.
  frames.forEach(frame => {
    const sync = () => sendThemeToEmbed(frame, document.documentElement.dataset.theme);
    frame.addEventListener('load', sync);
    sync();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.site-header nav')?.before(themeControl);
  initCitations();
  initTOC();
  initEmbeds();
});
