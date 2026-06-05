import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
              className="relative w-full max-w-3xl glass rounded-3xl overflow-hidden max-h-[90vh] flex flex-col text-left"
              data-lenis-prevent
            >
              <div className="h-32 shrink-0 relative" style={{ background: active.gradient }}>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/80 grid place-items-center hover:bg-background"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-8 overflow-y-auto flex-1">
                <p className="font-mono text-xs text-primary tracking-[0.2em]">{active.tag.toUpperCase()}</p>
                <h3 className="mt-2 font-display text-4xl font-bold">{active.title}</h3>
                <p className="mt-4 text-lg text-muted-foreground text-pretty">{active.blurb}</p>

                {/* FLOWCHART DIAGRAM */}
                {active.diagram && (
                  <div className="mt-8 p-5 rounded-2xl bg-muted/5 border border-border/40">
                    <p className="font-mono text-[10px] text-muted-foreground mb-4 uppercase tracking-wider">SYSTEM DATAFLOW PIPELINE</p>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 overflow-x-auto no-scrollbar pb-1">
                      {active.diagram.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
                          <div className="flex flex-col items-center p-3 rounded-xl bg-card border border-border/80 min-w-[120px] text-center shadow-sm hover:border-primary/45 transition-colors">
                            <span className="font-mono text-[9px] text-primary">{item.step}</span>
                            <span className="text-[10px] font-sans font-semibold mt-1 text-foreground/90 whitespace-nowrap">{item.label}</span>
                          </div>
                          {idx < active.diagram!.length - 1 && (
                            <div className="flex flex-col items-center justify-center my-1 sm:my-0 sm:mx-2 text-primary">
                              <span className="hidden sm:inline text-xs font-mono">➔</span>
                              <span className="sm:hidden text-xs font-mono">▼</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                  {active.demo && (
                    <a
                      href={active.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-primary-foreground font-medium"
                    >
                      <ArrowUpRight className="h-4 w-4" /> Live demo
                    </a>
                  )}
                  {active.github && (
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium hover:border-primary"
                    >
                      <Github className="h-4 w-4" /> Source
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
