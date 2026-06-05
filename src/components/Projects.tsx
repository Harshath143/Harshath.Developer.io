import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Github, X } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

type Project = {
  title: string;
  tag: string;
  blurb: string;
  stack: string[];
  metrics: string[];
  github?: string;
  demo?: string;
  gradient: string;
};

const PROJECTS: Project[] = [
  {
    title: "HelpBOT",
    tag: "Conversational AI",
    blurb: "Multi-tenant support agent that resolves 78% of tier-1 tickets autonomously.",
    stack: ["LangChain", "GPT-4", "Pinecone", "FastAPI"],
    metrics: ["78% deflection", "<800ms p95", "12 languages"],
    gradient: "linear-gradient(135deg, #00FFB3, #00D4FF)",
  },
  {
    title: "OCR Intelligence",
    tag: "Document AI",
    blurb: "End-to-end OCR + structured extraction pipeline for 1M+ enterprise docs.",
    stack: ["LayoutLMv3", "PaddleOCR", "Postgres", "Airflow"],
    metrics: ["96.3% field acc.", "200 docs/sec", "SOC2 ready"],
    gradient: "linear-gradient(135deg, #8B5CF6, #E63946)",
  },
  {
    title: "RAG Agent",
    tag: "Retrieval",
    blurb: "Reasoning-aware retrieval agent over 6M chunks with hybrid scoring.",
    stack: ["LlamaIndex", "Qdrant", "Reranker", "Redis"],
    metrics: ["+18 nDCG", "$0.003/query", "Multi-hop"],
    gradient: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
  },
  {
    title: "Research Summarizer",
    tag: "GenAI",
    blurb: "Paper-aware summarization with citation grounding and figure extraction.",
    stack: ["Anthropic", "Marker", "React", "TypeScript"],
    metrics: ["10k+ papers", "Citation safe", "PDF in/out"],
    gradient: "linear-gradient(135deg, #F4D35E, #E63946)",
  },
  {
    title: "Mushroom Classifier",
    tag: "Computer Vision",
    blurb: "Mobile CNN classifying 120 species with on-device inference.",
    stack: ["PyTorch", "MobileNetV3", "ONNX", "React Native"],
    metrics: ["96% F1", "23ms inference", "8MB model"],
    gradient: "linear-gradient(135deg, #00FFB3, #F4D35E)",
  },
  {
    title: "Vehicle Recommender",
    tag: "ML Systems",
    blurb: "Hybrid recommendation engine matching buyers to inventory at scale.",
    stack: ["XGBoost", "Feast", "Redis", "BigQuery"],
    metrics: ["+14% CTR", "300ms p95", "5M users"],
    gradient: "linear-gradient(135deg, #E63946, #8B5CF6)",
  },
];

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-6 md:px-16 lg:px-24 py-32 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <SectionTitle index="04" title="Selected Projects" kicker="WHAT I'VE SHIPPED" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.button
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -8, rotate: -0.3 }}
              onClick={() => setActive(p)}
              data-cursor="hover"
              className="group relative text-left glass rounded-2xl overflow-hidden p-6 hover:border-primary transition-colors"
            >
              <div
                aria-hidden
                className="absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-30 blur-2xl group-hover:opacity-60 transition-opacity"
                style={{ background: p.gradient }}
              />
              <div className="relative">
                <p className="font-mono text-[10px] text-primary tracking-[0.2em]">{p.tag.toUpperCase()}</p>
                <h3 className="mt-2 font-display text-2xl font-bold">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground text-pretty">{p.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s} className="text-[10px] font-mono px-2 py-1 rounded-full border border-border text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">Case study</span>
                  <ArrowUpRight className="h-4 w-4 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-background/80 backdrop-blur-xl grid place-items-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl glass rounded-3xl overflow-hidden"
            >
              <div className="h-40 relative" style={{ background: active.gradient }}>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 grid place-items-center hover:bg-background"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-8">
                <p className="font-mono text-xs text-primary tracking-[0.2em]">{active.tag.toUpperCase()}</p>
                <h3 className="mt-2 font-display text-4xl font-bold">{active.title}</h3>
                <p className="mt-4 text-lg text-muted-foreground text-pretty">{active.blurb}</p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {active.metrics.map((m) => (
                    <div key={m} className="rounded-xl border border-border p-4 text-center">
                      <p className="font-display font-bold text-primary">{m}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="font-mono text-xs text-muted-foreground mb-2">STACK</p>
                  <div className="flex flex-wrap gap-2">
                    {active.stack.map((s) => (
                      <span key={s} className="text-xs font-mono px-3 py-1.5 rounded-full bg-card border border-border">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <a href="#" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-primary-foreground font-medium">
                    <ArrowUpRight className="h-4 w-4" /> Live demo
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium hover:border-primary">
                    <Github className="h-4 w-4" /> Source
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
