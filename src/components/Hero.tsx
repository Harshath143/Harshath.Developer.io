import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDownToLine, Folder, Send } from "lucide-react";

const ROLES = ["AI Engineer", "LLM Developer", "RAG Architect", "ML Engineer", "Prompt Engineer"];

function useTypewriter(words: string[], speed = 90, hold = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDeleting(true), hold);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDeleting(false); setI((v) => v + 1); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, hold]);
  return text;
}

export function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center px-6 md:px-16 lg:px-24 pt-28 pb-20 overflow-hidden"
    >
      {/* grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-sm md:text-base text-primary mb-5"
          >
            // hello world, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-balance"
          >
            Mohammed <br />
            <span className="gradient-text">Harshath.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 flex items-center gap-3 font-mono text-lg md:text-2xl"
          >
            <span className="text-muted-foreground">$</span>
            <span className="text-foreground">{typed}</span>
            <span className="inline-block w-[10px] h-6 bg-primary animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            I design and ship production-grade AI systems — from RAG agents and
            multimodal pipelines to fine-tuned LLM apps. I bridge research and
            engineering to build products that feel intelligent, fast, and
            beautifully crafted.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium hover:-translate-y-0.5 transition-transform shadow-[0_10px_30px_-10px_var(--color-primary)]"
            >
              <Folder className="h-4 w-4" />
              View Projects
            </a>
            <a
              href="#"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Resume
            </a>
            <a
              href="#contact"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <Send className="h-4 w-4" />
              Contact
            </a>
          </motion.div>
        </div>

        {/* right decorative */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative hidden lg:block aspect-square"
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-primary/40 spin-slow" />
          <div className="absolute inset-8 rounded-full border border-border" />
          <div className="absolute inset-16 rounded-full glass grid place-items-center">
            <div className="text-center px-4">
              <p className="font-mono text-xs text-muted-foreground">STATUS</p>
              <p className="mt-2 font-display text-2xl font-bold text-primary">Available</p>
              <p className="mt-1 text-xs text-muted-foreground">for AI engineering roles</p>
            </div>
          </div>
          {/* orbiting dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: `${120 + i * 30}px center` }}
            />
          ))}
        </motion.div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <motion.div
          className="h-8 w-px bg-current"
          animate={{ scaleY: [0.3, 1, 0.3], transformOrigin: "top" }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
