import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, Copy, Check, Github, Linkedin, MessageSquare, Terminal } from "lucide-react";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("GenAI Consulting");
  const [sent, setSent] = useState(false);

  const email = "harshathdeveloper@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative px-6 md:px-12 lg:px-20 py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3">// GET IN TOUCH</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.98] tracking-tight text-foreground">
            Let's build something <span className="gradient-text">extraordinary.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Whether you're hiring an AI Engineer, scaling Multi-Agent pipelines, or evaluating LLM backends — my inbox is open.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bento-card spotlight-card p-6 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs text-primary font-bold mb-2">DIRECT EMAIL</p>
                <h3 className="font-display text-xl font-bold text-foreground break-all">{email}</h3>
                <p className="text-xs text-muted-foreground mt-2">Replies within 24 hours.</p>
              </div>

              <button
                onClick={handleCopyEmail}
                className="mt-6 w-full py-3 px-4 rounded-xl glass border border-primary/30 text-xs font-mono font-bold text-primary hover:bg-primary/10 flex items-center justify-center gap-2 transition-all"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL ADDRESS"}</span>
              </button>
            </div>

            {/* Social Links Bento Card */}
            <div className="bento-card spotlight-card p-6">
              <p className="font-mono text-xs text-muted-foreground mb-4">SOCIAL CHANNELS</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/Harshath143"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-card border border-border/80 hover:border-primary flex items-center gap-2.5 text-xs font-mono text-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammed-harshath-ss-a68435208/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-card border border-border/80 hover:border-primary flex items-center gap-2.5 text-xs font-mono text-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Terminal Form (7 cols) */}
          <div className="lg:col-span-7 bento-card spotlight-card p-6 md:p-8">
            <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-6">
              <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold">
                <Terminal className="h-4 w-4" />
                <span>QUICK INQUIRY TERMINAL</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400">STATUS: OPEN</span>
            </div>

            {/* Subject Chips */}
            <div className="mb-6">
              <p className="font-mono text-xs text-muted-foreground mb-2.5">SELECT INQUIRY TYPE</p>
              <div className="flex flex-wrap gap-2">
                {["GenAI Consulting", "Multi-Agent System", "Job Opportunity", "General Query"].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setSubject(chip)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      subject === chip
                        ? "bg-primary text-primary-foreground font-bold"
                        : "bg-card border border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted-foreground mb-1.5 text-[11px]">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-card/80 border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1.5 text-[11px]">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="w-full bg-card/80 border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground mb-1.5 text-[11px]">MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  placeholder={`Tell me about your project or role regarding ${subject}...`}
                  className="w-full bg-card/80 border border-border/80 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors resize-none font-sans text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md text-xs"
              >
                {sent ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" /> MESSAGE TRANSMITTED
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> TRANSMIT MESSAGE
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-16 text-center font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mohammed Harshath · Built for AI Performance.
        </p>
      </div>
    </section>
  );
}

