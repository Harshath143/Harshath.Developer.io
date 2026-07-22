import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./SectionTitle";
import profilePic from "../assets/Harshath_profile.jpeg";
import { ShieldCheck, Cpu, Zap, Database, Award } from "lucide-react";

const STATS = [
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Shipped" },
  { value: 15, suffix: "", label: "Certifications" },
  { value: 7, suffix: "+", label: "AI Models Built" },
];

const PRINCIPLES = [
  {
    title: "Low-Latency Inference",
    desc: "Optimizing Groq LPU & LLM pipelines for <90ms multi-modal processing.",
    icon: Zap,
  },
  {
    title: "Multi-Agent Systems",
    desc: "LangGraph state graphs for autonomous reasoning & dynamic task execution.",
    icon: Cpu,
  },
  {
    title: "Production RAG",
    desc: "Hybrid dense vector search with Redis caching & ClickHouse analytics.",
    icon: Database,
  },
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
    <section id="about" className="relative px-6 md:px-12 lg:px-20 py-32">
      <div className="max-w-7xl mx-auto">
        <SectionTitle index="01" title="About Me" kicker="WHO I AM & HOW I BUILD" />

        <div className="grid lg:grid-cols-12 gap-6 mt-12">
          {/* Profile Card (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 bento-card spotlight-card p-6 flex flex-col justify-between group min-h-[420px]"
          >
            <div className="relative h-72 w-full rounded-2xl overflow-hidden border border-primary/20">
              <img
                src={profilePic}
                alt="Mohammed Harshath Profile"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 bento-card p-3 font-mono text-xs">
                <p className="text-primary font-bold">Mohammed Harshath SS</p>
                <p className="text-muted-foreground text-[11px] mt-0.5">AI & ML Engineer @ Holistic MD LLP</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>GATE 2024 (DS & AI)</span>
              <span className="text-amber-400 font-bold">AIR #2852</span>
            </div>
          </motion.div>

          {/* Bio & Principles (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bento-card spotlight-card p-6 md:p-8"
            >
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-pretty">
                I am an AI & Machine Learning Engineer specializing in the design and deployment of scalable GenAI backends, multi-agent orchestration frameworks, and Retrieval-Augmented Generation (RAG) pipelines. I focus on bridging complex machine learning models with robust, enterprise-grade distributed systems to build high-performance production software.
              </p>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground text-pretty">
                My expertise spans real-time computer vision applications, high-throughput analytical databases, and automated workflow pipelines that optimize latency and comprehension. I prioritize database efficiency, cache hit rates, and operational reliability to ensure low-latency, scalable AI services in production environments.
              </p>

              {/* Engineering Principles */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/40">
                {PRINCIPLES.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.title} className="p-3 rounded-xl bg-card/60 border border-border/60">
                      <Icon className="h-4 w-4 text-primary mb-2" />
                      <p className="font-display font-bold text-xs text-foreground">{p.title}</p>
                      <p className="text-[11px] text-muted-foreground leading-snug mt-1 font-mono">{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="bento-card bento-card-hover p-4 text-center"
                >
                  <p className="font-display text-3xl font-bold text-primary">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

