import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { sound } from "@/lib/audioSynth";

export type RebuildPhase = "BUILDING" | "SWARMING";

export interface BoundingBoxInfo {
  id: string;
  dimension: string;
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
}

export interface CursorPosition {
  x: number;
  y: number;
  typing: boolean;
  name: string;
  color: string;
}

export interface StreamedState {
  // Hero
  heroHello: string;
  heroName: string;
  heroRole: string;
  heroBio: string;
  isNamePlaced: boolean;
  isButtonsPlaced: boolean;
  isMetricsPlaced: boolean;
  isAvatarPlaced: boolean;
  isStackPlaced: boolean;
  isTitlePlaced: boolean;
  // About
  aboutBioP1: string;
  aboutBioP2: string;
  aboutBioP3: string;
  aboutQuote: string;
  isAboutBuilt: boolean;
  // Deployments
  deployTitle: string;
  deployDesc: string;
  isDeployMetricsPlaced: boolean;
  activeDeployLayer: string;
  isDeployLayersPlaced: boolean;
  isDeploymentsBuilt: boolean;
  // Matrix
  matrixSubtitle: string;
  matrixCards: string[];
  matrixBuiltCount: number;
  isMatrixBuilt: boolean;
  // Contact
  contactTitle: string;
  contactSubtitle: string;
  contactEmail: string;
  isContactBuilt: boolean;
}

interface AgentRebuildContextType extends StreamedState {
  phase: RebuildPhase;
  isRebuilding: boolean;
  isTouring: boolean;
  speed: number;
  progress: number;
  layerCount: number;
  totalLayers: number;
  agentCount: number;
  completedTime: string;
  currentSectionId: string;
  activeBox: BoundingBoxInfo | null;
  cursorPos: CursorPosition;
  triggerReplay: () => void;
  toggleSpeed: () => void;
  toggleTour: () => void;
  skipRebuild: () => void;
}

// Full text constants
export const FULL_HELLO = "Hello, I'm";
export const FULL_NAME = "HARSHATH.";
export const FULL_ROLE = "● SYSTEM ARCHITECT & AUTONOMOUS OPERATOR";
export const FULL_BIO =
  "Architecting 24/7 autonomous cognitive ecosystems, multi-agent swarms, and low-latency RAG pipelines from first principles — zero frameworks, total autonomy.";

export const FULL_ABOUT_BIO_P1 =
  "I am Mohammed Harshath SS — a Senior AI & Machine Learning Engineer specializing in production multi-agent systems, sub-100ms RAG pipelines, and low-latency inference architecture based out of Coimbatore, India.";
export const FULL_ABOUT_BIO_P2 =
  "My formal foundation is rooted in Artificial Intelligence & Data Science (B.Tech, 8.02 CGPA), validated by achieving GATE 2024 AIR #2852 (Top 5% National Rank) awarded by the Indian Institute of Science (IISc), and verified Master Data Science credentials from IITM GUVI.";
export const FULL_ABOUT_BIO_P3 =
  "At Holistic MD LLP and through my work at OPSEN (London, UK), my defining capabilities were forged in the terminal: completely self-directed in multi-agent orchestration (LangGraph), low-latency computer vision (VisionAnalyzer on Groq LPU), high-throughput analytics (ClickHouse, Redis), and distributed backends.";
export const FULL_ABOUT_QUOTE =
  '"I design and deploy autonomous AI systems that operate 24/7 with persistent memory, multi-agent orchestration, and continuous self-evolution — built from first principles, not frameworks."';

export const FULL_DEPLOY_TITLE = "SAAI — 7-Layer Autonomous AI Ecosystem";
export const FULL_DEPLOY_DESC =
  "A persistent, self-evolving autonomous intelligence operating 24/7 on local silicon. Engineered without external startup frameworks, featuring 478 custom tools across 14 MCP servers, 4-tier redundant memory, and a continuous reflection loop.";

export const FULL_MATRIX_SUBTITLE =
  "Specialized architectures spanning multi-LLM cognitive assemblies, deep learning latent models, and GPU cryptography.";
