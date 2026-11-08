import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Pause, Volume2, Mic, Languages, ShieldCheck, Zap, Radio } from "lucide-react";
import { sound } from "@/lib/audioSynth";

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
      }, 120);
    } else {
      setAudioBars([15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const LANG_SAMPLES = {
    tamil: {
      title: "Tamil Speech Synthesis",
      model: "Meta MMS-TTS (Tamil Vocoder)",
      transcript: "வணக்கம்! நான் உங்கள் தமிழ் குரல் உதவியாளர். (Hello! I am your Tamil voice assistant.)",
      latency: "420ms TTS",
    },
    marathi: {
      title: "Marathi Speech Synthesis",
      model: "Meta MMS-TTS (Marathi Vocoder)",
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

  const handleTogglePlay = () => {
    sound.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleLangChange = (lang: "tamil" | "marathi" | "english") => {
    sound.playClick();
    setActiveLang(lang);
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#08080a] border border-zinc-800/90 p-5 font-mono text-xs tactical-reticle my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-red-500 animate-pulse" />
          <span className="text-white font-bold text-sm">INTERACTIVE AUDIO TEST HARNESS</span>
          <span className="text-[10px] text-emerald-400 border border-emerald-500/30 bg-emerald-950/20 px-2 py-0.5">
            100% OFFLINE_EDGE
          </span>
        </div>

        {/* Language Selection Tabs */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 border border-zinc-800">
          {(["tamil", "marathi", "english"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLangChange(lang)}
              onMouseEnter={() => sound.playHover()}
              className={`px-3 py-1 capitalize transition-colors cursor-pointer text-[11px] ${
                activeLang === lang
                  ? "bg-red-600 text-white font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Main Waveform Audio Card */}
      <div className="p-4 bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <button
            onClick={handleTogglePlay}
            onMouseEnter={() => sound.playHover()}
            className="h-11 w-11 bg-red-600 hover:bg-red-500 text-white flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)] shrink-0 transition-colors"
            aria-label={isPlaying ? "Pause audio preview" : "Play audio preview"}
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
          </button>

          <div>
            <div className="text-red-400 font-bold text-xs">{sample.title}</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">{sample.model}</div>
          </div>
        </div>

        {/* Animated Equalizer Waveform Bars */}
        <div className="flex items-end gap-1 h-9 px-4 w-full md:w-auto justify-center">
          {audioBars.map((height, i) => (
            <div
              key={i}
              className="w-1.5 bg-red-500 transition-all duration-100"
              style={{
                height: isPlaying ? `${height}%` : "15%",
                opacity: isPlaying ? 0.95 : 0.3,
              }}
            />
          ))}
        </div>

        <div className="text-[11px] text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 px-2.5 py-1 shrink-0 font-bold">
          LATENCY: {sample.latency}
        </div>
      </div>

      {/* Live Transcript Display */}
      <div className="mt-3 pt-3 border-t border-zinc-800/60 text-xs flex items-start gap-2">
        <span className="text-zinc-500 shrink-0">&gt; PHONEME_TRANSCRIPT:</span>
        <span className="text-zinc-200 font-mono">{sample.transcript}</span>
      </div>
    </div>
  );
}
