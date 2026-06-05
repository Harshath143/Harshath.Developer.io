import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#$%&@~".split("");

export function ScrambleText({ phrases, interval = 2600 }: { phrases: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [output, setOutput] = useState(phrases[0] ?? "");

  useEffect(() => {
    let raf = 0;
    let frame = 0;
    const from = output;
    const to = phrases[index];
    const length = Math.max(from.length, to.length);
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    for (let i = 0; i < length; i++) {
      const f = from[i] || "";
      const t = to[i] || "";
      const start = Math.floor(Math.random() * 30);
      const end = start + Math.floor(Math.random() * 30) + 10;
      queue.push({ from: f, to: t, start, end });
    }

    const tick = () => {
      let out = "";
      let complete = 0;
      for (const q of queue) {
        if (frame >= q.end) {
          complete++;
          out += q.to;
        } else if (frame >= q.start) {
          if (!q.char || Math.random() < 0.28) {
            q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          out += `<span class="text-primary/70">${q.char}</span>`;
        } else {
          out += q.from;
        }
      }
      setOutput(out);
      if (complete === queue.length) {
        const t = window.setTimeout(() => setIndex((i) => (i + 1) % phrases.length), interval);
        return () => window.clearTimeout(t);
      }
      frame++;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return <span dangerouslySetInnerHTML={{ __html: output }} />;
}
