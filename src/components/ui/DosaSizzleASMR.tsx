"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

interface DosaSizzleASMRProps {
  variant?: "badge" | "compact" | "card";
  className?: string;
}

export function DosaSizzleASMR({ variant = "badge", className = "" }: DosaSizzleASMRProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Stop sound on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const startAudio = () => {
    try {
      // Create or resume AudioContext
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Synthesize pink noise + butterworth high-pass filter + modulated low-pass to simulate sizzling ghee & batter
      const bufferSize = ctx.sampleRate * 2; // 2 seconds looped noise buffer
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise filter algorithm (Paul Kellet)
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;

        // Add subtle crackle pops
        const crackle = Math.random() > 0.985 ? (Math.random() - 0.5) * 1.8 : 0;
        data[i] = (pink * 0.12 + crackle) * 0.45;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;

      // Bandpass filter centered around 2400Hz (crisp sizzle frequency)
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(2800, ctx.currentTime);
      bandpass.Q.setValueAtTime(1.8, ctx.currentTime);

      // High shelf for airy steam hiss
      const highshelf = ctx.createBiquadFilter();
      highshelf.type = "highshelf";
      highshelf.frequency.setValueAtTime(4500, ctx.currentTime);
      highshelf.gain.setValueAtTime(6, ctx.currentTime);

      // Master gain node with smooth fade in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 0.4);

      whiteNoise.connect(bandpass);
      bandpass.connect(highshelf);
      highshelf.connect(masterGain);
      masterGain.connect(ctx.destination);

      whiteNoise.start();

      noiseNodeRef.current = whiteNoise;
      gainNodeRef.current = masterGain;
      setIsPlaying(true);

      // Trigger mobile haptic tick if available
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([15, 30, 20]);
      }

      // Automatically fade out after 12 seconds to prevent endless playing
      timeoutRef.current = setTimeout(() => {
        stopAudio();
      }, 12000);
    } catch (err) {
      console.warn("AudioContext failed to start:", err);
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
        setTimeout(() => {
          try {
            if (noiseNodeRef.current) {
              (noiseNodeRef.current as AudioScheduledSourceNode).stop();
            }
            if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
              audioCtxRef.current.close();
            }
          } catch {}
          setIsPlaying(false);
        }, 320);
      } catch {
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={toggleSound}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
          isPlaying
            ? "bg-[#D4AF37] text-[#0F1115] shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-105"
            : "bg-[#174D35]/10 dark:bg-[#D4AF37]/15 text-[#174D35] dark:text-[#D4AF37] border border-[#174D35]/30 dark:border-[#D4AF37]/30 hover:bg-[#174D35]/20"
        } ${className}`}
        title="Hear real butter dosa sizzle on iron tawa (ASMR)"
      >
        {isPlaying ? (
          <>
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 bg-[#0F1115] h-full animate-[bounce_0.6s_infinite]"></span>
              <span className="w-0.5 bg-[#0F1115] h-2/3 animate-[bounce_0.8s_infinite]"></span>
              <span className="w-0.5 bg-[#0F1115] h-full animate-[bounce_0.5s_infinite]"></span>
            </span>
            <span>Sizzling Now...</span>
            <VolumeX className="w-3.5 h-3.5 ml-1 opacity-70" />
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5" />
            <span>Hear Dosa Sizzle (ASMR)</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleSound}
      type="button"
      className={`group relative overflow-hidden rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 transform active:scale-95 flex items-center gap-2.5 shadow-md ${
        isPlaying
          ? "bg-gradient-to-r from-[#D4AF37] via-[#F9E79F] to-[#D4AF37] text-[#0F1115] ring-2 ring-[#D4AF37]/80 shadow-[0_0_20px_rgba(212,175,55,0.45)]"
          : "bg-white/90 dark:bg-[#171A21]/90 backdrop-blur-md text-[#292D29] dark:text-[#E7E2D6] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow-lg"
      } ${className}`}
      aria-label={isPlaying ? "Stop Dosa Sizzle ASMR sound" : "Listen to Crispy Dosa Sizzle ASMR Sound Bite"}
    >
      {/* Animated Sound Equalizer Bars */}
      <div className="flex items-end gap-1 h-3.5 shrink-0">
        <span
          className={`w-0.5 rounded-full transition-all duration-150 ${
            isPlaying
              ? "bg-[#0F1115] h-3.5 animate-pulse"
              : "bg-[#174D35] dark:bg-[#D4AF37] h-1.5 group-hover:h-2.5"
          }`}
        />
        <span
          className={`w-0.5 rounded-full transition-all duration-200 ${
            isPlaying
              ? "bg-[#0F1115] h-2 animate-bounce"
              : "bg-[#174D35] dark:bg-[#D4AF37] h-3 group-hover:h-3.5"
          }`}
        />
        <span
          className={`w-0.5 rounded-full transition-all duration-300 ${
            isPlaying
              ? "bg-[#0F1115] h-3 animate-ping"
              : "bg-[#174D35] dark:bg-[#D4AF37] h-2 group-hover:h-3"
          }`}
        />
        <span
          className={`w-0.5 rounded-full transition-all duration-150 ${
            isPlaying
              ? "bg-[#0F1115] h-3.5 animate-pulse"
              : "bg-[#174D35] dark:bg-[#D4AF37] h-2.5 group-hover:h-2"
          }`}
        />
      </div>

      <div className="flex items-center gap-1.5">
        <Sparkles className={`w-3.5 h-3.5 ${isPlaying ? "text-[#0F1115]" : "text-[#D4AF37]"}`} />
        <span>
          {isPlaying ? "Tawa Sizzling (Playing...)" : "Crispy Dosa Sizzle (ASMR)"}
        </span>
      </div>

      {isPlaying ? (
        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/15 text-[#0F1115]">
          Tap to Mute
        </span>
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-[#174D35] dark:text-[#D4AF37] opacity-75 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}
