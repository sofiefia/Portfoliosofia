// app.js

/* =========================
   i18n (PT/EN)
========================= */
const I18N = {
  en: {
    loading_text: "Loading portfolio…",
    loading_hint: "preparing the experience",

    btn_touch: "GET IN TOUCH!",
    btn_touch_aria: "Get in touch",
    hero_title: "I design cool interfaces, but mostly <br> for apps & websites.",
    assignment: "ASSIGNMENT",
    work_1_title: "Deseed app.",
    work_2_title: "Sushi branding case study.",
    work_3_title: "How I developed the Deseed app.",
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
    skills_sub: "A mix of design + dev — I like to keep things clean, consistent, and interactive.",
    design: "DESIGN",
    frontend: "FRONTEND",
    extras: "EXTRAS",
    prototyping: "Prototyping",
    wireframes: "Wireframes",
    design_systems: "Design Systems",
    responsive_ui: "Responsive UI",
    accessibility: "Accessibility",
    branding: "Branding",
    rebranding: "Rebranding",
    ui_motion: "UI Motion",
    content: "Content",
    presentation: "Presentation",
    dock_home: "Home",
    dock_work: "Work",
    dock_about: "About",
    dock_socials: "Socials",
    dock_skills: "Skills",
    pill_home: "Hi! I’m Sofia Barreiro",
    pill_1: "Check out my work.",
    pill_2: "More about me.",
    pill_3: "My socials.",
    pill_4: "My skills."
  },
  pt: {
    loading_text: "A carregar portfólio…",
    loading_hint: "a preparar a experiência",

    btn_touch: "CONTACTA-ME!",
    btn_touch_aria: "Contacta-me",
    hero_title: "Eu crio interfaces fixes, mas sobretudo <br> para apps e websites.",
    assignment: "TRABALHO",
    work_1_title: "App Deseed.",
    work_2_title: "Estudo de caso de branding de sushi.",
    work_3_title: "Como desenvolvi a app Deseed.",
    work_prev: "Projeto anterior",
    work_next: "Próximo projeto",
    bio_p1:
      'Sou a Sofia (2003), <span class="bio-accent">multi-disciplinary designer</span> de Braga, Portugal, com foco em UX e UI. Estou no início do meu percurso: licenciada em Multimédia e Tecnologias da Comunicação e, atualmente, a tirar o Mestrado em Design Digital no IPCA, onde continuo a explorar como o design pode criar experiências digitais claras, intuitivas e com significado.',
    bio_p2:
      "Fora do trabalho, gosto de ver filmes, musicais e séries, estar com gatos sempre que posso, descobrir novos tipos de sushi e ouvir música quase o tempo todo.",
    linkedin: "LinkedIn",
    resume: "Currículo",
    email: "Email",
    hover_folders: "passa o rato nas pastas",
    toolkit: "FERRAMENTAS",
    skills_title: "Skills & ferramentas que uso.",
    skills_sub: "Um mix de design + dev — gosto de manter tudo limpo, consistente e interativo.",
    design: "DESIGN",
    frontend: "FRONTEND",
    extras: "EXTRAS",
    prototyping: "Prototipagem",
    wireframes: "Wireframes",
    design_systems: "Sistemas de Design",
    responsive_ui: "UI Responsiva",
    accessibility: "Acessibilidade",
    branding: "Branding",
    rebranding: "Rebranding",
    ui_motion: "Motion UI",
    content: "Conteúdo",
    presentation: "Apresentação",
    dock_home: "Início",
    dock_work: "Projetos",
    dock_about: "Sobre",
    dock_socials: "Redes",
    dock_skills: "Skills",
    pill_home: "Hi! Eu sou a Sofia Barreiro",
    pill_1: "Vê os meus projetos.",
    pill_2: "Mais sobre mim.",
    pill_3: "As minhas redes.",
    pill_4: "As minhas skills."
  }
};

let currentLang = (localStorage.getItem("lang") || "en");
if (!I18N[currentLang]) currentLang = "en";

function applyI18n(lang){
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.setAttribute("lang", lang);

  const langBtn = document.getElementById("langToggle");
  if (langBtn) langBtn.textContent = (lang === "pt") ? "EN" : "PT";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const value = I18N[lang][key];
    if (typeof value === "string") el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    if (!key) return;
    const value = I18N[lang][key];
    if (typeof value === "string") el.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const key = el.getAttribute("data-i18n-aria");
    if (!key) return;
    const value = I18N[lang][key];
    if (typeof value === "string") el.setAttribute("aria-label", value);
  });

  requestAnimationFrame(() => { try { spy(); } catch {} });
}

