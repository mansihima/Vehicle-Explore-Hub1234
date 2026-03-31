import { motion } from "framer-motion";
import { useState } from "react";

const CABIN_FEATURES = [
  {
    label: "Premium Leather",
    description: "Hand-stitched Nappa leather upholstery across all surfaces.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    color: "#fbbf24",
  },
  {
    label: "Panoramic Roof",
    description: "Full-length glass roof with UV protection and one-touch shade.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    color: "#60a5fa",
  },
  {
    label: "Ambient Lighting",
    description: "64-colour LED ambient lighting with personalised presets.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    color: "#a78bfa",
  },
  {
    label: "Bose Audio",
    description: "20-speaker Bose surround-sound system with active bass equalisation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
    color: "#f97316",
  },
  {
    label: "4-Zone Climate",
    description: "Independent temperature control for all four passenger zones.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.06M17.72 17.72l1.061 1.061M3 12H4.5M19.5 12H21M4.219 19.781l1.061-1.06M17.72 6.28l1.061-1.061M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
      </svg>
    ),
    color: "#34d399",
  },
];

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
          {/* Click-to-activate overlay */}
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
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    boxShadow: "0 0 40px rgba(251,191,36,0.4)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-lg">Explore Interior</p>
                  <p className="text-white/40 text-sm mt-1">Click to activate 360° view</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Top chrome bar */}
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

        {/* Cabin feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {CABIN_FEATURES.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.45 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-4 flex flex-col gap-3"
              style={{ border: `1px solid ${feat.color}18` }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${feat.color}18`, color: feat.color }}
              >
                {feat.icon}
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{feat.label}</p>
                <p className="text-white/40 text-xs leading-relaxed">{feat.description}</p>
              </div>
            </motion.div>
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
