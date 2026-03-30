import { motion } from "framer-motion";
import { useState } from "react";

const PERSONALITIES = [
  {
    id: "thrill",
    name: "The Thrill Seeker",
    icon: "⚡",
    description: "For those who feel alive at 150mph. Corner-carving performance, track-tuned suspension, and a soundtrack that makes your heart race.",
    traits: ["Sport mode", "Track suspension", "Launch control", "Manual paddle shift"],
    mood: "Aggressive",
    color: "#ef4444",
    gradient: "from-red-900/30 to-transparent",
  },
  {
    id: "executive",
    name: "The Executive",
    icon: "♟",
    description: "Power reserved for when it matters. Glide through the city in commanding silence, arrive ready to close the deal.",
    traits: ["Whisper-quiet cabin", "Massaging seats", "Privacy glass", "Concierge mode"],
    mood: "Refined",
    color: "#60a5fa",
    gradient: "from-blue-900/30 to-transparent",
  },
  {
    id: "explorer",
    name: "The Explorer",
    icon: "🌄",
    description: "Where roads end, adventures begin. All-terrain capability wrapped in premium comfort — built for those who choose the road less taken.",
    traits: ["All-wheel drive", "Off-road mode", "High ground clearance", "Adventure pack"],
    mood: "Adventurous",
    color: "#34d399",
    gradient: "from-emerald-900/30 to-transparent",
  },
  {
    id: "aesthetic",
    name: "The Aesthete",
    icon: "✦",
    description: "Where design is the performance. Every curve intentional, every surface expressive. Drive art.",
    traits: ["Designer interior", "Panoramic roof", "Signature lighting", "Limited edition"],
    mood: "Creative",
    color: "#a78bfa",
    gradient: "from-purple-900/30 to-transparent",
  },
];

export default function RidePersonality() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="performance" className="relative py-32 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-20"
          style={{ background: "linear-gradient(90deg, transparent, #fbbf24, transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">
            Ride Personality
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            What Drives You?
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Your vehicle should reflect your spirit. Choose a personality and we'll match you with the perfect machine.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {PERSONALITIES.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelected(selected === p.id ? null : p.id)}
              className={`relative cursor-pointer rounded-3xl p-6 transition-all duration-400 overflow-hidden ${
                selected === p.id
                  ? "ring-1"
                  : "glass hover:bg-white/5"
              }`}
              style={
                selected === p.id
                  ? {
                      background: `linear-gradient(135deg, ${p.color}15 0%, rgba(0,0,0,0.4) 100%)`,
                      border: `1px solid ${p.color}40`,
                    }
                  : {}
              }
            >
              {/* Background glow when selected */}
              {selected === p.id && (
                <div
                  className="absolute inset-0 opacity-5 blur-3xl"
                  style={{ background: p.color }}
                />
              )}

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{p.icon}</span>
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: `${p.color}20`, color: p.color }}
                  >
                    {p.mood}
                  </span>
                </div>

                <h3 className="text-white font-bold text-xl mb-2">{p.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{p.description}</p>

                <motion.div
                  initial={false}
                  animate={{ height: selected === p.id ? "auto" : 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-2">
                    {p.traits.map((trait) => (
                      <span
                        key={trait}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                  <button
                    className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-black transition-all duration-200 hover:opacity-90"
                    style={{ background: p.color }}
                  >
                    Match Me With This Style
                  </button>
                </motion.div>

                {selected !== p.id && (
                  <p className="text-white/30 text-xs mt-2">Tap to explore →</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
