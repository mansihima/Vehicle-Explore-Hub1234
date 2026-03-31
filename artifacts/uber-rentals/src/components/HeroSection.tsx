import { motion } from "framer-motion";
import { useRef } from "react";

interface HeroSectionProps {
  onViewModel: () => void;
  onExplore360: () => void;
}

export default function HeroSection({ onViewModel, onExplore360 }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.08) 0%, transparent 60%), #0a0a0a",
      }}
    >
      {/* Ambient background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "rgba(251, 191, 36, 0.4)",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Gradient orbs */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-white/60 text-xs tracking-[0.25em] uppercase">
            Premium Vehicle Experience
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6"
        >
          <span className="text-white">Drive the</span>
          <br />
          <span className="gradient-text glow-text">Extraordinary</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Explore every angle. Feel every detail. Rent premium vehicles with an
          immersive 3D experience before you decide.
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 section-fade pointer-events-none" />
    </section>
  );
}