export const FULL_MATRIX_CARDS = [
  "Cognitive assembly model comprising 6 AI personality shards engaging in structured debate, cross-verification, and voting protocols to synthesize balanced decisions.",
  "Production-grade time-series forecasting service with FastAPI backend and React/TypeScript dashboard. Complete machine learning pipeline from raw stream ingestion to checkpointing.",
  "Experimental PyTorch CUDA neural architecture modeling complex dynamical physical and mathematical systems in a 1024-dimensional latent field via discrete integration pipelines.",
  "Massively parallel CUDA accelerator searching search spaces exploiting non-deductible RTX 4070 silicon. Compute-parallel multi-million point scalar multiplication and secp256k1 pipeline.",
  "End-to-end fund architecture design applying systems engineering to quantitative finance. LP/GP governance, 2/20 fee watermarking, KYC/AML compliance, and risk routing.",
  "Epistemological cognitive foundation designed to anchor AI agents against hallucination and sycophancy. Enforces strict factual truth verification before token generation.",
];

export const FULL_CONTACT_TITLE = "Let's Architect Something Extraordinary.";
export const FULL_CONTACT_SUBTITLE =
  "Available for production autonomous AI system design, institutional trading infrastructure, and sovereign technical advisory worldwide.";
export const FULL_CONTACT_EMAIL = "harshathdeveloper@gmail.com";

function streamChars(fullText: string, startMs: number, durationMs: number, currentMs: number): string {
  if (currentMs < startMs) return "";
  if (currentMs >= startMs + durationMs) return fullText;
  const progress = (currentMs - startMs) / durationMs;
  const count = Math.floor(progress * fullText.length);
  return fullText.slice(0, count);
}

const AgentRebuildContext = createContext<AgentRebuildContextType | null>(null);

