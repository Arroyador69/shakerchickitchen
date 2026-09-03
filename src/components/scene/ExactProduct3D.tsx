"use client";

import { useLayoutEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Product } from "@/lib/types";

const WOOD = "#6b4f32";
const CREAM = "#efe6d6";
const BRASS = "#c4a574";
const FLOOR = "#d8c4a2";

const DEPTH: Record<string, number> = {
  door: 0.09,
  letter: 0.055,
  lettersign: 0.07,
  woodsign: 0.07,
  geoart: 0.055,
  petart: 0.055,
  batman: 0.07,
  goku: 0.08,
  obelisk: 0.2,
  versailles: 0.62,
  kitchen: 0.16,
  bar: 0.4,
  navybar: 0.42,
  highbar: 0.38,
  eventbar: 0.36,
  island: 0.5,
  counter: 0.48,
  mudroom: 0.22,
  hallstand: 0.28,
  console: 0.32,
  bench: 0.28,
  table: 0.22,
  folddesk: 0.16,
  pethouse: 0.42,
  aero: 0.4,
  cathouse: 0.4,
  shark: 0.42,
  kidstable: 0.3,
  pastry: 0.32,
  icecream: 0.3,
  fairstand: 0.28,
  retailstand: 0.26,
  shoerack: 0.22,
  organizer: 0.16,
  plantshelf: 0.12,
  artshelf: 0.16,
  galleryshelf: 0.14,
  treeshelf: 0.14,
  catwall: 0.16,
  whale: 0.12,
  alarm: 0.1,
};

function depthFor(mesh: string) {
  return DEPTH[mesh] ?? 0.18;
}

function useProductTextures(urls: string[]) {
  const textures = useTexture(urls);

  useLayoutEffect(() => {
    const list = Array.isArray(textures) ? textures : [textures];
    for (const t of list) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.needsUpdate = true;
    }
  }, [textures]);

  return Array.isArray(textures) ? textures : [textures];
}

function PhotoPiece({
  front,
  back,
  width,
  height,
  depth,
}: {
  front: THREE.Texture;
  back: THREE.Texture;
  width: number;
  height: number;
  depth: number;
}) {
  const side = useMemo(
    () => new THREE.MeshStandardMaterial({ color: WOOD, roughness: 0.62, metalness: 0.04 }),
    [],
  );
  const top = useMemo(
    () => new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.45, metalness: 0.06 }),
    [],
  );
  const frontMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: front, roughness: 0.28, metalness: 0.02 }),
    [front],
  );
  const backMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: back, roughness: 0.28, metalness: 0.02 }),
    [back],
  );

  return (
    <group>
      <mesh castShadow receiveShadow material={[side, side, top, side, frontMat, backMat]}>
        <boxGeometry args={[width, height, depth]} />
      </mesh>
      <mesh position={[0, 0, depth / 2 + 0.0015]}>
        <planeGeometry args={[width * 0.972, height * 0.972]} />
        <meshStandardMaterial map={front} roughness={0.26} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0, -depth / 2 - 0.0015]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width * 0.972, height * 0.972]} />
        <meshStandardMaterial map={back} roughness={0.26} metalness={0.02} />
      </mesh>
      <mesh position={[0, height / 2 + 0.01, 0]}>
        <boxGeometry args={[width + 0.03, 0.014, depth + 0.024]} />
        <meshStandardMaterial color={BRASS} metalness={0.82} roughness={0.28} />
      </mesh>
      <mesh position={[0, -height / 2 - 0.008, 0]}>
        <boxGeometry args={[width + 0.02, 0.012, depth + 0.02]} />
        <meshStandardMaterial color={BRASS} metalness={0.7} roughness={0.35} />
      </mesh>
    </group>
  );
}

export function ExactProduct3D({
  product,
  photoIndex = 0,
}: {
  product: Product;
  photoIndex?: number;
}) {
  const imgs = product.images?.length ? product.images : [product.image];
  const urls = [imgs[0], imgs[1] ?? imgs[0], imgs[2] ?? imgs[0], imgs[3] ?? imgs[0], imgs[4] ?? imgs[0], imgs[5] ?? imgs[0]];
  const textures = useProductTextures(urls);
  const count = imgs.length;
  const front = textures[photoIndex % Math.min(count, textures.length)] ?? textures[0];
  const back = textures[(photoIndex + 1) % count] ?? front;

  const { width, height, depth } = useMemo(() => {
    const img = front.image as { width?: number; height?: number } | undefined;
    const aspect = img?.width && img?.height ? img.width / img.height : 4 / 3;
    const height = aspect > 1.15 ? 1.08 : aspect < 0.85 ? 1.42 : 1.18;
    const width = height * aspect;
    const maxW = 1.92;
    const scale = width > maxW ? maxW / width : 1;
    return {
      width: width * scale,
      height: height * scale,
      depth: depthFor(product.mesh),
    };
  }, [front, product.mesh]);

  const floorY = -0.7;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, floorY, 0]} receiveShadow>
        <circleGeometry args={[1.4, 48]} />
        <meshStandardMaterial color={FLOOR} roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, floorY + 0.004, 0]}>
        <ringGeometry args={[1.2, 1.32, 48]} />
        <meshStandardMaterial color={BRASS} metalness={0.85} roughness={0.3} />
      </mesh>
      <group position={[0, floorY + height / 2 + 0.02, 0]}>
        <PhotoPiece front={front} back={back} width={width} height={height} depth={depth} />
      </group>
    </group>
  );
}
