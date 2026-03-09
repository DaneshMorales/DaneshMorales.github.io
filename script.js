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
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
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
function initCitations() {
  const dataEl = document.getElementById('post-citations');
  if (!dataEl) return;

  let db;
  try { db = JSON.parse(dataEl.textContent); }
  catch (e) { console.error('Citation JSON parse error:', e); return; }

  const citeSpans = document.querySelectorAll('.cite[data-key]');
  if (!citeSpans.length) return;

  // Assign sequential numbers in document order (deduplicated by key)
  const keyToNum = {};
  let counter = 0;

  citeSpans.forEach(span => {
    const keys = span.dataset.key.trim().split(/\s+/);
    const nums = keys.map(key => {
      if (!(key in keyToNum)) keyToNum[key] = ++counter;
      return keyToNum[key];
    });

    const links = nums.map((n, i) =>
      `<a href="#ref-${keys[i]}" class="cite-link">${n}</a>`
    ).join(',\u202F');  // narrow no-break space between numbers

    const sup = document.createElement('sup');
    sup.className = 'cite-sup';
    sup.innerHTML = `[${links}]`;
    span.replaceWith(sup);
  });

  // Build bibliography list
  const target = document.getElementById('post-references');
  if (!target) return;

  const ol = document.createElement('ol');
  ol.className = 'ref-list';

  // Sort by assigned number
  Object.entries(keyToNum)
    .sort((a, b) => a[1] - b[1])
    .forEach(([key, num]) => {
      const c = db[key];
      if (!c) { console.warn(`Citation key "${key}" not defined in post-citations`); return; }

      const li = document.createElement('li');
      li.id = `ref-${key}`;
      li.className = 'ref-item';
      li.dataset.num = num;

      let html = `<span class="ref-authors">${c.authors}.</span> `;
      html += `&ldquo;<span class="ref-title">${c.title}</span>.&rdquo; `;
      if (c.venue)  html += `<em>${c.venue}</em>`;
      if (c.volume) html += `, <strong>${c.volume}</strong>`;
      if (c.number) html += `(${c.number})`;
      if (c.pages)  html += `, ${c.pages}`;
      if (c.year)   html += ` (${c.year})`;
      html += '.';
      if (c.note)   html += ` <span class="ref-note">${c.note}</span>`;
      if (c.url)    html += ` <a href="${c.url}" target="_blank" rel="noopener" class="ref-url" title="Open link">&#8599;</a>`;

      li.innerHTML = html;
      ol.appendChild(li);
    });

  target.appendChild(ol);
}

document.addEventListener('DOMContentLoaded', initCitations);

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
