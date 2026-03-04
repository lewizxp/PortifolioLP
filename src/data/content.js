// ✏️ Edite este arquivo para personalizar o portfólio

export const NAME_VARIANTS = [
  { text: "Luiz Pedro",     lang: "PT" },
  { text: "ルイス・ペドロ", lang: "JP" },
  { text: "Luiz Pedro",     lang: "EN" },
  { text: "루이스 페드로",  lang: "KR" },
  { text: "Луиз Педро",     lang: "RU" },
  { text: "لويز بيدرو",     lang: "AR" },
];

export const SKILLS = [
  { catKey: "fe",     items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma"] },
  { catKey: "be",     items: ["Node.js", "PostgreSQL", "REST API", "MongoDB"] },
  { catKey: "devops", items: ["Git", "GitHub", "Vite", "Vercel", "VS Code"] },
];

export const TIMELINE = [
  { year: "2025", company: "Stone Pagamentos" },
  { year: "2025", company: "DevWest"          },
];

export const PROJECTS = [
  {
    id:   "01",
    name: "Sistema de Estoque",
    year: "2025",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "#",
  },
  {
    id:   "02",
    name: "TotalPrevi — Site",
    year: "2025",
    tags: ["React", "Figma", "CSS"],
    link: "#",
  },
  {
    id:   "03",
    name: "TotalPrevi — Componentes",
    year: "2025",
    tags: ["React", "Design System", "Figma"],
    link: "#",
  },
  {
    id:   "04",
    name: "TotalPrevi — Sobre",
    year: "2025",
    tags: ["React", "Animações", "Responsivo"],
    link: "#",
  },
];

export const CONTACT_LINKS = [
  { label: "Email",    value: "luizpedro@email.com"         },
  { label: "LinkedIn", value: "/in/luizpedro"               },
  { label: "GitHub",   value: "@luizpedro"                  },
];

// ✏️ Troque pelos seus links reais
export const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/SEU_USUARIO"      },
  { label: "LinkedIn", href: "https://linkedin.com/in/SEU_USUARIO" },
];

// ✏️ Coloque seu CV.pdf dentro da pasta /public
export const CV_URL = "/CV.pdf";

export const MARQUEE_ITEMS = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
  "Figma", "Git", "Tailwind", "REST API", "Vercel", "MongoDB", "Vite",
];
