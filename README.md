# Hello, World! — Advanced Programming Masterclass Landing Page

A production-quality, **100% offline** landing page for a beginner-to-confident
programming masterclass, themed around the universal first program:

```python
print("Hello, World!")
```

## ✨ Features

- **Gruvbox dark theme** — full authentic palette (`#1d2021`, `#282828`, `#ebdbb2`,
  `#b8bb26`, `#fabd2f`, `#fe8019`, `#83a598`, `#d3869b`, `#8ec07c`, `#fb4934`)
- **Animated terminal hero** — types and deletes the greeting across
  Python → JavaScript → Rust → Go → Java → C
- **Animated stat counters** (IntersectionObserver + easing)
- **Auto-scrolling language marquee** (pauses on hover)
- **Tabbed code playground** — Python / JavaScript / Rust / Go with
  Gruvbox-syntax highlighting and working copy-to-clipboard
- **Single-open accordions** for curriculum & FAQ
- **Scroll-reveal animations**, scrollspy nav, mobile hamburger menu,
  mouse-following cursor glow, validated email capture
- **Accessible**: semantic landmarks, ARIA states, focus-visible rings,
  `prefers-reduced-motion` support, fully responsive
- **Zero external requests** — works fully offline / from `file://`

## 📁 Structure

```
.
├── index.html          # markup
├── styles.css          # Gruvbox theme, layout, animations, responsive
├── script.js           # all interactivity (no frameworks, no build step)
└── vendor/
    ├── icons.js        # local icon runtime (Lucide API compatible)
    ├── icons/          # 27 individual Lucide SVG files
    ├── fonts.css       # @font-face rules for the self-hosted fonts
    └── fonts/          # Space Grotesk + JetBrains Mono (woff2)
```

## 🚀 Run locally

```bash
# any static server works
python -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly from disk also works — all assets are local.

## 📦 Credits & licenses

- **Lucide icons** — ISC License
- **Space Grotesk** & **JetBrains Mono** — SIL Open Font License

Built with vanilla HTML, CSS and JavaScript. No build step, no dependencies to install.