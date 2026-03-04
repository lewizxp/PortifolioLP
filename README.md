<div align="center">
  <img src="https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-c8f065?style=flat-square" />
</div>

<br />

# Luiz Pedro — Portfolio

---

## 🇧🇷 Versão em Português

### Sobre o projeto

Portfólio profissional desenvolvido do zero com **React 18 + Vite**, sem frameworks de UI externos. Cada animação, componente e interação foi construído manualmente — do cursor customizado até os contadores animados nas estatísticas.

O design segue uma estética **dark minimalista** com um acento em verde-lima (`#c8f065`), layout assimétrico e atenção a cada detalhe tipográfico. Totalmente bilíngue (PT/EN) e responsivo.

---

### ✨ Funcionalidades

**Design & Experiência**
- Tema dark minimalista com acento verde-lima
- Layout assimétrico no Hero com card de código flutuante
- Cursor customizado com dot + anel de seguimento (desktop)
- Overlay de grain/noise para textura cinematográfica
- Barra de progresso de scroll no topo da página
- Botão flutuante "Voltar ao topo"
- Efeito de sublinhado animado na navegação ativa

**Animações**
- Typewriter effect no nome, alternando entre 6 idiomas (PT, JP, EN, KR, RU, AR)
- Contadores animados nos stats (0 → valor final com easing)
- Partículas sutis em canvas no Hero (sem biblioteca)
- Animações de scroll-reveal em todas as seções
- Barras de skills com animação de preenchimento + glow pulsante + contagem de porcentagem
- Seção de projetos com cards clicáveis que abrem página de detalhe em overlay

**Funcionalidades**
- Toggle PT ↔ EN — todos os textos traduzidos (75+ strings)
- Menu mobile com hamburger animado
- Botão de download do CV
- Ícones rápidos para GitHub e LinkedIn na nav
- Loading screen de entrada
- Formulário de contato funcional (integração com Resend — ver guia)
- Página de detalhe de projeto com stack completa, highlights e resultados

---

### 🗂️ Estrutura do projeto

```
src/
├── App.jsx                  # Estado global (lang, seção ativa, projeto selecionado)
├── main.jsx                 # Entry point do React
│
├── data/
│   ├── content.js           # Projetos, skills, timeline, links, URL do CV
│   └── translations.js      # Todos os textos em PT e EN
│
├── styles/
│   └── global.js            # Variáveis CSS, keyframes, breakpoints responsivos
│
├── hooks/
│   ├── useReveal.js         # Hook de animação via IntersectionObserver
│   └── useCounter.js        # Hook de contagem animada (0 → target)
│
└── components/
    ├── Nav.jsx              # Navegação fixa + mobile hamburger + toggle de idioma
    ├── Hero.jsx             # Tela inicial com nome animado e card de código
    ├── AnimatedName.jsx     # Efeito typewriter em 6 idiomas
    ├── ParticleField.jsx    # Partículas em canvas no fundo do Hero
    ├── Marquee.jsx          # Faixa infinita com tecnologias
    ├── About.jsx            # Bio + skills + timeline de carreira
    ├── Projects.jsx         # Grid de cards de projetos
    ├── ProjectDetail.jsx    # Overlay de detalhe ao clicar no card
    ├── MockPreview.jsx      # Previews CSS dos projetos (sem imagens)
    ├── Skills.jsx           # Seção de skills com barras animadas
    ├── Contact.jsx          # Formulário de contato
    ├── Footer.jsx           # Rodapé com links sociais
    ├── BackToTop.jsx        # Botão flutuante de voltar ao topo
    ├── LoadingScreen.jsx    # Tela de carregamento inicial
    ├── Reveal.jsx           # Wrapper de animação de entrada ao scroll
    ├── SectionLabel.jsx     # Label "01 / Seção ────" no topo de cada seção
    └── Cursor.jsx           # Cursor customizado (desktop)
```

---

### ⚙️ Como rodar localmente

**Pré-requisitos:** Node.js 18+ e npm

```bash
# 1. Clone ou extraia o projeto
cd portfolio-luiz-pedro

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Acesse no navegador
# http://localhost:5173
```

**Build para produção:**
```bash
npm run build
# Arquivos gerados em /dist — pronto para deploy
```

---

### ✏️ Personalizando o conteúdo

Todo o conteúdo fica em `src/data/` — não precisa tocar nos componentes.

**`src/data/content.js`** — informações pessoais e projetos:
```js
// Seus links sociais
export const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/SEU_USUARIO" },
  { label: "LinkedIn", href: "https://linkedin.com/in/SEU_USUARIO" },
];

// URL do seu currículo (coloque o arquivo em /public/)
export const CV_URL = "/CV.pdf";

// Seus projetos
export const PROJECTS = [
  { id: "01", name: "Nome do Projeto", year: "2025", tags: ["React", "Node.js"], link: "#" },
];
```

**`src/data/translations.js`** — todos os textos visíveis em PT e EN.

**`src/styles/global.js`** — para trocar a cor de destaque:
```css
--accent: #c8f065; /* troque pelo hex que quiser */
```

---

### 📧 Formulário de contato (Resend)

O formulário precisa de um backend para enviar emails de verdade. Consulte o arquivo `GUIA.md` (incluso no zip) para o passo a passo completo de migração para Next.js + Resend.

---

