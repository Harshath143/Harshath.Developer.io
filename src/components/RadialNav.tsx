import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme, type Theme } from "./ThemeProvider";
import profilePic from "../assets/Harshath_profile.jpeg";

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
  { id: "contact", label: "Contact" },
];

const THEMES: { key: Theme; label: string; swatch: string }[] = [
  { key: "dark", label: "Dark", swatch: "#00D4FF" },
  { key: "ai", label: "AI", swatch: "#00FFB3" },
  { key: "light", label: "Light", swatch: "#E63946" },
];

export function RadialNav() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const onJump = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Floating Theme-Aware Header Bar */}
      <header className="fixed top-4 inset-x-4 md:inset-x-8 z-50 px-4 py-2.5 flex items-center justify-between glass border-border/40 backdrop-blur-xl rounded-full shadow-lg max-w-7xl mx-auto">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onJump("hero");
            const clickCount = (window as any)._logoClicks || 0;
            const newCount = clickCount + 1;
            (window as any)._logoClicks = newCount;
            if (newCount >= 5) {
              window.dispatchEvent(new CustomEvent("trigger-dev-login"));
              (window as any)._logoClicks = 0;
            } else {
              if ((window as any)._logoTimeout) clearTimeout((window as any)._logoTimeout);
              (window as any)._logoTimeout = setTimeout(() => {
                (window as any)._logoClicks = 0;
              }, 2000);
            }
          }}
          className="relative flex items-center gap-3 select-none group"
        >
          <div className="h-8 w-8 rounded-full overflow-hidden border border-primary/40 group-hover:scale-105 transition-transform shrink-0">
            <img
              src={profilePic}
              alt="Mohammed Harshath Profile Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-display font-bold text-sm text-foreground hidden sm:inline">
            Mohammed Harshath
          </span>
        </a>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Command Palette Quick Trigger */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            aria-label="Open Command Palette"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 border border-border/60 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
          >
            <span className="text-primary font-bold">⌘K</span>
            <span className="text-[11px]">Command</span>
          </button>

          {/* Responsive Theme Switcher */}
          <div className="flex items-center gap-1 bg-card/80 border border-border/60 rounded-full p-1">
            {THEMES.map((t) => (
              <button
                key={t.key}
                onClick={() => setTheme(t.key)}
                aria-label={`${t.label} theme`}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                  theme === t.key
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full inline-block"
                  style={{ background: t.swatch }}
                />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            data-cursor="hover"
            className="relative h-10 w-10 rounded-full border border-border/60 glass grid place-items-center text-foreground hover:border-primary transition-colors"
          >
            <span className="sr-only">Menu</span>
            <div className="relative h-4 w-4">
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="absolute top-0 left-0 right-0 h-[2px] bg-current origin-center"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-current origin-center"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Radial expanding menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          >
            {/* expanding rings */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1.4, delay: i * 0.12, ease: "easeOut", repeat: Infinity }}
                className="absolute top-7 right-7 md:top-9 md:right-9 h-12 w-12 rounded-full border border-primary -translate-y-0 origin-center"
              />
            ))}

            <div
              className="absolute inset-0 grid place-items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Radial layout for desktop, list for mobile */}
              <div className="relative hidden md:block h-[min(80vh,720px)] w-[min(80vh,720px)]">
                {SECTIONS.map((s, i) => {
                  const angle = (i / SECTIONS.length) * Math.PI * 2 - Math.PI / 2;
                  const r = 280;
                  const x = Math.cos(angle) * r;
                  const y = Math.sin(angle) * r;
                  return (
                    <motion.button
                      key={s.id}
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
                      animate={{ opacity: 1, x, y, scale: 1 }}
                      exit={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
                      transition={{ delay: 0.15 + i * 0.05, duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
                      onClick={() => onJump(s.id)}
                      data-cursor="hover"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-3 rounded-full border border-border bg-card/60 backdrop-blur font-display font-medium text-foreground hover:text-primary hover:border-primary transition-colors whitespace-nowrap"
                    >
                      <span className="text-primary mr-2 font-mono text-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.label}
                    </motion.button>
                  );
                })}

                {/* center decoration */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full border border-dashed border-primary/40"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="font-mono text-xs text-muted-foreground">— EXPLORE —</p>
                  <p className="mt-1 font-display text-xl gradient-text font-bold">Harshath.dev</p>
                </div>
              </div>

              {/* Mobile list */}
              <div className="md:hidden flex flex-col gap-3 px-8 w-full">
                {SECTIONS.map((s, i) => (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                    onClick={() => onJump(s.id)}
                    className="text-left py-3 border-b border-border font-display text-2xl font-bold flex items-baseline gap-3 hover:text-primary"
                  >
                    <span className="font-mono text-xs text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
