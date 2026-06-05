import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const JOBS = [
  {
    company: "Neuralink Labs",
    role: "Senior AI Engineer",
    period: "2024 — Present",
    bullets: [
      "Led the architecture of a multi-agent RAG platform serving 50k+ daily queries.",
      "Reduced LLM inference cost 62% via prompt routing, caching, and quantization.",
      "Owned LLM evaluation harness; raised answer accuracy from 71% → 89%.",
    ],
  },
  {
    company: "GenAI Studio",
    role: "AI Engineer",
    period: "2022 — 2024",
    bullets: [
      "Built production OCR + extraction pipeline for 1M+ enterprise documents.",
      "Shipped a vehicle recommendation model lifting conversion 14%.",
      "Mentored 6 junior engineers; introduced model-card review workflow.",
    ],
  },
  {
    company: "Independent",
    role: "ML Consultant",
    period: "2020 — 2022",
    bullets: [
      "Delivered 20+ ML / NLP engagements across fintech, healthtech, edtech.",
      "Built mushroom species classifier (96% F1) deployed to mobile.",
      "Authored applied-ML write-ups read by 100k+ developers.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-6 md:px-16 lg:px-24 py-32">
      <div className="max-w-5xl mx-auto">
        <SectionTitle index="03" title="Experience" kicker="WHERE I'VE BUILT" />

        <div className="relative pl-8 md:pl-12">
          {/* timeline line */}
          <div className="absolute left-2 md:left-4 top-0 bottom-0 w-px bg-border" />
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.6 }}
            className="absolute left-2 md:left-4 top-0 w-px bg-gradient-to-b from-primary via-primary/60 to-transparent"
          />

          <div className="space-y-12">
            {JOBS.map((j, i) => (
              <motion.div
                key={j.company}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative group"
              >
                <span className="absolute -left-[34px] md:-left-[42px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background shadow-[0_0_18px_var(--color-primary)]" />
                <div className="glass rounded-2xl p-6 transition-transform group-hover:-translate-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl md:text-2xl font-bold">
                      {j.role} <span className="text-primary">@ {j.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">{j.period}</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {j.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-muted-foreground text-pretty">
                        <span className="text-primary mt-1">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
