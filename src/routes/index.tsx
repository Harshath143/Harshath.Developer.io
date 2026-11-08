import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { TacticalCanvas } from "@/components/TacticalCanvas";
import { TacticalNavbar } from "@/components/TacticalNavbar";
import { TacticalHero } from "@/components/TacticalHero";
import { TacticalAbout } from "@/components/TacticalAbout";
import { TacticalDeployments } from "@/components/TacticalDeployments";
import { TacticalMatrix } from "@/components/TacticalMatrix";
import { TacticalExperience } from "@/components/TacticalExperience";
import { TacticalCredentials } from "@/components/TacticalCredentials";
import { TacticalContact } from "@/components/TacticalContact";
import { TacticalDock } from "@/components/TacticalDock";
import { CommandPalette } from "@/components/CommandPalette";
import { DevConsoleModal } from "@/components/DevConsoleModal";
import { AIChatbot } from "@/components/AIChatbot";
import { Telemetry } from "@/components/Telemetry";
import { AgentRebuildProvider } from "@/context/AgentRebuildContext";
import { MultiAgentOverlay } from "@/components/MultiAgentOverlay";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammed Harshath — System Architect & AI Engineer" },
      {
        name: "description",
        content:
          "Tactical portfolio of Mohammed Harshath SS. Production AI systems, Multi-Agent orchestration, sub-100ms RAG pipelines, GATE AIR 2852.",
      },
      { property: "og:title", content: "Mohammed Harshath — System Architect & AI Engineer" },
      { property: "og:description", content: "Production AI systems, Multi-Agent orchestration, and sub-100ms RAG pipelines." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [isDevMode, setIsDevMode] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [hudOverlay, setHudOverlay] = useState(true);

  useEffect(() => {
    // Keyboard shortcut handler (Ctrl + Shift + D)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setIsConsoleOpen((prev) => !prev);
      }
    };

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
      <AgentRebuildProvider>
        <SmoothScroll>
          {/* Custom Monospace Cursor */}
          <CustomCursor />

          {/* Interactive Background Canvas (Cursors filling in details -> Nanobot follower snake swarm) */}
          <TacticalCanvas />

          {/* Multi-Agent Blueprint Wireframe Overlay (Cyan boxes with dimensions & laser alignment guides) */}
          <MultiAgentOverlay />

          {/* Pinned Floating Center Pill Navbar */}
          <TacticalNavbar
            onOpenCommandPalette={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            onOpenDevConsole={() => setIsConsoleOpen(true)}
          />

          {/* Main Tactical Modules (Exact order of reference video) */}
          <main className="relative z-10">
            {/* 1. Hero Section (PORTFOLIO, HARSHATH., Operator Card, Stack, Arsenal Chips) */}
            <TacticalHero />

            {/* 2. Background & Philosophy Section (// 01.00 SEC_ABOUT INDEX [01/05], Prose, 4 Tenets Accordion) */}
            <TacticalAbout />

            {/* 3. Flagship Deployments (ARCHITECTURAL SHOWCASE, SAAI 7-Layer Core, 3 Deployments) */}
            <TacticalDeployments />

            {/* 4. The Systems Matrix (ENGINEERING INDEX, Filter Pills, #SYS-01 to #SYS-06) */}
            <TacticalMatrix />

            {/* 5. Verified Credentials & Field Records */}
            <TacticalExperience />
            <TacticalCredentials />

            {/* Private Telemetry Dashboard (revealed only in Developer Mode) */}
            {isDevMode && <Telemetry />}

            {/* 6. Direct Connect & Terminal Dispatch (Let's Architect Something Extraordinary) */}
            <TacticalContact />
          </main>

          {/* Floating Bottom Telemetry Dock (Rebuilt by 28 agents, On-Air, Replay) */}
          <TacticalDock
            onToggleHud={() => setHudOverlay(!hudOverlay)}
            onOpenCommandPalette={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
          />

          {/* Developer Command Palette (Ctrl + K) */}
          <CommandPalette />

          {/* Developer Mode Modal Console (Ctrl + Shift + D) */}
          <DevConsoleModal
            isOpen={isConsoleOpen}
            onClose={() => setIsConsoleOpen(false)}
            onUnlock={handleUnlockDevMode}
          />

          {/* Floating AI Chatbot Assistant */}
          <AIChatbot />
        </SmoothScroll>
      </AgentRebuildProvider>
    </ThemeProvider>
  );
}
