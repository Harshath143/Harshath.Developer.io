import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Loader } from "@/components/Loader";
import { RadialNav } from "@/components/RadialNav";
import { SidebarLeft, SidebarRight } from "@/components/Sidebar";
import { MouseBlob } from "@/components/MouseBlob";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Telemetry } from "@/components/Telemetry";
import { DevConsoleModal } from "@/components/DevConsoleModal";
import { AIChatbot } from "@/components/AIChatbot";
import { Certifications } from "@/components/Certifications";
import { Achievements } from "@/components/Achievements";
import { Testimonials } from "@/components/Testimonials";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammed Harshath — AI Engineer & GenAI Developer" },
      {
        name: "description",
        content:
          "Mohammed Harshath builds production AI systems — RAG agents, LLM applications, and ML pipelines. Senior AI engineer portfolio with selected projects, experience, and writing.",
      },
      { property: "og:title", content: "Mohammed Harshath — AI Engineer" },
      { property: "og:description", content: "Production AI systems, RAG agents, LLM apps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [isDevMode, setIsDevMode] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  useEffect(() => {
    // Keyboard shortcut handler (Ctrl + Shift + D)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setIsConsoleOpen((prev) => !prev);
      }
    };

    // Global custom event handler for logo click
    const handleTriggerDevLogin = () => {
      setIsConsoleOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("trigger-dev-login", handleTriggerDevLogin);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("trigger-dev-login", handleTriggerDevLogin);
    };
  }, []);

  const handleUnlockDevMode = () => {
    setIsDevMode(true);
  };

  return (
    <ThemeProvider>
      <SmoothScroll>
        <Loader />
        <CustomCursor />
        <RadialNav />
        <SidebarLeft />
        <SidebarRight />
        <MouseBlob />
        <main className="relative">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          
          {/* Private Telemetry Dashboard (revealed only in Developer Mode) */}
          {isDevMode && <Telemetry />}
          
          <Certifications />
          <Achievements />
          <Testimonials />
          <Blog />
          <Contact />
        </main>

        {/* Hidden Developer Mode Modal Console */}
        <DevConsoleModal
          isOpen={isConsoleOpen}
          onClose={() => setIsConsoleOpen(false)}
          onUnlock={handleUnlockDevMode}
        />

        {/* Floating AI Chatbot Assistant */}
        <AIChatbot />
      </SmoothScroll>
    </ThemeProvider>
  );
}
