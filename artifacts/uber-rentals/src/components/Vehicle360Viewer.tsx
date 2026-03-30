import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html, Stars, useGLTF } from "@react-three/drei";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { motion } from "framer-motion";
import * as THREE from "three";

const SECTIONS = [
  { id: "front",    label: "Front View",    angle: 0,              color: "#fbbf24" },
  { id: "side",     label: "Side Profile",  angle: Math.PI / 2,    color: "#60a5fa" },
  { id: "rear",     label: "Rear View",     angle: Math.PI,        color: "#a78bfa" },
  { id: "quarter",  label: "3/4 Rear",      angle: (Math.PI * 3) / 4, color: "#34d399" },
  { id: "interior", label: "Interior",      angle: Math.PI / 4,    color: "#f87171" },
];

/* ---------- GLB version ---------- */
function GLBCar360({ url, targetAngle }: { url: string; targetAngle: number }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  const { scaleFactor, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const sf = maxDim > 0 ? 2.8 / maxDim : 1;
    const off = new THREE.Vector3(-center.x, -center.y, -center.z);
    return { scaleFactor: sf, offset: off };
  }, [scene]);

  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat) { mat.envMapIntensity = 1.4; mat.needsUpdate = true; }
      }
    });
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetAngle,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} scale={scaleFactor}>
      <primitive object={scene} position={offset} />
    </group>
  );
}

/* ---------- CSS placeholder fallback ---------- */
function PlaceholderCar360({ targetAngle }: { targetAngle: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetAngle,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.6, 1]} />
        <meshStandardMaterial color="#161626" metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[1.4, 0.45, 0.9]} />
        <meshStandardMaterial color="#0f0f1f" metalness={0.9} roughness={0.1} />
      </mesh>
      {([[-0.8,-0.35,0.55],[0.8,-0.35,0.55],[-0.8,-0.35,-0.55],[0.8,-0.35,-0.55]] as [number,number,number][]).map((pos, i) => (
        <mesh key={i} position={pos} rotation={[Math.PI/2,0,0]}>
          <cylinderGeometry args={[0.28,0.28,0.2,24]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.9} />
        </mesh>
      ))}
      <pointLight position={[1.2,0.1,0.4]}  color="#ffffff" intensity={3} distance={4} />
      <pointLight position={[1.2,0.1,-0.4]} color="#ffffff" intensity={3} distance={4} />
      <pointLight position={[-1.2,0.1,0.4]} color="#ff2200" intensity={2} distance={3} />
      <pointLight position={[-1.2,0.1,-0.4]} color="#ff2200" intensity={2} distance={3} />
    </group>
  );
}

/* ---------- Main component ---------- */
interface Vehicle360ViewerProps {
  modelUrl?: string;
  onClose?: () => void;
}

export default function Vehicle360Viewer({ modelUrl, onClose }: Vehicle360ViewerProps) {
  const [activeSection, setActiveSection] = useState("front");
  const [cameraTarget, setCameraTarget] = useState(0);

  const handleSectionClick = (sectionId: string, angle: number) => {
    setActiveSection(sectionId);
    setCameraTarget(angle);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col" style={{ background: "#04040c" }}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between glass-dark">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="" className="w-8 h-8 rounded-lg object-contain" />
          <div>
            <p className="text-white font-semibold text-sm">360° Vehicle Explorer</p>
            <p className="text-white/40 text-xs">Orbit • Click • Discover</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="glass w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* 3D Canvas */}
      <div className="flex-1">
        <CanvasErrorBoundary>
          <Canvas camera={{ position: [4, 2, 4], fov: 50 }} shadows dpr={[1, 2]}>
            <Stars radius={80} depth={30} count={3000} factor={3} saturation={0} fade />

            <ambientLight intensity={0.15} />
            <directionalLight position={[5, 8, 5]}   intensity={2}   castShadow color="#fffaee" />
            <directionalLight position={[-5, 4, -5]}  intensity={0.8}           color="#4466ff" />
            <pointLight       position={[0, 5, 0]}    intensity={1}  color="#fbbf24" distance={12} />

            <Environment preset="night" />

            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, 0]} receiveShadow>
              <planeGeometry args={[30, 30]} />
              <meshStandardMaterial color="#04040c" metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Ground ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.74, 0]}>
              <ringGeometry args={[1.6, 1.65, 64]} />
              <meshStandardMaterial color="#fbbf24" transparent opacity={0.3} />
            </mesh>

            <Suspense fallback={<Html center><div className="text-white/50 text-sm">Loading model…</div></Html>}>
              {modelUrl
                ? <GLBCar360 url={modelUrl} targetAngle={cameraTarget} />
                : <PlaceholderCar360 targetAngle={cameraTarget} />
              }
            </Suspense>

            <OrbitControls
              enableZoom
              enablePan={false}
              minDistance={3}
              maxDistance={9}
              minPolarAngle={Math.PI / 8}
              maxPolarAngle={Math.PI / 1.9}
              autoRotate={false}
            />
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      {/* Section selector */}
      <div className="absolute bottom-0 left-0 right-0 z-20 glass-dark px-6 py-5">
        <div className="max-w-2xl mx-auto">
          <p className="text-white/30 text-xs text-center tracking-widest uppercase mb-4">
            Select perspective
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {SECTIONS.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSectionClick(section.id, section.angle)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  activeSection === section.id
                    ? "text-black"
                    : "glass text-white/60 hover:text-white"
                }`}
                style={activeSection === section.id ? { background: section.color } : {}}
              >
                {section.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
