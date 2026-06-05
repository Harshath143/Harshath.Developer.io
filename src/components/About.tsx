import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./SectionTitle";
import profilePic from "../assets/Harshath_profile.jpeg";

const STATS = [
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Shipped" },
  { value: 15, suffix: "", label: "Certifications" },
  { value: 7, suffix: "+", label: "AI Models Built" },
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

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-full min-h-[380px] lg:min-h-0 rounded-2xl overflow-hidden glass group w-full max-w-sm lg:max-w-none mx-auto"
          >
            <img
              src={profilePic}
              alt="Mohammed Harshath Profile"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"
            />
            <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4 z-10">
              <p className="font-mono text-xs text-primary font-bold">currently @</p>
              <p className="font-display font-bold">Building AI products</p>
            </div>
          </motion.div>

          <div>
            {[
              "I am an AI & Machine Learning Engineer specializing in the design and deployment of scalable GenAI backends, multi-agent orchestration frameworks, and Retrieval-Augmented Generation (RAG) pipelines. I focus on bridging complex machine learning models with robust, enterprise-grade distributed systems to build high-performance production software.",
              "My expertise spans real-time computer vision applications, high-throughput analytical databases, and automated workflow pipelines that optimize latency and comprehension. I prioritize database efficiency, cache hit rates, and operational reliability to ensure low-latency, scalable AI services in production environments. Outside of core engineering, I actively contribute to the applied AI community through technical writing, mentoring developer teams, and evaluating newly released frameworks."
            ]
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
