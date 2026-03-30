import { motion } from "framer-motion";
import { useState } from "react";

interface BookingPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const DATES = ["Today", "Tomorrow", "This Weekend", "Custom"];
const DURATIONS = ["1 Day", "3 Days", "1 Week", "1 Month"];
const LOCATIONS = ["Manhattan, NY", "Los Angeles, CA", "Miami, FL", "Chicago, IL"];

export default function BookingPanel({ isOpen, onClose }: BookingPanelProps) {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedDuration, setSelectedDuration] = useState("1 Day");
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [step, setStep] = useState(1);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
      style={{ background: "rgba(8, 8, 12, 0.97)" }}
    >
      {/* Backdrop blur overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[-1] bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Panel content */}
      <div className="flex flex-col h-full border-l border-white/10">
        {/* Header */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-xl">Book Your Ride</h2>
              <p className="text-white/40 text-sm mt-0.5">Step {step} of 3</p>
            </div>
            <button
              onClick={onClose}
              className="glass w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Progress */}
          <div className="flex gap-1.5 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="h-1 flex-1 rounded-full transition-all duration-400"
                style={{
                  background: s <= step ? "#fbbf24" : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-white/60 text-xs uppercase tracking-widest mb-4">
                Select Date
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {DATES.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`py-3 px-4 rounded-xl text-sm transition-all duration-200 ${
                      selectedDate === d
                        ? "bg-amber-400 text-black font-semibold"
                        : "glass text-white/70 hover:text-white"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <h3 className="text-white/60 text-xs uppercase tracking-widest mb-4">
                Duration
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDuration(d)}
                    className={`py-3 px-4 rounded-xl text-sm transition-all duration-200 ${
                      selectedDuration === d
                        ? "bg-amber-400 text-black font-semibold"
                        : "glass text-white/70 hover:text-white"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <h3 className="text-white/60 text-xs uppercase tracking-widest mb-4">
                Pickup Location
              </h3>
              <div className="flex flex-col gap-2">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`py-3 px-4 rounded-xl text-sm text-left transition-all duration-200 flex items-center gap-3 ${
                      selectedLocation === loc
                        ? "glass-gold text-amber-400"
                        : "glass text-white/70 hover:text-white"
                    }`}
                  >
                    <span className="text-base">📍</span>
                    {loc}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-white/60 text-xs uppercase tracking-widest mb-4">
                Add-ons
              </h3>
              {[
                { name: "Premium Insurance", desc: "Full coverage, zero deductible", price: "+$29/day", icon: "🛡" },
                { name: "Personal Driver", desc: "Certified chauffeur included", price: "+$89/day", icon: "👤" },
                { name: "Airport Transfer", desc: "Pickup from any terminal", price: "+$49", icon: "✈" },
                { name: "Fuel Package", desc: "Return empty, no extra charge", price: "+$39", icon: "⛽" },
              ].map((addon) => (
                <div key={addon.name} className="glass rounded-xl p-4 mb-3 flex items-center gap-4">
                  <span className="text-2xl">{addon.icon}</span>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{addon.name}</p>
                    <p className="text-white/40 text-xs">{addon.desc}</p>
                  </div>
                  <span className="text-amber-400 text-xs font-medium">{addon.price}</span>
                </div>
              ))}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-white/60 text-xs uppercase tracking-widest mb-6">
                Booking Summary
              </h3>

              {/* Summary card */}
              <div className="glass-gold rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/logo.png" alt="" className="w-8 h-8 rounded-lg object-contain" />
                  <div>
                    <p className="text-white font-bold text-sm">Apex GT — Sports</p>
                    <p className="text-amber-400/70 text-xs">Premium Experience</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Date", value: selectedDate },
                    { label: "Duration", value: selectedDuration },
                    { label: "Location", value: selectedLocation },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span className="text-white/40">{label}</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="glass rounded-2xl p-5 space-y-3">
                {[
                  { label: "Base rate", value: "$299/day" },
                  { label: "Duration", value: "×1" },
                  { label: "Service fee", value: "$25" },
                  { label: "Insurance", value: "Included" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-white/50">{label}</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-white/10 flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-amber-400 font-bold text-lg">$324</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-6 border-t border-white/10">
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="w-full py-4 rounded-2xl font-bold text-black text-sm tracking-wide transition-all duration-300 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}
            >
              Continue →
            </button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(251,191,36,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl font-bold text-black text-sm tracking-wide"
              style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}
            >
              Confirm Booking — $324
            </motion.button>
          )}

          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="w-full py-3 mt-2 text-white/40 text-sm hover:text-white transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
