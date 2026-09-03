"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import type { FinishId } from "@/lib/brand";
import { finishes } from "@/lib/brand";

type Props = {
  finish?: FinishId;
  autoRotate?: boolean;
  className?: string;
};

function ShakerDoor({
  width,
  height,
  color,
  handle = "right",
}: {
  width: number;
  height: number;
  color: string;
  handle?: "left" | "right" | "none" | "drawer";
}) {
  const frame = 0.045;
  const hx = handle === "left" ? -width * 0.32 : width * 0.32;
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, 0.04]} />
        <meshStandardMaterial color={color} roughness={0.42} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0, 0.012]} castShadow>
        <boxGeometry args={[width - frame * 2, height - frame * 2, 0.018]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.04} />
      </mesh>
      {handle !== "none" && handle !== "drawer" && (
        <mesh position={[hx, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <capsuleGeometry args={[0.012, 0.08, 6, 12]} />
          <meshStandardMaterial color="#c4a574" metalness={0.92} roughness={0.22} />
        </mesh>
      )}
      {handle === "drawer" && (
        <mesh position={[0, 0.02, 0.04]} rotation={[Math.PI / 2, 0, Math.PI / 2]} castShadow>
          <capsuleGeometry args={[0.01, 0.07, 6, 12]} />
          <meshStandardMaterial color="#c4a574" metalness={0.92} roughness={0.22} />
        </mesh>
      )}
    </group>
  );
}

function Cabinet({
  position,
  size,
  color,
  drawers = 0,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  drawers?: number;
}) {
  const [w, h, d] = size;
  return (
    <group position={position}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={0.48} metalness={0.05} />
      </mesh>
      {drawers > 0
        ? Array.from({ length: drawers }).map((_, i) => {
            const dh = h / drawers - 0.02;
            const y = 0.02 + dh / 2 + i * (h / drawers);
            return (
              <group key={i} position={[0, y, d / 2 + 0.01]}>
                <ShakerDoor width={w - 0.04} height={dh - 0.015} color={color} handle="drawer" />
              </group>
            );
          })
        : (
          <group position={[0, h / 2, d / 2 + 0.01]}>
            <ShakerDoor width={w - 0.03} height={h - 0.06} color={color} />
          </group>
        )}
    </group>
  );
}

function Counter({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#f2eee8" roughness={0.18} metalness={0.12} />
    </mesh>
  );
}

