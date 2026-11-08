import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Command, FileText, Moon, Sun, Sparkles, FolderGit2, User, Award, Mail, Bot, X, Cpu, Layers, Terminal, Github } from "lucide-react";
import { useTheme, type Theme } from "./ThemeProvider";
import { sound } from "@/lib/audioSynth";
import resumePdf from "../assets/Mohammed_Harshath.pdf";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        sound.playClick();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleOpenCustom = () => {
      sound.playClick();
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenCustom);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenCustom);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const COMMANDS = [
    {
      id: "open-github",
      icon: Github,
      label: "Open Mohammed Harshath GitHub Profile (@Harshath143)",
      category: "External Link",
      action: () => {
        window.open("https://github.com/Harshath143", "_blank");
      },
    },
    {
      id: "resume",
      icon: FileText,
      label: "Download Official Dossier (PDF Resume)",
      category: "Action",
      action: () => {
        const link = document.createElement("a");
        link.href = isMounted ? resumePdf : "#";
        link.download = "Mohammed_Harshath_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    },
    {
      id: "nav-deployments",
      icon: Cpu,
      label: "Jump to Flagship Deployments",
      category: "Navigation",
      action: () => scrollTo("deployments"),
    },
    {
      id: "nav-matrix",
      icon: Layers,
      label: "Jump to Systems Matrix (All Projects)",
      category: "Navigation",
      action: () => scrollTo("matrix"),
    },
    {
      id: "nav-sandbox",
      icon: Bot,
      label: "Jump to AI Agent Sandbox Simulator",
      category: "Simulation",
      action: () => scrollTo("agent-sandbox"),
    },
    {
      id: "nav-experience",
      icon: FolderGit2,
      label: "Jump to Operational Experience & History",
      category: "Navigation",
      action: () => scrollTo("experience"),
    },
    {
      id: "nav-about",
      icon: User,
      label: "Jump to Philosophy & Tenets",
      category: "Navigation",
      action: () => scrollTo("about"),
    },
    {
      id: "nav-certs",
      icon: Award,
      label: "Jump to GATE 2024 & Verified Credentials",
      category: "Navigation",
      action: () => scrollTo("credentials"),
    },
    {
      id: "nav-contact",
      icon: Mail,
      label: "Jump to Terminal Dispatch / Contact",
      category: "Navigation",
      action: () => scrollTo("contact"),
    },
    {
      id: "theme-dark",
      icon: Moon,
      label: "Engage Cyberpunk Dark Theme",
      category: "Avionics",
      action: () => setTheme("dark"),
    },
    {
      id: "theme-ai",
      icon: Sparkles,
      label: "Engage AI Matrix Theme",
      category: "Avionics",
      action: () => setTheme("ai"),
    },
  ];

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const executeCommand = (cmd: typeof COMMANDS[0]) => {
    sound.playClick();
    cmd.action();
    setIsOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md grid place-items-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-[#0b0b0e] border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)] overflow-hidden text-left tactical-reticle"
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 gap-3 bg-zinc-950">
              <Terminal className="h-4 w-4 text-red-500 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type command or query (e.g. 'deployments', 'resume', 'matrix')..."
                className="w-full bg-transparent text-xs font-mono text-white placeholder:text-zinc-500 outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-zinc-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Commands List */}
            <div className="p-2 max-h-[340px] overflow-y-auto">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center font-mono text-xs text-zinc-500">
                  // NO MATCHING TELEMETRY COMMANDS FOUND.
                </div>
              ) : (
                filteredCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => sound.playHover()}
                      className="w-full px-3 py-2.5 font-mono text-xs text-left flex items-center justify-between hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-zinc-500 group-hover:text-red-400" />
                        <span className="text-zinc-200 group-hover:text-white font-medium">{cmd.label}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 bg-zinc-950 border border-zinc-800 px-2 py-0.5">
                        {cmd.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Command className="h-3 w-3 text-red-500" /> DARPA Command Telemetry Console
              </span>
              <span>[ESC to exit]</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
