import { motion } from "framer-motion";
import { useState } from "react";

const VEHICLES = [
  {
    id: "model-s",
    name: "Apex GT",
    category: "Sports",
    tagline: "Born for the track. Built for the road.",
    price: 299,
    specs: { power: "450 HP", top_speed: "180 mph", acceleration: "3.2s", range: "380 mi" },
    features: ["Carbon fiber trim", "Sport suspension", "Launch control", "Track mode"],
    color: "#fbbf24",
  },
  {
    id: "model-x",
    name: "Executive S",
    category: "Luxury",
    tagline: "Where refinement meets ambition.",
    price: 199,
    specs: { power: "320 HP", top_speed: "155 mph", acceleration: "5.1s", range: "450 mi" },
    features: ["Nappa leather", "Panoramic roof", "Massaging seats", "Bose sound"],
    color: "#60a5fa",
  },
  {
    id: "model-3",
    name: "Urban Pro",
    category: "Performance",
    tagline: "Precision in every corner.",
    price: 149,
    specs: { power: "280 HP", top_speed: "145 mph", acceleration: "4.8s", range: "310 mi" },
    features: ["AWD", "Adaptive cruise", "Sport mode", "360 cam"],
    color: "#a78bfa",
  },
];

interface VehicleDiscoveryProps {
  onSelectVehicle: (vehicleId: string) => void;
}

export default function VehicleDiscovery({ onSelectVehicle }: VehicleDiscoveryProps) {
  const [selected, setSelected] = useState(VEHICLES[0].id);
  const selectedVehicle = VEHICLES.find((v) => v.id === selected)!;

  return (
    <section id="fleet" className="relative py-32 px-6">
      {/* Section background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-20"
          style={{ background: "linear-gradient(90deg, transparent, #fbbf24, transparent)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">
            Fleet Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Choose Your Experience
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Each vehicle is curated for a distinct personality. Find yours.
          </p>
        </motion.div>

        {/* Vehicle selector tabs */}
        <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {VEHICLES.map((vehicle) => (
            <motion.button
              key={vehicle.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(vehicle.id)}
              className={`px-6 py-3 rounded-2xl text-sm font-medium tracking-wide transition-all duration-300 ${
                selected === vehicle.id
                  ? "text-black glow-gold"
                  : "glass text-white/60 hover:text-white"
              }`}
              style={selected === vehicle.id ? { background: vehicle.color } : {}}
            >
              {vehicle.name}
              <span className="ml-2 text-xs opacity-60">{vehicle.category}</span>
            </motion.button>
          ))}
        </div>

        {/* Selected vehicle detail */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left: Info */}
          <div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white">{selectedVehicle.name}</h3>
                <p className="text-white/50 mt-1">{selectedVehicle.tagline}</p>
              </div>
              <div className="text-right">
                <span className="text-amber-400 text-3xl font-bold">${selectedVehicle.price}</span>
                <span className="text-white/40 text-sm">/day</span>
              </div>
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {Object.entries(selectedVehicle.specs).map(([key, val]) => (
                <div key={key} className="glass rounded-xl p-4">
                  <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                    {key.replace("_", " ")}
                  </p>
                  <p className="text-white font-semibold text-lg">{val}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mb-8">
              <p className="text-white/40 text-xs uppercase tracking-wide mb-3">Highlights</p>
              <div className="flex flex-wrap gap-2">
                {selectedVehicle.features.map((feat) => (
                  <span
                    key={feat}
                    className="glass-gold text-amber-300 text-xs px-3 py-1.5 rounded-full"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onSelectVehicle(selected)}
              className="w-full py-4 rounded-2xl font-semibold text-black text-sm tracking-wide transition-all duration-300 hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${selectedVehicle.color}, ${selectedVehicle.color}cc)` }}
            >
              View 3D Model →
            </button>
          </div>

          {/* Right: Visual card */}
          <motion.div
            className="glass rounded-3xl p-8 flex flex-col items-center justify-center min-h-[320px]"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, ${selectedVehicle.color}10 0%, transparent 70%), rgba(255,255,255,0.03)`,
              border: `1px solid ${selectedVehicle.color}20`,
            }}
          >
            {/* Placeholder car silhouette */}
            <div className="relative w-full flex items-center justify-center">
              {/* Car body shape */}
              <div className="relative">
                <div
                  className="w-64 h-20 rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${selectedVehicle.color}30, ${selectedVehicle.color}10)`, border: `1px solid ${selectedVehicle.color}20` }}
                />
                <div
                  className="absolute top-[-30px] left-12 w-40 h-16 rounded-t-2xl rounded-b-none"
                  style={{ background: `linear-gradient(135deg, ${selectedVehicle.color}25, transparent)`, border: `1px solid ${selectedVehicle.color}15`, borderBottom: "none" }}
                />
                {/* Wheels */}
                {[{ left: "20px" }, { right: "20px" }].map((style, i) => (
                  <div
                    key={i}
                    className="absolute bottom-[-14px] w-11 h-11 rounded-full"
                    style={{
                      ...style,
                      background: `radial-gradient(circle, #333 40%, ${selectedVehicle.color}40 100%)`,
                      border: `2px solid ${selectedVehicle.color}40`,
                    }}
                  />
                ))}
                {/* Glow */}
                <div
                  className="absolute inset-0 blur-2xl opacity-20 rounded-xl"
                  style={{ background: selectedVehicle.color }}
                />
              </div>
            </div>

            <p className="text-white/20 text-xs mt-8 tracking-widest uppercase">
              {selectedVehicle.category} Collection
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
