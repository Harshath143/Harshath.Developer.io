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
      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-50 px-5 md:px-10 py-5 flex items-center justify-between mix-blend-difference">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onJump("hero");
            // Hidden click trigger: 5 clicks opens developer passcode modal
            const clickCount = (window as any)._logoClicks || 0;
            const newCount = clickCount + 1;
            (window as any)._logoClicks = newCount;
            if (newCount >= 5) {
              window.dispatchEvent(new CustomEvent("trigger-dev-login"));
              (window as any)._logoClicks = 0;
            } else {
              // Reset clicks after 2 seconds
              if ((window as any)._logoTimeout) clearTimeout((window as any)._logoTimeout);
              (window as any)._logoTimeout = setTimeout(() => {
                (window as any)._logoClicks = 0;
              }, 2000);
            }
          }}
          className="relative block rounded-full overflow-hidden h-8 w-8 border border-white/25 hover:border-primary/80 transition-colors duration-300 select-none group"
        >
          <img
            src={profilePic}
            alt="Mohammed Harshath Profile Logo"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </a>

        <div className="flex items-center gap-2">
          {/* theme switch dots */}
          <div className="hidden md:flex items-center gap-1.5 mr-2">
            {THEMES.map((t) => (
              <button
                key={t.key}
                onClick={() => setTheme(t.key)}
                aria-label={`${t.label} theme`}
                className="h-3 w-3 rounded-full border border-white/40 transition-transform hover:scale-125"
                style={{
                  background: t.swatch,
                  boxShadow: theme === t.key ? `0 0 10px ${t.swatch}` : "none",
                  transform: theme === t.key ? "scale(1.15)" : "scale(1)",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            data-cursor="hover"
            className="relative h-12 w-12 rounded-full border border-white/30 grid place-items-center text-white"
          >
            <span className="sr-only">Menu</span>
            <div className="relative h-4 w-5">
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
