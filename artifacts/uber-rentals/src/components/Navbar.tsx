import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface NavbarProps {
  onBookNow?: () => void;
}

export default function Navbar({ onBookNow }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 2.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Uber Rentals Logo"
            className="w-10 h-10 rounded-xl object-contain"
          />
          <div>
            <span className="text-white font-bold text-lg tracking-tight">Uber</span>
            <span className="text-amber-400 font-light text-lg tracking-wider ml-1">Rentals</span>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Experience", "Fleet", "Performance", "Booking"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/60 hover:text-white text-sm tracking-wide transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onBookNow}
          className="glass-gold text-amber-400 px-5 py-2 rounded-full text-sm font-medium tracking-wide hover:bg-amber-400/20 transition-all duration-300"
        >
          Book Now
        </button>
      </div>

      {/* Subtle bottom line */}
      {scrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"
        />
      )}
    </motion.nav>
  );
}
