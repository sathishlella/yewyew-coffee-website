"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Radio, Timer } from "lucide-react";

import { useEffect, useState, useRef } from "react";

function LiveRadio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const streamUrl = "https://streams.ilovemusic.de/iloveradio17.mp3"; 

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(streamUrl);
      audioRef.current.volume = 0.5; // Set a gentle volume
    }
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play blocked", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.12, duration: 0.7 }}
      className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-md transition-colors hover:bg-white/[0.08]"
      onClick={togglePlay}
    >
      {/* Background Animated Waveform */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex h-full items-end justify-between gap-1 px-4 pb-4 opacity-10 blur-[2px]">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            animate={
              isPlaying
                ? { height: ["10%", "80%", "20%", "60%", "10%"] }
                : { height: "5%" }
            }
            transition={
              isPlaying
                ? {
                    repeat: Infinity,
                    duration: 1.2 + (i % 3) * 0.4,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1],
                    delay: i * 0.1,
                  }
                : {
                    duration: 0.4,
                    ease: "easeOut",
                  }
            }
            className="w-full rounded-t-full bg-white"
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <Radio className="size-5 text-chrome transition-colors group-hover:text-white" />
        {isPlaying ? (
          <div className="flex h-4 items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[8px] font-bold tracking-widest text-emerald-500">
            <span className="relative flex size-1.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
            </span>
            ON AIR
          </div>
        ) : (
          <div className="text-[10px] font-bold tracking-widest text-white/30">
            OFF
          </div>
        )}
      </div>
      
      <div className="relative z-10">
        <div className="mt-8 h-10 overflow-hidden font-display text-4xl font-semibold uppercase tracking-normal">
          <AnimatePresence mode="wait">
            <motion.div
              key={isPlaying ? "playing" : "radio"}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isPlaying ? "playing" : "radio"}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-3 h-[24px] overflow-hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          <AnimatePresence mode="wait">
            <motion.div
              key={isPlaying ? "mute" : "listen"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              live cafe radio. tap to {isPlaying ? "mute" : "listen"}.
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function LiveWeather() {
  const [mounted, setMounted] = useState(false);
  const [temp, setTemp] = useState("--");
  const [condition, setCondition] = useState<"rain" | "hot" | "cool">("cool");
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = {
    rain: [
      "rain on the glass, warmth in your cup.",
      "the sky is heavy. come inside.",
      "perfect weather for a slow drip."
    ],
    hot: [
      "the city is melting. seek cold brew.",
      "escape the heat. find your sanctuary.",
      "perfect for an iced pour-over."
    ],
    cool: [
      "a gentle breeze calls for a hot latte.",
      "the air is soft today.",
      "the perfect morning warmth."
    ]
  };

  useEffect(() => {
    setMounted(true);
    
    // Fetch live weather for Kuala Lumpur
    const fetchWeather = async () => {
      try {
        const res = await fetch("https://wttr.in/Kuala+Lumpur?format=j1");
        const data = await res.json();
        
        if (data && data.current_condition && data.current_condition.length > 0) {
          const current = data.current_condition[0];
          const t = parseInt(current.temp_C, 10);
          const desc = (current.weatherDesc?.[0]?.value || "").toLowerCase();
          
          setTemp(`${t}°C`);
          
          if (desc.includes("rain") || desc.includes("shower") || desc.includes("drizzle") || desc.includes("thunder")) {
            setCondition("rain");
          } else if (t > 29) {
            setCondition("hot");
          } else {
            setCondition("cool");
          }
        }
      } catch (err) {
        console.error("Failed to fetch weather", err);
      }
    };

    fetchWeather();
    // Update weather every 30 minutes
    const weatherInterval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(weatherInterval);
  }, []);

  // Cycle quotes every 5 minutes
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => prev + 1);
    }, 5 * 60 * 1000);
    return () => clearInterval(quoteInterval);
  }, []);

  const currentQuotes = quotes[condition];
  const activeQuote = currentQuotes[quoteIndex % currentQuotes.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.24, duration: 0.7 }}
      className="rounded-[8px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-md flex flex-col justify-between"
    >
      <MapPin className="size-5 text-chrome" />
      <div>
        <p className="mt-8 text-5xl font-semibold tracking-normal">
          {mounted ? temp : "--"}
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 h-[24px]">
          {mounted ? activeQuote : "checking skies..."}
        </p>
      </div>
    </motion.div>
  );
}

function RealTimeClock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("00:00");
  const [status, setStatus] = useState("daily roast window");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const klTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" }));
      
      const hours = klTime.getHours();
      const mins = klTime.getMinutes();
      
      setTime(
        `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
      );

      if (hours >= 10 && hours < 18) {
        setStatus("brewing now.");
      } else if (hours >= 18 && hours < 20) {
        setStatus("we'll be missing you until tomorrow 💔");
      } else if (hours >= 20 || hours < 4) {
        setStatus("the espresso machine is sleeping.");
      } else {
        const hoursLeft = 10 - hours;
        setStatus(`the first pour is in ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}.`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0, duration: 0.7 }}
      className="rounded-[8px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-md"
    >
      <Timer className="size-5 text-chrome" />
      <p className="mt-8 text-5xl font-semibold tracking-normal">{mounted ? time : "00:00"}</p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
        {mounted ? status : "loading..."}
      </p>
    </motion.div>
  );
}

export function StorySection() {
  return (
    <section id="ritual" className="relative px-4 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-sakura">
              documentary soul
            </p>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-normal md:mix-blend-difference">
              the shop remembers you back.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/62 md:pb-5">
            yewyew coffee is imagined as a small luxury machine for feeling: cinematic,
            precise, quiet, and still human. The technology fades into the wall. The cup
            stays in your hand.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <RealTimeClock />
          <LiveRadio />
          <LiveWeather />
        </div>
      </div>
    </section>
  );
}
