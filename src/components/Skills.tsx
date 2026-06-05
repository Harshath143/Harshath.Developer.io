import { motion } from "framer-motion";
import { Brain, Cpu, Terminal, Cloud, Code, Wrench } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const SKILL_GROUPS = [
  {
    title: "GenAI & LLM",
    description: "Advanced AI agents, LLM orchestration, and RAG pipelines",
    icon: Brain,
    colorClass: "text-purple-400",
    bgClass: "bg-purple-500/10",
    borderHoverClass: "hover:border-purple-500/40",
    glowClass: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
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
    title: "AI & Machine Learning",
    description: "Deep learning models, architectures, and fine-tuning",
    icon: Cpu,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-500/10",
    borderHoverClass: "hover:border-blue-500/40",
    glowClass: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
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
    title: "Backend & Microservices",
    description: "Scalable backend services, APIs, and microservice architectures",
    icon: Terminal,
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
    borderHoverClass: "hover:border-emerald-500/40",
    glowClass: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
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
    title: "Cloud & DevOps",
    description: "Infrastructure, containerization, and orchestration platforms",
    icon: Cloud,
    colorClass: "text-orange-400",
    bgClass: "bg-orange-500/10",
    borderHoverClass: "hover:border-orange-500/40",
    glowClass: "group-hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]",
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
    title: "Programming Languages",
    description: "Core programming and scripting languages",
    icon: Code,
    colorClass: "text-indigo-400",
    bgClass: "bg-indigo-500/10",
    borderHoverClass: "hover:border-indigo-500/40",
    glowClass: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
    skills: ["Python", "SQL", "Bash", "Java", "C#"]
  },
  {
    title: "AI Developer Tooling",
    description: "Model evaluation, workflow tracing, and agent development environments",
    icon: Wrench,
    colorClass: "text-rose-400",
    bgClass: "bg-rose-500/10",
    borderHoverClass: "hover:border-rose-500/40",
    glowClass: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
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
  return (
    <section id="skills" className="relative px-6 md:px-16 lg:px-24 py-32 bg-card/10">
      <div className="max-w-7xl mx-auto">
        <SectionTitle index="02" title="Technical Skills" kicker="Comprehensive skill set in GenAI, Distributed Systems, and Machine Learning" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {SKILL_GROUPS.map((g, idx) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`group relative glass rounded-2xl p-6 transition-all duration-300 ${g.borderHoverClass} ${g.glowClass} flex flex-col justify-between`}
              >
                {/* Subtle top border accent */}
                <div
                  aria-hidden
                  className="absolute -top-px left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, var(--color-primary), transparent)`
                  }}
                />

                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`h-11 w-11 rounded-xl ${g.bgClass} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${g.colorClass}`} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {g.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6 font-sans leading-relaxed">
                    {g.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="bg-card/40 border border-border/60 hover:border-primary/45 rounded-lg px-2.5 py-1 text-[11px] font-mono text-foreground/80 hover:text-foreground transition-all cursor-default"
                      data-cursor="hover"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
