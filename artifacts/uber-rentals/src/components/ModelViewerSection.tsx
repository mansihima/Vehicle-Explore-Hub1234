import { motion } from "framer-motion";
import { useRef } from "react";
import Viewer3D from "./Viewer3D";

const FEATURE_CARDS = [
  {
    id: "interior",
    label: "Interior",
    description: "Premium leather cabin with hand-stitched trim and ambient mood lighting across 64 colours.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    color: "#fbbf24",
  },
  {
    id: "performance",
    label: "Performance",
    description: "0–60 mph in 3.2 s. 450 hp twin-turbo engine with Sport+ and Track mode included.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: "#f97316",
  },
  {
    id: "comfort",
    label: "Comfort",
    description: "Adaptive air suspension with 4-zone climate and massaging front seats for every journey.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    color: "#60a5fa",
  },
  {
    id: "luggage",
    label: "Luggage",
    description: "620 L of cargo capacity with a flexible folding floor system for any load.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    color: "#a78bfa",
  },
  {
    id: "ride",
    label: "Ride Quality",
    description: "Active noise cancellation, road-noise isolation, and silky smooth highway cruising.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
    color: "#34d399",
  },
];

interface ModelViewerSectionProps {
  modelUrl?: string;
}

export default function ModelViewerSection({ modelUrl }: ModelViewerSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="fleet"
      ref={sectionRef}
      className="relative py-16 min-h-screen flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.04) 0%, transparent 70%), #0a0a0a",
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8 px-6 z-10 relative"
      >
        <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">
          Immersive 3D Experience
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
          Explore Every Angle
        </h2>
        <p className="text-white/40 max-w-xl mx-auto">
          Drag to rotate. Pinch to zoom. Built for every detail.
        </p>
      </motion.div>

      {/* 3D Viewer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-5xl mx-auto px-6"
      >
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            height: "60vh",
            minHeight: 400,
            background: "radial-gradient(ellipse at center, #0d0d20 0%, #050508 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 0 80px rgba(251,191,36,0.06), inset 0 0 60px rgba(0,0,0,0.5)",
          }}
        >
          <Viewer3D modelUrl={modelUrl} showHotspots={false} />

          <div className="absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #fbbf24, transparent)" }} />
          <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #60a5fa, transparent)" }} />
        </div>

        {/* Feature cards grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {FEATURE_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-4 flex flex-col gap-3 group cursor-default"
              style={{ border: `1px solid ${card.color}18` }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${card.color}18`, color: card.color }}
              >
                {card.icon}
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{card.label}</p>
                <p className="text-white/40 text-xs leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
