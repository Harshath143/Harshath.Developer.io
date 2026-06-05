import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./SectionTitle";

const STATS = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 30, suffix: "+", label: "Projects Shipped" },
  { value: 12, suffix: "", label: "Certifications" },
  { value: 18, suffix: "+", label: "AI Models Built" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const dur = 1400;
        const t0 = performance.now();
        const tick = (t: number) => {
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
  return <span ref={ref}>{n}{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="relative px-6 md:px-16 lg:px-24 py-32">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="01" title="About Me" kicker="WHO I AM" />

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden glass"
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display text-9xl font-bold text-background/30">MH</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4">
              <p className="font-mono text-xs text-primary">currently @</p>
              <p className="font-display font-bold">Building AI products</p>
            </div>
          </motion.div>

          <div>
            {["I'm an AI engineer obsessed with making intelligence feel useful. My work lives at the intersection of LLMs, retrieval systems, and crafted user interfaces — turning research into products people actually want to use.",
              "I've shipped RAG agents that reason over millions of documents, OCR pipelines processing enterprise paperwork, and recommendation systems that improved conversion by double digits. I care equally about model accuracy and the milliseconds between click and response.",
              "When I'm not training models, I write about applied AI, mentor builders, and stress-test new frameworks the day they drop."]
              .map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="text-lg leading-relaxed text-muted-foreground mb-5 text-pretty"
              >
                {p}
              </motion.p>
            ))}

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass rounded-xl p-4"
                >
                  <p className="font-display text-3xl font-bold text-primary">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
