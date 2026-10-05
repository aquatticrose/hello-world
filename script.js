/* Hello, World! — interactions (Gruvbox landing page) */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Lucide icons (CDN) ---------- */
  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }
  renderIcons();

  /* ---------- year ---------- */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- sticky nav + scrollspy ---------- */
  var nav = $('#nav');
  var navLinks = $$('.nav-links a[href^="#"]');
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 12);
    var pos = window.scrollY + 140, current = null;
    sections.forEach(function (s) { if (s.offsetTop <= pos) current = s.id; });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var toggle = $('#navToggle');
  var links = $('#navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.innerHTML = '<i data-lucide="' + (open ? 'x' : 'menu') + '"></i>';
      renderIcons();
    });
    $$('a', links).forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<i data-lucide="menu"></i>';
        renderIcons();
      });
    });
  }

  /* ---------- cursor glow ---------- */
  var glow = $('#cursorGlow');
  if (glow && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', function (e) {
      glow.style.transform = 'translate(' + (e.clientX - 210) + 'px,' + (e.clientY - 210) + 'px)';
    }, { passive: true });
  }

  /* ---------- animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var start = performance.now(), dur = 1600;
    function frame(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  var counters = $$('.stat-num');
  if (counters.length) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cObs.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cObs.observe(c); });
  }

  /* ---------- scroll reveal ---------- */
  var reveals = $$('.reveal');
  if (reveals.length) {
    var rObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en, i) {
        if (en.isIntersecting) {
          var el = en.target;
          setTimeout(function () { el.classList.add('in'); }, (i % 6) * 70);
          rObs.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (r) { rObs.observe(r); });
  }

  /* ---------- marquee ---------- */
  var LANGS = ['Python', 'JavaScript', 'TypeScript', 'Rust', 'Go', 'C', 'Java', 'SQL', 'Git', 'HTML', 'CSS', 'React', 'Node.js', 'Linux'];
  var track = $('#marqueeTrack');
  if (track) {
    var row = LANGS.map(function (l) { return '<span>' + l + '</span>'; }).join('');
    track.innerHTML = row + row; /* duplicated for a seamless -50% loop */
  }
})();
/* ---------- terminal typing loop ---------- */
(function () {
  var codeEl = document.getElementById('typedCode');
  var outEl = document.getElementById('typedOut');
  var langEl = document.getElementById('termLang');
  if (!codeEl) return;

  var SNIPPETS = [
    { lang: 'python', code: 'print("Hello, World!")', out: 'Hello, World!' },
    { lang: 'javascript', code: 'console.log("Hello, World!");', out: 'Hello, World!' },
    { lang: 'rust', code: 'println!("Hello, World!");', out: 'Hello, World!' },
    { lang: 'go', code: 'fmt.Println("Hello, World!")', out: 'Hello, World!' },
    { lang: 'java', code: 'System.out.println("Hello, World!");', out: 'Hello, World!' },
    { lang: 'c', code: 'printf("Hello, World!\\n");', out: 'Hello, World!' }
  ];

  var i = 0, ci = 0, deleting = false;

  function tick() {
    var s = SNIPPETS[i];
    var text = s.code;
    if (!deleting) {
      ci++;
      if (ci > text.length) {
        if (outEl) outEl.textContent = s.out;
        deleting = true;
        return setTimeout(tick, 2200);
      }
    } else {
      ci -= 2;
      if (ci < 0) {
        deleting = false;
        i = (i + 1) % SNIPPETS.length;
        if (langEl) langEl.textContent = SNIPPETS[i].lang;
        return setTimeout(tick, 380);
      }
    }
    codeEl.textContent = text.slice(0, Math.max(ci, 0));
    setTimeout(tick, deleting ? 28 : 62);
  }
  if (langEl) langEl.textContent = SNIPPETS[0].lang;
  setTimeout(tick, 700);
})();

