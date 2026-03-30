import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Html } from "@react-three/drei";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const HOTSPOTS = [
  { id: "interior", label: "Interior", description: "Premium leather cabin with ambient lighting", position: [0.2, 0.5, 0.8] as [number, number, number] },
  { id: "performance", label: "Performance", description: "0-60 mph in 3.2s, 450hp twin-turbo", position: [-0.8, 0.2, 0.3] as [number, number, number] },
  { id: "comfort", label: "Comfort", description: "Adaptive air suspension & massaging seats", position: [0.5, -0.2, 0.6] as [number, number, number] },
  { id: "luggage", label: "Luggage", description: "620L of cargo space, flexible loading", position: [-0.4, 0.1, -0.8] as [number, number, number] },
  { id: "ride", label: "Ride Quality", description: "Active noise cancellation, smooth ride", position: [0, 0.6, -0.5] as [number, number, number] },
];

function PlaceholderCar({ showHotspots }: { showHotspots: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Car body */}
      <mesh ref={meshRef} castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.6, 1]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Car roof */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[1.4, 0.45, 0.9]} />
        <meshStandardMaterial color="#111122" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Wheels */}
      {[[-0.8, -0.35, 0.55], [0.8, -0.35, 0.55], [-0.8, -0.35, -0.55], [0.8, -0.35, -0.55]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.2, 24]} />
          <meshStandardMaterial color="#0d0d0d" metalness={0.3} roughness={0.8} />
        </mesh>
      ))}

      {/* Headlights */}
      <pointLight position={[1.15, 0.1, 0.35]} color="#ffffff" intensity={2} distance={3} />
      <pointLight position={[1.15, 0.1, -0.35]} color="#ffffff" intensity={2} distance={3} />

      {/* Hotspots */}
      {showHotspots && HOTSPOTS.map((spot) => (
        <Html key={spot.id} position={spot.position} center>
          <div
            className="relative cursor-pointer"
            onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
          >
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full bg-amber-400/30 hotspot-pulse scale-150" />
            {/* Dot */}
            <div className="relative w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-lg" />

            {/* Tooltip */}
            <AnimatePresence>
              {activeHotspot === spot.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-dark rounded-xl p-3 w-44 pointer-events-none z-10"
                  style={{ minWidth: 160 }}
                >
                  <p className="text-amber-400 text-xs font-bold uppercase tracking-wide">{spot.label}</p>
                  <p className="text-white/70 text-xs mt-1 leading-snug">{spot.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Html>
      ))}
    </group>
  );
}

function GLBModel({ url, showHotspots }: { url: string; showHotspots: boolean }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Compute auto-scale + centering offset once when scene loads
  const { scaleFactor, offset, hotspotPositions } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const sf = maxDim > 0 ? 2.8 / maxDim : 1;
    // offset to center model at origin (applied at the primitive level, before scale)
    const off = new THREE.Vector3(-center.x, -center.y + size.y * 0.0, -center.z);
    // hotspot positions in scaled space
    const hp: [number, number, number][] = [
      [size.x * 0.3 * sf,   size.y * 0.55 * sf,  size.z * 0.45 * sf],
      [-size.x * 0.5 * sf,  size.y * 0.2 * sf,   size.z * 0.3 * sf],
      [size.x * 0.35 * sf,  -size.y * 0.05 * sf,  size.z * 0.5 * sf],
      [-size.x * 0.25 * sf, size.y * 0.1 * sf,  -size.z * 0.45 * sf],
      [0,                    size.y * 0.65 * sf,  -size.z * 0.25 * sf],
    ];
    return { scaleFactor: sf, offset: off, hotspotPositions: hp };
  }, [scene]);

  // Boost environment reflections once
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = 1.4;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <group ref={groupRef} scale={scaleFactor}>
      <primitive object={scene} position={offset} />
      {showHotspots && HOTSPOTS.map((spot, i) => (
        <Html key={spot.id} position={hotspotPositions[i]} center>
          <div
            className="relative cursor-pointer"
            onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
          >
            <div className="absolute inset-0 rounded-full bg-amber-400/30 hotspot-pulse scale-150" />
            <div className="relative w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-lg" />
            <AnimatePresence>
              {activeHotspot === spot.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-dark rounded-xl p-3 z-10"
                  style={{ minWidth: 160 }}
                >
                  <p className="text-amber-400 text-xs font-bold uppercase tracking-wide">{spot.label}</p>
                  <p className="text-white/70 text-xs mt-1 leading-snug">{spot.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Html>
      ))}
    </group>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-white/50 text-xs tracking-wide">Loading model...</p>
      </div>
    </Html>
  );
}

interface Viewer3DProps {
  modelUrl?: string;
  showHotspots?: boolean;
  isFullscreen?: boolean;
  onClose?: () => void;
}

export default function Viewer3D({ modelUrl, showHotspots = true, isFullscreen = false, onClose }: Viewer3DProps) {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-40" : "w-full h-full"}`}>
      {/* Cinematic overlay gradients */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      {/* Canvas with error boundary for WebGL fallback */}
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [3, 1.5, 4], fov: 45 }}
          shadows
          dpr={[1, 2]}
          className="w-full h-full"
          style={{ background: "transparent" }}
        >
          {/* Lighting setup */}
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.5}
            castShadow
            color="#fff8e7"
          />
          <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#4060ff" />
          <pointLight position={[0, 4, 0]} intensity={0.8} color="#fbbf24" distance={10} />
          <spotLight
            position={[0, 6, 2]}
            angle={0.4}
            penumbra={0.5}
            intensity={1.2}
            castShadow
            color="#ffffff"
          />

          {/* Environment */}
          <Environment preset="city" />

          {/* Ground reflection */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial
              color="#080810"
              metalness={0.9}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Car model */}
          <Suspense fallback={<LoadingFallback />}>
            {modelUrl ? (
              <GLBModel url={modelUrl} showHotspots={showHotspots} />
            ) : (
              <PlaceholderCar showHotspots={showHotspots} />
            )}
          </Suspense>

          {/* Orbit Controls */}
          <OrbitControls
            enableZoom
            enablePan={false}
            minDistance={2}
            maxDistance={8}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate={autoRotate}
            autoRotateSpeed={0.8}
            onStart={() => setAutoRotate(false)}
          />
        </Canvas>
      </CanvasErrorBoundary>

      {/* Controls overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="glass px-4 py-2 rounded-full text-xs text-white/70 hover:text-white transition-colors"
        >
          {autoRotate ? "⏸ Pause rotation" : "▶ Auto rotate"}
        </button>
        <div className="glass px-4 py-2 rounded-full text-xs text-white/40">
          Drag to rotate · Scroll to zoom
        </div>
      </div>

      {/* Close button */}
      {isFullscreen && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 glass w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
}