### 🛠️ Stack

| Camada | Tecnologia |
|--------|-----------|
| UI | React 18 |
| Build | Vite 5 |
| Estilização | CSS-in-JS (inline) + CSS custom properties |
| Animações | CSS keyframes + IntersectionObserver + Canvas 2D API |
| i18n | Objeto de traduções customizado (sem biblioteca) |
| Fontes | Syne (display) + DM Sans (corpo) via Google Fonts |

---

### 📄 Licença

MIT — livre para usar, adaptar e fazer deploy.

---
---

<div align="center">

## English Version

**[🇧🇷 Português](#-versão-em-português)** · 🇺🇸 English

</div>

---

## 🇺🇸 English Version

### About the project

A professional portfolio built from scratch with **React 18 + Vite**, no external UI frameworks. Every animation, component, and interaction was handcrafted — from the custom cursor to the animated stat counters.

The design follows a **dark minimalist aesthetic** with a green-lime accent (`#c8f065`), asymmetric layout, and careful typographic attention. Fully bilingual (PT/EN) and responsive.

---

### ✨ Features

**Design & Experience**
- Dark minimalist theme with green-lime accent
- Asymmetric hero layout with a floating code card
- Custom cursor with dot + following ring (desktop)
- Grain/noise overlay for a cinematic texture
- Scroll progress bar at the top of the page
- Floating "Back to top" button
- Animated underline on active nav link

**Animations**
- Typewriter name effect cycling through 6 languages (PT, JP, EN, KR, RU, AR)
- Animated stat counters (0 → final value with easing)
- Subtle canvas particles in the Hero (no library)
- Scroll-reveal animations throughout all sections
- Skill bars with fill animation + pulsing glow + live percentage counter
- Project cards that open a full detail overlay on click

**Functionality**
- PT ↔ EN toggle — every string translated (75+ strings)
- Mobile menu with animated hamburger
- CV download button
- Quick GitHub and LinkedIn icons in the nav
- Entry loading screen
- Functional contact form (Resend integration — see guide)
- Project detail page with full stack, highlights and results

---

### 🗂️ Project Structure

```
src/
├── App.jsx                  # Global state (lang, active section, selected project)
├── main.jsx                 # React entry point
│
├── data/
│   ├── content.js           # Projects, skills, timeline, links, CV URL
│   └── translations.js      # All PT and EN strings
│
├── styles/
│   └── global.js            # CSS variables, keyframes, responsive breakpoints
│
├── hooks/
│   ├── useReveal.js         # IntersectionObserver scroll animation hook
│   └── useCounter.js        # Animated count-up hook (0 → target)
│
└── components/
    ├── Nav.jsx              # Fixed nav + mobile hamburger + language toggle
    ├── Hero.jsx             # Intro screen with animated name and code card
    ├── AnimatedName.jsx     # Typewriter effect in 6 languages
    ├── ParticleField.jsx    # Canvas particles in Hero background
    ├── Marquee.jsx          # Infinite scrolling tech strip
    ├── About.jsx            # Bio + skills + career timeline
    ├── Projects.jsx         # Project card grid
    ├── ProjectDetail.jsx    # Detail overlay on card click
    ├── MockPreview.jsx      # CSS-only project previews (no images)
    ├── Skills.jsx           # Skills section with animated bars
    ├── Contact.jsx          # Contact form
    ├── Footer.jsx           # Footer with social links
    ├── BackToTop.jsx        # Floating back-to-top button
    ├── LoadingScreen.jsx    # Initial loading screen
    ├── Reveal.jsx           # Scroll-entry animation wrapper
    ├── SectionLabel.jsx     # "01 / Section ────" section header
    └── Cursor.jsx           # Custom cursor (desktop only)
```

---

### ⚙️ Running locally

**Requirements:** Node.js 18+ and npm

```bash
# 1. Clone or extract the project
cd portfolio-luiz-pedro

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

**Production build:**
```bash
npm run build
# Output in /dist — ready to deploy
```

---

### ✏️ Customizing content

All content lives in `src/data/` — no need to touch components.

**`src/data/content.js`** — personal info and projects:
```js
// Your social links
export const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/YOUR_USERNAME" },
  { label: "LinkedIn", href: "https://linkedin.com/in/YOUR_USERNAME" },
];

// Your CV URL (place the file in /public/)
export const CV_URL = "/CV.pdf";

// Your projects
export const PROJECTS = [
  { id: "01", name: "Project Name", year: "2025", tags: ["React", "Node.js"], link: "#" },
];
```

**`src/data/translations.js`** — all visible text in PT and EN.

**`src/styles/global.js`** — to change the accent color:
```css
--accent: #c8f065; /* swap for any hex */
```

---

### 📧 Contact form (Resend)

The form needs a backend to actually send emails. See `GUIA.md` (included in the zip) for the full step-by-step guide on migrating to Next.js + Resend.

---

### 🛠️ Stack

| Layer | Technology |
|-------|-----------|
| UI | React 18 |
| Build | Vite 5 |
| Styling | CSS-in-JS (inline) + CSS custom properties |
| Animations | CSS keyframes + IntersectionObserver + Canvas 2D API |
| i18n | Custom translation object (no library) |
| Fonts | Syne (display) + DM Sans (body) via Google Fonts |

---

### 📄 License

MIT — free to use, adapt, and deploy.
