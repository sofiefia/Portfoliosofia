// app.js

/* =========================
   i18n (PT/EN) — corrigido (sem “erros de língua”)
========================= */
const I18N = {
  en: {
    loading_text: "Loading portfolio…",
    loading_hint: "preparing the experience",

    btn_touch: "GET IN TOUCH!",
    btn_touch_aria: "Get in touch",

    hero_title: "I design cool interfaces, but mostly <br> for apps & websites.",
    work_section_title: "My main projects",

    assignment: "ASSIGNMENT",
    work_1_title: "Deseed",
    work_2_title: "Janes",
    work_3_title: "Imerse",
    work_prev: "Previous project",
    work_next: "Next project",

    bio_p1:
      'I am Sofia (2003), a <span class="bio-accent">multi-disciplinary designer</span> based in Braga, Portugal, with a focus on UX and UI design. I’m at the beginning of my journey, holding a degree in Multimedia and Communication Technologies and currently pursuing a Master’s in Digital Design at IPCA, where I continue to explore how design can shape clear, intuitive, and meaningful digital experiences.',
    bio_p2:
      "Outside of work, I enjoy watching movies, musicals, and series, spending time with cats whenever I get the chance, discovering new types of sushi, and listening to music almost constantly.",

    linkedin: "LinkedIn",
    resume: "Resume",
    email: "Email",
    hover_folders: "hover the folders",

    toolkit: "TOOLKIT",
    skills_title: "Skills & tools I use.",
    skills_sub:
      "A mix of design — I like to keep things clean, consistent, and interactive.",

    design: "DESIGN",
    frontend: "FRONTEND",
    extras: "EXTRAS",
    currently_learning: "CURRENTLY LEARNING",

    dock_home: "Home",
    dock_work: "Projects",
    dock_about: "About",
    dock_socials: "Contacts",
    dock_skills: "Tools",

    // ✅ corrigido: inglês em inglês
    pill_home: "Hi! I’m Sofia Barreiro",
    pill_1: "Explore my projects.",
    pill_2: "A bit about me.",
    pill_3: "My contacts.",
    pill_4: "My toolkit.",
  },

  pt: {
    loading_text: "A carregar o portfólio…",
    loading_hint: "a preparar a experiência",

    btn_touch: "CONTACTA-ME!",
    btn_touch_aria: "Contacta-me",

    hero_title: "Crio interfaces fixes, sobretudo <br> para apps e websites.",
    work_section_title: "Os meus projetos principais",

    assignment: "PROJETO",
    work_1_title: "Deseed",
    work_2_title: "Janes",
    work_3_title: "Imerse",
    work_prev: "Projeto anterior",
    work_next: "Próximo projeto",

    bio_p1:
      'Sou a Sofia (2003), <span class="bio-accent">designer multidisciplinar</span> de Braga, com foco em UX e UI. Estou no início do meu percurso: licenciada em Multimédia e Tecnologias da Comunicação e, atualmente, a frequentar o Mestrado em Design Digital no IPCA, onde continuo a explorar como o design pode criar experiências digitais claras, intuitivas e com significado.',
    bio_p2:
      "Fora do trabalho, gosto de ver filmes, musicais e séries, passar tempo com gatos sempre que posso, descobrir novos tipos de sushi e ouvir música quase constantemente.",

    linkedin: "LinkedIn",
    resume: "Currículo",
    email: "Email",
    hover_folders: "passa o rato nas pastas",

    toolkit: "FERRAMENTAS",
    skills_title: "Skills & ferramentas que uso.",
    skills_sub:
      "Um mix de design — gosto de manter tudo limpo, consistente e interativo.",

    design: "DESIGN",
    frontend: "FRONTEND",
    extras: "EXTRAS",
    currently_learning: "A APRENDER NESTE MOMENTO",

    dock_home: "Início",
    dock_work: "Projetos",
    dock_about: "Sobre",
    dock_socials: "Contactos",
    dock_skills: "Ferramentas",

    pill_home: "Olá! Sou a Sofia Barreiro",
    pill_1: "Vê os meus projetos.",
    pill_2: "Conhece-me melhor.",
    pill_3: "Os meus contactos.",
    pill_4: "As minhas ferramentas.",
  },
};

let currentLang = localStorage.getItem("lang") || "en";
if (!I18N[currentLang]) currentLang = "en";

/* =========================
   Tirar o título “My main projects” de cima (se existir fora do card)
   - mantém apenas no kicker do card do meio
========================= */
function hideTopWorkTitleIfExists() {
  // apanha qualquer título solto na página
  const candidates = Array.from(document.querySelectorAll('[data-i18n="work_section_title"]'));
  candidates.forEach((el) => {
    // se NÃO estiver dentro de um card, escondemos
    if (!el.closest(".work-card")) {
      el.style.display = "none";
      el.setAttribute("aria-hidden", "true");
    }
  });

  // extra: se houver um H2/H3 com texto “My main projects”, também escondemos
  const looseHeadings = Array.from(document.querySelectorAll("h1,h2,h3,p,div,span"));
  looseHeadings.forEach((el) => {
    if (el.closest(".work-card")) return;
    const t = (el.textContent || "").trim().toLowerCase();
    if (t === "my main projects" || t === "os meus projetos principais") {
      el.style.display = "none";
      el.setAttribute("aria-hidden", "true");
    }
  });
}

