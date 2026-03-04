// ─────────────────────────────────────────────────────────────────────────────
// App.jsx — com LoadingScreen, SEO dinâmico via <title>, lang state
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { GLOBAL_STYLES } from "./styles/global";
import { LoadingScreen } from "./components/LoadingScreen";
import { Cursor   } from "./components/Cursor";
import { Nav      } from "./components/Nav";
import { Hero     } from "./components/Hero";
import { Marquee  } from "./components/Marquee";
import { About    } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills   } from "./components/Skills";
import { Contact  } from "./components/Contact";
import { Footer        } from "./components/Footer";
import { ProjectDetail  } from "./components/ProjectDetail";
import { BackToTop      } from "./components/BackToTop";

const SEO_TITLES = {
  PT: "Luiz Pedro — Full Stack Developer",
  EN: "Luiz Pedro — Full Stack Developer",
};
const SEO_DESCS = {
  PT: "Portfólio de Luiz Pedro, Full Stack Developer especializado em React, Node.js e TypeScript.",
  EN: "Portfolio of Luiz Pedro, Full Stack Developer specialized in React, Node.js and TypeScript.",
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang]       = useState("PT");
  const [active, setActive]        = useState("");
  const [selectedProject, setProject] = useState(null);

  // Atualiza <title> e meta description quando idioma muda
  useEffect(() => {
    document.title = SEO_TITLES[lang];
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", SEO_DESCS[lang]);
  }, [lang]);

  // IntersectionObserver para nav ativa
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    ["sobre","projetos","contato"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [loading]); // re-observa após loading terminar

  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      {/* Loading screen — some após ~1.8s */}
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      {/* Site (fica por baixo até loading sumir) */}
      <div style={{ opacity: loading ? 0 : 1, transition: "opacity .4s ease .1s" }}>
        <div className="noise" />
        <Cursor />
        <Nav active={active} lang={lang} setLang={setLang} />
        <Hero     lang={lang} />
        <Marquee  />
        <About    lang={lang} />
        <Projects lang={lang} onSelectProject={setProject} />
        <Skills   lang={lang} />
        <Contact  lang={lang} />
        <Footer   lang={lang} />
        <BackToTop />
        {selectedProject && <ProjectDetail project={selectedProject} lang={lang} onClose={() => setProject(null)} />}
      </div>
    </>
  );
}
