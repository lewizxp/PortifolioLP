<div align="center">
  <img src="https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-c8f065?style=flat-square" />
</div>

<br />

# Luiz Pedro — Portfolio

Dark minimalist portfolio built with React + Vite. Fully bilingual (PT/EN), responsive, and zero external UI dependencies — every animation and component is handcrafted.

---

## Features

**Design**
- Dark minimalist aesthetic with a green-lime accent (`#c8f065`)
- Asymmetric hero layout with a floating code card
- Grain/noise film overlay for texture
- Custom cursor with dot + ring follow
- Smooth scroll-reveal animations on every section

**Functionality**
- Typewriter name effect cycling through 6 languages (PT, JP, EN, KR, RU, AR)
- Full PT ↔ EN language toggle — every string is translated
- Project cards with hand-drawn UI previews (no images)
- Responsive — mobile hamburger menu with animated open/close
- CV download button
- GitHub and LinkedIn quick-access icons in the nav

**Tech**
- React 18 with hooks only (`useState`, `useEffect`, `useRef`)
- Vite 5 for instant dev server and optimized builds
- Zero CSS frameworks — all styles are inline JS or injected via `<style>`
- Zero animation libraries — pure CSS keyframes and `IntersectionObserver`

---

## Stack

| Layer | Technology |
|---|---|
| UI | React 18 |
| Build | Vite 5 |
| Styling | CSS-in-JS (inline) + CSS custom properties |
| Animations | CSS keyframes + IntersectionObserver API |
| i18n | Custom translation object (no library) |
| Fonts | Syne (display) + DM Sans (body) via Google Fonts |

---

## Project Structure

```
src/
├── App.jsx                 # Root — global state (lang, active section)
├── main.jsx                # React entry point
│
├── data/
│   ├── content.js          # Projects, skills, timeline, social links, CV URL
│   └── translations.js     # All PT and EN strings
│
├── styles/
│   └── global.js           # CSS variables, animations, responsive breakpoints
│
├── hooks/
│   └── useReveal.js        # IntersectionObserver scroll animation hook
│
└── components/
    ├── Nav.jsx             # Fixed nav + mobile hamburger + lang toggle + CV button
    ├── Hero.jsx            # Full-height intro with animated name + floating card
    ├── AnimatedName.jsx    # Typewriter effect cycling through 6 languages
    ├── Marquee.jsx         # Infinite scroll tech strip
    ├── About.jsx           # Bio + skill tags + career timeline
    ├── MockPreview.jsx     # CSS-only UI previews for project cards
    ├── Projects.jsx        # 2-col card grid with hover states
    ├── Contact.jsx         # Contact form + social links
    ├── Footer.jsx          # Logo + copyright + back to top
    ├── Reveal.jsx          # Scroll-triggered entrance animation wrapper
    ├── SectionLabel.jsx    # "01 / Section ────" header component
    └── Cursor.jsx          # Custom cursor (desktop only)
```

---

## Customization

All content lives in `src/data/` — no need to touch components.

**`src/data/content.js`** — personal info, projects, links:
```js
export const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/YOUR_USERNAME"      },
  { label: "LinkedIn", href: "https://linkedin.com/in/YOUR_USERNAME" },
];

export const CV_URL = "/CV.pdf"; // place your file in /public
```

**`src/data/translations.js`** — all visible text in PT and EN.

**`src/styles/global.js`** — to change the accent color:
```css
--accent: #c8f065; /* swap for any hex */
```

---

## License

MIT — free to use, adapt, and deploy.
