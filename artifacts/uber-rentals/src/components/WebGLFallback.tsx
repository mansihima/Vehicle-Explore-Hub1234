import { motion } from "framer-motion";

export default function WebGLFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-8">
      {/* Animated car silhouette */}
      <div className="relative w-64 h-32 flex items-center justify-center">
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #fbbf24, transparent)" }}
        />
        {/* Car body */}
        <div className="relative">
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Main body */}
            <div
              className="w-52 h-16 rounded-2xl relative"
              style={{
                background: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.05))",
                border: "1px solid rgba(251,191,36,0.2)",
              }}
            >
              {/* Roof */}
              <div
                className="absolute -top-8 left-8 w-36 h-12 rounded-t-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,191,36,0.03))",
                  border: "1px solid rgba(251,191,36,0.15)",
                  borderBottom: "none",
                }}
              />

              {/* Headlights */}
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-sm"
                style={{ background: "#fff", boxShadow: "0 0 10px #fff, 0 0 20px #fff" }}
              />

              {/* Tail lights */}
              <motion.div
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-sm"
                style={{ background: "#ff4444", boxShadow: "0 0 10px #ff4444" }}
              />
            </div>

            {/* Wheels */}
            <div className="flex justify-between px-8 -mt-2">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-full"
                  style={{
                    background: "radial-gradient(circle, #333 40%, rgba(251,191,36,0.4) 100%)",
                    border: "2px solid rgba(251,191,36,0.3)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-white/40 text-sm">3D viewer requires WebGL</p>
        <p className="text-white/20 text-xs mt-1">Please use a WebGL-compatible browser to explore the full 3D experience</p>
      </div>
    </div>
  );
}
