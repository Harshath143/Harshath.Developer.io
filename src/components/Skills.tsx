import { motion } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "./SectionTitle";

const GROUPS = [
  { name: "AI / GenAI", skills: ["LangChain", "LlamaIndex", "OpenAI", "Anthropic", "RAG", "Agents", "Vector DBs"] },
  { name: "Machine Learning", skills: ["scikit-learn", "XGBoost", "Pandas", "NumPy", "Statsmodels"] },
  { name: "Deep Learning", skills: ["PyTorch", "TensorFlow", "Transformers", "CNNs", "Diffusion"] },
  { name: "Backend", skills: ["FastAPI", "Node.js", "Postgres", "Redis", "GraphQL"] },
  { name: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { name: "Cloud / DevOps", skills: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "CI/CD"] },
];

export function Skills() {
  const [active, setActive] = useState(0);
  return (
    <section id="skills" className="relative px-6 md:px-16 lg:px-24 py-32 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="02" title="Skill Universe" kicker="WHAT I WORK WITH" />

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 items-center">
          {/* Galaxy */}
          <div className="relative aspect-square max-w-md mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-primary/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-10 rounded-full border border-border"
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="glass rounded-full px-6 py-3 text-center">
                <p className="font-display font-bold gradient-text text-xl">{GROUPS[active].name}</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">{GROUPS[active].skills.length} tools</p>
              </div>
            </div>
            {GROUPS.map((g, i) => {
              const angle = (i / GROUPS.length) * Math.PI * 2 - Math.PI / 2;
              const r = 42; // %
              const x = 50 + Math.cos(angle) * r;
              const y = 50 + Math.sin(angle) * r;
              return (
                <button
                  key={g.name}
                  onClick={() => setActive(i)}
                  data-cursor="hover"
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                    active === i
                      ? "bg-primary text-primary-foreground scale-110 shadow-[0_0_20px_var(--color-primary)]"
                      : "bg-card border border-border hover:border-primary"
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {g.name}
                </button>
              );
            })}
          </div>

          {/* Skill chips */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3"
          >
            {GROUPS[active].skills.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl px-5 py-3 font-mono text-sm hover:text-primary hover:border-primary transition-colors cursor-default"
                data-cursor="hover"
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