/* ---------- code playground tabs ---------- */
(function () {
  var view = document.getElementById('codeView');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.etab'));
  if (!view || !tabs.length) return;

  var SAMPLES = {
    python: [
      ['# the very first program', 'tok-c'],
      ['name = ', 'tok-k'], ['"World"', 'tok-s'],
      ['print(', 'tok-f'], ['f"Hello, {name}!"', 'tok-s'], [')', 'tok-o']
    ],
    javascript: [
      ['// template literals are string formatting', 'tok-c'],
      ['const ', 'tok-k'], ['name = ', 'tok-o'], ['"World"', 'tok-s'], [';', 'tok-o'],
      ['console.', 'tok-f'], ['log', 'tok-f'], ['(`Hello, ${name}!`);', 'tok-s']
    ],
    rust: [
      ['// the borrow checker keeps you honest', 'tok-c'],
      ['let ', 'tok-k'], ['name: ', 'tok-k'], ['&str', 'tok-t'], [' = ', 'tok-o'], ['"World"', 'tok-s'],
      [';', 'tok-o'],
      ['println!', 'tok-f'], ['(', 'tok-o'], ['"Hello, {}!"', 'tok-s'], [', ', 'tok-o'], ['name', 'tok-n'], [');', 'tok-o']
    ],
    go: [
      ['package main', 'tok-k'], ['', 'tok-o'],
      ['import ', 'tok-k'], ['"fmt"', 'tok-s'], ['', 'tok-o'],
      ['func ', 'tok-k'], ['main', 'tok-f'], ['() {', 'tok-o'],
      ['  fmt.', 'tok-f'], ['Println', 'tok-f'], ['(', 'tok-o'], ['"Hello, World!"', 'tok-s'], [')', 'tok-o'],
      ['}', 'tok-o']
    ]
  };

  var LINES = {
    python: ['name = "World"', 'print(f"Hello, {name}!")'],
    javascript: ['const name = "World";', 'console.log(`Hello, ${name}!`);'],
    rust: ['let name: &str = "World";', 'println!("Hello, {}!", name);'],
    go: ['import "fmt"', '', 'func main() {', '  fmt.Println("Hello, World!")', '}']
  };

  var currentLang = 'python';

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function render(lang) {
    currentLang = lang;
    var parts = SAMPLES[lang] || [];
    view.innerHTML = parts.map(function (seg) {
      return '<span class="' + seg[1] + '">' + escapeHtml(seg[0]) + '</span>';
    }).join('\n');
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      render(tab.getAttribute('data-lang'));
    });
  });
  render('python');

/* copy to clipboard */
  var copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    var setCopyIcon = function (icon, label, done) {
      copyBtn.classList.toggle('done', !!done);
      copyBtn.innerHTML = '<i data-lucide="' + icon + '"></i> ' + label;
      if (window.lucide) window.lucide.createIcons();
    };
    copyBtn.addEventListener('click', function () {
      var text = (LINES[currentLang] || []).join('\n');
      var done = function () {
        setCopyIcon('check', 'copied', true);
        setTimeout(function () { setCopyIcon('copy', 'copy', false); }, 1600);
      };
      var fallback = function () {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (err) {}
        document.body.removeChild(ta);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
      } else { fallback(); }
    });
  }
})();

/* ---------- single-open accordion ---------- */
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('.acc'), function (acc) {
    var items = Array.prototype.slice.call(acc.querySelectorAll('details'));
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) { if (other !== item) other.open = false; });
      });
    });
  });
})();

/* ---------- newsletter form ---------- */
(function () {
  var form = document.getElementById('signupForm');
  var msg = document.getElementById('formMsg');
  if (!form || !msg) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('email');
    var value = (email.value || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.classList.remove('ok');
      email.focus();
      return;
    }
    msg.textContent = 'Welcome aboard! Check ' + value + ' for your first lesson.';
    msg.classList.add('ok');
    form.reset();
  });
})();

/* ---------- smooth anchor scroll with sticky-nav offset ---------- */
(function () {
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id === '#') return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.scrollY - 74;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
})();