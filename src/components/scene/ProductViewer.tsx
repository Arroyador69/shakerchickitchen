"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import type { Product } from "@/lib/types";
import { ProductModel } from "./ProductModels";

export function ProductViewer({ product }: { product: Product }) {
  return (
    <div className="relative h-[460px] w-full overflow-hidden rounded-3xl bg-marble md:h-[520px]">
      <Canvas camera={{ position: [2.1, 1.4, 2.6], fov: 38 }} dpr={[1, 1.7]} shadows>
        <color attach="background" args={["#f3eee6"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3.2, 4.2, 2.4]} intensity={1.15} castShadow />
        <Suspense fallback={null}>
          <group position={[0, -0.15, 0]}>
            <ProductModel product={product} />
          </group>
          <ContactShadows position={[0, -0.02, 0]} opacity={0.4} blur={2.2} scale={7} />
          <Environment preset="warehouse" environmentIntensity={0.35} />
        </Suspense>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.1}
          enablePan={false}
          minDistance={1.5}
          maxDistance={5}
          minPolarAngle={0.7}
          maxPolarAngle={1.45}
        />
      </Canvas>
      <p className="pointer-events-none absolute left-4 top-4 rounded-full bg-ivory/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-navy">
        Vista 3D · gira con el ratón
      </p>
    </div>
  );
}
