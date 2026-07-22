import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Command, FileText, Moon, Sun, Sparkles, FolderGit2, User, Award, Mail, Bot, X } from "lucide-react";
import { useTheme, type Theme } from "./ThemeProvider";
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
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleOpenCustom = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenCustom);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenCustom);
    };
  }, []);

  const COMMANDS = [
    {
      id: "resume",
      icon: FileText,
      label: "Download PDF Resume",
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
      id: "theme-dark",
      icon: Moon,
      label: "Switch Theme: Dark Mode",
      category: "Appearance",
      action: () => setTheme("dark"),
    },
    {
      id: "theme-ai",
      icon: Sparkles,
      label: "Switch Theme: AI Mode",
      category: "Appearance",
      action: () => setTheme("ai"),
    },
    {
      id: "theme-light",
      icon: Sun,
      label: "Switch Theme: Light Mode",
      category: "Appearance",
      action: () => setTheme("light"),
    },
    {
      id: "nav-sandbox",
      icon: Bot,
      label: "Jump to AI Agent Sandbox",
      category: "Navigation",
      action: () => {
        document.getElementById("agent-sandbox")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-projects",
      icon: FolderGit2,
      label: "Jump to Projects",
      category: "Navigation",
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-skills",
      icon: Sparkles,
      label: "Jump to Skills Matrix",
      category: "Navigation",
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-about",
      icon: User,
      label: "Jump to About Me",
      category: "Navigation",
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-certs",
      icon: Award,
      label: "Jump to Certifications",
      category: "Navigation",
      action: () => {
        document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-contact",
      icon: Mail,
      label: "Jump to Contact",
      category: "Navigation",
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const executeCommand = (cmd: typeof COMMANDS[0]) => {
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
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl grid place-items-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bento-card spotlight-card overflow-hidden text-left border border-primary/30"
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-3 border-b border-border/40 gap-3">
              <Search className="h-4 w-4 text-primary shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search... (e.g. 'resume', 'dark', 'projects')"
                className="w-full bg-transparent text-sm font-mono text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-card text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Commands List */}
            <div className="p-2 max-h-[320px] overflow-y-auto custom-scrollbar">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center font-mono text-xs text-muted-foreground">
                  No matching commands found.
                </div>
              ) : (
                filteredCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => executeCommand(cmd)}
                      className="w-full px-3 py-2.5 rounded-xl font-mono text-xs text-left flex items-center justify-between hover:bg-primary/10 hover:text-primary transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        <span className="text-foreground group-hover:text-primary">{cmd.label}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground bg-card border border-border px-2 py-0.5 rounded-md">
                        {cmd.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-card/60 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1">
                <Command className="h-3 w-3" /> Navigation & Shortcuts
              </span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
