import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { value: "450+", label: "Premium Vehicles" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "180", label: "Pickup Locations" },
  { value: "24/7", label: "Concierge Support" },
];

export default function ScrollExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.12) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <p className="text-4xl font-bold gradient-text mb-2">{stat.value}</p>
              <p className="text-white/40 text-xs tracking-wide uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🔮",
              title: "3D Preview",
              description: "See every detail before you rent. Rotate, zoom, and explore your vehicle in full 3D before stepping inside.",
              color: "#fbbf24",
            },
            {
              icon: "🌐",
              title: "360° Experience",
              description: "A complete orbital view of the vehicle, inside and out. Click on any section for instant details.",
              color: "#60a5fa",
            },
            {
              icon: "⚡",
              title: "Instant Booking",
              description: "From discovery to confirmation in under 2 minutes. Premium experience, zero friction.",
              color: "#a78bfa",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-8 relative overflow-hidden group"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-2xl"
                style={{ background: `radial-gradient(circle at 50% 50%, ${feature.color}20, transparent)` }}
              />

              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3
                className="text-white font-bold text-xl mb-3"
                style={{ color: feature.color }}
              >
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
