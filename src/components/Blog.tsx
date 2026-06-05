import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const CATS = ["All", "AI", "Engineering", "Career"];

const POSTS = [
  { title: "Why your RAG evals are lying to you", cat: "AI", date: "May 2026", read: "8 min" },
  { title: "From prototype to production: the LLM gap", cat: "Engineering", date: "Apr 2026", read: "12 min" },
  { title: "I shipped 6 AI products in a year. Here's what stuck.", cat: "Career", date: "Mar 2026", read: "6 min" },
  { title: "Reranking is the new prompt engineering", cat: "AI", date: "Feb 2026", read: "10 min" },
  { title: "Designing agent UIs that don't feel like ChatGPT", cat: "Engineering", date: "Jan 2026", read: "9 min" },
  { title: "Interview kit: AI engineering roles in 2026", cat: "Career", date: "Dec 2025", read: "7 min" },
];

export function Blog() {
  const [cat, setCat] = useState("All");
  const list = POSTS.filter((p) => cat === "All" || p.cat === cat);
  return (
    <section id="blog" className="relative px-6 md:px-16 lg:px-24 py-32 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="08" title="Writing" kicker="ESSAYS & NOTES" />

        <div className="flex flex-wrap gap-2 mb-8">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              data-cursor="hover"
              className={`px-4 py-1.5 rounded-full text-sm font-mono transition-colors ${
                cat === c
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              data-cursor="hover"
              className="group glass rounded-2xl p-6 block"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary">{p.cat.toUpperCase()}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <h3 className="font-display text-lg font-bold leading-tight">{p.title}</h3>
              <p className="mt-3 text-xs text-muted-foreground font-mono">{p.date} · {p.read} read</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
