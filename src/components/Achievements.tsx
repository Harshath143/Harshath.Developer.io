import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const ITEMS = [
  { year: "2025", title: "Speaker — AI Engineer Summit", note: "Keynote on production RAG systems." },
  { year: "2024", title: "Top 1% Kaggle (NLP)", note: "Gold medal — multilingual classification." },
  { year: "2024", title: "Open-source — 4.2k★", note: "Maintainer of an agent-eval toolkit." },
  { year: "2023", title: "Hackathon Winner", note: "Best AI product — 200+ teams." },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative px-6 md:px-16 lg:px-24 py-32 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="06" title="Achievements" kicker="WINS & RECOGNITION" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">{a.year}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold leading-snug">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
