"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import type { Product } from "@/lib/types";
import { ExactProduct3D } from "./ExactProduct3D";
import { ProductModel } from "./ProductModels";

export function ProductViewer({ product }: { product: Product }) {
  const photos = product.images?.length ? product.images : [product.image];
  const [mode, setMode] = useState<"foto" | "volumen">("foto");
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div className="relative h-[460px] w-full overflow-hidden rounded-3xl bg-marble md:h-[540px]">
      <Canvas camera={{ position: [0.15, 0.55, 3.1], fov: 36 }} dpr={[1, 1.7]} shadows>
        <color attach="background" args={["#f3eee6"]} />
        <ambientLight intensity={0.78} />
        <directionalLight position={[3.2, 4.2, 2.6]} intensity={1.25} castShadow />
        <directionalLight position={[-2.4, 1.8, -1.6]} intensity={0.28} />
        <Suspense fallback={null}>
          {mode === "foto" ? (
            <ExactProduct3D product={product} photoIndex={photoIndex} />
          ) : (
            <group position={[0, -0.35, 0]}>
              <ProductModel product={product} />
            </group>
          )}
          <ContactShadows position={[0, -0.72, 0]} opacity={0.38} blur={2.4} scale={8} />
          <Environment preset="warehouse" environmentIntensity={0.32} />
        </Suspense>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.75}
          enablePan={false}
          minDistance={1.8}
          maxDistance={5.2}
          minPolarAngle={0.75}
          maxPolarAngle={1.4}
          target={[0, 0.05, 0]}
        />
      </Canvas>
      <div className="absolute left-4 top-4 flex gap-2">
        <button
          type="button"
          onClick={() => setMode("foto")}
          className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${
            mode === "foto" ? "bg-navy text-ivory" : "bg-ivory/80 text-navy"
          }`}
        >
          Pieza real 3D
        </button>
        <button
          type="button"
          onClick={() => setMode("volumen")}
          className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${
            mode === "volumen" ? "bg-navy text-ivory" : "bg-ivory/80 text-navy"
          }`}
        >
          Volumen taller
        </button>
      </div>
      {mode === "foto" && photos.length > 1 && (
        <div className="absolute bottom-12 left-1/2 flex max-w-[90%] -translate-x-1/2 gap-2 overflow-x-auto">
          {photos.slice(0, 6).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setPhotoIndex(i)}
              className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                i === photoIndex ? "border-navy" : "border-ivory/70"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <p className="pointer-events-none absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.16em] text-navy/70">
        Gira · esta foto es la pieza del anuncio
      </p>
    </div>
  );
}
