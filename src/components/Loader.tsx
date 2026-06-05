import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const NAME = "MOHAMMED HARSHATH";

export function Loader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 18);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => setShow(false), 500);
      }
    }, 140);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -top-40 -left-40 h-[60vmin] w-[60vmin] rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-primary), transparent 70%)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -right-40 h-[60vmin] w-[60vmin] rounded-full opacity-50 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-secondary), transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-wrap justify-center gap-1 px-6">
            {NAME.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.03, duration: 0.45, ease: "easeOut" }}
                className="font-display text-3xl md:text-6xl font-bold tracking-tight"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </div>

          <div className="relative z-10 mt-10 w-64 md:w-96">
            <div className="h-[2px] w-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
              <span>Initializing experience</span>
              <span>{Math.floor(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