export function AgentRebuildProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<RebuildPhase>("BUILDING");
  const [isTouring, setIsTouring] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [progress, setProgress] = useState(0);
  const [layerCount, setLayerCount] = useState(0);
  const totalLayers = 252;
  const [agentCount, setAgentCount] = useState(18);
  const [completedTime, setCompletedTime] = useState("48.6s");
  const [currentSectionId, setCurrentSectionId] = useState("hero");

  // Streamed state
  const [streamed, setStreamed] = useState<StreamedState>({
    heroHello: "",
    heroName: "",
    heroRole: "",
    heroBio: "",
    isNamePlaced: false,
    isButtonsPlaced: false,
    isMetricsPlaced: false,
    isAvatarPlaced: false,
    isStackPlaced: false,
    isTitlePlaced: false,
    aboutBioP1: "",
    aboutBioP2: "",
    aboutBioP3: "",
    aboutQuote: "",
    isAboutBuilt: false,
    deployTitle: "",
    deployDesc: "",
    isDeployMetricsPlaced: false,
    activeDeployLayer: "l1",
    isDeployLayersPlaced: false,
    isDeploymentsBuilt: false,
    matrixSubtitle: "",
    matrixCards: ["", "", "", "", "", ""],
    matrixBuiltCount: 0,
    isMatrixBuilt: false,
    contactTitle: "",
    contactSubtitle: "",
    contactEmail: "",
    isContactBuilt: false,
  });

  const [activeBox, setActiveBox] = useState<BoundingBoxInfo | null>(null);

  // Active typing cursor position coordinates
  const [cursorPos, setCursorPos] = useState<CursorPosition>({
    x: 240,
    y: 140,
    typing: false,
    name: "Agent #04",
    color: "#00f0ff",
  });

  const timerRef = useRef<number | null>(null);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const isTouringRef = useRef(isTouring);
  isTouringRef.current = isTouring;

  // Smooth auto-scroll helper during guided tour
  const scrollToSection = useCallback((sectionId: string) => {
    if (!isTouringRef.current) return;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Dynamic DOM box getter for pixel-perfect cursor tracking
  const getElementBox = useCallback((elementId: string, fallback: { x: number; y: number; width: number; height: number }) => {
    if (typeof window === "undefined") return fallback;
    const el = document.getElementById(elementId);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return {
          x: Math.max(10, rect.left),
          y: Math.max(10, rect.top),
          width: rect.width,
          height: rect.height,
        };
      }
    }
    return fallback;
  }, []);

  const startAnimation = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    setPhase("BUILDING");
    setProgress(0);
    setLayerCount(0);
    setAgentCount(18);
    setCurrentSectionId("hero");

    // Reset all streamed states so NOTHING exists before cursor arrives
    setStreamed({
      heroHello: "",
      heroName: "",
      heroRole: "",
      heroBio: "",
      isNamePlaced: false,
      isButtonsPlaced: false,
      isMetricsPlaced: false,
      isAvatarPlaced: false,
      isStackPlaced: false,
      isTitlePlaced: false,
      aboutBioP1: "",
      aboutBioP2: "",
      aboutBioP3: "",
      aboutQuote: "",
      isAboutBuilt: false,
      deployTitle: "",
      deployDesc: "",
      isDeployMetricsPlaced: false,
      activeDeployLayer: "l1",
      isDeployLayersPlaced: false,
      isDeploymentsBuilt: false,
      matrixSubtitle: "",
      matrixCards: ["", "", "", "", "", ""],
      matrixBuiltCount: 0,
      isMatrixBuilt: false,
      contactTitle: "",
      contactSubtitle: "",
      contactEmail: "",
      isContactBuilt: false,
    });
    setActiveBox(null);

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const startTime = Date.now();
    const baseDuration = 48600; // 48.6s exact match to video dock readout!

    timerRef.current = window.setInterval(() => {
      const realElapsed = Date.now() - startTime;
      const t = realElapsed * speedRef.current;
      const pct = Math.min(100, (t / baseDuration) * 100);
      setProgress(pct);

      const layers = Math.min(totalLayers, Math.floor((pct / 100) * totalLayers));
      setLayerCount(layers);

      const agents = Math.min(28, 18 + Math.floor((pct / 100) * 10));
      setAgentCount(agents);

      const winWidth = typeof window !== "undefined" ? window.innerWidth : 1200;

      // =====================================================================
      // STAGE 1: HERO SECTION (0.0s – 8.5s) [Layers 0 -> 67]
      // =====================================================================
      if (t < 8500) {
        setCurrentSectionId("hero");

        // 0.0s - 0.9s: PORTFOLIO Title
        if (t < 900) {
          const b = getElementBox("rebuild-hero-title", { x: 80, y: 70, width: Math.min(950, winWidth - 120), height: 120 });
          setCursorPos({
            x: b.x + (t / 900) * b.width * 0.7,
            y: b.y + b.height * 0.5,
            typing: true,
            name: "Architect",
            color: "#ef4444",
          });
          setActiveBox({ id: "title", dimension: "1144 × 288", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          if (t > 450) setStreamed((prev) => ({ ...prev, isTitlePlaced: true }));
        }
        // 0.9s - 1.8s: Hello, I'm streaming
        else if (t >= 900 && t < 1800) {
          const b = getElementBox("rebuild-hero-hello", { x: 110, y: 215, width: 160, height: 48 });
          setActiveBox({ id: "hello", dimension: "158 × 56", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          const typed = streamChars(FULL_HELLO, 1050, 700, t);
          setStreamed((prev) => ({ ...prev, heroHello: typed, isTitlePlaced: true }));
          setCursorPos({
            x: b.x + 10 + typed.length * 12,
            y: b.y + 24,
            typing: t >= 1050,
            name: "Agent #04",
            color: "#00f0ff",
          });
        }
        // 1.8s - 2.8s: HARSHATH. name streaming inside red banner
        else if (t >= 1800 && t < 2800) {
          const b = getElementBox("rebuild-hero-name", { x: 110, y: 270, width: 220, height: 68 });
          setActiveBox({ id: "name", dimension: "220 × 75", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          const typed = streamChars(FULL_NAME, 1950, 750, t);
          setStreamed((prev) => ({
            ...prev,
            heroHello: FULL_HELLO,
            heroName: typed,
            isNamePlaced: t >= 1950,
          }));
          setCursorPos({
            x: b.x + 16 + typed.length * 20,
            y: b.y + 30,
            typing: t >= 1950,
            name: "Architect",
            color: "#ef4444",
          });
        }
        // 2.8s - 4.0s: Role badge streaming
        else if (t >= 2800 && t < 4000) {
          const b = getElementBox("rebuild-hero-role", { x: 110, y: 340, width: 385, height: 32 });
          setActiveBox({ id: "role", dimension: "385 × 28", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          const typed = streamChars(FULL_ROLE, 2950, 950, t);
          setStreamed((prev) => ({
            ...prev,
            heroName: FULL_NAME,
            isNamePlaced: true,
            heroRole: typed,
          }));
          setCursorPos({
            x: b.x + 10 + typed.length * 8.5,
            y: b.y + 16,
            typing: t >= 2950,
            name: "L7 Core",
            color: "#fbbf24",
          });
        }
        // 4.0s - 5.8s: Bio prose streaming (rapid token typing!)
        else if (t >= 4000 && t < 5800) {
          const b = getElementBox("rebuild-hero-bio", { x: 110, y: 395, width: 440, height: 110 });
          setActiveBox({ id: "bio", dimension: "440 × 120", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          const typed = streamChars(FULL_BIO, 4150, 1500, t);
          setStreamed((prev) => ({
            ...prev,
            heroRole: FULL_ROLE,
            heroBio: typed,
          }));
          const line = Math.floor(typed.length / 48);
          const lineChar = typed.length % 48;
          setCursorPos({
            x: b.x + 10 + lineChar * 7.5,
            y: b.y + 20 + line * 20,
            typing: t >= 4150,
            name: "Vector Ops",
            color: "#10b981",
          });
        }
        // 5.8s - 6.8s: Buttons & Metrics snap in
        else if (t >= 5800 && t < 6800) {
          const b = getElementBox("rebuild-hero-buttons", { x: 110, y: 515, width: 340, height: 55 });
          setActiveBox({ id: "buttons", dimension: "340 × 55", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          setStreamed((prev) => ({
            ...prev,
            heroBio: FULL_BIO,
            isButtonsPlaced: true,
            isMetricsPlaced: true,
          }));
          setCursorPos({ x: b.x + b.width * 0.6, y: b.y + 25, typing: true, name: "Synthesizer", color: "#a855f7" });
        }
        // 6.8s - 8.5s: Operator Avatar Card with Red Background & Right Stack
        else {
          const b = getElementBox("rebuild-hero-avatar", { x: winWidth * 0.5 - 140, y: 220, width: 280, height: 380 });
          setActiveBox({ id: "avatar", dimension: "280 × 380", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          setStreamed((prev) => ({
            ...prev,
            isButtonsPlaced: true,
            isMetricsPlaced: true,
            isAvatarPlaced: true,
            isStackPlaced: true,
          }));
          setCursorPos({ x: b.x + b.width * 0.5, y: b.y + b.height * 0.35, typing: true, name: "Trace Analyzer", color: "#38bdf8" });
        }
      }

      // =====================================================================
      // STAGE 2: ABOUT & PHILOSOPHY (8.5s – 18.0s) [Layers 68 -> 105]
      // =====================================================================
      else if (t >= 8500 && t < 18000) {
        if (currentSectionId !== "about") {
          setCurrentSectionId("about");
          scrollToSection("about");
        }

        // 8.5s - 12.0s: Streaming 3 paragraphs of Bio prose
        if (t < 12000) {
          const b = getElementBox("rebuild-about-bio", { x: 120, y: 240, width: 550, height: 200 });
          setActiveBox({ id: "about-bio", dimension: "580 × 200", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          const p1 = streamChars(FULL_ABOUT_BIO_P1, 8800, 1000, t);
          const p2 = streamChars(FULL_ABOUT_BIO_P2, 9800, 1000, t);
          const p3 = streamChars(FULL_ABOUT_BIO_P3, 10800, 1000, t);
          setStreamed((prev) => ({
            ...prev,
            aboutBioP1: p1,
            aboutBioP2: p2,
            aboutBioP3: p3,
          }));
          setCursorPos({
            x: b.x + 30 + ((t - 8800) / 3200) * (b.width * 0.8),
            y: b.y + 30 + ((t - 8800) / 3200) * 120,
            typing: true,
            name: "Agent #04",
            color: "#00f0ff",
          });
        }
        // 12.0s - 15.0s: Streaming Quote Box char-by-char
        else if (t >= 12000 && t < 15000) {
          const b = getElementBox("rebuild-about-quote", { x: 120, y: 380, width: 580, height: 120 });
          setActiveBox({ id: "about-quote", dimension: "580 × 120", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          const q = streamChars(FULL_ABOUT_QUOTE, 12200, 2600, t);
          setStreamed((prev) => ({
            ...prev,
            aboutBioP1: FULL_ABOUT_BIO_P1,
            aboutBioP2: FULL_ABOUT_BIO_P2,
            aboutBioP3: FULL_ABOUT_BIO_P3,
            aboutQuote: q,
          }));
          setCursorPos({
            x: b.x + 20 + Math.min(b.width - 40, (q.length % 55) * 8.5),
            y: b.y + 25 + Math.floor(q.length / 55) * 22,
            typing: true,
            name: "L7 Core",
            color: "#fbbf24",
          });
        }
        // 15.0s - 18.0s: Tenets accordion open & Stat counters
        else {
          const b = getElementBox("rebuild-about-tenets", { x: winWidth * 0.6, y: 260, width: 440, height: 320 });
          setActiveBox({ id: "about-tenets", dimension: "460 × 340", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          setStreamed((prev) => ({
            ...prev,
            aboutQuote: FULL_ABOUT_QUOTE,
            isAboutBuilt: true,
          }));
          setCursorPos({ x: b.x + 80, y: b.y + 50, typing: true, name: "Vector Ops", color: "#10b981" });
        }
      }

      // =====================================================================
      // STAGE 3: FLAGSHIP DEPLOYMENTS (18.0s – 32.0s) [Layers 106 -> 175]
      // =====================================================================
      else if (t >= 18000 && t < 32000) {
        if (currentSectionId !== "deployments") {
          setCurrentSectionId("deployments");
          scrollToSection("deployments");
        }

        // 18.0s - 22.5s: Streaming Ecosystem Title & Description
        if (t < 22500) {
          const b = getElementBox("rebuild-deploy-ecosystem", { x: 100, y: 260, width: Math.min(1080, winWidth - 100), height: 420 });
          setActiveBox({ id: "deploy-ecosystem", dimension: "1144 × 420", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          const titleTyped = streamChars(FULL_DEPLOY_TITLE, 18500, 1000, t);
          const descTyped = streamChars(FULL_DEPLOY_DESC, 19500, 2800, t);
          setStreamed((prev) => ({
            ...prev,
            isAboutBuilt: true,
            deployTitle: titleTyped,
            deployDesc: descTyped,
          }));
          setCursorPos({
            x: b.x + 30 + Math.min(b.width - 60, (descTyped.length % 65) * 8.5),
            y: b.y + 70 + Math.floor(descTyped.length / 65) * 20,
            typing: t >= 18500,
            name: "Architect",
            color: "#ef4444",
          });
        }
        // 22.5s - 25.5s: 4 Big Red Stats slam in
        else if (t >= 22500 && t < 25500) {
          const b = getElementBox("rebuild-deploy-metrics", { x: 100, y: 380, width: Math.min(1080, winWidth - 100), height: 90 });
          setActiveBox({ id: "deploy-metrics", dimension: "1080 × 90", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          setStreamed((prev) => ({
            ...prev,
            deployTitle: FULL_DEPLOY_TITLE,
            deployDesc: FULL_DEPLOY_DESC,
            isDeployMetricsPlaced: true,
          }));
          setCursorPos({ x: b.x + b.width * 0.45, y: b.y + 45, typing: true, name: "Synthesizer", color: "#a855f7" });
        }
        // 25.5s - 29.0s: 7-Layer Stack Tabs & Inspector (clicks L1 -> L4)
        else if (t >= 25500 && t < 29000) {
          const b = getElementBox("rebuild-deploy-layers", { x: 100, y: 480, width: Math.min(1080, winWidth - 100), height: 180 });
          setActiveBox({ id: "deploy-layers", dimension: "1080 × 180", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          const layer = t < 27200 ? "l1" : "l4";
          setStreamed((prev) => ({
            ...prev,
            isDeployMetricsPlaced: true,
            isDeployLayersPlaced: true,
            activeDeployLayer: layer,
          }));
          setCursorPos({
            x: b.x + (layer === "l1" ? 80 : 340),
            y: b.y + 25,
            typing: true,
            name: layer === "l1" ? "Architect" : "Vector Ops",
            color: layer === "l1" ? "#ef4444" : "#10b981",
          });
        }
        // 29.0s - 32.0s: 3 Sub-deployment Project Cards
        else {
          const b = getElementBox("rebuild-deploy-subcards", { x: 100, y: 680, width: Math.min(1080, winWidth - 100), height: 260 });
          setActiveBox({ id: "deploy-subcards", dimension: "1080 × 260", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          setStreamed((prev) => ({
            ...prev,
            isDeployLayersPlaced: true,
            isDeploymentsBuilt: true,
          }));
          setCursorPos({ x: b.x + b.width * 0.5, y: b.y + 100, typing: true, name: "Trace Analyzer", color: "#38bdf8" });
        }
      }

      // =====================================================================
      // STAGE 4: THE SYSTEMS MATRIX (32.0s – 44.0s) [Layers 176 -> 235]
      // =====================================================================
      else if (t >= 32000 && t < 44000) {
        if (currentSectionId !== "matrix") {
          setCurrentSectionId("matrix");
          scrollToSection("matrix");
        }

        // 32.0s - 35.5s: Subtitle Streaming
        if (t < 35500) {
          const b = getElementBox("rebuild-matrix-header", { x: 120, y: 180, width: 600, height: 80 });
          setActiveBox({ id: "matrix-header", dimension: "600 × 80", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          const sub = streamChars(FULL_MATRIX_SUBTITLE, 32800, 2400, t);
          setStreamed((prev) => ({
            ...prev,
            isDeploymentsBuilt: true,
            matrixSubtitle: sub,
            matrixBuiltCount: 0,
          }));
          setCursorPos({ x: b.x + sub.length * 7.5, y: b.y + 40, typing: true, name: "Agent #04", color: "#00f0ff" });
        }
        // 35.5s - 38.5s: Cards 1 & 2 Streaming
        else if (t >= 35500 && t < 38500) {
          const b = getElementBox("rebuild-matrix-card-1", { x: 120, y: 300, width: 340, height: 260 });
          setActiveBox({ id: "matrix-cards-1-2", dimension: "360 × 260", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          const c0 = streamChars(FULL_MATRIX_CARDS[0], 35500, 1400, t);
          const c1 = streamChars(FULL_MATRIX_CARDS[1], 36500, 1600, t);
          setStreamed((prev) => ({
            ...prev,
            matrixSubtitle: FULL_MATRIX_SUBTITLE,
            matrixCards: [c0, c1, "", "", "", ""],
            matrixBuiltCount: 2,
          }));
          setCursorPos({ x: b.x + b.width * 0.5, y: b.y + b.height * 0.5, typing: true, name: "L7 Core", color: "#fbbf24" });
        }
        // 38.5s - 41.5s: Cards 3 & 4 Streaming
        else if (t >= 38500 && t < 41500) {
          const b = getElementBox("rebuild-matrix-card-3", { x: winWidth * 0.4, y: 300, width: 340, height: 260 });
          setActiveBox({ id: "matrix-cards-3-4", dimension: "360 × 260", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          const c2 = streamChars(FULL_MATRIX_CARDS[2], 38500, 1400, t);
          const c3 = streamChars(FULL_MATRIX_CARDS[3], 39500, 1600, t);
          setStreamed((prev) => ({
            ...prev,
            matrixCards: [FULL_MATRIX_CARDS[0], FULL_MATRIX_CARDS[1], c2, c3, "", ""],
            matrixBuiltCount: 4,
          }));
          setCursorPos({ x: b.x + b.width * 0.5, y: b.y + b.height * 0.5, typing: true, name: "Vector Ops", color: "#10b981" });
        }
        // 41.5s - 44.0s: Cards 5 & 6 Streaming
        else {
          const b = getElementBox("rebuild-matrix-card-5", { x: winWidth * 0.7, y: 300, width: 340, height: 260 });
          setActiveBox({ id: "matrix-cards-5-6", dimension: "360 × 260", x: b.x, y: b.y, width: b.width, height: b.height, active: true });
          const c4 = streamChars(FULL_MATRIX_CARDS[4], 41500, 1200, t);
          const c5 = streamChars(FULL_MATRIX_CARDS[5], 42500, 1400, t);
          setStreamed((prev) => ({
            ...prev,
            matrixCards: [
              FULL_MATRIX_CARDS[0],
              FULL_MATRIX_CARDS[1],
              FULL_MATRIX_CARDS[2],
              FULL_MATRIX_CARDS[3],
              c4,
              c5,
            ],
            matrixBuiltCount: 6,
            isMatrixBuilt: true,
          }));
          setCursorPos({ x: b.x + b.width * 0.5, y: b.y + b.height * 0.5, typing: true, name: "Synthesizer", color: "#a855f7" });
        }
      }

      // =====================================================================
      // STAGE 5: DIRECT CONNECT / CONTACT (44.0s – 48.6s) [Layers 236 -> 252]
      // =====================================================================
      else if (t >= 44000 && t < baseDuration) {
        if (currentSectionId !== "contact") {
          setCurrentSectionId("contact");
          scrollToSection("contact");
        }

        const b = getElementBox("rebuild-contact-card", {
          x: Math.max(20, winWidth * 0.5 - 280),
          y: 280,
          width: Math.min(560, winWidth - 40),
          height: 320,
        });
        setActiveBox({ id: "contact-email", dimension: "560 × 320", x: b.x, y: b.y, width: b.width, height: b.height, active: true });

        const title = streamChars(FULL_CONTACT_TITLE, 44200, 1500, t);
        const sub = streamChars(FULL_CONTACT_SUBTITLE, 45500, 1400, t);
        const email = streamChars(FULL_CONTACT_EMAIL, 46800, 1200, t);

        setStreamed((prev) => ({
          ...prev,
          matrixBuiltCount: 6,
          isMatrixBuilt: true,
          contactTitle: title,
          contactSubtitle: sub,
          contactEmail: email,
          isContactBuilt: t >= 47200,
        }));

        setCursorPos({
          x: b.x + b.width * 0.5,
          y: b.y + 120,
          typing: true,
          name: "Synthesizer",
          color: "#a855f7",
        });
      }

      // =====================================================================
      // STAGE 6: (48.6s+) TOUR COMPLETE -> SWARMING ACTIVATION!
      // =====================================================================
      else if (t >= baseDuration) {
        if (timerRef.current) clearInterval(timerRef.current);
        setProgress(100);
        setLayerCount(totalLayers);
        setAgentCount(28);
        setCompletedTime("48.6s");
        setActiveBox(null);
        setPhase("SWARMING");
        sound.playEngage();

        // 100% full locked state
        setStreamed({
          heroHello: FULL_HELLO,
          heroName: FULL_NAME,
          heroRole: FULL_ROLE,
          heroBio: FULL_BIO,
          isNamePlaced: true,
          isButtonsPlaced: true,
          isMetricsPlaced: true,
          isAvatarPlaced: true,
          isStackPlaced: true,
          isTitlePlaced: true,
          aboutBioP1: FULL_ABOUT_BIO_P1,
          aboutBioP2: FULL_ABOUT_BIO_P2,
          aboutBioP3: FULL_ABOUT_BIO_P3,
          aboutQuote: FULL_ABOUT_QUOTE,
          isAboutBuilt: true,
          deployTitle: FULL_DEPLOY_TITLE,
          deployDesc: FULL_DEPLOY_DESC,
          isDeployMetricsPlaced: true,
          activeDeployLayer: "l1",
          isDeployLayersPlaced: true,
          isDeploymentsBuilt: true,
          matrixSubtitle: FULL_MATRIX_SUBTITLE,
          matrixCards: FULL_MATRIX_CARDS,
          matrixBuiltCount: 6,
          isMatrixBuilt: true,
          contactTitle: FULL_CONTACT_TITLE,
          contactSubtitle: FULL_CONTACT_SUBTITLE,
          contactEmail: FULL_CONTACT_EMAIL,
          isContactBuilt: true,
        });
      }
    }, 25);
  }, [scrollToSection, getElementBox]);

  useEffect(() => {
    startAnimation();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAnimation]);

  const triggerReplay = useCallback(() => {
    sound.playClick();
    startAnimation();
  }, [startAnimation]);

  const toggleSpeed = useCallback(() => {
    sound.playClick();
    setSpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 4 : 1));
  }, []);

  const toggleTour = useCallback(() => {
    sound.playClick();
    setIsTouring((prev) => !prev);
  }, []);

  const skipRebuild = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);
    setLayerCount(totalLayers);
    setAgentCount(28);
    setCompletedTime("48.6s");
    setActiveBox(null);
    setPhase("SWARMING");

    setStreamed({
      heroHello: FULL_HELLO,
      heroName: FULL_NAME,
      heroRole: FULL_ROLE,
      heroBio: FULL_BIO,
      isNamePlaced: true,
      isButtonsPlaced: true,
      isMetricsPlaced: true,
      isAvatarPlaced: true,
      isStackPlaced: true,
      isTitlePlaced: true,
      aboutBioP1: FULL_ABOUT_BIO_P1,
      aboutBioP2: FULL_ABOUT_BIO_P2,
      aboutBioP3: FULL_ABOUT_BIO_P3,
      aboutQuote: FULL_ABOUT_QUOTE,
      isAboutBuilt: true,
      deployTitle: FULL_DEPLOY_TITLE,
      deployDesc: FULL_DEPLOY_DESC,
      isDeployMetricsPlaced: true,
      activeDeployLayer: "l1",
      isDeployLayersPlaced: true,
      isDeploymentsBuilt: true,
      matrixSubtitle: FULL_MATRIX_SUBTITLE,
      matrixCards: FULL_MATRIX_CARDS,
      matrixBuiltCount: 6,
      isMatrixBuilt: true,
      contactTitle: FULL_CONTACT_TITLE,
      contactSubtitle: FULL_CONTACT_SUBTITLE,
      contactEmail: FULL_CONTACT_EMAIL,
      isContactBuilt: true,
    });
  }, []);

  return (
    <AgentRebuildContext.Provider
      value={{
        phase,
        isRebuilding: phase === "BUILDING",
        isTouring,
        speed,
        progress,
        layerCount,
        totalLayers,
        agentCount,
        completedTime,
        currentSectionId,
        ...streamed,
        activeBox,
        cursorPos,
        triggerReplay,
        toggleSpeed,
        toggleTour,
        skipRebuild,
      }}
    >
      {children}
    </AgentRebuildContext.Provider>
  );
}

export function useAgentRebuild() {
  const ctx = useContext(AgentRebuildContext);
  if (!ctx) {
    throw new Error("useAgentRebuild must be used within AgentRebuildProvider");
  }
  return ctx;
}
