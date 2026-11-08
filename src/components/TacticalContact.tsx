import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check, Github, Linkedin, Send, Terminal, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { sound } from "@/lib/audioSynth";
import resumePdf from "../assets/Mohammed_Harshath.pdf";
import {
  useAgentRebuild,
  FULL_CONTACT_TITLE,
  FULL_CONTACT_SUBTITLE,
  FULL_CONTACT_EMAIL,
} from "@/context/AgentRebuildContext";

export function TacticalContact() {
  const [copied, setCopied] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  const {
    phase,
    contactTitle,
    contactSubtitle,
    contactEmail,
    isContactBuilt,
    activeBox,
  } = useAgentRebuild();

  const isBuilding = phase === "BUILDING";
  const email = isBuilding && contactEmail ? contactEmail : FULL_CONTACT_EMAIL;

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(FULL_CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playEngage();
    setDispatchStatus("PACKET_TRANSMITTING... // ENCRYPTING PAYLOAD");

    setTimeout(() => {
      setDispatchStatus("DISPATCH_RECEIVED // ACK_#8492 // RESPONSE WITHIN 24H");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setDispatchStatus(null), 6000);
    }, 1200);
  };

  return (
    <footer id="contact" className="relative px-4 md:px-8 lg:px-12 pt-28 pb-36 border-t border-zinc-800/80 bg-[#050505]">
      
      {/* Background Subtle Radar Grid */}
      <div className="absolute inset-0 radar-grid opacity-15 pointer-events-none" />

      <div id="rebuild-contact-card" className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Red Tag: DIRECT CONNECT (Exact match to video frame 52s) */}
        <div className="inline-block mb-3">
          <span className="font-mono text-xs font-bold text-red-500 tracking-widest uppercase">
            DIRECT CONNECT
          </span>
        </div>

        {/* Big Heading - streamed character-by-character */}
        <div className="min-h-[4rem] flex items-center justify-center">
          {contactTitle || !isBuilding ? (
            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              {isBuilding ? contactTitle : FULL_CONTACT_TITLE}
              {isBuilding && contactTitle && contactTitle.length < FULL_CONTACT_TITLE.length && (
                <span className="inline-block w-2 h-8 sm:h-12 bg-cyan-400 animate-pulse ml-1" />
              )}
            </h2>
          ) : (
            <div className="h-10 sm:h-14 bg-zinc-900/60 rounded w-96 border border-dashed border-zinc-800/40" />
          )}
        </div>

        {/* Subtitle - streamed */}
        <div className="mt-4 min-h-[2.5rem] max-w-xl mx-auto">
          {contactSubtitle || !isBuilding ? (
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed text-pretty">
              {isBuilding ? contactSubtitle : FULL_CONTACT_SUBTITLE}
              {isBuilding && contactSubtitle && contactSubtitle.length < FULL_CONTACT_SUBTITLE.length && (
                <span className="inline-block w-1.5 h-3.5 bg-cyan-400 animate-pulse ml-0.5" />
              )}
            </p>
          ) : (
            <div className="h-3.5 bg-zinc-900/50 rounded w-80 mx-auto border border-dashed border-zinc-800/40" />
          )}
        </div>

        {/* Email Input & Red Copy Button (Exact match to video frame 52s) */}
        <div id="rebuild-contact-email" className="mt-8 max-w-md mx-auto min-h-[3.5rem]">
          {isContactBuilt || !isBuilding ? (
            <div className="flex items-center bg-[#0b0b0e] border border-zinc-800 rounded-lg p-1.5 shadow-[0_0_25px_rgba(0,0,0,0.8)] focus-within:border-red-500/80 transition-colors">
              <input
                type="text"
                readOnly
                value={email}
                className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm font-mono text-zinc-200 outline-none select-all"
              />
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded shadow-[0_0_15px_rgba(239,68,68,0.35)] transition-all cursor-pointer whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="h-12 bg-zinc-950 border border-dashed border-zinc-800/60 rounded-lg flex items-center justify-center font-mono text-xs text-zinc-700">
              [CONTACT_DISPATCH_ENDPOINT]
            </div>
          )}
        </div>

        {/* Social Links Row as in video (github, linkedin, etc.) */}
        <div className={`mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-zinc-400 transition-opacity duration-300 ${
          isContactBuilt || !isBuilding ? "opacity-100" : "opacity-30"
        }`}>
          <a
            href="https://github.com/Harshath143"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#0b0b0e] border border-zinc-800 hover:border-red-500/80 rounded hover:text-white transition-colors"
          >
            <Github className="h-3.5 w-3.5 text-red-500" />
            <span>github.com/Harshath143</span>
          </a>

          <a
            href="https://www.linkedin.com/in/mohammed-harshath-ss-a68435208/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#0b0b0e] border border-zinc-800 hover:border-red-500/80 rounded hover:text-white transition-colors"
          >
            <Linkedin className="h-3.5 w-3.5 text-cyan-400" />
            <span>linkedin.com/in/harshath</span>
          </a>

          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            download="Mohammed_Harshath_Resume.pdf"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#0b0b0e] border border-zinc-800 hover:border-red-500/80 rounded hover:text-white transition-colors"
          >
            <FileText className="h-3.5 w-3.5 text-amber-400" />
            <span>Resume (PDF)</span>
          </a>
        </div>

        {/* Toggleable Terminal Dispatch Console Drawer */}
        <div className="mt-8">
          <button
            onClick={() => {
              sound.playClick();
              setShowTerminal(!showTerminal);
            }}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>{showTerminal ? "CLOSE ENCRYPTED DISPATCH TERMINAL" : "OPEN ENCRYPTED DISPATCH TERMINAL"}</span>
            {showTerminal ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {showTerminal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-[#0b0b0e] border border-zinc-800 p-6 rounded-lg text-left max-w-xl mx-auto tactical-reticle"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-[11px] font-mono text-zinc-400 mb-4">
                <span className="text-red-500 font-bold">// SECURE_SOCKET_DISPATCH</span>
                <span>STATUS: READY</span>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1 text-[11px]">SENDER_IDENTITY:</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Operator name / Entity"
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-zinc-200 outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 text-[11px]">RETURN_CHANNEL:</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="operator@network.org"
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-zinc-200 outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 text-[11px]">PAYLOAD_SPECIFICATION:</label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Detail architecture requirements, scope, or system constraints..."
                    className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-zinc-200 outline-none focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold tracking-wider uppercase transition-colors"
                >
                  TRANSMIT PACKET -&gt;
                </button>

                {dispatchStatus && (
                  <div className="p-2 bg-zinc-950 border border-red-500/60 text-red-400 text-[10px] text-center font-bold">
                    {dispatchStatus}
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </div>

        {/* Footer Copyright Microtext as in video frame 56s */}
        <div className="mt-14 pt-8 border-t border-zinc-900 text-[11px] font-mono text-zinc-600 space-y-1">
          <p>© 2026 Mohammed Harshath. Designed with Red & Crimson Ops AI.</p>
          <p className="text-zinc-700">Built from first principles. Zero corporate fluff.</p>
        </div>

      </div>

    </footer>
  );
}
