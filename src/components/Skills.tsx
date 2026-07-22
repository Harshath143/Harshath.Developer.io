import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Brain, Cpu, Terminal, Cloud, Code, Wrench, Layers } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const SKILL_GROUPS = [
  {
    id: "genai",
    title: "GenAI & LLM",
    description: "Advanced AI agents, LLM orchestration, and RAG pipelines",
    icon: Brain,
    colorClass: "text-purple-400",
    bgClass: "bg-purple-500/10",
    borderHoverClass: "hover:border-purple-500/40",
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
    id: "ml",
    title: "AI & Machine Learning",
    description: "Deep learning models, architectures, and fine-tuning",
    icon: Cpu,
    colorClass: "text-cyan-400",
    bgClass: "bg-cyan-500/10",
    borderHoverClass: "hover:border-cyan-500/40",
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
    id: "backend",
    title: "Backend & Microservices",
    description: "Scalable backend services, APIs, and microservice architectures",
    icon: Terminal,
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
    borderHoverClass: "hover:border-emerald-500/40",
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
    id: "cloud",
    title: "Cloud & DevOps",
    description: "Infrastructure, containerization, and orchestration platforms",
    icon: Cloud,
    colorClass: "text-orange-400",
    bgClass: "bg-orange-500/10",
    borderHoverClass: "hover:border-orange-500/40",
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
    id: "lang",
    title: "Programming Languages",
    description: "Core programming and scripting languages",
    icon: Code,
    colorClass: "text-indigo-400",
    bgClass: "bg-indigo-500/10",
    borderHoverClass: "hover:border-indigo-500/40",
    skills: ["Python", "SQL", "Bash", "Java", "C#"]
  },
  {
    id: "tools",
    title: "AI Developer Tooling",
    description: "Model evaluation, workflow tracing, and agent development environments",
    icon: Wrench,
    colorClass: "text-rose-400",
    bgClass: "bg-rose-500/10",
    borderHoverClass: "hover:border-rose-500/40",
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

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredGroups = activeCategory === "all"
    ? SKILL_GROUPS
    : SKILL_GROUPS.filter((g) => g.id === activeCategory);

  return (
    <section id="skills" className="relative px-6 md:px-12 lg:px-20 py-32 bg-card/10">
      <div className="max-w-7xl mx-auto">
        <SectionTitle index="02" title="Technical Skills" kicker="Comprehensive skill set in GenAI, Distributed Systems, and Machine Learning" />

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-8 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full font-mono text-xs transition-all ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground font-bold shadow-[0_4px_20px_-4px_var(--color-primary)]"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="h-3.5 w-3.5 inline mr-1.5" /> All Skills ({SKILL_GROUPS.reduce((acc, g) => acc + g.skills.length, 0)})
          </button>
          {SKILL_GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveCategory(g.id)}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-all ${
                activeCategory === g.id
                  ? "bg-primary text-primary-foreground font-bold shadow-[0_4px_20px_-4px_var(--color-primary)]"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {g.title}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((g, idx) => {
              const Icon = g.icon;
              return (
                <motion.div
                  key={g.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`bento-card bento-card-hover spotlight-card p-6 flex flex-col justify-between ${g.borderHoverClass}`}
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className={`h-11 w-11 rounded-xl ${g.bgClass} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-5 w-5 ${g.colorClass}`} />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {g.title}
                      </h3>
                    </div>

                    <p className="text-xs text-muted-foreground mb-6 font-sans leading-relaxed">
                      {g.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                    {g.skills.map((s) => (
                      <span
                        key={s}
                        className="bg-card/60 border border-border/60 hover:border-primary/45 rounded-lg px-2.5 py-1 text-[11px] font-mono text-foreground/80 hover:text-foreground transition-all cursor-default hover:scale-105"
                        data-cursor="hover"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

