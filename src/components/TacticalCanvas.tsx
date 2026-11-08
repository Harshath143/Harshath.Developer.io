import { useEffect, useRef } from "react";
import { useAgentRebuild } from "@/context/AgentRebuildContext";

interface Point {
  x: number;
  y: number;
  angle: number;
}

const NANOBOT_COLORS = [
  { color: "#00f0ff", glow: "rgba(0, 240, 255, 0.85)" }, // Cyan
  { color: "#ef4444", glow: "rgba(239, 68, 68, 0.85)" }, // Neon Red
  { color: "#fbbf24", glow: "rgba(251, 191, 36, 0.85)" }, // Amber
  { color: "#10b981", glow: "rgba(16, 185, 129, 0.85)" }, // Emerald
  { color: "#a855f7", glow: "rgba(168, 85, 247, 0.85)" }, // Purple
  { color: "#ffffff", glow: "rgba(255, 255, 255, 0.95)" }, // White
  { color: "#38bdf8", glow: "rgba(56, 189, 248, 0.85)" }, // Sky Blue
  { color: "#f97316", glow: "rgba(249, 115, 22, 0.85)" }, // Orange
];

export function TacticalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { phase, activeBox, cursorPos } = useAgentRebuild();

  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const activeBoxRef = useRef(activeBox);
  activeBoxRef.current = activeBox;

  const cursorPosRef = useRef(cursorPos);
  cursorPosRef.current = cursorPos;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracker for reactive steering
    const mouse = {
      x: width * 0.75,
      y: height * 0.45,
      active: false,
      lastMoveTime: 0,
    };

    // Fluid cursor physics: smooth continuous gliding (never static!)
    let smoothCursorX = width * 0.3;
    let smoothCursorY = height * 0.25;

    // 28 Nanobots in the swarm
    const TOTAL_BOTS = 28;
    const SPACING = 5; // Historical steps between each consecutive bot in snake chain
    const HISTORY_LENGTH = TOTAL_BOTS * SPACING + 80;
    const pathHistory: Point[] = [];

    // Initialize leader state
    let leaderX = width * 0.72;
    let leaderY = height * 0.42;
    let leaderAngle = -Math.PI / 4;
    let leaderSpeed = 4.8;

    for (let i = 0; i < HISTORY_LENGTH; i++) {
      pathHistory.push({
        x: leaderX - i * 3,
        y: leaderY - Math.sin(i * 0.1) * 20,
        angle: leaderAngle,
      });
    }

    // Dynamic assistant cursors with smooth inertia gliding
    const assistantAgents = [
      { name: "Architect", color: "#ef4444", glow: "rgba(239, 68, 68, 0.6)", x: width * 0.25, y: height * 0.2, targetX: width * 0.25, targetY: height * 0.2 },
      { name: "L7 Core", color: "#fbbf24", glow: "rgba(251, 191, 36, 0.6)", x: width * 0.38, y: height * 0.45, targetX: width * 0.38, targetY: height * 0.45 },
      { name: "Vector Ops", color: "#10b981", glow: "rgba(16, 185, 129, 0.6)", x: width * 0.52, y: height * 0.3, targetX: width * 0.52, targetY: height * 0.3 },
      { name: "Synthesizer", color: "#a855f7", glow: "rgba(168, 85, 247, 0.6)", x: width * 0.72, y: height * 0.35, targetX: width * 0.72, targetY: height * 0.35 },
      { name: "Trace Analyzer", color: "#38bdf8", glow: "rgba(56, 189, 248, 0.6)", x: width * 0.5, y: 55, targetX: width * 0.5, targetY: 55 },
    ];

    // Sparks emitted during typing/building
    const sparks: { x: number; y: number; vx: number; vy: number; alpha: number; color: string }[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.lastMoveTime = performance.now();
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let lastTime = performance.now();
    let simTime = 0;

    // Helper: draw tactical cursor arrow with badge
    const drawCursorArrow = (x: number, y: number, name: string, color: string, glow: string) => {
      ctx.save();
      ctx.translate(x, y);

      ctx.shadowColor = glow;
      ctx.shadowBlur = 12;

      // Draw Tactical Pointer SVG path
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(13, 14);
      ctx.lineTo(7, 14.5);
      ctx.lineTo(11, 22);
      ctx.lineTo(8, 23.5);
      ctx.lineTo(4, 16);
      ctx.lineTo(0, 19);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Agent Name Pill Badge
      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      const textWidth = ctx.measureText(name).width;
      const boxW = textWidth + 8;
      const boxH = 15;

      ctx.fillStyle = color;
      ctx.fillRect(16, 7, boxW, boxH);

      ctx.fillStyle = "#050505";
      ctx.fillText(name, 20, 18);

      ctx.restore();
    };

    // Helper: draw single glowing nanobot chevron (used during SWARMING phase)
    const drawNanobot = (x: number, y: number, angle: number, index: number) => {
      const isLeader = index === 0;
      const palette = NANOBOT_COLORS[index % NANOBOT_COLORS.length];
      const size = isLeader ? 9.5 : 7.2;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Neon Glow
      ctx.shadowColor = palette.glow;
      ctx.shadowBlur = isLeader ? 16 : 9;

      ctx.beginPath();
      // Sharp triangular arrowhead / chevron (Exact match to video frame 56s)
      ctx.moveTo(size * 1.6, 0);
      ctx.lineTo(-size, -size * 0.85);
      ctx.lineTo(-size * 0.45, 0);
      ctx.lineTo(-size, size * 0.85);
      ctx.closePath();

      ctx.fillStyle = palette.color;
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Center glowing core dot
      ctx.beginPath();
      ctx.arc(size * 0.2, 0, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      ctx.restore();
    };

    // Main animation loop
    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      simTime += dt;

      ctx.clearRect(0, 0, width, height);

      const isBuilding = phaseRef.current === "BUILDING";
      const activeBox = activeBoxRef.current;
      const currentCursor = cursorPosRef.current;

      // ==========================================
      // PHASE 1: BUILDING / CURSORS CONSTRUCTING INTERFACE
      // ==========================================
      if (isBuilding) {
        // Fluid continuous cursor physics: glide toward target with smooth inertia
        const targetX = currentCursor.x;
        const targetY = currentCursor.y;
        const dx = targetX - smoothCursorX;
        const dy = targetY - smoothCursorY;
        smoothCursorX += dx * 0.18;
        smoothCursorY += dy * 0.18;

        // Subtle tactile vibration when typing keystrokes
        const microX = currentCursor.typing ? (Math.random() - 0.5) * 1.5 : 0;
        const microY = currentCursor.typing ? (Math.random() - 0.5) * 1.5 : 0;

        // 1. Draw Primary Working Lead Cursor
        drawCursorArrow(
          smoothCursorX + microX,
          smoothCursorY + microY,
          currentCursor.name,
          currentCursor.color,
          currentCursor.color
        );

        // Emit typing sparks at cursor tip when actively entering text
        if (currentCursor.typing && Math.random() < 0.48) {
          sparks.push({
            x: smoothCursorX,
            y: smoothCursorY,
            vx: (Math.random() - 0.5) * 7,
            vy: (Math.random() - 0.5) * 7,
            alpha: 1,
            color: currentCursor.color,
          });
        }

        // 2. Draw Distributed Assistant Cursors gliding around workstations
        assistantAgents.forEach((agent, idx) => {
          if (activeBox) {
            // If avatar card is active (frame 6s), position 3 cursors hovering around the portrait
            if (activeBox.id === "avatar") {
              const avatarAnchorPoints = [
                { dx: activeBox.width * 0.3, dy: activeBox.height * 0.15 }, // near hair
                { dx: activeBox.width * 0.85, dy: activeBox.height * 0.4 }, // near shoulder
                { dx: -20, dy: activeBox.height * 0.25 }, // left
                { dx: activeBox.width * 0.5, dy: activeBox.height * 0.9 }, // near badge
                { dx: activeBox.width + 30, dy: activeBox.height * 0.7 },
              ];
              const pt = avatarAnchorPoints[idx % avatarAnchorPoints.length];
              const wobble = Math.sin(simTime * 3 + idx) * 8;
              agent.targetX = activeBox.x + pt.dx + wobble;
              agent.targetY = activeBox.y + pt.dy + Math.cos(simTime * 2.5 + idx) * 6;
            } else {
              const offsets = [
                { dx: activeBox.width * 0.9, dy: activeBox.height * 0.2 },
                { dx: activeBox.width * 0.1, dy: activeBox.height * 0.85 },
                { dx: activeBox.width * 0.7, dy: activeBox.height * 0.8 },
                { dx: -55, dy: activeBox.height * 0.4 },
                { dx: activeBox.width * 0.5, dy: -30 },
              ];
              const off = offsets[idx % offsets.length];
              const wobble = Math.sin(simTime * 2.5 + idx) * 12;
              agent.targetX = activeBox.x + off.dx + wobble;
              agent.targetY = activeBox.y + off.dy + Math.cos(simTime * 2 + idx) * 10;
            }
          } else {
            agent.targetX = width * (0.2 + idx * 0.15);
            agent.targetY = height * (0.2 + (idx % 3) * 0.2);
          }

          agent.x += (agent.targetX - agent.x) * 0.14;
          agent.y += (agent.targetY - agent.y) * 0.14;

          drawCursorArrow(agent.x, agent.y, agent.name, agent.color, agent.glow);
        });

        // Seed leader position at smooth cursor for seamless transition to swarming
        leaderX = smoothCursorX;
        leaderY = smoothCursorY;
        pathHistory.unshift({ x: leaderX, y: leaderY, angle: 0 });
        if (pathHistory.length > HISTORY_LENGTH) pathHistory.pop();
      }

      // ==========================================
      // PHASE 2: SWARMING (28 NANOBOTS FOLLOW EACH OTHER IN A SNAKE CHAIN)
      // ==========================================
      else {
        const isMouseActive = now - mouse.lastMoveTime < 2400;

        let targetX: number;
        let targetY: number;

        if (mouse.active && isMouseActive) {
          targetX = mouse.x;
          targetY = mouse.y;
        } else {
          // Autonomous roaming: smooth figure-8 / looping curves across the screen
          const cx = width * 0.65;
          const cy = height * 0.45;
          const rx = width * 0.28;
          const ry = height * 0.25;

          targetX = cx + Math.sin(simTime * 0.75) * rx + Math.cos(simTime * 0.35) * 60;
          targetY = cy + Math.sin(simTime * 1.5) * ry + Math.sin(simTime * 0.5) * 45;
        }

        // Steer leader smoothly towards target
        const dx = targetX - leaderX;
        const dy = targetY - leaderY;
        const dist = Math.hypot(dx, dy);
        const desiredAngle = Math.atan2(dy, dx);

        let angleDiff = desiredAngle - leaderAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        leaderAngle += angleDiff * 0.085;
        leaderSpeed = Math.min(6.8, Math.max(3.4, dist * 0.038));

        leaderX += Math.cos(leaderAngle) * leaderSpeed;
        leaderY += Math.sin(leaderAngle) * leaderSpeed;

        // Boundary reflection
        if (leaderX < 40) { leaderX = 40; leaderAngle = Math.PI - leaderAngle; }
        if (leaderX > width - 40) { leaderX = width - 40; leaderAngle = Math.PI - leaderAngle; }
        if (leaderY < 40) { leaderY = 40; leaderAngle = -leaderAngle; }
        if (leaderY > height - 40) { leaderY = height - 40; leaderAngle = -leaderAngle; }

        pathHistory.unshift({ x: leaderX, y: leaderY, angle: leaderAngle });
        if (pathHistory.length > HISTORY_LENGTH) pathHistory.pop();

        // 1. Draw faint laser thread connecting the nanobot chain
        ctx.beginPath();
        for (let i = 0; i < TOTAL_BOTS; i++) {
          const sampleIdx = Math.min(pathHistory.length - 1, i * SPACING);
          const pt = pathHistory[sampleIdx];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = "rgba(0, 240, 255, 0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // 2. Render all 28 Nanobots sampled along the spine history
        for (let i = TOTAL_BOTS - 1; i >= 0; i--) {
          const sampleIdx = Math.min(pathHistory.length - 1, i * SPACING);
          const pt = pathHistory[sampleIdx];

          const wave = Math.sin(simTime * 8 + i * 0.45) * 4.0;
          const perpAngle = pt.angle + Math.PI / 2;
          const finalX = pt.x + Math.cos(perpAngle) * wave;
          const finalY = pt.y + Math.sin(perpAngle) * wave;

          drawNanobot(finalX, finalY, pt.angle, i);
        }
      }

      // Draw and decay spark particles
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha *= 0.91;

        if (s.alpha < 0.05) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fillRect(s.x, s.y, 2, 2);
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
    />
  );
}