/* =========================
   “My main projects” dentro do retângulo rosa (no kicker do card do meio)
========================= */
function refreshWorkKickers() {
  const cards = Array.from(document.querySelectorAll(".work-card"));
  cards.forEach((card) => {
    const kicker = card.querySelector(".work-kicker");
    if (!kicker) return;
    const role = card.getAttribute("data-role");
    kicker.textContent =
      role === "center"
        ? I18N[currentLang].work_section_title
        : I18N[currentLang].assignment;
  });
}

function applyI18n(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.setAttribute("lang", lang);

  const langBtn = document.getElementById("langToggle");
  if (langBtn) langBtn.textContent = lang === "pt" ? "EN" : "PT";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const value = I18N[lang][key];
    if (typeof value === "string") el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (!key) return;
    const value = I18N[lang][key];
    if (typeof value === "string") el.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (!key) return;
    const value = I18N[lang][key];
    if (typeof value === "string") el.setAttribute("aria-label", value);
  });

  requestAnimationFrame(() => {
    try { hideTopWorkTitleIfExists(); } catch {}
    try { refreshWorkKickers(); } catch {}
    try { spy(); } catch {}
  });
}

document.addEventListener("click", (e) => {
  const btn = e.target?.closest?.("#langToggle");
  if (!btn) return;
  applyI18n(currentLang === "pt" ? "en" : "pt");
});

applyI18n(currentLang);

/* =========================
   DARK / LIGHT MODE — melhora bordos no modo noturno
   (inject leve, sem mexer no CSS)
========================= */
const themeBtn = document.getElementById("themeToggle");

function ensureDarkBorderStyles() {
  if (document.getElementById("dark-border-tweak")) return;

  const style = document.createElement("style");
  style.id = "dark-border-tweak";
  style.textContent = `
    html[data-theme="dark"]{
      /* bordos mais “premium” e coerentes com o rosa */
      --border-soft: rgba(255, 200, 220, 0.16);
      --border: rgba(255, 210, 230, 0.22);
      --panel: rgba(18, 14, 18, 0.60);
      --panel-strong: rgba(20, 15, 22, 0.92);
    }
  `;
  document.head.appendChild(style);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  ensureDarkBorderStyles();

  if (themeBtn) {
    const isDark = theme === "dark";
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    themeBtn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

function getTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return "light";
}

applyTheme(getTheme());

themeBtn?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

/* =========================
   Fundo leve: “ambient” + mouse só dá boost (baratinho)
========================= */
const root = document.documentElement;
const mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 };
const target = { x: mouse.x, y: mouse.y };

function lerp(a, b, t) { return a + (b - a) * t; }
function onPointerMove(x, y) { target.x = x; target.y = y; }

window.addEventListener("mousemove", (e) => onPointerMove(e.clientX, e.clientY), { passive: true });
window.addEventListener("touchmove", (e) => {
  if (e.touches?.length) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });

(function animateBg() {
  mouse.x = lerp(mouse.x, target.x, 0.07);
  mouse.y = lerp(mouse.y, target.y, 0.07);

  const px = (mouse.x / Math.max(1, window.innerWidth)) * 100;
  const py = (mouse.y / Math.max(1, window.innerHeight)) * 100;

  root.style.setProperty("--mx", px.toFixed(2) + "%");
  root.style.setProperty("--my", py.toFixed(2) + "%");

  requestAnimationFrame(animateBg);
})();

/* =========================
   Relógio
========================= */
function updateClock() {
  const el = document.getElementById("clock");
  if (!el) return;

  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  el.textContent = `${hours.toString().padStart(2, "0")}:${minutes}${ampm}`;
}
updateClock();
setInterval(updateClock, 1000);

/* =========================
   Navegação por páginas (snap)
========================= */
const scroller = document.getElementById("pages");
const dots = Array.from(document.querySelectorAll(".dock-dot"));

function setActiveDot(index) {
  dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
}

function goToSection(id) {
  const section = document.querySelector(id);
  if (!section || !scroller) return;

  scroller.scrollTo({
    top: section.offsetTop,
    behavior: "smooth",
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", (e) => {
    e.preventDefault();
    const href = dot.getAttribute("href");
    if (!href) return;
    setActiveDot(i);
    goToSection(href);
  });
});

/* =========================
   PILL inteligente (texto sempre consistente com o idioma)
========================= */
const pillText = document.getElementById("pillText");
const smartPill = document.getElementById("smartPill");

