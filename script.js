/* =============================================
   Theme (dark / light) toggle
   ============================================= */
const html = document.documentElement;

// On page load: apply saved theme or system preference
function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // Update both toggle icons (mobile top-bar + desktop in menu)
  document.querySelectorAll('.theme-toggle i').forEach(icon => {
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'far fa-sun';
  });
}

applyTheme(getInitialTheme());

document.querySelectorAll('.theme-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
});

/* =============================================
   Mobile hamburger menu
   ============================================= */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked
  navMenu.querySelectorAll('.nav-link, .nav-cv').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* =============================================
   Active nav link on scroll (main page only)
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link[href*="#"]');

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href').includes(entry.target.id)
          );
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* =============================================
   Blog post citation renderer
   =============================================
   Usage in a post:
     Inline:  <span class="cite" data-key="bell1964"></span>
              <span class="cite" data-key="bell1964 nielsen2000"></span>  ← multiple

     Define references (anywhere in the HTML, before </body>):
     <script type="application/json" id="post-citations">
     {
       "bell1964": {
         "authors": "J.S. Bell",
         "title": "On the Einstein Podolsky Rosen Paradox",
         "venue": "Physics",
         "volume": "1",
         "pages": "195",
         "year": 1964,
         "url": "https://..."
       }
     }
     </script>

     Place the bibliography target in the post body:
     <section class="references-section">
       <h2>References</h2>
       <div id="post-references"></div>
     </section>
   ============================================= */
/* =============================================
   Citation renderer — IEEE style
   Inline: <span class="cite" data-key="key1 key2"></span>
   Data:   <script type="application/json" id="post-citations">{...}</script>
   Target: <div id="post-references"></div>
   ============================================= */
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

/* =============================================
   Abstract toggle — works on any page with
   .paper-card.compact + .toggle-abstract buttons
   ============================================= */
function initAbstractToggles() {
  document.querySelectorAll('.toggle-abstract').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.paper-card').classList.toggle('expanded');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCitations();
  initTOC();
  initAbstractToggles();
});

/* =============================================
   Navbar shadow on scroll
   ============================================= */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 8
      ? '0 1px 12px rgba(0,0,0,0.12)'
      : '';
  }, { passive: true });
}