function Kitchen({ finish }: { finish: FinishId }) {
  const palette = useMemo(() => {
    const selected = finishes.find((f) => f.id === finish) ?? finishes[0];
    return {
      island: selected.color,
      base: finish === "crema" ? "#2C3A56" : "#EDE4D4",
      wall: "#EDE4D4",
    };
  }, [finish]);

  return (
    <group position={[0, -0.85, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial color="#8d6b45" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.6, -1.55]} receiveShadow>
        <boxGeometry args={[6.4, 3.2, 0.08]} />
        <meshStandardMaterial color="#f4efe6" roughness={0.9} />
      </mesh>
      <mesh position={[-2.4, 1.6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[3.2, 3.2, 0.08]} />
        <meshStandardMaterial color="#f1eadf" roughness={0.9} />
      </mesh>

      <Cabinet position={[-1.55, 0, -1.2]} size={[0.7, 0.9, 0.58]} color={palette.base} />
      <Cabinet position={[-0.82, 0, -1.2]} size={[0.7, 0.9, 0.58]} color={palette.base} drawers={3} />
      <Cabinet position={[-0.08, 0, -1.2]} size={[0.72, 0.9, 0.58]} color={palette.base} />
      <Cabinet position={[0.68, 0, -1.2]} size={[0.72, 0.9, 0.58]} color={palette.base} drawers={2} />
      <Cabinet position={[1.42, 0, -1.2]} size={[0.7, 0.9, 0.58]} color={palette.base} />
      <Counter position={[-0.06, 0.93, -1.18]} size={[3.85, 0.06, 0.66]} />

      <Cabinet position={[-1.55, 1.55, -1.22]} size={[0.7, 0.72, 0.36]} color={palette.wall} />
      <Cabinet position={[-0.82, 1.55, -1.22]} size={[0.7, 0.72, 0.36]} color={palette.wall} />
      <Cabinet position={[0.68, 1.55, -1.22]} size={[0.72, 0.72, 0.36]} color={palette.wall} />
      <Cabinet position={[1.42, 1.55, -1.22]} size={[0.7, 0.72, 0.36]} color={palette.wall} />

      <mesh position={[-0.08, 1.72, -1.22]} castShadow>
        <boxGeometry args={[0.72, 0.95, 0.08]} />
        <meshPhysicalMaterial
          color="#d9e7ee"
          transparent
          opacity={0.28}
          roughness={0.05}
          metalness={0.1}
          transmission={0.6}
        />
      </mesh>
      <mesh position={[-0.08, 1.72, -1.26]}>
        <boxGeometry args={[0.78, 1.02, 0.04]} />
        <meshStandardMaterial color="#d7c7ae" />
      </mesh>

      <group position={[0.15, 0, 0.55]}>
        <Cabinet position={[-0.55, 0, 0]} size={[0.7, 0.9, 0.7]} color={palette.island} drawers={3} />
        <Cabinet position={[0.18, 0, 0]} size={[0.72, 0.9, 0.7]} color={palette.island} />
        <Cabinet position={[0.9, 0, 0]} size={[0.7, 0.9, 0.7]} color={palette.island} drawers={2} />
        <Counter position={[0.18, 0.93, 0]} size={[2.2, 0.07, 0.82]} />
        <mesh position={[0.18, 0.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.16, 0.78]} />
          <meshStandardMaterial color="#efeae2" roughness={0.12} metalness={0.18} />
        </mesh>
      </group>

      <Float speed={1.4} rotationIntensity={0.05} floatIntensity={0.12}>
        <mesh position={[0.18, 1.85, 0.55]} castShadow>
          <cylinderGeometry args={[0.09, 0.18, 0.28, 24]} />
          <meshStandardMaterial color="#c4a574" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[-0.35, 1.85, 0.55]} castShadow>
          <cylinderGeometry args={[0.09, 0.18, 0.28, 24]} />
          <meshStandardMaterial color="#c4a574" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0.7, 1.85, 0.55]} castShadow>
          <cylinderGeometry args={[0.09, 0.18, 0.28, 24]} />
          <meshStandardMaterial color="#c4a574" metalness={0.85} roughness={0.25} />
        </mesh>
      </Float>

      <mesh position={[-1.55, 0.96, -0.95]} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.04, 24]} />
        <meshStandardMaterial color="#c4a574" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

export function KitchenScene({ finish = "oliva", autoRotate = true, className }: Props) {
  return (
    <div className={className ?? "h-full w-full"}>
      <Canvas
        shadows
        dpr={[1, 1.7]}
        camera={{ position: [3.4, 2.1, 4.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#f3eee6"]} />
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[4, 8, 3]}
          intensity={1.35}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight position={[-3, 5, 2]} intensity={0.6} angle={0.5} penumbra={0.6} color="#f2e2c4" />
        <Suspense fallback={null}>
          <Kitchen finish={finish} />
          <ContactShadows position={[0, -0.85, 0]} opacity={0.45} scale={8} blur={2.4} far={4} />
          <Environment preset="warehouse" environmentIntensity={0.45} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minPolarAngle={0.9}
          maxPolarAngle={1.45}
          minDistance={3.2}
          maxDistance={7}
          autoRotate={autoRotate}
          autoRotateSpeed={0.55}
          target={[0.1, 0.35, -0.2]}
        />
      </Canvas>
    </div>
  );
}