function setPillForIndex(index) {
  if (!pillText || !smartPill) return;

  if (index === 0) {
    pillText.textContent = I18N[currentLang].pill_home;
    smartPill.setAttribute("href", "#about");
    smartPill.setAttribute("aria-label", I18N[currentLang].pill_home);
    return;
  }
  if (index === 1) {
    pillText.textContent = I18N[currentLang].pill_1;
    smartPill.setAttribute("href", "#about");
    smartPill.setAttribute("aria-label", I18N[currentLang].pill_1);
    return;
  }
  if (index === 2) {
    pillText.textContent = I18N[currentLang].pill_2;
    smartPill.setAttribute("href", "#work");
    smartPill.setAttribute("aria-label", I18N[currentLang].pill_2);
    return;
  }
  if (index === 3) {
    pillText.textContent = I18N[currentLang].pill_3;
    smartPill.setAttribute("href", "#play");
    smartPill.setAttribute("aria-label", I18N[currentLang].pill_3);
    return;
  }
  if (index === 4) {
    pillText.textContent = I18N[currentLang].pill_4;
    smartPill.setAttribute("href", "#contact");
    smartPill.setAttribute("aria-label", I18N[currentLang].pill_4);
    return;
  }

  pillText.textContent = I18N[currentLang].pill_home;
  smartPill.setAttribute("href", "#about");
  smartPill.setAttribute("aria-label", I18N[currentLang].pill_home);
}

function spy() {
  if (!scroller) return;

  const pages = ["#home", "#about", "#work", "#play", "#contact"]
    .map((sel) => document.querySelector(sel))
    .filter(Boolean);

  const pos = scroller.scrollTop;
  let best = 0;
  let bestDist = Infinity;

  pages.forEach((p, idx) => {
    const dist = Math.abs(pos - p.offsetTop);
    if (dist < bestDist) {
      bestDist = dist;
      best = idx;
    }
  });

  setActiveDot(best);
  setPillForIndex(best);
}

spy();
scroller?.addEventListener("scroll", () => requestAnimationFrame(spy), { passive: true });
window.addEventListener("resize", () => requestAnimationFrame(spy));

/* =========================
   Carousel (Página 2) — 3 cards
========================= */
let workCards = Array.from(document.querySelectorAll(".work-card"));
const btnPrev = document.getElementById("workPrev");
const btnNext = document.getElementById("workNext");

workCards = workCards.slice(0, 3);

function applyRoles() {
  if (workCards.length < 3) return;

  workCards.forEach((c) => c.setAttribute("data-role", "hidden"));
  workCards[0].setAttribute("data-role", "left");
  workCards[1].setAttribute("data-role", "center");
  workCards[2].setAttribute("data-role", "right");

  refreshWorkKickers();
}

function rotateNext() {
  if (workCards.length < 2) return;
  workCards.push(workCards.shift());
  applyRoles();
  applyWorkCovers();
}

function rotatePrev() {
  if (workCards.length < 2) return;
  workCards.unshift(workCards.pop());
  applyRoles();
  applyWorkCovers();
}

applyRoles();
btnNext?.addEventListener("click", rotateNext);
btnPrev?.addEventListener("click", rotatePrev);

/* =========================
   cover + link
========================= */
function applyWorkCovers() {
  workCards.forEach((card) => {
    const cover = card.getAttribute("data-cover");
    if (!cover) return;

    const media = card.querySelector(".work-media");
    if (!media) return;

    media.style.backgroundImage = `url("${cover}")`;
    media.style.backgroundSize = "cover";
    media.style.backgroundPosition = "center";
    media.style.backgroundRepeat = "no-repeat";
  });
}

function setupWorkCardLinks() {
  workCards.forEach((card) => {
    const url = card.getAttribute("data-link");
    if (!url) return;

    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");

    const open = () => window.open(url, "_blank", "noopener,noreferrer");

    card.addEventListener("click", (e) => {
      const isArrow = e.target.closest?.(".work-arrow");
      if (isArrow) return;
      open();
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

applyWorkCovers();
setupWorkCardLinks();

/* =========================
   Links fixes (email + currículo)
========================= */
(function patchLinks() {
  const mail = document.querySelector(".folder-link.folder-mail");
  if (mail) {
    mail.setAttribute("href", "mailto:sofiabarreiroa@gmail.com");
    mail.setAttribute("aria-label", "Email: sofiabarreiroa@gmail.com");
  }

  const cv = document.querySelector(".folder-link.folder-cv");
  if (cv) {
cv.setAttribute("href", "./Curriculo_SBA.pdf");
    cv.setAttribute("target", "_blank");
    cv.setAttribute("rel", "noreferrer");
    cv.setAttribute("aria-label", "Currículo (PDF)");
  }
})();

/* =========================
   SPLASH (5s)
========================= */
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");

  try { ensureDarkBorderStyles(); } catch {}
  try { applyI18n(currentLang); } catch {}
  try { applyWorkCovers(); } catch {}
  try { applyRoles(); } catch {}
  try { hideTopWorkTitleIfExists(); } catch {}
  try { spy(); } catch {}

  setTimeout(() => {
    splash?.classList.add("hide");
    document.body.classList.remove("is-loading");
  }, 5000);
});
