import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#060608" }}
        >
          {/* Background ambient */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-xl bg-amber-400/20" />
              <img
                src="/logo.png"
                alt="Uber Rentals"
                className="relative w-20 h-20 rounded-2xl object-contain"
              />
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Uber{" "}
                <span className="gradient-text glow-text">Rentals</span>
              </h1>
              <p className="text-white/40 text-sm mt-1 tracking-[0.2em] uppercase">
                Vehicle Experience Platform
              </p>
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 w-64 flex flex-col items-center gap-3"
          >
            <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="text-white/30 text-xs tracking-widest uppercase">
                Loading Experience
              </span>
              <span className="text-amber-400 text-xs font-mono">
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
          </motion.div>

          {/* Watermark */}
          <div className="absolute bottom-6 flex items-center gap-2 opacity-20">
            <img src="/logo.png" alt="" className="w-4 h-4 object-contain" />
            <span className="text-white text-xs tracking-widest">UBER RENTALS</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
