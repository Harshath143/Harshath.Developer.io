import { motion } from "framer-motion";

export function SectionTitle({ index, title, kicker }: { index: string; title: string; kicker?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="flex items-end justify-between gap-8 mb-12"
    >
      <div>
        <p className="font-mono text-xs text-primary tracking-[0.25em] mb-3">
          {index} — {kicker || title.toUpperCase()}
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="hidden md:block flex-1 h-px bg-border mb-3" />
    </motion.div>
  );
}
