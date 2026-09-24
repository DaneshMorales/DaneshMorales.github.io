/* Shared interactions; the site and abstracts remain usable without JavaScript. */
const html = document.documentElement;
let savedTheme;
try { savedTheme = localStorage.getItem('theme'); } catch (_) {}
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme(theme, save = false) {
  html.dataset.theme = theme;
  if (save) { try { localStorage.setItem('theme', theme); } catch (_) {} }
  document.querySelectorAll('.theme-toggle').forEach(button => {
    button.setAttribute('aria-pressed', String(theme === 'dark'));
    button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  });
}
applyTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : systemTheme.matches ? 'dark' : 'light');
document.querySelectorAll('.theme-toggle').forEach(button => button.addEventListener('click', () => {
  savedTheme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(savedTheme, true);
}));
systemTheme.addEventListener('change', event => { if (savedTheme !== 'light' && savedTheme !== 'dark') applyTheme(event.matches ? 'dark' : 'light'); });

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
function closeMenu(restoreFocus = false) {
  if (!hamburger || !navMenu) return;
  navMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Open navigation menu');
  if (restoreFocus) hamburger.focus();
}
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    if (open) navMenu.querySelector('a')?.focus();
  });
  navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && navMenu.classList.contains('open')) closeMenu(true); });
  document.addEventListener('click', event => { if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) closeMenu(); });
  document.addEventListener('focusin', event => { if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) closeMenu(); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const papers = document.querySelectorAll('.paper-card[data-type]');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  papers.forEach(paper => {
    const value = button.dataset.filter;
    paper.hidden = !(value === 'all' || value === paper.dataset.type || value === paper.dataset.year);
    if (!paper.hidden) count++;
  });
  const status = document.getElementById('result-count');
  if (status) status.textContent = `${count} ${count === 1 ? 'work' : 'works'}`;
  const empty = document.getElementById('empty-state');
  if (empty) empty.hidden = count !== 0;
}));

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
      if (c.url)    html += ` <a href="${c.url}" target="_blank" rel="noopener" class="ref-url">&#8599;</a>`;
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

  headings.forEach((h, i) => {
    if (!h.id) {
      h.id = h.textContent
        .toLowerCase()
        .replace(/^\d+\.\s*/, '')   // strip leading "1. "
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .substring(0, 60) || `section-${i}`;
    }

    const a = document.createElement('a');
    a.href      = `#${h.id}`;
    a.className = `toc-link toc-${h.tagName.toLowerCase()}`;
    // Strip numeric prefix for cleaner TOC display
    a.textContent = h.textContent.replace(/^\d+\.\s*/, '');
    tocNav.appendChild(a);
  });

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


initCitations();
initTOC();
