import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Bot, Sparkles, User, X, CornerDownLeft, FileDown } from "lucide-react";
import resumePdf from "../assets/Mohammed_Harshath.pdf";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  isStreaming?: boolean;
};

const RESPONSES: Record<string, string> = {
  skills: "Harshath's expertise spans GenAI & LLM (LangChain, LangGraph, RAG, Multi-Agent Systems), Machine Learning (PyTorch, Transformers, MLOps), Backend (FastAPI, Django, Celery, Redis), Cloud/DevOps (Docker, Kubernetes, AWS, GCP), and Programming Languages (Python, SQL, Bash, Java, C#).",
  experience: "He is currently an AI & ML Engineer at Holistic MD LLP (Coimbatore, India) building GenAI backends, multi-agent frameworks, and RAG pipelines. Previously, he was an AI Developer at OPSEN (London, UK, Remote) working on clickhouse-integrated risk models, and had internship stints at TMIS and WeInvest.",
  projects: "His notable projects are:\n• AI Agent - Investment Advisory System: Personalized LangChain + FastAPI stock forecasting API.\n• VoiceGPT: Offline local speech voice assistant supporting Tamil & Marathi.\n• AI_Company_prototype (NeoForge AI): Autonomous software generation multi-agent framework built with LangGraph.",
  contact: "You can reach out to Harshath directly via email at harshathdeveloper@gmail.com, or check out his GitHub and LinkedIn handles located in the sidebar.",
  education: "He achieved Rank 2852 in GATE 2024 (Data Science & AI) and holds certifications in Master Data Science and Advanced Programming Professional from IITM GUVI.",
  resume: `You can view or download Mohammed Harshath's official resume here: [Download Resume PDF](${resumePdf})`,
  default: "I'm not sure about that. Try asking about his 'skills', 'experience', 'projects', 'resume', 'education', or how to 'contact' him!"
};

// Render helper to turn [link text](url) markdown syntax into React <a> links
const renderMessageText = (text: string) => {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a
        key={match.index}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        download={linkUrl.endsWith(".pdf")}
        className="text-primary underline hover:text-primary/80 font-bold inline-flex items-center gap-1"
      >
        <FileDown className="h-3 w-3 inline" />
        {linkText}
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Hello! I am Harshath's AI Assistant. Ask me anything about his skills, experience, projects, or credentials!"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Calculate response
    const cleanText = textToSend.toLowerCase();
    let replyText = RESPONSES.default;
    
    if (cleanText.includes("skill") || cleanText.includes("languages") || cleanText.includes("tech")) {
      replyText = RESPONSES.skills;
    } else if (cleanText.includes("experience") || cleanText.includes("work") || cleanText.includes("job") || cleanText.includes("company")) {
      replyText = RESPONSES.experience;
    } else if (cleanText.includes("project") || cleanText.includes("portfolio") || cleanText.includes("built")) {
      replyText = RESPONSES.projects;
    } else if (cleanText.includes("contact") || cleanText.includes("email") || cleanText.includes("hire") || cleanText.includes("mail")) {
      replyText = RESPONSES.contact;
    } else if (cleanText.includes("resume") || cleanText.includes("cv") || cleanText.includes("download") || cleanText.includes("pdf")) {
      replyText = RESPONSES.resume;
    } else if (cleanText.includes("education") || cleanText.includes("cert") || cleanText.includes("gate") || cleanText.includes("degree") || cleanText.includes("guvi")) {
      replyText = RESPONSES.education;
    }

    // Bot response ID
    const botMsgId = Math.random().toString();
    const botMsg: Message = {
      id: botMsgId,
      sender: "bot",
      text: "",
      isStreaming: true
    };

    // Add empty bot message
    setMessages((prev) => [...prev, botMsg]);

    // Stream text typing effect
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < replyText.length) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? { ...msg, text: replyText.slice(0, currentIdx + 1) }
              : msg
          )
        );
        currentIdx++;
      } else {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, isStreaming: false } : msg
          )
        );
      }
    }, 12);
  };

  const QUICK_REPLIES = [
    { text: "Core Skills", query: "skills" },
    { text: "Work History", query: "experience" },
    { text: "Top Projects", query: "projects" },
    { text: "Download Resume", query: "resume" }
  ];

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          data-cursor="hover"
          className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.3)] border border-primary/20 relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary-foreground/10 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6 relative z-10" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 flex items-center justify-center"
              >
                <Bot className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-24 right-6 z-[90] w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] glass rounded-2xl overflow-hidden border border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/40 px-5 py-4 bg-muted/20">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-foreground">AI Assistant</h4>
                  <div className="flex items-center gap-1 font-mono text-[9px] text-emerald-400 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((m) => {
                const isBot = m.sender === "bot";
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${!isBot ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isBot ? "bg-primary/10 text-primary" : "bg-card border border-border text-muted-foreground"
                      }`}
                    >
                      {isBot ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                    </div>

                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                        isBot 
                          ? "bg-card border border-border text-foreground" 
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {renderMessageText(m.text)}
                      {m.isStreaming && (
                        <span className="inline-block w-1.5 h-3 bg-current animate-pulse ml-0.5 align-middle" />
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 py-2 border-t border-border/20 flex flex-wrap gap-1.5 bg-muted/5">
              {QUICK_REPLIES.map((qr) => (
                <button
                  key={qr.query}
                  onClick={() => handleSend(qr.query)}
                  className="text-[10px] font-sans font-medium bg-card border border-border hover:border-primary hover:text-primary rounded-full px-2.5 py-1 transition-all"
                >
                  {qr.text}
                </button>
              ))}
            </div>

            {/* Input field */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 border-t border-border/40 bg-muted/20 flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, resume, skills..."
                className="flex-1 bg-background/50 border border-border/60 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 text-foreground transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="h-8 w-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/95 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