document.addEventListener("click", (e) => {
  const btn = e.target?.closest?.("#langToggle");
  if (!btn) return;
  applyI18n(currentLang === "pt" ? "en" : "pt");
});

applyI18n(currentLang);


/* =========================
   DARK / LIGHT MODE
========================= */
const themeBtn = document.getElementById("themeToggle");

function applyTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);

  if(themeBtn){
    const isDark = theme === "dark";
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    themeBtn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
}

function getTheme(){
  const saved = localStorage.getItem("theme");
  if(saved === "dark" || saved === "light") return saved;
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
   Gradiente que segue o mouse
========================= */
const root = document.documentElement;
function updateGradient(x, y){
  root.style.setProperty("--mx", x + "px");
  root.style.setProperty("--my", y + "px");
}
window.addEventListener("mousemove", (e) => updateGradient(e.clientX, e.clientY));
window.addEventListener("touchmove", (e) => {
  if(e.touches.length > 0) updateGradient(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });


/* =========================
   Relógio
========================= */
function updateClock(){
  const el = document.getElementById("clock");
  if(!el) return;

  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  el.textContent = `${hours.toString().padStart(2,"0")}:${minutes}${ampm}`;
}
updateClock();
setInterval(updateClock, 1000);


/* =========================
   Navegação por páginas (snap)
========================= */
const scroller = document.getElementById("pages");
const dots = Array.from(document.querySelectorAll(".dock-dot"));

function setActiveDot(index){
  dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
}

function goToSection(id){
  const section = document.querySelector(id);
  if(!section || !scroller) return;

  scroller.scrollTo({
    top: section.offsetTop,
    behavior: "smooth"
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", (e) => {
    e.preventDefault();
    const href = dot.getAttribute("href");
    if(!href) return;
    setActiveDot(i);
    goToSection(href);
  });
});

/* PILL inteligente */
const pillText = document.getElementById("pillText");
const smartPill = document.getElementById("smartPill");

function setPillForIndex(index){
  if(!pillText || !smartPill) return;

  if(index === 1){
    pillText.textContent = I18N[currentLang].pill_home;
smartPill.setAttribute("href", "#play");
smartPill.setAttribute("aria-label", I18N[currentLang].pill_home);

  }
  if(index === 2){
    pillText.textContent = I18N[currentLang].pill_2;
    smartPill.setAttribute("href", "#play");
    smartPill.setAttribute("aria-label", I18N[currentLang].pill_2);
    return;
  }
  if(index === 3){
    pillText.textContent = I18N[currentLang].pill_3;
    smartPill.setAttribute("href", "#contact");
    smartPill.setAttribute("aria-label", I18N[currentLang].pill_3);
    return;
  }
  if(index === 4){
    pillText.textContent = I18N[currentLang].pill_4;
    smartPill.setAttribute("href", "#home");
    smartPill.setAttribute("aria-label", I18N[currentLang].pill_4);
    return;
  }

  pillText.textContent = I18N[currentLang].pill_home;
  smartPill.setAttribute("href", "#about");
  smartPill.setAttribute("aria-label", I18N[currentLang].pill_home);
}

function spy(){
  if(!scroller) return;

  const pages = ["#home","#about","#work","#play","#contact"]
    .map(sel => document.querySelector(sel))
    .filter(Boolean);

  const pos = scroller.scrollTop;
  let best = 0;
  let bestDist = Infinity;

  pages.forEach((p, idx) => {
    const dist = Math.abs(pos - p.offsetTop);
    if(dist < bestDist){
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
   Carousel (Página 2)
========================= */
let workCards = Array.from(document.querySelectorAll(".work-card"));
const btnPrev = document.getElementById("workPrev");
const btnNext = document.getElementById("workNext");

function applyRoles(){
  if(workCards.length !== 3) return;
  workCards[0].setAttribute("data-role","left");
  workCards[1].setAttribute("data-role","center");
  workCards[2].setAttribute("data-role","right");
}

function rotateNext(){
  workCards.unshift(workCards.pop());
  applyRoles();
}

function rotatePrev(){
  workCards.push(workCards.shift());
  applyRoles();
}

applyRoles();
btnNext?.addEventListener("click", rotateNext);
btnPrev?.addEventListener("click", rotatePrev);


/* =========================
   ✅ SPLASH (5s) - FULL PAGE
========================= */
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");

  // garante idioma no splash logo ao abrir
  try { applyI18n(currentLang); } catch {}

  setTimeout(() => {
    splash?.classList.add("hide");
    document.body.classList.remove("is-loading");
  }, 5000);
});
