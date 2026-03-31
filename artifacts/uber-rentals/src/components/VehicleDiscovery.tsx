import { Suspense, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Html } from "@react-three/drei";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import * as THREE from "three";

const SPORT_VEHICLES = [
  {
    id: "sport-1",
    name: "Porsche 911 Carrera S",
    category: "Sports Coupe",
    tagline: "Iconic performance, engineered for the thrill.",
    price: 499,
    specs: { power: "450 HP", top_speed: "191 mph", acceleration: "3.5s", range: "370 mi" },
    features: ["Sport Chrono Package", "PASM suspension", "Launch control", "Carbon ceramic brakes"],
    color: "#fbbf24",
    modelUrl: "/car-sport-1.glb",
  },
  {
    id: "sport-2",
    name: "BMW M4 Competition",
    category: "Performance Coupe",
    tagline: "Track-bred. Road-ready. Uncompromising.",
    price: 399,
    specs: { power: "503 HP", top_speed: "180 mph", acceleration: "3.9s", range: "350 mi" },
    features: ["M xDrive AWD", "Adaptive M suspension", "Carbon fibre trim", "M Sport exhaust"],
    color: "#60a5fa",
    modelUrl: "/car-sport-2.glb",
  },
  {
    id: "sport-3",
    name: "Mercedes AMG GT",
    category: "Super Coupe",
    tagline: "Pure driving emotion. Nothing held back.",
    price: 599,
    specs: { power: "577 HP", top_speed: "197 mph", acceleration: "3.1s", range: "320 mi" },
    features: ["AMG SPEEDSHIFT DCT", "Active rear steering", "Burmester audio", "Carbon bonnet"],
    color: "#a78bfa",
    modelUrl: "/car-sport-3.glb",
  },
];

/* ── Rotating GLB Model ─────────────────────────────────── */
function RotatingGLBModel({
  url,
  isHovered,
}: {
  url: string;
  isHovered: boolean;
}) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  const { scaleFactor, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const sf = maxDim > 0 ? 2.4 / maxDim : 1;
    const off = new THREE.Vector3(-center.x, -box.min.y, -center.z);
    return { scaleFactor: sf, offset: off };
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current && !isHovered) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <group scale={scaleFactor} position={[0, -1, 0]}>
        <primitive object={scene} position={offset} />
      </group>
    </group>
  );
}

/* ── Single Car Card ────────────────────────────────────── */
function SportCarCard({
  vehicle,
  onBook,
}: {
  vehicle: (typeof SPORT_VEHICLES)[0];
  onBook: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      whileHover={{ y: -6 }}
      className="flex flex-col rounded-3xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${vehicle.color}20`,
        boxShadow: hovered
          ? `0 0 60px ${vehicle.color}15, 0 20px 60px rgba(0,0,0,0.5)`
          : "0 8px 40px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 3D Canvas */}
      <div className="relative" style={{ height: 260, background: "#050508" }}>
        {/* Hover glow behind the car */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(ellipse 70% 55% at 50% 65%, ${vehicle.color}35 0%, ${vehicle.color}10 45%, transparent 75%)`,
          }}
        />
        <CanvasErrorBoundary>
          <Canvas
            camera={{ position: [0, 1.4, 4.5], fov: 42 }}
            shadows
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
            <pointLight position={[0, 4, 0]} intensity={0.8} color={vehicle.color} distance={10} />
            <Environment preset="night" />

            <Suspense
              fallback={
                <Html center>
                  <div className="text-white/40 text-xs">Loading…</div>
                </Html>
              }
            >
              <RotatingGLBModel url={vehicle.modelUrl} isHovered={hovered} />
            </Suspense>

            {hovered && (
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
              />
            )}
          </Canvas>
        </CanvasErrorBoundary>

        {/* Hover label */}
        <div
          className="absolute bottom-3 right-3 flex items-center gap-1.5 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: vehicle.color }} />
          <span className="text-white/50 text-[10px] tracking-wide">Drag to rotate</span>
        </div>

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium"
          style={{ background: `${vehicle.color}18`, color: vehicle.color, border: `1px solid ${vehicle.color}30` }}
        >
          {vehicle.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-white font-bold text-xl leading-tight">{vehicle.name}</h3>
            <p className="text-white/40 text-xs mt-1">{vehicle.tagline}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <span className="font-bold text-2xl" style={{ color: vehicle.color }}>
              ${vehicle.price}
            </span>
            <span className="text-white/30 text-xs block">/day</span>
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(vehicle.specs).map(([key, val]) => (
            <div key={key} className="glass rounded-xl px-3 py-2">
              <p className="text-white/30 text-[10px] uppercase tracking-wide mb-0.5">
                {key.replace("_", " ")}
              </p>
              <p className="text-white font-semibold text-sm">{val}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5">
          {vehicle.features.map((feat) => (
            <span
              key={feat}
              className="text-[10px] px-2.5 py-1 rounded-full"
              style={{
                background: `${vehicle.color}12`,
                color: vehicle.color,
                border: `1px solid ${vehicle.color}25`,
              }}
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Book button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBook}
          className="w-full py-3.5 rounded-2xl font-semibold text-sm tracking-wide mt-auto"
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${vehicle.color}, ${vehicle.color}cc)`
              : "rgba(255,255,255,0.06)",
            color: hovered ? "#000" : vehicle.color,
            border: `1px solid ${vehicle.color}30`,
            transition: "all 0.3s ease",
          }}
        >
          Reserve Now →
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────── */
interface VehicleDiscoveryProps {
  onSelectVehicle: (vehicleId: string) => void;
}

export default function VehicleDiscovery({ onSelectVehicle }: VehicleDiscoveryProps) {
  return (
    <section className="relative py-32 px-6">
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, #fbbf24, transparent)" }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">
            Curated Fleet
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Luxury Sports Collection
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Hover to interact. Drag to explore. Three exceptional machines, one unforgettable experience.
          </p>
        </motion.div>

        {/* Car cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPORT_VEHICLES.map((vehicle) => (
            <SportCarCard
              key={vehicle.id}
              vehicle={vehicle}
              onBook={() => onSelectVehicle(vehicle.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
