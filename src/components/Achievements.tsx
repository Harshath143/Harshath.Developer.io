import { motion } from "framer-motion";
import { Trophy, Award, Zap, Bot, Star } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const ITEMS = [
  {
    year: "2024",
    title: "GATE 2024 AIR #2852",
    note: "Ranked in top 5% nationally in Data Science & Artificial Intelligence.",
    badge: "NATIONAL RANK",
    icon: Trophy,
    highlight: true,
  },
  {
    year: "2025",
    title: "Multi-Agent RAG Systems",
    note: "Architected LangGraph state graph pipelines reducing legislative processing latency by 30%.",
    badge: "HOLISTIC MD LLP",
    icon: Zap,
    highlight: false,
  },
  {
    year: "2024",
    title: "VoiceGPT Multilingual AI",
    note: "Built 100% offline Tamil & Marathi speech-to-text & TTS model with Wav2Vec2.",
    badge: "VOICE AI SYSTEM",
    icon: Bot,
    highlight: false,
  },
  {
    year: "2024",
    title: "IITM GUVI Master Certifications",
    note: "Completed Master Data Science & Advanced Programming Professional credentials.",
    badge: "IITM GUVI",
    icon: Award,
    highlight: false,
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative px-6 md:px-12 lg:px-20 py-32 bg-card/20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle index="07" title="Achievements & Honors" kicker="NATIONAL RECOGNITION & MILESTONES" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {ITEMS.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`bento-card bento-card-hover spotlight-card p-6 flex flex-col justify-between ${
                  a.highlight ? "border-amber-400/40 bg-card/90" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                      a.highlight ? "bg-amber-400/10 text-amber-400 border border-amber-400/30" : "bg-primary/10 text-primary border border-primary/20"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground bg-card border border-border px-2.5 py-0.5 rounded-full">
                      {a.year}
                    </span>
                  </div>

                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    a.highlight ? "bg-amber-400/20 text-amber-400" : "bg-primary/10 text-primary"
                  }`}>
                    {a.badge}
                  </span>

                  <h3 className="mt-3 font-display text-xl font-bold text-foreground">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {a.note}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-mono text-primary">
                  <span>Verified Milestone</span>
                  <Star className="h-3.5 w-3.5 fill-current" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

