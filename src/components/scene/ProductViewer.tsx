"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import type { Product } from "@/lib/types";

function MeshByType({ product }: { product: Product }) {
  const color = product.color;
  switch (product.mesh) {
    case "bar":
    case "counter":
      return (
        <group>
          <mesh position={[0, 0.35, 0]} castShadow>
            <boxGeometry args={[1.6, 0.7, 0.55]} />
            <meshStandardMaterial color={color} roughness={0.45} />
          </mesh>
          <mesh position={[0, 0.72, 0]} castShadow>
            <boxGeometry args={[1.7, 0.06, 0.62]} />
            <meshStandardMaterial color="#f2eee8" roughness={0.2} />
          </mesh>
        </group>
      );
    case "shelf":
      return (
        <group>
          {[0.15, 0.45, 0.75].map((y) => (
            <mesh key={y} position={[0, y, 0]} castShadow>
              <boxGeometry args={[1.1, 0.05, 0.28]} />
              <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>
          ))}
          <mesh position={[-0.52, 0.45, 0]} castShadow>
            <boxGeometry args={[0.05, 0.85, 0.28]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0.52, 0.45, 0]} castShadow>
            <boxGeometry args={[0.05, 0.85, 0.28]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      );
    case "planter":
      return (
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial color="#f4efe6" roughness={0.4} />
        </mesh>
      );
    case "pet":
      return (
        <group>
          <mesh position={[0, 0.28, 0]} castShadow>
            <boxGeometry args={[0.8, 0.55, 0.55]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0.15, 0.28, 0.28]}>
            <boxGeometry args={[0.28, 0.28, 0.04]} />
            <meshStandardMaterial color="#1a1612" />
          </mesh>
        </group>
      );
    case "door":
      return (
        <group>
          <mesh position={[0, 0.85, 0]} castShadow>
            <boxGeometry args={[0.7, 1.7, 0.08]} />
            <meshStandardMaterial color={color} roughness={0.45} />
          </mesh>
          <mesh position={[0, 0.85, 0.05]}>
            <boxGeometry args={[0.5, 1.5, 0.02]} />
            <meshStandardMaterial color={color} roughness={0.55} />
          </mesh>
        </group>
      );
    case "sign":
      return (
        <mesh position={[0, 0.5, 0]} rotation={[-0.15, 0.4, 0]} castShadow>
          <boxGeometry args={[1.1, 0.45, 0.06]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      );
    case "kids":
      return (
        <group>
          <mesh position={[0, 0.28, 0]} castShadow>
            <boxGeometry args={[0.9, 0.12, 0.55]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[-0.35, 0.12, -0.18]}>
            <boxGeometry args={[0.08, 0.24, 0.08]} />
            <meshStandardMaterial color="#8A6A45" />
          </mesh>
          <mesh position={[0.35, 0.12, 0.18]}>
            <boxGeometry args={[0.08, 0.24, 0.08]} />
            <meshStandardMaterial color="#8A6A45" />
          </mesh>
        </group>
      );
    case "table":
      return (
        <group>
          <mesh position={[0, 0.52, 0]} castShadow>
            <boxGeometry args={[1.5, 0.08, 0.8]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>
          {[[-0.65, -0.32], [0.65, -0.32], [-0.65, 0.32], [0.65, 0.32]].map(([x, z]) => (
            <mesh key={`${x}${z}`} position={[x, 0.25, z]}>
              <boxGeometry args={[0.08, 0.5, 0.08]} />
              <meshStandardMaterial color={color} />
            </mesh>
          ))}
        </group>
      );
    default:
      return (
        <group>
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[1.4, 0.8, 0.5]} />
            <meshStandardMaterial color={color} roughness={0.42} />
          </mesh>
          <mesh position={[0, 0.82, 0]}>
            <boxGeometry args={[1.48, 0.05, 0.56]} />
            <meshStandardMaterial color="#f2eee8" />
          </mesh>
        </group>
      );
  }
}

export function ProductViewer({ product }: { product: Product }) {
  return (
    <div className="h-[380px] w-full overflow-hidden rounded-3xl bg-marble">
      <Canvas camera={{ position: [1.8, 1.3, 2.2], fov: 40 }} dpr={[1, 1.6]}>
        <color attach="background" args={["#f3eee6"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} castShadow />
        <Suspense fallback={null}>
          <MeshByType product={product} />
          <ContactShadows position={[0, 0, 0]} opacity={0.35} blur={2} scale={6} />
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={1.2} enablePan={false} minDistance={1.6} maxDistance={4} />
      </Canvas>
    </div>
  );
}
