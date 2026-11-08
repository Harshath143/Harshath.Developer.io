import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Bot, Sparkles, User, X, CornerDownLeft, FileDown, ExternalLink } from "lucide-react";
import resumePdf from "../assets/Mohammed_Harshath.pdf";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  isStreaming?: boolean;
};

const RESPONSES: Record<string, string> = {
  skills: "Certainly! Mohammed Harshath has a comprehensive technical skillset centered on AI, Machine Learning, and Backend engineering:\n\n• **GenAI & LLM:** LangChain, LangGraph, AutoGen, vLLM, HuggingFace, RAG Pipelines, and Multi-Agent Systems.\n• **AI & ML:** PyTorch, BERT, Transformers, Model Fine-tuning, Vector Databases, and MLOps.\n• **Programming Languages:** Python, SQL, and Bash.\n• **Backend Development:** FastAPI, Django, Celery, Redis, Docker, PostgreSQL, REST APIs, and Microservices.\n• **Cloud & DevOps:** Docker, Kubernetes (Learning), GCP, AWS, and Distributed Systems.\n\nIs there a specific technology area you would like to know more about?",
  experience: "I would be happy to share details about Harshath's professional experience. He has a solid track record in AI development, including:\n\n1. **AI & ML Engineer @ Holistic MD LLP** (Coimbatore, India | Dec 2025 – Present)\n   • Developed *VisionAnalyzer*, a real-time computer vision application using Django and Groq API for low-latency object detection and ingredient extraction from live camera feeds.\n   • Implemented LLM-powered RAG workflows, improving document comprehension and policy analysis accuracy by 40%.\n   • Designed and deployed intelligent AI agents with tool-based reasoning and Dynamic Task Execution for management simulations.\n   • Built a production legislative automation system using LangGraph and RAG pipelines, reducing processing latency by 30%.\n\n2. **AI Developer @ OPSEN** (London, UK | Remote | 9 months)\n   • Worked on clickhouse-integrated risk models, and developed high-performance backend pipelines.\n\nHe has also completed internship stints at TMIS and WeInvest. Let me know if you would like more details about any of these roles!",
  projects: "I would be glad to tell you about Harshath's key academic and professional projects:\n\n• **AI Agent - Investment Advisory System** (LangChain, LlamaIndex, FastAPI, Docker)\n  Developed a personalized investment advisor using LangChain/RAG and transformer models for predictive stock analysis, delivering accurate, tailored forecasts. Built as a containerized inference API with 99.9% uptime.\n\n• **VoiceGPT - Multilingual Voice Assistant** (HuggingFace, RAG, Ollama, VEM, Wav2Vec2, MMS-TTS)\n  Developed an end-to-end multilingual voice assistant (with Tamil & Marathi support) using Wav2Vec2 for Speech-to-Text and MMS-TTS for natural Text-to-Speech generation. It operates as an offline, privacy-focused system utilizing sentence transformers for local RAG.\n\n• **AI Company Prototype / NeoForge AI**\n  An autonomous software generation multi-agent framework built using LangGraph to automate software development tasks.\n\nWould you like to hear more about the technical stack of any particular project?",
  contact: "I would be happy to help you get in touch with Harshath! You can reach out to him directly through the following channels:\n\n• **Email:** [harshathdeveloper@gmail.com](mailto:harshathdeveloper@gmail.com)\n• **Phone:** [+91 8667701712](tel:+918667701712)\n• **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/mohammed-harshath-ss-a68435208/)\n• **GitHub:** [GitHub Profile](https://github.com/Harshath143)\n\nFeel free to send him an email or connect on LinkedIn. He would love to hear from you!",
  phone: "Harshath's phone number is [+91 8667701712](tel:+918667701712). You can also reach him via email at [harshathdeveloper@gmail.com](mailto:harshathdeveloper@gmail.com).",
  education: "Certainly. Harshath has a strong academic foundation:\n\n• **B.Tech in Artificial Intelligence & Data Science** (2021 – 2024)\n  Graduated from Kathir College of Engineering (Coimbatore, India) with a CGPA of **8.02/10**.\n  *Relevant Coursework:* Machine Learning, Deep Learning, Data Structures & Algorithms, and Database Systems.\n\n• **GATE 2024 (Data Science & AI):** Achieved **All India Rank 2852** (Top 5% nationally), showcasing his deep understanding of AI foundations.\n\n• **Professional Certifications:**\n  • Master Data Science from IITM GUVI (Dec 2024)\n  • Advanced Programming Professional from IITM GUVI (Dec 2024)\n\nLet me know if you have any questions about his academic background!",
  location: "Mohammed Harshath is currently based in Coimbatore, Tamil Nadu, India. He works on-site there at Holistic MD LLP, but is open to remote work opportunities globally.",
  github: "You can find Harshath's open-source projects and code repositories on GitHub: [GitHub Profile](https://github.com/Harshath143)",
  linkedin: "Connect with Harshath professionally on LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/mohammed-harshath-ss-a68435208/)",
  resume: `Certainly! You can view or download Mohammed Harshath's official resume here: [Download Resume PDF](${resumePdf}). Let me know if you would like me to summarize any specific section for you!`,
  default: "Thank you for your message! I'm here to help you learn more about Harshath. You can ask me about his:\n\n• **Skills** (e.g., 'What tech stack does he use?')\n• **Experience** (e.g., 'Where has he worked?')\n• **Projects** (e.g., 'Tell me about VoiceGPT')\n• **Education & Certifications** (e.g., 'Where did he study?')\n• **Contact details** (e.g., 'How can I contact him?')\n• **Resume** (e.g., 'Can I get his resume?')\n\nHow can I help you today?"
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
    const isPdf = linkUrl.toLowerCase().endsWith(".pdf") || linkUrl.includes("blob") || linkUrl.includes("pdf");
    parts.push(
      <a
        key={match.index}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        download={isPdf ? "Mohammed_Harshath_Resume.pdf" : undefined}
        className="text-primary underline hover:text-primary/80 font-bold inline-flex items-center gap-1"
      >
        {isPdf ? <FileDown className="h-3 w-3 inline" /> : <ExternalLink className="h-3 w-3 inline" />}
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
    
    // Regex matches with word boundaries to avoid substring matching issues (e.g. 'him' containing 'hi')
    const match = (keywords: string[]) => {
      const pattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "i");
      return pattern.test(cleanText);
    };

    if (match(["contact", "email", "hire", "mail", "connect"])) {
      replyText = RESPONSES.contact;
    } else if (match(["phone", "mobile", "number", "call", "ph"])) {
      replyText = RESPONSES.phone;
    } else if (match(["github", "git", "repo", "repos", "code"])) {
      replyText = RESPONSES.github;
    } else if (match(["linkedin", "profile", "social"])) {
      replyText = RESPONSES.linkedin;
    } else if (match(["resume", "cv", "download", "pdf"])) {
      replyText = RESPONSES.resume;
    } else if (match(["skill", "skills", "languages", "tech", "programming", "framework", "frameworks", "stack"])) {
      replyText = RESPONSES.skills;
    } else if (match(["experience", "work", "job", "jobs", "company", "companies", "holistic", "opsen"])) {
      replyText = RESPONSES.experience;
    } else if (match(["project", "projects", "portfolio", "built", "voicegpt", "advisor", "neoforge"])) {
      replyText = RESPONSES.projects;
    } else if (match(["education", "college", "degree", "university", "gpa", "cgpa", "kathir", "gate", "cert", "certs", "certification", "certifications", "guvi"])) {
      replyText = RESPONSES.education;
    } else if (match(["location", "live", "where", "city", "coimbatore"])) {
      replyText = RESPONSES.location;
    } else if (match(["hello", "hi", "hey", "greet", "greetings", "yo", "morning", "afternoon", "evening"])) {
      replyText = "Hello! It is a pleasure to connect with you. I am Harshath's AI Assistant. I can share detailed information about his technical skills, work experience, projects, education, or contact details. How can I help you today?";
    } else if (match(["thank", "thanks", "thankyou", "awesome", "great", "perfect"])) {
      replyText = "You are very welcome! It is my absolute pleasure to help. Please let me know if you have any other questions about Harshath's work or experience!";
    } else if (match(["bye", "goodbye", "exit", "quit", "close"])) {
      replyText = "Thank you for taking the time to chat! I hope you have a wonderful day. Please feel free to open this chat again if you ever need more information about Harshath. Goodbye!";
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
      <div className="fixed bottom-14 right-6 z-[90]">
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
            className="fixed bottom-32 right-6 z-[90] w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] bg-[#0b0b0e]/95 backdrop-blur-xl rounded-xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col font-sans"
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
