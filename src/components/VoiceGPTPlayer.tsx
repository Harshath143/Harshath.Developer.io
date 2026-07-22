import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Pause, Volume2, Mic, Languages, ShieldCheck, Zap } from "lucide-react";

export function VoiceGPTPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLang, setActiveLang] = useState<"tamil" | "marathi" | "english">("tamil");
  const [audioBars, setAudioBars] = useState<number[]>([40, 65, 30, 85, 45, 90, 60, 75, 50, 95, 35, 70, 80, 50, 60, 40]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioBars(
          Array.from({ length: 16 }, () => Math.floor(Math.random() * 65) + 25)
        );
      }, 150);
    } else {
      setAudioBars([20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const LANG_SAMPLES = {
    tamil: {
      title: "Tamil Speech Synthesis",
      model: "Meta MMS-TTS (Tamil)",
      transcript: "வணக்கம்! நான் உங்கள் தமிழ் குரல் உதவியாளர். (Hello! I am your Tamil voice assistant.)",
      latency: "420ms TTS",
    },
    marathi: {
      title: "Marathi Speech Synthesis",
      model: "Meta MMS-TTS (Marathi)",
      transcript: "नमस्कार! मी तुमचा मराठी व्हॉइस असिस्टंट आहे. (Hello! I am your Marathi voice assistant.)",
      latency: "440ms TTS",
    },
    english: {
      title: "English STT & Intent Classification",
      model: "Wav2Vec2 + Local Ollama RAG",
      transcript: "Processing offline intent classification & Sentence Transformer RAG vector query.",
      latency: "380ms Total",
    },
  };

  const sample = LANG_SAMPLES[activeLang];

  return (
    <div className="bento-card spotlight-card p-6 md:p-8 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] font-bold">
              VOICE & SPEECH AI
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
              <ShieldCheck className="h-3 w-3" /> 100% OFFLINE PRIVACY
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground">
            VoiceGPT Multilingual Interactive Player
          </h3>
        </div>

        {/* Language Selection Pills */}
        <div className="flex items-center gap-1.5 bg-card/80 border border-border/60 rounded-full p-1 font-mono text-xs">
          {(["tamil", "marathi", "english"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setActiveLang(lang);
                setIsPlaying(false);
              }}
              className={`px-3 py-1 rounded-full capitalize transition-all ${
                activeLang === lang
                  ? "bg-primary text-primary-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Main Waveform Card */}
      <div className="p-6 rounded-2xl bg-background/90 border border-primary/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-14 w-14 rounded-full bg-primary text-primary-foreground grid place-items-center hover:scale-105 transition-transform shrink-0 shadow-lg"
              aria-label={isPlaying ? "Pause audio preview" : "Play audio preview"}
            >
              {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current ml-0.5" />}
            </button>

            <div>
              <p className="font-mono text-xs text-primary font-bold">{sample.title}</p>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">{sample.model}</p>
            </div>
          </div>

          {/* Animated Equalizer Waveform Bars */}
          <div className="flex items-center gap-1.5 h-12 w-full md:w-auto justify-center px-4">
            {audioBars.map((height, i) => (
              <motion.span
                key={i}
                animate={{ height: `${height}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-1.5 rounded-full bg-gradient-to-t from-primary/40 to-primary inline-block min-h-[8px]"
              />
            ))}
          </div>

          <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full shrink-0">
            ⚡ {sample.latency}
          </span>
        </div>

        {/* Live Transcript Display */}
        <div className="mt-6 pt-4 border-t border-border/40 font-mono text-xs text-foreground/90">
          <span className="text-muted-foreground mr-2">&gt; TRANSCRIPT:</span>
          <span className="text-primary">{sample.transcript}</span>
        </div>
      </div>
    </div>
  );
}
