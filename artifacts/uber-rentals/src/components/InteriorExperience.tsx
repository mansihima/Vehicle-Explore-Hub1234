import { motion } from "framer-motion";
import { useState } from "react";

export default function InteriorExperience() {
  const [active, setActive] = useState(false);

  return (
    <section id="interior" className="relative py-20 px-6">
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, #fbbf24, transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">
            Interior Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Step Inside
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Explore the full cabin in immersive 360°. Drag to look around every surface, material, and detail.
          </p>
        </motion.div>

        {/* Embed frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            border: "1px solid rgba(251,191,36,0.15)",
            boxShadow: "0 0 80px rgba(251,191,36,0.06), 0 40px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* Click-to-activate overlay — prevents accidental scrolljacking */}
          {!active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer"
              style={{ background: "rgba(4,4,12,0.7)", backdropFilter: "blur(4px)" }}
              onClick={() => setActive(true)}
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-4"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    boxShadow: "0 0 40px rgba(251,191,36,0.4)",
                  }}
                >
                  ↗
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-lg">Explore Interior</p>
                  <p className="text-white/40 text-sm mt-1">Click to activate 360° view</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Top chrome bar — blends the embed into the site */}
          <div className="relative z-10 px-5 py-3 flex items-center gap-3 glass-dark">
            <img src="/logo.png" alt="" className="w-6 h-6 rounded-md object-contain opacity-80" />
            <span className="text-white/60 text-xs tracking-wide">Interior 360° · Drag to explore</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400/70 text-xs">Live</span>
            </div>
          </div>

          {/* iframe */}
          <div className="relative" style={{ height: "70vh", minHeight: 480 }}>
            <iframe
              src="https://www.eyerevolution.co.uk/tours/BMW-iX/"
              title="360° Interior Experience"
              className="w-full h-full border-0"
              allow="fullscreen; gyroscope; accelerometer"
              style={{ display: "block" }}
            />
          </div>

          {/* Bottom chrome bar */}
          <div className="relative z-10 px-5 py-3 flex items-center justify-between glass-dark">
            <span className="text-white/30 text-xs">
              Drag · Scroll to zoom · Double-tap to enter hotspot
            </span>
            <a
              href="https://www.eyerevolution.co.uk/tours/BMW-iX/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400/60 hover:text-amber-400 text-xs transition-colors"
            >
              Open full screen ↗
            </a>
          </div>

          {/* Corner glow accents */}
          <div
            className="absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #fbbf24, transparent)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #60a5fa, transparent)" }}
          />
        </motion.div>

        {/* Feature pills beneath */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap gap-3 justify-center"
        >
          {["Premium Leather", "Panoramic Roof", "Ambient Lighting", "Bose Audio", "4-Zone Climate"].map((feat) => (
            <div key={feat} className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-white/60 text-xs">{feat}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, #fbbf24, transparent)" }}
      />
    </section>
  );
}
