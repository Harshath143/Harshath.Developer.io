import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, BookOpen, Youtube, Folder, ArrowDownToLine, Send, Brain, Cpu, Terminal, Cloud, Code, Wrench, MapPin, Clock, Calendar, ArrowUpRight, X, Activity, Database, Network, ShieldCheck, Unlock, Lock, AlertCircle, Bot, Sparkles, User, FileDown, ExternalLink, Trophy, GraduationCap, Award } from "lucide-react";
const ThemeContext = createContext({ theme: "dark", setTheme: () => {
}, cycle: () => {
} });
const ORDER = ["dark", "ai", "light"];
const STORAGE_KEY = "harshath-theme";
function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark");
  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
    if (stored && ORDER.includes(stored)) setThemeState(stored);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme === "light" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
    }
  }, [theme]);
  const setTheme = (t) => setThemeState(t);
  const cycle = () => setThemeState((t) => ORDER[(ORDER.indexOf(t) + 1) % ORDER.length]);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, setTheme, cycle }, children });
}
const useTheme = () => useContext(ThemeContext);
function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    let raf = 0;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children });
}
function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };
    const checkHover = (e) => {
      const t = e.target;
      if (!t) return;
      const interactive = t.closest("a, button, [data-cursor='hover'], input, textarea, select");
      setHover(!!interactive);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHover);
    let raf = 0;
    const tick = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;
      if (ring.current) {
        const s = hover ? 1.8 : 1;
        ring.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0) scale(${s})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
      cancelAnimationFrame(raf);
    };
  }, [hover]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: dot,
        "aria-hidden": true,
        className: "pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-primary mix-blend-difference hidden md:block"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: ring,
        "aria-hidden": true,
        className: "pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-primary mix-blend-difference transition-[width,height,opacity,border-color] duration-200 hidden md:block",
        style: { boxShadow: hover ? "0 0 24px var(--color-primary)" : "none" }
      }
    )
  ] });
}
const NAME = "MOHAMMED HARSHATH";
function Loader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 18);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => setShow(false), 500);
      }
    }, 140);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: show && /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0, y: "-100%" },
      transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
      className: "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "absolute -top-40 -left-40 h-[60vmin] w-[60vmin] rounded-full opacity-60 blur-3xl",
            style: { background: "radial-gradient(circle, var(--color-primary), transparent 70%)" }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "absolute -bottom-40 -right-40 h-[60vmin] w-[60vmin] rounded-full opacity-50 blur-3xl",
            style: { background: "radial-gradient(circle, var(--color-secondary), transparent 70%)" }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-wrap justify-center gap-1 px-6", children: NAME.split("").map((ch, i) => /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { y: 40, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { delay: i * 0.03, duration: 0.45, ease: "easeOut" },
            className: "font-display text-3xl md:text-6xl font-bold tracking-tight",
            children: ch === " " ? " " : ch
          },
          i
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 mt-10 w-64 md:w-96", children: [
          /* @__PURE__ */ jsx("div", { className: "h-[2px] w-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "h-full bg-primary",
              style: { width: `${progress}%` },
              transition: { ease: "linear" }
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex justify-between font-mono text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsx("span", { children: "Initializing experience" }),
            /* @__PURE__ */ jsxs("span", { children: [
              Math.floor(progress),
              "%"
            ] })
          ] })
        ] })
      ]
    }
  ) });
}
const profilePic = "/assets/Harshath_profile-Ce5VEvY4.jpeg";
const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "testimonials", label: "Testimonials" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" }
];
const THEMES = [
  { key: "dark", label: "Dark", swatch: "#00D4FF" },
  { key: "ai", label: "AI", swatch: "#00FFB3" },
  { key: "light", label: "Light", swatch: "#E63946" }
];
function RadialNav() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const onJump = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "fixed top-0 inset-x-0 z-50 px-5 md:px-10 py-5 flex items-center justify-between mix-blend-difference", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#hero",
          onClick: (e) => {
            e.preventDefault();
            onJump("hero");
            const clickCount = window._logoClicks || 0;
            const newCount = clickCount + 1;
            window._logoClicks = newCount;
            if (newCount >= 5) {
              window.dispatchEvent(new CustomEvent("trigger-dev-login"));
              window._logoClicks = 0;
            } else {
              if (window._logoTimeout) clearTimeout(window._logoTimeout);
              window._logoTimeout = setTimeout(() => {
                window._logoClicks = 0;
              }, 2e3);
            }
          },
          className: "relative block rounded-full overflow-hidden h-8 w-8 border border-white/25 hover:border-primary/80 transition-colors duration-300 select-none group",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: profilePic,
              alt: "Mohammed Harshath Profile Logo",
              className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-1.5 mr-2", children: THEMES.map((t) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setTheme(t.key),
            "aria-label": `${t.label} theme`,
            className: "h-3 w-3 rounded-full border border-white/40 transition-transform hover:scale-125",
            style: {
              background: t.swatch,
              boxShadow: theme === t.key ? `0 0 10px ${t.swatch}` : "none",
              transform: theme === t.key ? "scale(1.15)" : "scale(1)"
            }
          },
          t.key
        )) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setOpen(!open),
            "aria-label": open ? "Close menu" : "Open menu",
            "data-cursor": "hover",
            className: "relative h-12 w-12 rounded-full border border-white/30 grid place-items-center text-white",
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Menu" }),
              /* @__PURE__ */ jsxs("div", { className: "relative h-4 w-5", children: [
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    animate: open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 },
                    className: "absolute top-0 left-0 right-0 h-[2px] bg-current origin-center"
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    animate: open ? { opacity: 0 } : { opacity: 1 },
                    className: "absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-current"
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    animate: open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 },
                    className: "absolute bottom-0 left-0 right-0 h-[2px] bg-current origin-center"
                  }
                )
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.4 },
        className: "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl",
        onClick: () => setOpen(false),
        children: [
          [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0, opacity: 0.6 },
              animate: { scale: 1, opacity: 0 },
              transition: { duration: 1.4, delay: i * 0.12, ease: "easeOut", repeat: Infinity },
              className: "absolute top-7 right-7 md:top-9 md:right-9 h-12 w-12 rounded-full border border-primary -translate-y-0 origin-center"
            },
            i
          )),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "absolute inset-0 grid place-items-center",
              onClick: (e) => e.stopPropagation(),
              children: [
                /* @__PURE__ */ jsxs("div", { className: "relative hidden md:block h-[min(80vh,720px)] w-[min(80vh,720px)]", children: [
                  SECTIONS.map((s, i) => {
                    const angle = i / SECTIONS.length * Math.PI * 2 - Math.PI / 2;
                    const r = 280;
                    const x = Math.cos(angle) * r;
                    const y = Math.sin(angle) * r;
                    return /* @__PURE__ */ jsxs(
                      motion.button,
                      {
                        initial: { opacity: 0, x: 0, y: 0, scale: 0.3 },
                        animate: { opacity: 1, x, y, scale: 1 },
                        exit: { opacity: 0, x: 0, y: 0, scale: 0.3 },
                        transition: { delay: 0.15 + i * 0.05, duration: 0.55, ease: [0.65, 0, 0.35, 1] },
                        onClick: () => onJump(s.id),
                        "data-cursor": "hover",
                        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-3 rounded-full border border-border bg-card/60 backdrop-blur font-display font-medium text-foreground hover:text-primary hover:border-primary transition-colors whitespace-nowrap",
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "text-primary mr-2 font-mono text-xs", children: String(i + 1).padStart(2, "0") }),
                          s.label
                        ]
                      },
                      s.id
                    );
                  }),
                  /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: { scale: 0 },
                      animate: { scale: 1, rotate: 360 },
                      transition: { duration: 18, repeat: Infinity, ease: "linear" },
                      className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full border border-dashed border-primary/40"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-muted-foreground", children: "— EXPLORE —" }),
                    /* @__PURE__ */ jsx("p", { className: "mt-1 font-display text-xl gradient-text font-bold", children: "Harshath.dev" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "md:hidden flex flex-col gap-3 px-8 w-full", children: SECTIONS.map((s, i) => /* @__PURE__ */ jsxs(
                  motion.button,
                  {
                    initial: { opacity: 0, x: -30 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.1 + i * 0.04 },
                    onClick: () => onJump(s.id),
                    className: "text-left py-3 border-b border-border font-display text-2xl font-bold flex items-baseline gap-3 hover:text-primary",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-primary", children: String(i + 1).padStart(2, "0") }),
                      s.label
                    ]
                  },
                  s.id
                )) })
              ]
            }
          )
        ]
      },
      "overlay"
    ) })
  ] });
}
const SOCIALS = [
  { Icon: Github, href: "https://github.com/Harshath143", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/mohammed-harshath-ss-a68435208/", label: "LinkedIn" },
  { Icon: Mail, href: "mailto:harshathdeveloper@gmail.com", label: "Email" },
  { Icon: BookOpen, href: "https://medium.com", label: "Medium" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" }
];
function SidebarLeft() {
  return /* @__PURE__ */ jsx("aside", { className: "fixed left-5 bottom-0 z-30 hidden md:flex flex-col items-center gap-5 after:content-[''] after:block after:w-px after:h-24 after:bg-border after:mt-4", children: SOCIALS.map(({ Icon, href, label }) => /* @__PURE__ */ jsxs(
    "a",
    {
      href,
      target: "_blank",
      rel: "noreferrer noopener",
      "aria-label": label,
      "data-cursor": "hover",
      className: "group relative text-muted-foreground hover:text-primary transition-all hover:-translate-y-1",
      children: [
        /* @__PURE__ */ jsx(Icon, { className: "h-[18px] w-[18px] transition-transform group-hover:scale-110" }),
        /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": true,
            className: "absolute inset-0 rounded-full opacity-0 blur-md group-hover:opacity-60 transition-opacity",
            style: { background: "var(--color-primary)" }
          }
        )
      ]
    },
    label
  )) });
}
function SidebarRight() {
  return /* @__PURE__ */ jsx("aside", { className: "fixed right-5 bottom-0 z-30 hidden md:flex flex-col items-center gap-6 after:content-[''] after:block after:w-px after:h-24 after:bg-border after:mt-4", children: /* @__PURE__ */ jsx(
    "a",
    {
      href: "mailto:harshathdeveloper@gmail.com",
      "data-cursor": "hover",
      className: "font-mono text-xs tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors",
      style: { writingMode: "vertical-rl" },
      children: "harshathdeveloper@gmail.com"
    }
  ) });
}
const SHAPES = [
  "M421,308Q406,366,355,401Q304,436,243,427Q182,418,131,381Q80,344,72,277Q64,210,108,162Q152,114,217,95Q282,76,341,108Q400,140,422,200Q444,260,421,308Z",
  "M438,312Q420,374,366,407Q312,440,247,430Q182,420,128,384Q74,348,78,278Q82,208,127,162Q172,116,237,99Q302,82,361,114Q420,146,440,203Q460,260,438,312Z",
  "M414,304Q402,360,353,397Q304,434,240,430Q176,426,124,386Q72,346,76,274Q80,202,128,158Q176,114,239,92Q302,70,358,108Q414,146,424,203Q434,260,414,304Z",
  "M430,300Q412,360,358,398Q304,436,242,422Q180,408,134,372Q88,336,82,272Q76,208,124,164Q172,120,237,102Q302,84,360,118Q418,152,432,206Q446,260,430,300Z"
];
function MouseBlob() {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const shapeIdx = useRef(0);
  useEffect(() => {
    const init = () => {
      target.current = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.45 };
      pos.current = { ...target.current };
    };
    init();
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", init);
    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.05;
      pos.current.y += (target.current.y - pos.current.y) * 0.05;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${pos.current.x - 360}px, ${pos.current.y - 360}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const morph = window.setInterval(() => {
      shapeIdx.current = (shapeIdx.current + 1) % SHAPES.length;
      if (pathRef.current) {
        pathRef.current.setAttribute("d", SHAPES[shapeIdx.current]);
      }
    }, 2200);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", init);
      cancelAnimationFrame(raf);
      clearInterval(morph);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      "aria-hidden": true,
      ref: wrapRef,
      className: "pointer-events-none fixed top-0 left-0 z-0 hidden md:block will-change-transform",
      style: { filter: "blur(60px)" },
      children: /* @__PURE__ */ jsxs("svg", { width: "720", height: "720", viewBox: "0 0 500 500", className: "opacity-40", children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("radialGradient", { id: "blobGrad", cx: "35%", cy: "35%", r: "70%", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "var(--color-blob)" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "var(--color-blob-2)" })
        ] }) }),
        /* @__PURE__ */ jsx(
          "path",
          {
            ref: pathRef,
            d: SHAPES[0],
            fill: "url(#blobGrad)",
            style: { transition: "d 2.2s cubic-bezier(0.65,0,0.35,1)" }
          }
        )
      ] })
    }
  );
}
const resumePdf = "/assets/Mohammed_Harshath-CdcygQ3g.pdf";
const ROLES = ["AI Engineer", "LLM Developer", "RAG Architect", "ML Engineer", "Prompt Engineer", "Business Analyst", "Project Manager", "Software Engineer", "Automation Engineer"];
function useScrambleText(words, hold = 2e3, speed = 35) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const glyphs = "01#$%-+?*[]{}<>_@&%X";
  useEffect(() => {
    const targetWord = words[wordIndex % words.length];
    let resolveProgress = 0;
    let intervalId;
    const animate = () => {
      const resolvedCount = Math.floor(resolveProgress);
      let currentText = "";
      for (let i = 0; i < targetWord.length; i++) {
        if (i < resolvedCount) {
          currentText += targetWord[i];
        } else {
          if (targetWord[i] === " ") {
            currentText += " ";
          } else {
            currentText += glyphs[Math.floor(Math.random() * glyphs.length)];
          }
        }
      }
      setText(currentText);
      if (resolvedCount < targetWord.length) {
        resolveProgress += 0.45;
        intervalId = setTimeout(animate, speed);
      } else {
        intervalId = setTimeout(() => {
          setWordIndex((prev) => prev + 1);
        }, hold);
      }
    };
    animate();
    return () => clearTimeout(intervalId);
  }, [wordIndex, words, hold, speed]);
  return text;
}
function Hero() {
  const scrambled = useScrambleText(ROLES);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "hero",
      className: "relative min-h-dvh flex items-center px-6 md:px-16 lg:px-24 pt-28 pb-20 overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "absolute inset-0 opacity-[0.08]",
            style: {
              backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.2 },
                className: "font-mono text-sm md:text-base text-primary mb-5",
                children: "// hello world, I'm"
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.35, duration: 0.7 },
                className: "font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-balance",
                children: [
                  "Mohammed ",
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Harshath SS." })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.7 },
                className: "mt-6 flex items-center gap-3 font-mono text-lg md:text-2xl",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "$" }),
                  /* @__PURE__ */ jsx("span", { className: "text-foreground", children: scrambled }),
                  /* @__PURE__ */ jsx("span", { className: "inline-block w-[10px] h-6 bg-primary animate-pulse" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.9 },
                className: "mt-8 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground text-pretty",
                children: "I engineer scalable GenAI backends, multi-agent orchestration platforms, and high-performance RAG pipelines. Bridging machine learning architectures with robust distributed systems, I deliver production-ready AI solutions optimized for latency, evaluation accuracy, and enterprise reliability."
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 1.05 },
                className: "mt-10 flex flex-wrap gap-3",
                children: [
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: "#projects",
                      "data-cursor": "hover",
                      className: "group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium hover:-translate-y-0.5 transition-transform shadow-[0_10px_30px_-10px_var(--color-primary)]",
                      children: [
                        /* @__PURE__ */ jsx(Folder, { className: "h-4 w-4" }),
                        "View Projects"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: resumePdf,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      download: true,
                      "data-cursor": "hover",
                      className: "inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:border-primary hover:text-primary transition-colors",
                      children: [
                        /* @__PURE__ */ jsx(ArrowDownToLine, { className: "h-4 w-4" }),
                        "Resume"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: "#contact",
                      "data-cursor": "hover",
                      className: "inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:border-primary hover:text-primary transition-colors",
                      children: [
                        /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
                        "Contact"
                      ]
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.6, duration: 0.8 },
              className: "relative hidden lg:block aspect-square",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full border border-dashed border-primary/40 spin-slow" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-8 rounded-full border border-border" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-16 rounded-full glass grid place-items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center px-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-muted-foreground", children: "STATUS" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 font-display text-2xl font-bold text-primary", children: "Available" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "for AI engineering roles" })
                ] }) }),
                [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    className: "absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary",
                    animate: { rotate: 360 },
                    transition: { duration: 12 + i * 4, repeat: Infinity, ease: "linear" },
                    style: { transformOrigin: `${120 + i * 30}px center` }
                  },
                  i
                ))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] tracking-[0.3em]", children: "SCROLL" }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "h-8 w-px bg-current",
              animate: { scaleY: [0.3, 1, 0.3], transformOrigin: "top" },
              transition: { duration: 1.6, repeat: Infinity }
            }
          )
        ] })
      ]
    }
  );
}
function SectionTitle({ index, title, kicker }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 0.6 },
      className: "flex items-end justify-between gap-8 mb-12",
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("p", { className: "font-mono text-xs text-primary tracking-[0.25em] mb-3", children: [
            index,
            " — ",
            kicker || title.toUpperCase()
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl md:text-6xl font-bold tracking-tight", children: title })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block flex-1 h-px bg-border mb-3" })
      ]
    }
  );
}
const STATS = [
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Shipped" },
  { value: 15, suffix: "", label: "Certifications" },
  { value: 7, suffix: "+", label: "AI Models Built" }
];
function Counter({ to, suffix }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const dur = 1400;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          setN(Math.floor(start + (to - start) * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return /* @__PURE__ */ jsxs("span", { ref, children: [
    n,
    suffix
  ] });
}
function About() {
  return /* @__PURE__ */ jsx("section", { id: "about", className: "relative px-6 md:px-16 lg:px-24 py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionTitle, { index: "01", title: "About Me", kicker: "WHO I AM" }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1fr_1.3fr] gap-12 items-stretch", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -40 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.7 },
          className: "relative h-full min-h-[380px] lg:min-h-0 rounded-2xl overflow-hidden glass group w-full max-w-sm lg:max-w-none mx-auto",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: profilePic,
                alt: "Mohammed Harshath Profile",
                className: "absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 left-4 right-4 glass rounded-xl p-4 z-10", children: [
              /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-primary font-bold", children: "currently @" }),
              /* @__PURE__ */ jsx("p", { className: "font-display font-bold", children: "Building AI products" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        [
          "I am an AI & Machine Learning Engineer specializing in the design and deployment of scalable GenAI backends, multi-agent orchestration frameworks, and Retrieval-Augmented Generation (RAG) pipelines. I focus on bridging complex machine learning models with robust, enterprise-grade distributed systems to build high-performance production software.",
          "My expertise spans real-time computer vision applications, high-throughput analytical databases, and automated workflow pipelines that optimize latency and comprehension. I prioritize database efficiency, cache hit rates, and operational reliability to ensure low-latency, scalable AI services in production environments. Outside of core engineering, I actively contribute to the applied AI community through technical writing, mentoring developer teams, and evaluating newly released frameworks."
        ].map((p, i) => /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.15, duration: 0.6 },
            className: "text-lg leading-relaxed text-muted-foreground mb-5 text-pretty",
            children: p
          },
          i
        )),
        /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-2 md:grid-cols-4 gap-4", children: STATS.map((s, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.4 + i * 0.1 },
            className: "glass rounded-xl p-4",
            children: [
              /* @__PURE__ */ jsx("p", { className: "font-display text-3xl font-bold text-primary", children: /* @__PURE__ */ jsx(Counter, { to: s.value, suffix: s.suffix }) }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s.label })
            ]
          },
          s.label
        )) })
      ] })
    ] })
  ] }) });
}
const SKILL_GROUPS = [
  {
    title: "GenAI & LLM",
    description: "Advanced AI agents, LLM orchestration, and RAG pipelines",
    icon: Brain,
    colorClass: "text-purple-400",
    bgClass: "bg-purple-500/10",
    borderHoverClass: "hover:border-purple-500/40",
    glowClass: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    skills: [
      "LangChain",
      "LangGraph",
      "AutoGen",
      "vLLM",
      "HuggingFace",
      "RAG Pipelines",
      "Multi-Agent Systems",
      "Ollama",
      "Dynamic Task Execution"
    ]
  },
  {
    title: "AI & Machine Learning",
    description: "Deep learning models, architectures, and fine-tuning",
    icon: Cpu,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-500/10",
    borderHoverClass: "hover:border-blue-500/40",
    glowClass: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    skills: [
      "PyTorch",
      "BERT",
      "Transformers",
      "Model Fine-tuning",
      "Vector Databases",
      "MLOps",
      "Deep Learning",
      "Wav2Vec2",
      "MMS-TTS"
    ]
  },
  {
    title: "Backend & Microservices",
    description: "Scalable backend services, APIs, and microservice architectures",
    icon: Terminal,
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
    borderHoverClass: "hover:border-emerald-500/40",
    glowClass: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
    skills: [
      "FastAPI",
      "Django",
      "Celery",
      "Redis",
      "PostgreSQL",
      "REST APIs",
      "Microservices",
      "Bash"
    ]
  },
  {
    title: "Cloud & DevOps",
    description: "Infrastructure, containerization, and orchestration platforms",
    icon: Cloud,
    colorClass: "text-orange-400",
    bgClass: "bg-orange-500/10",
    borderHoverClass: "hover:border-orange-500/40",
    glowClass: "group-hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]",
    skills: [
      "Docker",
      "Kubernetes (Learning)",
      "GCP",
      "AWS",
      "Distributed Systems",
      "Git",
      "GitHub"
    ]
  },
  {
    title: "Programming Languages",
    description: "Core programming and scripting languages",
    icon: Code,
    colorClass: "text-indigo-400",
    bgClass: "bg-indigo-500/10",
    borderHoverClass: "hover:border-indigo-500/40",
    glowClass: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
    skills: ["Python", "SQL", "Bash", "Java", "C#"]
  },
  {
    title: "AI Developer Tooling",
    description: "Model evaluation, workflow tracing, and agent development environments",
    icon: Wrench,
    colorClass: "text-rose-400",
    bgClass: "bg-rose-500/10",
    borderHoverClass: "hover:border-rose-500/40",
    glowClass: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
    skills: [
      "OpenAI & Anthropic APIs",
      "LangSmith",
      "LlamaIndex",
      "Pinecone & Chroma",
      "DeepEval",
      "Prompt Engineering",
      "Weights & Biases",
      "Jupyter Notebooks"
    ]
  }
];
function Skills() {
  return /* @__PURE__ */ jsx("section", { id: "skills", className: "relative px-6 md:px-16 lg:px-24 py-32 bg-card/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionTitle, { index: "02", title: "Technical Skills", kicker: "Comprehensive skill set in GenAI, Distributed Systems, and Machine Learning" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12", children: SKILL_GROUPS.map((g, idx) => {
      const Icon = g.icon;
      return /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: idx * 0.08, duration: 0.5 },
          whileHover: { y: -6 },
          className: `group relative glass rounded-2xl p-6 transition-all duration-300 ${g.borderHoverClass} ${g.glowClass} flex flex-col justify-between`,
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                "aria-hidden": true,
                className: "absolute -top-px left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity",
                style: {
                  background: `linear-gradient(90deg, transparent, var(--color-primary), transparent)`
                }
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3.5 mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: `h-11 w-11 rounded-xl ${g.bgClass} flex items-center justify-center`, children: /* @__PURE__ */ jsx(Icon, { className: `h-5 w-5 ${g.colorClass}` }) }),
                /* @__PURE__ */ jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: g.title })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6 font-sans leading-relaxed", children: g.description })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: g.skills.map((s) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "bg-card/40 border border-border/60 hover:border-primary/45 rounded-lg px-2.5 py-1 text-[11px] font-mono text-foreground/80 hover:text-foreground transition-all cursor-default",
                "data-cursor": "hover",
                children: s
              },
              s
            )) })
          ]
        },
        g.title
      );
    }) })
  ] }) });
}
const JOBS = [
  {
    company: "Holistic MD LLP",
    role: "AI & ML Engineer",
    type: "Full-time",
    location: "Coimbatore, India [On-site]",
    period: "Dec 2025 – Present",
    description: "AI Developer specializing in GenAI backend development and distributed systems. Expert in building scalable LLM inference platforms, multi-agent orchestration, and RAG pipelines with strong focus on performance optimization and production reliability.",
    bullets: [
      "Developed VisionAnalyzer, a real-time computer vision application using Django and Groq API to perform low-latency object detection and automated ingredient extraction from live camera feeds.",
      "Implemented LLM-powered RAG workflows, enhancing document comprehension and policy analysis accuracy by 40%.",
      "Developed and deployed intelligent AI agents with tool-based reasoning and Dynamic Task Execution for management simulations.",
      "Built production legislative automation system using LangGraph + RAG pipelines, reducing processing latency by 30%."
    ],
    tags: [
      "Python",
      "Django",
      "FastAPI",
      "Redis",
      "LangChain",
      "LangGraph",
      "Groq API",
      "RAG Pipelines",
      "Multi-Agent Systems",
      "Dynamic Task Execution",
      "Distributed Systems",
      "AI Developer"
    ]
  },
  {
    company: "OPSEN",
    role: "AI Developer",
    type: "Full-time",
    location: "London, UK [Remote]",
    period: "Oct 2025 – Nov 2025",
    description: "AI Developer specializing in GenAI backend development and distributed systems. Expertise in building scalable LLM inference platforms, multi-agent orchestration, and RAG pipelines.",
    bullets: [
      "Integrated ClickHouse database with multi-agent architecture, enabling high-speed analytics and scalable data storage for AI-driven risk models.",
      "Implemented LLM-powered RAG workflows, enhancing document comprehension and policy analysis accuracy by 40%.",
      "Developed and deployed intelligent AI agents with tool-based reasoning and Dynamic Task Execution for risk management simulations.",
      "Built production legislative automation system using LangGraph + RAG pipelines, reducing processing latency by 30%."
    ],
    tags: [
      "Python",
      "ClickHouse",
      "LLM",
      "RAG Pipelines",
      "Multi-Agent Architecture",
      "LangGraph",
      "Dynamic Task Execution",
      "Git",
      "Distributed Systems"
    ]
  },
  {
    company: "TMIS",
    role: "Machine Learning Intern",
    type: "Full-time",
    location: "Chennai, India",
    period: "Feb 2025 – March 2025",
    description: "Assisted in developing and deploying machine learning models to solve real-world problems. Supported data preprocessing, exploratory data analysis, feature engineering, and model evaluation tasks.",
    bullets: [
      "Built and deployed a classification model to detect anomalies in health records, improving data quality and consistency by 85%.",
      "Engineered data pipelines for preprocessing millions of patient records using Python and Pandas.",
      "Evaluated model performance using standard metrics and improved model accuracy through hyperparameter tuning.",
      "Documented workflows and collaborated with team members on project milestones."
    ],
    tags: [
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Data Analysis",
      "Machine Learning",
      "Git",
      "Jupyter Notebook"
    ]
  },
  {
    company: "WeInvest - Digital Wealth Platform",
    role: "Data Analyst Intern",
    type: "Remote Internship",
    location: "Bengaluru, India [Remote]",
    period: "Jul 2023 – Sep 2023",
    description: "Worked on financial data analysis and reporting to support digital wealth management solutions. Delivered data-driven insights and collaborated with cross-functional teams to optimize investment models.",
    bullets: [
      "Analyzed and processed over 1 million financial data points, identifying key market trends that contributed to a 15% improvement in portfolio recommendation accuracy.",
      "Automated routine data validation tasks, decreasing errors by 25% and improving data quality for downstream analysis.",
      "Developed interactive dashboards using Tableau to visualize financial metrics, enhancing decision-making for stakeholders.",
      "Collaborated with data engineering team to optimize ETL processes, reducing data processing time by 30%."
    ],
    tags: [
      "Python",
      "SQL",
      "Tableau",
      "Excel",
      "Data Visualization",
      "Data Analysis",
      "Financial Analysis",
      "Reporting Tools"
    ]
  }
];
function Experience() {
  return /* @__PURE__ */ jsx("section", { id: "experience", className: "relative px-6 md:px-16 lg:px-24 py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionTitle, { index: "03", title: "Experience", kicker: "WHERE I'VE BUILT" }),
    /* @__PURE__ */ jsxs("div", { className: "relative pl-8 md:pl-12 mt-12", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-2 md:left-4 top-0 bottom-0 w-px bg-border" }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { height: 0 },
          whileInView: { height: "100%" },
          viewport: { once: true },
          transition: { duration: 1.6 },
          className: "absolute left-2 md:left-4 top-0 w-px bg-gradient-to-b from-primary via-primary/60 to-transparent"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "space-y-16", children: JOBS.map((j, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 40 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.12, duration: 0.6 },
          className: "relative group",
          children: [
            /* @__PURE__ */ jsx("span", { className: "absolute -left-[34px] md:-left-[42px] top-2.5 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background shadow-[0_0_18px_var(--color-primary)] transition-transform group-hover:scale-125" }),
            /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 transition-all duration-300 group-hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("h3", { className: "font-display text-xl md:text-2xl font-bold text-foreground", children: [
                    j.role,
                    " ",
                    /* @__PURE__ */ jsxs("span", { className: "text-primary font-normal", children: [
                      "@ ",
                      j.company
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs font-mono text-muted-foreground/80", children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3 text-primary/70" }),
                      j.location
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "h-2.5 w-px bg-border hidden sm:inline" }),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(Clock, { className: "h-3 w-3 text-primary/70" }),
                      j.type
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 font-mono text-xs text-primary/95 bg-primary/5 border border-primary/15 px-3 py-1 rounded-full whitespace-nowrap", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
                  j.period
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm text-foreground/85 leading-relaxed font-sans font-medium text-pretty", children: j.description }),
              /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2.5", children: j.bullets.map((b) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-muted-foreground text-pretty text-sm leading-relaxed", children: [
                /* @__PURE__ */ jsx("span", { className: "text-primary mt-1 select-none", children: "▸" }),
                /* @__PURE__ */ jsx("span", { children: b })
              ] }, b)) }),
              /* @__PURE__ */ jsx("div", { className: "mt-6 pt-4 border-t border-border/40 flex flex-wrap gap-2", children: j.tags.map((t) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "bg-card/60 border border-border/60 hover:border-primary/45 rounded-lg px-2.5 py-1 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-all cursor-default",
                  "data-cursor": "hover",
                  children: t
                },
                t
              )) })
            ] })
          ]
        },
        j.company + j.role
      )) })
    ] })
  ] }) });
}
const PROJECTS = [
  {
    title: "AI Agent – Investment Advisory System",
    tag: "LangChain / RAG",
    blurb: "Developed a personalized investment advisor using LangChain/RAG and transformer models for predictive stock analysis, delivering accurate, tailored forecasts and suggestions. Built containerized inference API using FastAPI + Docker with 99.9% uptime for scalable model serving.",
    stack: ["LangChain", "LlamaIndex", "FastAPI", "Python", "Docker", "RAG", "Transformers"],
    metrics: ["99.9% Uptime", "<1.2s Latency", "7+ Data Sources"],
    github: "https://github.com/Harshath143/AI_Agent_Investment_Advisory",
    gradient: "linear-gradient(135deg, #00FFB3, #00D4FF)",
    diagram: [
      { step: "01", label: "User Stock Query" },
      { step: "02", label: "FastAPI Router" },
      { step: "03", label: "RAG Vector Search" },
      { step: "04", label: "Predictive Model" },
      { step: "05", label: "Inference Response" }
    ]
  },
  {
    title: "VoiceGPT – Multilingual Voice-Based AI Assistant",
    tag: "Speech & NLP",
    blurb: "Developed an end-to-end multilingual AI voice assistant (Tamil & Marathi support) using Wav2Vec2 for accurate Speech-to-Text and MMS-TTS for natural Text-to-Speech generation. Implemented an offline, privacy-focused system that processes data locally, utilizing fine-tuned transformer models for intent classification and Retrieval-Augmented Generation (RAG) with Sentence Transformers to provide real-time, contextually relevant answers.",
    stack: ["HuggingFace", "RAG", "Ollama", "Wav2Vec2", "MMS-TTS", "Transformers", "Python"],
    metrics: ["Tamil & Marathi", "100% Offline", "<450ms TTS"],
    github: "https://github.com/Harshath143/VoiceGPT-AI-Voice-Assistant",
    gradient: "linear-gradient(135deg, #8B5CF6, #E63946)",
    diagram: [
      { step: "01", label: "Voice Input" },
      { step: "02", label: "Wav2Vec2 (STT)" },
      { step: "03", label: "Local Ollama RAG" },
      { step: "04", label: "MMS-TTS (Speech)" },
      { step: "05", label: "Voice Output" }
    ]
  },
  {
    title: "AI_Company_prototype",
    tag: "Multi-Agent System",
    blurb: "NeoForge AI is an autonomous software development system built with Python and FastAPI, enabling the seamless transformation of high-level requirements into production-ready codebases. It utilizes a multi-agent orchestration architecture to ensure high code quality through specialized roles—including Architects and Developers—and provides reliable, placeholder-free file generation. The system features a built-in dashboard for real-time workflow visualization and operates within isolated project environments to maintain strict structural integrity.",
    stack: ["FastAPI", "Python", "Multi-Agent Architecture", "Groq API", "File Management", "LangGraph"],
    metrics: ["LangGraph workflow", "Autonomous Dev", "Isolated Env"],
    github: "https://github.com/Harshath143/AI_Company_prototype",
    gradient: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
    diagram: [
      { step: "01", label: "Product Prompt" },
      { step: "02", label: "LangGraph Router" },
      { step: "03", label: "Architect Agent" },
      { step: "04", label: "Developer Agent" },
      { step: "05", label: "Deployment Build" }
    ]
  },
  {
    title: "Research Summarizer",
    tag: "GenAI",
    blurb: "Paper-aware summarization with citation grounding and figure extraction.",
    stack: ["Anthropic", "Marker", "React", "TypeScript"],
    metrics: ["10k+ papers", "Citation safe", "PDF in/out"],
    gradient: "linear-gradient(135deg, #F4D35E, #E63946)"
  },
  {
    title: "Mushroom Classifier",
    tag: "Computer Vision",
    blurb: "Mobile CNN classifying 120 species with on-device inference.",
    stack: ["PyTorch", "MobileNetV3", "ONNX", "React Native"],
    metrics: ["96% F1", "23ms inference", "8MB model"],
    gradient: "linear-gradient(135deg, #00FFB3, #F4D35E)"
  },
  {
    title: "Vehicle Recommender",
    tag: "ML Systems",
    blurb: "Hybrid recommendation engine matching buyers to inventory at scale.",
    stack: ["XGBoost", "Feast", "Redis", "BigQuery"],
    metrics: ["+14% CTR", "300ms p95", "5M users"],
    gradient: "linear-gradient(135deg, #E63946, #8B5CF6)"
  }
];
function Projects() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);
  return /* @__PURE__ */ jsxs("section", { id: "projects", className: "relative px-6 md:px-16 lg:px-24 py-32 bg-card/30", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx(SectionTitle, { index: "04", title: "Selected Projects", kicker: "WHAT I'VE SHIPPED" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: PROJECTS.map((p, i) => /* @__PURE__ */ jsxs(
        motion.button,
        {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { delay: i * 0.08, duration: 0.6 },
          whileHover: { y: -8, rotate: -0.3 },
          onClick: () => setActive(p),
          "data-cursor": "hover",
          className: "group relative text-left glass rounded-2xl overflow-hidden p-6 hover:border-primary transition-colors",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                "aria-hidden": true,
                className: "absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-30 blur-2xl group-hover:opacity-60 transition-opacity",
                style: { background: p.gradient }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("p", { className: "font-mono text-[10px] text-primary tracking-[0.2em]", children: p.tag.toUpperCase() }),
              /* @__PURE__ */ jsx("h3", { className: "mt-2 font-display text-2xl font-bold", children: p.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground text-pretty", children: p.blurb }),
              /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap gap-1.5", children: p.stack.slice(0, 3).map((s) => /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono px-2 py-1 rounded-full border border-border text-muted-foreground", children: s }, s)) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-muted-foreground", children: "Case study" }),
                /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" })
              ] })
            ] })
          ]
        },
        p.title
      )) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: active && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[80] bg-background/80 backdrop-blur-xl grid place-items-center p-4",
        onClick: () => setActive(null),
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.9, y: 40 },
            animate: { scale: 1, y: 0 },
            exit: { scale: 0.9, y: 40 },
            transition: { type: "spring", damping: 25 },
            onClick: (e) => e.stopPropagation(),
            className: "relative w-full max-w-3xl glass rounded-3xl overflow-hidden max-h-[90vh] flex flex-col text-left",
            "data-lenis-prevent": true,
            children: [
              /* @__PURE__ */ jsx("div", { className: "h-32 shrink-0 relative", style: { background: active.gradient }, children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActive(null),
                  "aria-label": "Close",
                  className: "absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 grid place-items-center hover:bg-background",
                  children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "p-8 overflow-y-auto flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-primary tracking-[0.2em]", children: active.tag.toUpperCase() }),
                /* @__PURE__ */ jsx("h3", { className: "mt-2 font-display text-4xl font-bold", children: active.title }),
                /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground text-pretty", children: active.blurb }),
                active.diagram && /* @__PURE__ */ jsxs("div", { className: "mt-8 p-5 rounded-2xl bg-muted/5 border border-border/40", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-mono text-[10px] text-muted-foreground mb-4 uppercase tracking-wider", children: "SYSTEM DATAFLOW PIPELINE" }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3 overflow-x-auto no-scrollbar pb-1", children: active.diagram.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center w-full sm:w-auto", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center p-3 rounded-xl bg-card border border-border/80 min-w-[120px] text-center shadow-sm hover:border-primary/45 transition-colors", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-mono text-[9px] text-primary", children: item.step }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-sans font-semibold mt-1 text-foreground/90 whitespace-nowrap", children: item.label })
                    ] }),
                    idx < active.diagram.length - 1 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center my-1 sm:my-0 sm:mx-2 text-primary", children: [
                      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-xs font-mono", children: "➔" }),
                      /* @__PURE__ */ jsx("span", { className: "sm:hidden text-xs font-mono", children: "▼" })
                    ] })
                  ] }, idx)) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-8 grid grid-cols-3 gap-3", children: active.metrics.map((m) => /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-border p-4 text-center", children: /* @__PURE__ */ jsx("p", { className: "font-display font-bold text-primary", children: m }) }, m)) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-muted-foreground mb-2", children: "STACK" }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: active.stack.map((s) => /* @__PURE__ */ jsx("span", { className: "text-xs font-mono px-3 py-1.5 rounded-full bg-card border border-border", children: s }, s)) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-8 flex gap-3", children: [
                  active.demo && /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: active.demo,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-primary-foreground font-medium",
                      children: [
                        /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" }),
                        " Live demo"
                      ]
                    }
                  ),
                  active.github && /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: active.github,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium hover:border-primary",
                      children: [
                        /* @__PURE__ */ jsx(Github, { className: "h-4 w-4" }),
                        " Source"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    ) })
  ] });
}
function Telemetry() {
  const [latency, setLatency] = useState(122);
  const [latencyHistory, setLatencyHistory] = useState([120, 124, 118, 125, 122, 119, 126, 121, 123, 120]);
  const [ragAcc, setRagAcc] = useState(94.2);
  const [cacheHit, setCacheHit] = useState(84.6);
  const [activeAgents, setActiveAgents] = useState([true, true, true, true, true, true, true, false, true, true, true, true]);
  const intervalRef = useRef(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const latDiff = (Math.random() - 0.5) * 6;
      setLatency((prev) => {
        const nextVal = Math.round(Math.max(110, Math.min(140, prev + latDiff)));
        setLatencyHistory((history) => {
          const newHistory = [...history.slice(1), nextVal];
          return newHistory;
        });
        return nextVal;
      });
      setRagAcc((prev) => {
        const accDiff = (Math.random() - 0.5) * 0.2;
        return parseFloat(Math.max(92.5, Math.min(96.5, prev + accDiff)).toFixed(2));
      });
      setCacheHit((prev) => {
        const hitDiff = (Math.random() - 0.5) * 0.4;
        return parseFloat(Math.max(80, Math.min(90, prev + hitDiff)).toFixed(2));
      });
      setActiveAgents((prev) => {
        const next = [...prev];
        const indexToToggle = Math.floor(Math.random() * next.length);
        const activeCount = next.filter(Boolean).length;
        if (activeCount <= 8) {
          next[indexToToggle] = true;
        } else {
          next[indexToToggle] = Math.random() > 0.15;
        }
        return next;
      });
    }, 1200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  const getSparklinePath = () => {
    const width = 120;
    const height = 40;
    const maxVal = Math.max(...latencyHistory) + 2;
    const minVal = Math.min(...latencyHistory) - 2;
    const range = maxVal - minVal || 1;
    const points = latencyHistory.map((val, i) => {
      const x = i / (latencyHistory.length - 1) * width;
      const y = height - (val - minVal) / range * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return `M ${points.join(" L ")}`;
  };
  return /* @__PURE__ */ jsx("section", { id: "telemetry", className: "relative px-6 md:px-16 lg:px-24 py-24 bg-card/20 border-y border-primary/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10", children: [
      /* @__PURE__ */ jsx(SectionTitle, { index: "SYS", title: "Operational Telemetry", kicker: "REAL-TIME DIAGNOSTIC MONITORS (DEV_MODE ACTIVE)" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-mono text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full w-fit self-start md:self-auto", children: [
        /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }),
        "LIVE_METRICS_FEED: COMPILING"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 flex flex-col justify-between hover:border-primary/20 transition-colors duration-300", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-muted-foreground", children: "LLM INFERENCE" }),
            /* @__PURE__ */ jsx(Activity, { className: "h-4 w-4 text-purple-400" })
          ] }),
          /* @__PURE__ */ jsxs("h4", { className: "font-display font-bold text-3xl text-foreground", children: [
            latency,
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground font-mono font-normal", children: "ms" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground font-sans", children: "Average query response time (p95)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-muted-foreground/50", children: "10s HISTORY" }),
          /* @__PURE__ */ jsx("svg", { width: "120", height: "40", className: "overflow-visible", children: /* @__PURE__ */ jsx(
            motion.path,
            {
              d: getSparklinePath(),
              fill: "none",
              stroke: "#A855F7",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              animate: { d: getSparklinePath() },
              transition: { duration: 0.4 }
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 flex flex-col justify-between hover:border-primary/20 transition-colors duration-300", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-muted-foreground", children: "RAG ACCURACY" }),
            /* @__PURE__ */ jsx(Database, { className: "h-4 w-4 text-blue-400" })
          ] }),
          /* @__PURE__ */ jsxs("h4", { className: "font-display font-bold text-3xl text-foreground", children: [
            ragAcc,
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground font-mono font-normal", children: "%" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground font-sans", children: "Dense-sparse retrieval relevancy score" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-muted-foreground/50", children: "EVALUATION MATRIX" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-blue-400 font-semibold", children: "OPTIMAL" }),
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 flex flex-col justify-between hover:border-primary/20 transition-colors duration-300", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-muted-foreground", children: "MULTI-AGENT POOL" }),
            /* @__PURE__ */ jsx(Network, { className: "h-4 w-4 text-emerald-400" })
          ] }),
          /* @__PURE__ */ jsxs("h4", { className: "font-display font-bold text-3xl text-foreground", children: [
            activeAgents.filter(Boolean).length,
            " ",
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground font-mono font-normal", children: [
              "/ ",
              activeAgents.length
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground font-sans", children: "Active LangGraph agent execution loops" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-muted-foreground/50", children: "POOL STATUS" }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono text-[9px] text-emerald-400", children: [
              Math.round(activeAgents.filter(Boolean).length / activeAgents.length * 100),
              "% ACTIVE"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 gap-1.5", children: activeAgents.map((active, i) => /* @__PURE__ */ jsx(
            "span",
            {
              className: `h-2.5 rounded-sm transition-all duration-500 ${active ? "bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-muted-foreground/20"}`
            },
            i
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 flex flex-col justify-between hover:border-primary/20 transition-colors duration-300", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-muted-foreground", children: "API INGRESS" }),
            /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-rose-400" })
          ] }),
          /* @__PURE__ */ jsxs("h4", { className: "font-display font-bold text-3xl text-foreground", children: [
            "99.99 ",
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground font-mono font-normal", children: "% UPTIME" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground font-sans", children: "Redis cache hits & rate limits check" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-3 border-t border-border/40", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[10px] font-mono text-muted-foreground", children: [
            /* @__PURE__ */ jsx("span", { children: "REDIS CACHE HITS" }),
            /* @__PURE__ */ jsxs("span", { className: "text-rose-400 font-semibold", children: [
              cacheHit,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full bg-muted-foreground/10 rounded-full mt-1.5 overflow-hidden", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: { width: `${cacheHit}%` },
              className: "h-full bg-rose-500/80 rounded-full",
              transition: { duration: 0.8 }
            }
          ) })
        ] })
      ] })
    ] })
  ] }) });
}
function DevConsoleModal({ isOpen, onClose, onUnlock }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      setPasscode("");
      setError(false);
      setSuccess(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode.toLowerCase() === "developer") {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        onUnlock();
        onClose();
      }, 1e3);
    } else {
      setError(true);
      setPasscode("");
      inputRef.current?.focus();
      setTimeout(() => setError(false), 2e3);
    }
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-[100] bg-background/80 backdrop-blur-md grid place-items-center p-4",
      onClick: onClose,
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { scale: 0.9, y: 20 },
          animate: { scale: 1, y: 0 },
          exit: { scale: 0.9, y: 20 },
          transition: { type: "spring", damping: 25 },
          onClick: (e) => e.stopPropagation(),
          className: "w-full max-w-md glass rounded-2xl overflow-hidden border border-border shadow-2xl relative",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border/40 px-5 py-4 bg-muted/20", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary font-mono text-xs tracking-wider", children: [
                /* @__PURE__ */ jsx(Terminal, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: "DEV_MODE_CONSOLE" })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose,
                  "aria-label": "Close console",
                  className: "h-8 w-8 rounded-full border border-border/30 grid place-items-center hover:bg-card transition-colors text-muted-foreground hover:text-foreground",
                  children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("label", { htmlFor: "passcode", className: "font-mono text-xs text-muted-foreground flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { children: "ENTER SYSTEM PASSCODE" }),
                  /* @__PURE__ */ jsx("span", { className: "text-primary/70", children: "hint: developer" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      ref: inputRef,
                      type: "password",
                      id: "passcode",
                      value: passcode,
                      onChange: (e) => setPasscode(e.target.value),
                      placeholder: "••••••••",
                      disabled: success,
                      className: "w-full px-4 py-3 rounded-xl border border-border/70 bg-background/40 font-mono text-center text-lg tracking-widest focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 transition-all text-foreground"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute right-3.5 top-1/2 -translate-y-1/2", children: success ? /* @__PURE__ */ jsx(Unlock, { className: "h-5 w-5 text-emerald-400 animate-bounce" }) : /* @__PURE__ */ jsx(Lock, { className: "h-5 w-5 text-muted-foreground/60" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "min-h-[24px] text-center font-mono text-xs", children: [
                error && /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -5 },
                    animate: { opacity: 1, y: 0 },
                    className: "text-destructive flex items-center justify-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsx(AlertCircle, { className: "h-3.5 w-3.5" }),
                      /* @__PURE__ */ jsx("span", { children: "ACCESS DENIED. INVALID CREDENTIALS." })
                    ]
                  }
                ),
                success && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    className: "text-emerald-400 font-bold",
                    children: "ACCESS GRANTED. INITIALIZING DASHBOARD..."
                  }
                ),
                !error && !success && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/50", children: "Listening on channel [PORT_80]" })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: success || !passcode,
                  className: "w-full py-3 rounded-xl font-mono text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_15px_rgba(var(--primary),0.2)]",
                  children: "DECRYPT_SESSION"
                }
              )
            ] }) })
          ]
        }
      )
    }
  ) });
}
const RESPONSES = {
  skills: "Certainly! Mohammed Harshath has a comprehensive technical skillset centered on AI, Machine Learning, and Backend engineering:\n\n• **GenAI & LLM:** LangChain, LangGraph, AutoGen, vLLM, HuggingFace, RAG Pipelines, and Multi-Agent Systems.\n• **AI & ML:** PyTorch, BERT, Transformers, Model Fine-tuning, Vector Databases, and MLOps.\n• **Programming Languages:** Python, SQL, and Bash.\n• **Backend Development:** FastAPI, Django, Celery, Redis, Docker, PostgreSQL, REST APIs, and Microservices.\n• **Cloud & DevOps:** Docker, Kubernetes (Learning), GCP, AWS, and Distributed Systems.\n\nIs there a specific technology area you would like to know more about?",
  experience: "I would be happy to share details about Harshath's professional experience. He has a solid track record in AI development, including:\n\n1. **AI & ML Engineer @ Holistic MD LLP** (Coimbatore, India | Dec 2025 – Present)\n   • Developed *VisionAnalyzer*, a real-time computer vision application using Django and Groq API for low-latency object detection and ingredient extraction from live camera feeds.\n   • Implemented LLM-powered RAG workflows, improving document comprehension and policy analysis accuracy by 40%.\n   • Designed and deployed intelligent AI agents with tool-based reasoning and Dynamic Task Execution for management simulations.\n   • Built a production legislative automation system using LangGraph and RAG pipelines, reducing processing latency by 30%.\n\n2. **AI Developer @ OPSEN** (London, UK | Remote | 9 months)\n   • Worked on clickhouse-integrated risk models, and developed high-performance backend pipelines.\n\nHe has also completed internship stints at TMIS and WeInvest. Let me know if you would like more details about any of these roles!",
  projects: "I would be glad to tell you about Harshath's key academic and professional projects:\n\n• **AI Agent - Investment Advisory System** (LangChain, LlamaIndex, FastAPI, Docker)\n  Developed a personalized investment advisor using LangChain/RAG and transformer models for predictive stock analysis, delivering accurate, tailored forecasts. Built as a containerized inference API with 99.9% uptime.\n\n• **VoiceGPT - Multilingual Voice Assistant** (HuggingFace, RAG, Ollama, VEM, Wav2Vec2, MMS-TTS)\n  Developed an end-to-end multilingual voice assistant (with Tamil & Marathi support) using Wav2Vec2 for Speech-to-Text and MMS-TTS for natural Text-to-Speech generation. It operates as an offline, privacy-focused system utilizing sentence transformers for local RAG.\n\n• **AI Company Prototype / NeoForge AI**\n  An autonomous software generation multi-agent framework built using LangGraph to automate software development tasks.\n\nWould you like to hear more about the technical stack of any particular project?",
  contact: "I would be happy to help you get in touch with Harshath! You can reach out to him directly through the following channels:\n\n• **Email:** [harshath142@gmail.com](mailto:harshath142@gmail.com) (or [harshathdeveloper@gmail.com](mailto:harshathdeveloper@gmail.com))\n• **Phone:** [+91 8667701712](tel:+918667701712)\n• **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/mohammed-harshath-ss-a68435208/)\n• **GitHub:** [GitHub Profile](https://github.com/Harshath143)\n\nFeel free to send him an email or connect on LinkedIn. He would love to hear from you!",
  phone: "Harshath's phone number is [+91 8667701712](tel:+918667701712). You can also reach him via email at [harshath142@gmail.com](mailto:harshath142@gmail.com).",
  education: "Certainly. Harshath has a strong academic foundation:\n\n• **B.Tech in Artificial Intelligence & Data Science** (2021 – 2024)\n  Graduated from Kathir College of Engineering (Coimbatore, India) with a CGPA of **8.02/10**.\n  *Relevant Coursework:* Machine Learning, Deep Learning, Data Structures & Algorithms, and Database Systems.\n\n• **GATE 2024 (Data Science & AI):** Achieved **All India Rank 2852** (Top 5% nationally), showcasing his deep understanding of AI foundations.\n\n• **Professional Certifications:**\n  • Master Data Science from IITM GUVI (Dec 2024)\n  • Advanced Programming Professional from IITM GUVI (Dec 2024)\n\nLet me know if you have any questions about his academic background!",
  location: "Mohammed Harshath is currently based in Coimbatore, Tamil Nadu, India. He works on-site there at Holistic MD LLP, but is open to remote work opportunities globally.",
  github: "You can find Harshath's open-source projects and code repositories on GitHub: [GitHub Profile](https://github.com/Harshath143)",
  linkedin: "Connect with Harshath professionally on LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/mohammed-harshath-ss-a68435208/)",
  resume: `Certainly! You can view or download Mohammed Harshath's official resume here: [Download Resume PDF](${resumePdf}). Let me know if you would like me to summarize any specific section for you!`,
  default: "Thank you for your message! I'm here to help you learn more about Harshath. You can ask me about his:\n\n• **Skills** (e.g., 'What tech stack does he use?')\n• **Experience** (e.g., 'Where has he worked?')\n• **Projects** (e.g., 'Tell me about VoiceGPT')\n• **Education & Certifications** (e.g., 'Where did he study?')\n• **Contact details** (e.g., 'How can I contact him?')\n• **Resume** (e.g., 'Can I get his resume?')\n\nHow can I help you today?"
};
const renderMessageText = (text) => {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const linkText = match[1];
    const linkUrl = match[2];
    const isPdf = linkUrl.toLowerCase().endsWith(".pdf") || linkUrl.includes("blob") || linkUrl.includes("pdf");
    parts.push(
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: linkUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          download: isPdf,
          className: "text-primary underline hover:text-primary/80 font-bold inline-flex items-center gap-1",
          children: [
            isPdf ? /* @__PURE__ */ jsx(FileDown, { className: "h-3 w-3 inline" }) : /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3 inline" }),
            linkText
          ]
        },
        match.index
      )
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
};
function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "initial",
      sender: "bot",
      text: "Hello! I am Harshath's AI Assistant. Ask me anything about his skills, experience, projects, or credentials!"
    }
  ]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;
    const userMsg = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    const cleanText = textToSend.toLowerCase();
    let replyText = RESPONSES.default;
    const match = (keywords) => {
      const pattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "i");
      return pattern.test(cleanText);
    };
    if (match(["contact", "email", "hire", "mail", "connect"])) {
      replyText = RESPONSES.contact;
    } else if (match(["phone", "mobile", "number", "call", "ph"])) {
      replyText = RESPONSES.phone;
    } else if (match(["github", "git", "repo", "repos", "code"])) {
      replyText = RESPONSES.github;
    } else if (match(["linkedin", "profile", "social"])) {
      replyText = RESPONSES.linkedin;
    } else if (match(["resume", "cv", "download", "pdf"])) {
      replyText = RESPONSES.resume;
    } else if (match(["skill", "skills", "languages", "tech", "programming", "framework", "frameworks", "stack"])) {
      replyText = RESPONSES.skills;
    } else if (match(["experience", "work", "job", "jobs", "company", "companies", "holistic", "opsen"])) {
      replyText = RESPONSES.experience;
    } else if (match(["project", "projects", "portfolio", "built", "voicegpt", "advisor", "neoforge"])) {
      replyText = RESPONSES.projects;
    } else if (match(["education", "college", "degree", "university", "gpa", "cgpa", "kathir", "gate", "cert", "certs", "certification", "certifications", "guvi"])) {
      replyText = RESPONSES.education;
    } else if (match(["location", "live", "where", "city", "coimbatore"])) {
      replyText = RESPONSES.location;
    } else if (match(["hello", "hi", "hey", "greet", "greetings", "yo", "morning", "afternoon", "evening"])) {
      replyText = "Hello! It is a pleasure to connect with you. I am Harshath's AI Assistant. I can share detailed information about his technical skills, work experience, projects, education, or contact details. How can I help you today?";
    } else if (match(["thank", "thanks", "thankyou", "awesome", "great", "perfect"])) {
      replyText = "You are very welcome! It is my absolute pleasure to help. Please let me know if you have any other questions about Harshath's work or experience!";
    } else if (match(["bye", "goodbye", "exit", "quit", "close"])) {
      replyText = "Thank you for taking the time to chat! I hope you have a wonderful day. Please feel free to open this chat again if you ever need more information about Harshath. Goodbye!";
    }
    const botMsgId = Math.random().toString();
    const botMsg = {
      id: botMsgId,
      sender: "bot",
      text: "",
      isStreaming: true
    };
    setMessages((prev) => [...prev, botMsg]);
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < replyText.length) {
        setMessages(
          (prev) => prev.map(
            (msg) => msg.id === botMsgId ? { ...msg, text: replyText.slice(0, currentIdx + 1) } : msg
          )
        );
        currentIdx++;
      } else {
        clearInterval(interval);
        setMessages(
          (prev) => prev.map(
            (msg) => msg.id === botMsgId ? { ...msg, isStreaming: false } : msg
          )
        );
      }
    }, 12);
  };
  const QUICK_REPLIES = [
    { text: "Core Skills", query: "skills" },
    { text: "Work History", query: "experience" },
    { text: "Top Projects", query: "projects" },
    { text: "Download Resume", query: "resume" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-6 right-6 z-[90]", children: /* @__PURE__ */ jsxs(
      motion.button,
      {
        onClick: () => setIsOpen(!isOpen),
        whileHover: { scale: 1.08 },
        whileTap: { scale: 0.95 },
        "data-cursor": "hover",
        className: "h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.3)] border border-primary/20 relative group overflow-hidden",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-primary via-primary-foreground/10 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isOpen ? /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { rotate: -90, opacity: 0 },
              animate: { rotate: 0, opacity: 1 },
              exit: { rotate: 90, opacity: 0 },
              transition: { duration: 0.2 },
              children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6 relative z-10" })
            },
            "close"
          ) : /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { rotate: 90, opacity: 0 },
              animate: { rotate: 0, opacity: 1 },
              exit: { rotate: -90, opacity: 0 },
              transition: { duration: 0.2 },
              className: "relative z-10 flex items-center justify-center",
              children: /* @__PURE__ */ jsx(Bot, { className: "h-6 w-6" })
            },
            "chat"
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 30, scale: 0.95 },
        transition: { type: "spring", damping: 20 },
        className: "fixed bottom-24 right-6 z-[90] w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] glass rounded-2xl overflow-hidden border border-border shadow-2xl flex flex-col",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border/40 px-5 py-4 bg-muted/20", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-display text-sm font-bold text-foreground", children: "AI Assistant" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 font-mono text-[9px] text-emerald-400 mt-0.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" }),
                  "ONLINE"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsOpen(false),
                className: "text-muted-foreground hover:text-foreground transition-colors p-1",
                children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar", children: [
            messages.map((m) => {
              const isBot = m.sender === "bot";
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `flex items-start gap-2.5 ${!isBot ? "flex-row-reverse" : ""}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${isBot ? "bg-primary/10 text-primary" : "bg-card border border-border text-muted-foreground"}`,
                        children: isBot ? /* @__PURE__ */ jsx(Bot, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(User, { className: "h-3.5 w-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: `max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed whitespace-pre-line ${isBot ? "bg-card border border-border text-foreground" : "bg-primary text-primary-foreground"}`,
                        children: [
                          renderMessageText(m.text),
                          m.isStreaming && /* @__PURE__ */ jsx("span", { className: "inline-block w-1.5 h-3 bg-current animate-pulse ml-0.5 align-middle" })
                        ]
                      }
                    )
                  ]
                },
                m.id
              );
            }),
            /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "px-4 py-2 border-t border-border/20 flex flex-wrap gap-1.5 bg-muted/5", children: QUICK_REPLIES.map((qr) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleSend(qr.query),
              className: "text-[10px] font-sans font-medium bg-card border border-border hover:border-primary hover:text-primary rounded-full px-2.5 py-1 transition-all",
              children: qr.text
            },
            qr.query
          )) }),
          /* @__PURE__ */ jsxs(
            "form",
            {
              onSubmit: (e) => {
                e.preventDefault();
                handleSend(input);
              },
              className: "p-3 border-t border-border/40 bg-muted/20 flex gap-2 items-center",
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: input,
                    onChange: (e) => setInput(e.target.value),
                    placeholder: "Ask about projects, resume, skills...",
                    className: "flex-1 bg-background/50 border border-border/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 text-foreground transition-all"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: !input.trim(),
                    className: "h-8 w-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/95 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                    children: /* @__PURE__ */ jsx(Send, { className: "h-3.5 w-3.5" })
                  }
                )
              ]
            }
          )
        ]
      }
    ) })
  ] });
}
const CERTS = [
  {
    name: "GATE 2024 (Data Science & AI - Rank 2852)",
    issuer: "National Board",
    year: "2024",
    icon: Trophy,
    colorClass: "text-amber-400"
  },
  {
    name: "Master Data Science",
    issuer: "IITM GUVI",
    year: "2024",
    icon: GraduationCap,
    colorClass: "text-blue-400"
  },
  {
    name: "Advanced Programming Professional",
    issuer: "IITM GUVI",
    year: "2024",
    icon: Award,
    colorClass: "text-rose-400"
  }
];
function Certifications() {
  return /* @__PURE__ */ jsx("section", { id: "certifications", className: "relative px-6 md:px-16 lg:px-24 py-32 bg-card/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionTitle, { index: "05", title: "Achievements & Certifications", kicker: "NATIONAL DISTINCTIONS & PROFESSIONAL CREDENTIALS" }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-12", children: CERTS.map((c, i) => {
      const Icon = c.icon;
      return /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08, duration: 0.5 },
          whileHover: { y: -6 },
          className: "group relative glass rounded-2xl p-6 block overflow-hidden transition-all duration-300 hover:border-primary/30",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                "aria-hidden": true,
                className: "absolute -top-px left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity",
                style: {
                  background: "linear-gradient(90deg, transparent, var(--color-primary), transparent)"
                }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Icon, { className: `h-5 w-5 ${c.colorClass}` }) }),
              /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors" })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-5 font-display font-bold leading-snug text-foreground/90 group-hover:text-foreground transition-colors min-h-[50px]", children: c.name }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-muted-foreground font-mono", children: [
              c.issuer,
              " · ",
              c.year
            ] })
          ]
        },
        c.name
      );
    }) })
  ] }) });
}
const ITEMS = [
  { year: "2025", title: "Speaker — AI Engineer Summit", note: "Keynote on production RAG systems." },
  { year: "2024", title: "Top 1% Kaggle (NLP)", note: "Gold medal — multilingual classification." },
  { year: "2024", title: "Open-source — 4.2k★", note: "Maintainer of an agent-eval toolkit." },
  { year: "2023", title: "Hackathon Winner", note: "Best AI product — 200+ teams." }
];
function Achievements() {
  return /* @__PURE__ */ jsx("section", { id: "achievements", className: "relative px-6 md:px-16 lg:px-24 py-32 bg-card/30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionTitle, { index: "06", title: "Achievements", kicker: "WINS & RECOGNITION" }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-5", children: ITEMS.map((a, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1 },
        className: "glass rounded-2xl p-6 hover:border-primary transition-colors",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(Trophy, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-muted-foreground", children: a.year })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-lg font-bold leading-snug", children: a.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: a.note })
        ]
      },
      a.title
    )) })
  ] }) });
}
const QUOTES = [
  { name: "Aisha Khan", role: "VP Engineering, Northwind", text: "Harshath turned our RAG demo into a real product. Latency dropped, accuracy jumped, and the team learned a ton along the way." },
  { name: "David Park", role: "CTO, FieldAI", text: "A rare engineer who treats evals as a first-class product surface. Our model quality is night-and-day better." },
  { name: "Lena Costa", role: "Head of Product, Atlas", text: "Ships fast, communicates clearly, designs for the user. Best AI hire we've made." },
  { name: "Ravi Menon", role: "Founder, BuildKit", text: "Mohammed unblocked an entire roadmap in two sprints. Our agents finally feel reliable." },
  { name: "Sara Okafor", role: "PM, OpenCanvas", text: "From whiteboard to deployed, with thoughtful tradeoffs at every step. Would hire again instantly." },
  { name: "Tom Hill", role: "Director ML, Lumen", text: "Equally strong in research and engineering — increasingly rare. Plus the UI he ships is beautiful." }
];
function Testimonials() {
  const row = [...QUOTES, ...QUOTES];
  return /* @__PURE__ */ jsxs("section", { id: "testimonials", className: "relative px-6 md:px-16 lg:px-24 py-32 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsx(SectionTitle, { index: "07", title: "Kind Words", kicker: "WHAT PEOPLE SAY" }) }),
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "flex gap-5 marquee w-max", style: { animationDuration: "60s" }, children: row.map((q, i) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: "glass rounded-2xl p-6 w-[340px] shrink-0 hover:border-primary transition-colors",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-display text-primary leading-none", children: '"' }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground mt-2 text-pretty", children: q.text }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsx("p", { className: "font-display font-bold", children: q.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: q.role })
          ] })
        ]
      },
      i
    )) }) })
  ] });
}
const CATS = ["All", "AI", "Engineering", "Career"];
const POSTS = [
  { title: "Why your RAG evals are lying to you", cat: "AI", date: "May 2026", read: "8 min" },
  { title: "From prototype to production: the LLM gap", cat: "Engineering", date: "Apr 2026", read: "12 min" },
  { title: "I shipped 6 AI products in a year. Here's what stuck.", cat: "Career", date: "Mar 2026", read: "6 min" },
  { title: "Reranking is the new prompt engineering", cat: "AI", date: "Feb 2026", read: "10 min" },
  { title: "Designing agent UIs that don't feel like ChatGPT", cat: "Engineering", date: "Jan 2026", read: "9 min" },
  { title: "Interview kit: AI engineering roles in 2026", cat: "Career", date: "Dec 2025", read: "7 min" }
];
function Blog() {
  const [cat, setCat] = useState("All");
  const list = POSTS.filter((p) => cat === "All" || p.cat === cat);
  return /* @__PURE__ */ jsx("section", { id: "blog", className: "relative px-6 md:px-16 lg:px-24 py-32 bg-card/30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionTitle, { index: "08", title: "Writing", kicker: "ESSAYS & NOTES" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-8", children: CATS.map((c) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setCat(c),
        "data-cursor": "hover",
        className: `px-4 py-1.5 rounded-full text-sm font-mono transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"}`,
        children: c
      },
      c
    )) }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: list.map((p, i) => /* @__PURE__ */ jsxs(
      motion.a,
      {
        href: "#",
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.05 },
        whileHover: { y: -4 },
        "data-cursor": "hover",
        className: "group glass rounded-2xl p-6 block",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] tracking-[0.2em] text-primary", children: p.cat.toUpperCase() }),
            /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-display text-lg font-bold leading-tight", children: p.title }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs text-muted-foreground font-mono", children: [
            p.date,
            " · ",
            p.read,
            " read"
          ] })
        ]
      },
      p.title
    )) })
  ] }) });
}
function Contact() {
  return /* @__PURE__ */ jsxs("section", { id: "contact", className: "relative px-6 md:px-16 lg:px-24 py-32 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": true,
        className: "absolute inset-0 opacity-30 blur-3xl",
        style: {
          background: "radial-gradient(circle at 50% 50%, var(--color-primary), transparent 50%)"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-[0.3em] text-primary mb-5", children: "09 — GET IN TOUCH" }),
      /* @__PURE__ */ jsxs(
        motion.h2,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight text-balance",
          children: [
            "Let's build something ",
            /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "amazing" }),
            " together."
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { delay: 0.3 },
          className: "mt-6 text-lg text-muted-foreground max-w-xl mx-auto text-pretty",
          children: "Whether you're hiring, partnering, or just want to nerd out about LLMs — my inbox is open and I reply within 24 hours."
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.form,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.4 },
          onSubmit: (e) => e.preventDefault(),
          className: "mt-12 grid sm:grid-cols-2 gap-4 text-left",
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Your name",
                className: "glass rounded-xl px-5 py-4 bg-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                placeholder: "Your email",
                className: "glass rounded-xl px-5 py-4 bg-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
              }
            ),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                placeholder: "What's on your mind?",
                rows: 4,
                className: "sm:col-span-2 glass rounded-xl px-5 py-4 bg-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2 flex flex-wrap gap-3 justify-center", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "submit",
                  "data-cursor": "hover",
                  className: "group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-primary-foreground font-medium shadow-[0_10px_30px_-10px_var(--color-primary)] hover:-translate-y-0.5 transition-transform",
                  children: [
                    /* @__PURE__ */ jsx(Send, { className: "h-4 w-4 group-hover:translate-x-0.5 transition-transform" }),
                    "Send message"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "#",
                  "data-cursor": "hover",
                  className: "inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-medium hover:border-primary hover:text-primary transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
                    "Book a call"
                  ]
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "mt-16 font-mono text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Mohammed Harshath · Crafted with obsession."
      ] })
    ] })
  ] });
}
function Index() {
  const [isDevMode, setIsDevMode] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setIsConsoleOpen((prev) => !prev);
      }
    };
    const handleTriggerDevLogin = () => {
      setIsConsoleOpen(true);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("trigger-dev-login", handleTriggerDevLogin);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("trigger-dev-login", handleTriggerDevLogin);
    };
  }, []);
  const handleUnlockDevMode = () => {
    setIsDevMode(true);
  };
  return /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs(SmoothScroll, { children: [
    /* @__PURE__ */ jsx(Loader, {}),
    /* @__PURE__ */ jsx(CustomCursor, {}),
    /* @__PURE__ */ jsx(RadialNav, {}),
    /* @__PURE__ */ jsx(SidebarLeft, {}),
    /* @__PURE__ */ jsx(SidebarRight, {}),
    /* @__PURE__ */ jsx(MouseBlob, {}),
    /* @__PURE__ */ jsxs("main", { className: "relative", children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(About, {}),
      /* @__PURE__ */ jsx(Skills, {}),
      /* @__PURE__ */ jsx(Experience, {}),
      /* @__PURE__ */ jsx(Projects, {}),
      isDevMode && /* @__PURE__ */ jsx(Telemetry, {}),
      /* @__PURE__ */ jsx(Certifications, {}),
      /* @__PURE__ */ jsx(Achievements, {}),
      /* @__PURE__ */ jsx(Testimonials, {}),
      /* @__PURE__ */ jsx(Blog, {}),
      /* @__PURE__ */ jsx(Contact, {})
    ] }),
    /* @__PURE__ */ jsx(DevConsoleModal, { isOpen: isConsoleOpen, onClose: () => setIsConsoleOpen(false), onUnlock: handleUnlockDevMode }),
    /* @__PURE__ */ jsx(AIChatbot, {})
  ] }) });
}
export {
  Index as component
};
