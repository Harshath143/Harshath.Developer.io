import { motion } from "framer-motion";
import { Calendar, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative px-6 md:px-16 lg:px-24 py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-primary), transparent 50%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-primary mb-5">09 — GET IN TOUCH</p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight text-balance"
        >
          Let's build something <span className="gradient-text">amazing</span> together.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto text-pretty"
        >
          Whether you're hiring, partnering, or just want to nerd out about LLMs —
          my inbox is open and I reply within 24 hours.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-12 grid sm:grid-cols-2 gap-4 text-left"
        >
          <input
            type="text"
            placeholder="Your name"
            className="glass rounded-xl px-5 py-4 bg-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <input
            type="email"
            placeholder="Your email"
            className="glass rounded-xl px-5 py-4 bg-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <textarea
            placeholder="What's on your mind?"
            rows={4}
            className="sm:col-span-2 glass rounded-xl px-5 py-4 bg-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none"
          />
          <div className="sm:col-span-2 flex flex-wrap gap-3 justify-center">
            <button
              type="submit"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-primary-foreground font-medium shadow-[0_10px_30px_-10px_var(--color-primary)] hover:-translate-y-0.5 transition-transform"
            >
              <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              Send message
            </button>
            <a
              href="#"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <Calendar className="h-4 w-4" />
              Book a call
            </a>
          </div>
        </motion.form>

        <p className="mt-16 font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mohammed Harshath · Crafted with obsession.
        </p>
      </div>
    </section>
  );
}
