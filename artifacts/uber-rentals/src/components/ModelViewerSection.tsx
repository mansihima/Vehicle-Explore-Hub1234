import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Viewer3D from "./Viewer3D";

const HOTSPOT_LIST = ["Interior", "Performance", "Comfort", "Luggage", "Ride Quality"];

interface ModelViewerSectionProps {
  modelUrl?: string;
}

export default function ModelViewerSection({ modelUrl }: ModelViewerSectionProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
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
          Drag to rotate. Pinch to zoom. Touch each hotspot to discover details.
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
          {/* Viewer */}
          <Viewer3D modelUrl={modelUrl} showHotspots={true} />

          {/* Ambient corner lights */}
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #fbbf24, transparent)" }} />
          <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #60a5fa, transparent)" }} />
        </div>

        {/* Hotspot legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap gap-2 justify-center"
        >
          {HOTSPOT_LIST.map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 glass px-4 py-2 rounded-full"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-white/60 text-xs">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Upload prompt if no model */}
      {!modelUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 glass-gold rounded-2xl px-6 py-4 flex items-center gap-3 max-w-md mx-auto"
        >
          <span className="text-amber-400 text-xl">📦</span>
          <div>
            <p className="text-amber-400 text-sm font-medium">Add Your 3D Model</p>
            <p className="text-white/40 text-xs mt-0.5">Upload a .glb file to replace the preview car</p>
          </div>
        </motion.div>
      )}
    </section>
  );
}
