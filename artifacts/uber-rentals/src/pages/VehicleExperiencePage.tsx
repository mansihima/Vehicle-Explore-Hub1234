import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ModelViewerSection from "../components/ModelViewerSection";
import VehicleDiscovery from "../components/VehicleDiscovery";
import Vehicle360Viewer from "../components/Vehicle360Viewer";
import RidePersonality from "../components/RidePersonality";
import BookingPanel from "../components/BookingPanel";
import ScrollExperience from "../components/ScrollExperience";
import InteriorExperience from "../components/InteriorExperience";
import Watermark from "../components/Watermark";

interface VehicleExperiencePageProps {
  modelUrl?: string;
}

export default function VehicleExperiencePage({ modelUrl }: VehicleExperiencePageProps) {
  const [show360, setShow360] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const modelSectionRef = useRef<HTMLDivElement>(null);

  const scrollToModel = useCallback(() => {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleExplore360 = useCallback(() => {
    setShow360(true);
  }, []);

  const handleBookNow = useCallback(() => {
    setShowBooking(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Navigation */}
      <Navbar onBookNow={handleBookNow} />

      {/* Watermark */}
      <Watermark />

      {/* Main flow */}
      <main>
        {/* 1. Hero / Landing */}
        <HeroSection onViewModel={scrollToModel} onExplore360={handleExplore360} />

        {/* 2. 3D Model Viewer */}
        <div ref={modelSectionRef}>
          <ModelViewerSection modelUrl={modelUrl} />
        </div>

        {/* 3. Interior 360° embed */}
        <InteriorExperience />

        {/* 4. Scroll stats & features */}
        <ScrollExperience />

        {/* 5. Vehicle Discovery */}
        <VehicleDiscovery onSelectVehicle={scrollToModel} />

        {/* 5. Ride Personality */}
        <RidePersonality />

        {/* 6. Booking CTA section */}
        <section id="booking" className="relative py-24 px-6">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(251,191,36,0.06) 0%, transparent 60%)" }}
          />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">
                Ready to Drive?
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
                Your Perfect Ride
                <br />
                <span className="gradient-text">Awaits</span>
              </h2>
              <p className="text-white/40 mb-10 max-w-lg mx-auto text-lg">
                Select your vehicle, choose your dates, and experience luxury rental like never before.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(251,191,36,0.3)" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBookNow}
                className="px-12 py-5 rounded-full font-bold text-black text-base tracking-wide"
                style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" }}
              >
                Start Your Experience
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="w-7 h-7 rounded-lg object-contain" />
            <span className="text-white/30 text-sm">
              Uber <span className="text-amber-400/50">Rentals</span>
            </span>
          </div>
          <p className="text-white/20 text-xs">
            © 2026 Uber Rentals · Premium Vehicle Experience Platform
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Support"].map((item) => (
              <a key={item} href="#" className="text-white/20 text-xs hover:text-white/50 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* 360° Viewer Overlay */}
      <AnimatePresence>
        {show360 && (
          <Vehicle360Viewer modelUrl={modelUrl} onClose={() => setShow360(false)} />
        )}
      </AnimatePresence>

      {/* Booking Panel */}
      <BookingPanel isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
}
