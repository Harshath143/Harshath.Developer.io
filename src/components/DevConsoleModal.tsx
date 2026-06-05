import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Lock, Unlock, AlertCircle } from "lucide-react";

type DevConsoleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
};

export function DevConsoleModal({ isOpen, onClose, onUnlock }: DevConsoleModalProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPasscode("");
      setError(false);
      setSuccess(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === "developer") {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        onUnlock();
        onClose();
      }, 1000);
    } else {
      setError(true);
      setPasscode("");
      inputRef.current?.focus();
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md grid place-items-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md glass rounded-2xl overflow-hidden border border-border shadow-2xl relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/40 px-5 py-4 bg-muted/20">
              <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-wider">
                <Terminal className="h-4 w-4" />
                <span>DEV_MODE_CONSOLE</span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close console"
                className="h-8 w-8 rounded-full border border-border/30 grid place-items-center hover:bg-card transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="passcode" className="font-mono text-xs text-muted-foreground flex justify-between">
                    <span>ENTER SYSTEM PASSCODE</span>
                    <span className="text-primary/70">hint: developer</span>
                  </label>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="password"
                      id="passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="••••••••"
                      disabled={success}
                      className="w-full px-4 py-3 rounded-xl border border-border/70 bg-background/40 font-mono text-center text-lg tracking-widest focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/40 transition-all text-foreground"
                    />
                    
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                      {success ? (
                        <Unlock className="h-5 w-5 text-emerald-400 animate-bounce" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground/60" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Status message */}
                <div className="min-h-[24px] text-center font-mono text-xs">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive flex items-center justify-center gap-1.5"
                    >
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>ACCESS DENIED. INVALID CREDENTIALS.</span>
                    </motion.div>
                  )}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-emerald-400 font-bold"
                    >
                      ACCESS GRANTED. INITIALIZING DASHBOARD...
                    </motion.div>
                  )}
                  {!error && !success && (
                    <span className="text-muted-foreground/50">Listening on channel [PORT_80]</span>
                  )}
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={success || !passcode}
                  className="w-full py-3 rounded-xl font-mono text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                >
                  DECRYPT_SESSION
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
