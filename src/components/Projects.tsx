import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, Github, X, Sparkles, Cpu, Layers } from "lucide-react";
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
  diagram?: { step: string; label: string }[];
};

const PROJECTS: Project[] = [
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
    title: "VoiceGPT – Multilingual Voice AI Assistant",
    tag: "Speech & NLP",
    blurb: "Developed an end-to-end multilingual AI voice assistant (Tamil & Marathi support) using Wav2Vec2 for accurate Speech-to-Text and MMS-TTS for natural Text-to-Speech generation. Implemented an offline, privacy-focused system that processes data locally, utilizing fine-tuned transformer models for intent classification and Retrieval-Augmented Generation (RAG) with Sentence Transformers.",
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
    title: "AI_Company_prototype / NeoForge AI",
    tag: "Multi-Agent System",
    blurb: "NeoForge AI is an autonomous software development system built with Python and FastAPI, enabling the seamless transformation of high-level requirements into production-ready codebases. It utilizes a multi-agent orchestration architecture to ensure high code quality through specialized roles—including Architects and Developers—and provides reliable, placeholder-free file generation.",
    stack: ["FastAPI", "Python", "Multi-Agent Architecture", "Groq API", "File Management", "LangGraph"],
    metrics: ["LangGraph Workflow", "Autonomous Dev", "Isolated Env"],
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

  return (
    <section id="projects" className="relative px-6 md:px-12 lg:px-20 py-32 bg-card/20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle index="04" title="Selected Projects" kicker="WHAT I'VE SHIPPED" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {PROJECTS.map((p, i) => (
            <motion.button
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => setActive(p)}
              data-cursor="hover"
              className="group text-left bento-card bento-card-hover spotlight-card p-6 flex flex-col justify-between"
            >
              <div
                aria-hidden
                className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"
                style={{ background: p.gradient }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] text-primary tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {p.tag.toUpperCase()}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {p.blurb}
                </p>
              </div>

              <div className="relative mt-6 pt-4 border-t border-border/40">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-card/80 border border-border/60 text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between font-mono text-xs text-primary">
                  <span>Explore Architecture</span>
                  <span className="text-[10px] text-muted-foreground">&rarr;</span>
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
            className="fixed inset-0 z-[80] bg-background/80 backdrop-blur-xl grid place-items-center p-4 overflow-y-auto"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bento-card spotlight-card overflow-hidden max-h-[90vh] flex flex-col text-left my-auto"
              data-lenis-prevent
            >
              <div className="h-28 shrink-0 relative p-6 flex items-end" style={{ background: active.gradient }}>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 h-9 w-9 rounded-full bg-background/80 backdrop-blur-md grid place-items-center hover:bg-background transition-colors text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="font-mono text-xs text-background font-bold bg-background/20 backdrop-blur-md px-3 py-1 rounded-full">
                  {active.tag.toUpperCase()}
                </span>
              </div>

              <div className="p-8 overflow-y-auto flex-1">
                <h3 className="font-display text-3xl font-bold text-foreground">{active.title}</h3>
                <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">{active.blurb}</p>

                {/* FLOWCHART ARCHITECTURE PIPELINE */}
                {active.diagram && (
                  <div className="mt-8 p-6 rounded-2xl bg-card/60 border border-primary/20">
                    <div className="flex items-center gap-2 font-mono text-xs text-primary mb-4">
                      <Cpu className="h-4 w-4" />
                      <span>SYSTEM ARCHITECTURE & DATAFLOW</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-2">
                      {active.diagram.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
                          <div className="flex flex-col items-center p-3 rounded-xl bg-background border border-border/80 min-w-[120px] text-center shadow-sm hover:border-primary transition-colors">
                            <span className="font-mono text-[9px] text-primary">{item.step}</span>
                            <span className="text-[11px] font-mono font-semibold mt-1 text-foreground">{item.label}</span>
                          </div>
                          {idx < active.diagram!.length - 1 && (
                            <div className="flex flex-col items-center justify-center my-1 sm:my-0 sm:mx-2 text-primary font-mono text-xs">
                              <span className="hidden sm:inline">&rarr;</span>
                              <span className="sm:hidden">&darr;</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {active.metrics.map((m) => (
                    <div key={m} className="bento-card p-4 text-center">
                      <p className="font-display font-bold text-primary text-sm md:text-base">{m}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="font-mono text-xs text-muted-foreground mb-2.5">TECHNOLOGY STACK</p>
                  <div className="flex flex-wrap gap-2">
                    {active.stack.map((s) => (
                      <span key={s} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-card border border-border/80 text-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex gap-3 pt-4 border-t border-border/60">
                  {active.demo && (
                    <a
                      href={active.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                    >
                      <ArrowUpRight className="h-4 w-4" /> Live Demo
                    </a>
                  )}
                  {active.github && (
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" /> View Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

