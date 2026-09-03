"use client";

import type { Product } from "@/lib/types";

const brass = "#c4a574";
const marble = "#f2eee8";
const cream = "#EDE4D4";
const navy = "#2C3A56";
const olive = "#6A7349";
const wood = "#8A6A45";

function Mat({ color, metal = 0.05, rough = 0.45 }: { color: string; metal?: number; rough?: number }) {
  return <meshStandardMaterial color={color} metalness={metal} roughness={rough} />;
}

function Box({
  pos,
  size,
  color,
  metal,
  rough,
}: {
  pos: [number, number, number];
  size: [number, number, number];
  color: string;
  metal?: number;
  rough?: number;
}) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <Mat color={color} metal={metal} rough={rough} />
    </mesh>
  );
}

function Handle({ pos }: { pos: [number, number, number] }) {
  return (
    <mesh position={pos} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <capsuleGeometry args={[0.012, 0.07, 4, 8]} />
      <Mat color={brass} metal={0.9} rough={0.22} />
    </mesh>
  );
}

function ShakerCab({
  pos,
  w = 0.55,
  h = 0.7,
  d = 0.42,
  color = cream,
}: {
  pos: [number, number, number];
  w?: number;
  h?: number;
  d?: number;
  color?: string;
}) {
  return (
    <group position={pos}>
      <Box pos={[0, h / 2, 0]} size={[w, h, d]} color={color} />
      <Box pos={[0, h / 2, d / 2 + 0.01]} size={[w - 0.08, h - 0.1, 0.02]} color={color} rough={0.55} />
      <Handle pos={[w * 0.28, h / 2, d / 2 + 0.04]} />
    </group>
  );
}

function KitchenModel() {
  return (
    <group>
      <ShakerCab pos={[-0.7, 0, -0.2]} color={navy} />
      <ShakerCab pos={[-0.12, 0, -0.2]} color={navy} />
      <ShakerCab pos={[0.46, 0, -0.2]} color={cream} />
      <Box pos={[-0.12, 0.74, -0.18]} size={[1.85, 0.05, 0.5]} color={marble} rough={0.18} metal={0.12} />
      <ShakerCab pos={[-0.7, 1.05, -0.28]} w={0.55} h={0.5} d={0.3} color={cream} />
      <ShakerCab pos={[0.46, 1.05, -0.28]} w={0.55} h={0.5} d={0.3} color={cream} />
      <Box pos={[0.15, 0, 0.45]} size={[0.9, 0.72, 0.55]} color={olive} />
      <Box pos={[0.15, 0.76, 0.45]} size={[0.98, 0.05, 0.62]} color={marble} rough={0.18} />
    </group>
  );
}

function BarModel({ color = navy }: { color?: string }) {
  return (
    <group>
      <Box pos={[0, 0.38, 0]} size={[1.7, 0.76, 0.55]} color={color} />
      <Box pos={[0, 0.38, 0.02]} size={[1.5, 0.58, 0.04]} color={color} rough={0.55} />
      <Box pos={[0, 0.78, 0]} size={[1.82, 0.06, 0.64]} color={wood} />
      <Handle pos={[0.55, 0.45, 0.3]} />
    </group>
  );
}

function IslandModel() {
  return (
    <group>
      <Box pos={[0, 0.4, 0]} size={[1.4, 0.8, 0.9]} color={cream} />
      <Box pos={[0, 0.82, 0]} size={[1.5, 0.06, 1]} color="#e07a3d" />
      <Box pos={[0.35, 0.45, 0.48]} size={[0.55, 0.45, 0.08]} color="#88cde8" metal={0.2} rough={0.15} />
    </group>
  );
}

function EventBar() {
  return (
    <group>
      <Box pos={[0, 0.35, 0]} size={[1.8, 0.7, 0.45]} color={cream} />
      <Box pos={[0, 0.72, 0]} size={[1.9, 0.05, 0.52]} color={wood} />
      <Box pos={[-0.7, 0.95, 0]} size={[0.08, 0.5, 0.08]} color={wood} />
      <Box pos={[0.7, 0.95, 0]} size={[0.08, 0.5, 0.08]} color={wood} />
      <Box pos={[0, 1.22, 0]} size={[1.55, 0.05, 0.12]} color={wood} />
    </group>
  );
}

function HighBar() {
  return (
    <group>
      <Box pos={[0, 0.55, 0]} size={[1.5, 1.1, 0.42]} color={navy} />
      <Box pos={[0, 1.12, 0]} size={[1.62, 0.05, 0.5]} color={wood} />
      <Handle pos={[0.5, 0.7, 0.24]} />
    </group>
  );
}

function Pastry() {
  return (
    <group>
      <Box pos={[0, 0.35, 0]} size={[1.1, 0.7, 0.5]} color={cream} />
      {[0.15, 0.35, 0.55].map((y) => (
        <Box key={y} pos={[0, 0.85 + y, 0]} size={[1.05, 0.03, 0.42]} color={wood} />
      ))}
      <Box pos={[-0.5, 1.15, 0]} size={[0.04, 0.85, 0.42]} color={cream} />
      <Box pos={[0.5, 1.15, 0]} size={[0.04, 0.85, 0.42]} color={cream} />
    </group>
  );
}

function TreeShelf() {
  return (
    <group>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 1.4, 8]} />
        <Mat color={wood} />
      </mesh>
      {[0.35, 0.65, 0.95].map((y, i) => (
        <Box key={y} pos={[i % 2 ? 0.22 : -0.22, y, 0]} size={[0.45, 0.04, 0.22]} color={wood} />
      ))}
    </group>
  );
}

function CatWall() {
  return (
    <group>
      {[0, 0.35, 0.7, 1.05].map((y, i) => (
        <Box key={y} pos={[i % 2 ? 0.2 : -0.2, y + 0.15, 0]} size={[0.35, 0.06, 0.22]} color={wood} />
      ))}
    </group>
  );
}

function PetHouse() {
  return (
    <group>
      <Box pos={[0, 0.28, 0]} size={[0.7, 0.55, 0.55]} color={cream} />
      <mesh position={[0, 0.62, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[0.52, 0.28, 4]} />
        <Mat color={wood} />
      </mesh>
      <mesh position={[0, 0.22, 0.28]}>
        <circleGeometry args={[0.14, 20]} />
        <Mat color="#1a1612" />
      </mesh>
    </group>
  );
}

function Aero() {
  return (
    <group>
      <Box pos={[0, 0.18, 0]} size={[0.85, 0.12, 0.5]} color={cream} />
      <Box pos={[0, 0.48, -0.05]} size={[0.7, 0.55, 0.4]} color={cream} />
      <mesh position={[0, 0.42, 0.16]}>
        <circleGeometry args={[0.13, 20]} />
        <Mat color="#1a1612" />
      </mesh>
      <mesh position={[-0.22, 0.28, 0.18]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.05, 16]} />
        <Mat color={brass} metal={0.7} />
      </mesh>
      <mesh position={[0.22, 0.28, 0.18]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.05, 16]} />
        <Mat color={brass} metal={0.7} />
      </mesh>
    </group>
  );
}

function CatHouse() {
  return (
    <group>
      <Box pos={[0, 0.35, 0]} size={[0.55, 0.7, 0.5]} color={wood} />
      <Box pos={[0, 0.85, 0]} size={[0.7, 0.12, 0.62]} color={cream} />
      <mesh position={[0, 0.35, 0.26]}>
        <circleGeometry args={[0.12, 18]} />
        <Mat color="#1a1612" />
      </mesh>
    </group>
  );
}

function Obelisk() {
  const white = "#f4f1ea";
  const posts: [number, number][] = [
    [-0.18, -0.18],
    [0.18, -0.18],
    [-0.18, 0.18],
    [0.18, 0.18],
  ];
  return (
    <group>
      {posts.map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.85, z]} castShadow>
          <boxGeometry args={[0.045, 1.7, 0.045]} />
          <Mat color={white} />
        </mesh>
      ))}
      {[0.25, 0.75, 1.25].map((y) => (
        <group key={y}>
          <Box pos={[0, y, 0.18]} size={[0.4, 0.03, 0.03]} color={white} />
          <Box pos={[0, y, -0.18]} size={[0.4, 0.03, 0.03]} color={white} />
          <Box pos={[0.18, y, 0]} size={[0.03, 0.03, 0.4]} color={white} />
          <Box pos={[-0.18, y, 0]} size={[0.03, 0.03, 0.4]} color={white} />
          <mesh position={[0, y + 0.12, 0.18]} rotation={[0, 0, 0.7]}>
            <boxGeometry args={[0.28, 0.015, 0.015]} />
            <Mat color={white} />
          </mesh>
          <mesh position={[0, y - 0.12, 0.18]} rotation={[0, 0, -0.7]}>
            <boxGeometry args={[0.28, 0.015, 0.015]} />
            <Mat color={white} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 1.78, 0]} castShadow>
        <sphereGeometry args={[0.07, 16, 16]} />
        <Mat color={white} />
      </mesh>
    </group>
  );
}

function Versailles() {
  const park = "#3f7a45";
  return (
    <group>
      <Box pos={[0, 0.42, 0]} size={[0.78, 0.72, 0.78]} color={park} />
      {[-0.38, 0.38].flatMap((x) =>
        [-0.38, 0.38].map((z) => (
          <group key={`${x}${z}`}>
            <Box pos={[x, 0.42, z]} size={[0.08, 0.84, 0.08]} color={park} />
            <mesh position={[x, 0.9, z]} castShadow>
              <sphereGeometry args={[0.055, 14, 14]} />
              <Mat color={park} />
            </mesh>
          </group>
        )),
      )}
      <Box pos={[0, 0.22, 0]} size={[0.84, 0.05, 0.84]} color={park} />
      <Box pos={[0, 0.62, 0]} size={[0.84, 0.05, 0.84]} color={park} />
      <mesh position={[0, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.03, 0.45, 10]} />
        <Mat color="#6b4f32" />
      </mesh>
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.22, 18, 18]} />
        <Mat color="#2f5c34" rough={0.8} />
      </mesh>
    </group>
  );
}

function DoorModel() {
  return (
    <group>
      <Box pos={[0, 0.95, 0]} size={[0.72, 1.9, 0.08]} color={wood} />
      <Box pos={[0, 1.35, 0.05]} size={[0.5, 0.55, 0.02]} color={wood} rough={0.6} />
      <Box pos={[0, 0.55, 0.05]} size={[0.5, 0.7, 0.02]} color={wood} rough={0.6} />
      <mesh position={[0.25, 0.95, 0.08]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <Mat color={brass} metal={0.9} />
      </mesh>
    </group>
  );
}

function Mudroom() {
  return (
    <group>
      <Box pos={[0, 0.95, -0.12]} size={[1.7, 1.9, 0.08]} color="#f7f4ee" />
      <Box pos={[-0.68, 0.7, 0.08]} size={[0.32, 1.4, 0.28]} color="#f7f4ee" />
      <Box pos={[0.12, 0.22, 0.12]} size={[1.35, 0.38, 0.38]} color="#f7f4ee" />
      {[-0.35, 0.05, 0.45].map((x) => (
        <Box key={`c${x}`} pos={[x, 0.22, 0.12]} size={[0.28, 0.34, 0.34]} color="#eeeae2" />
      ))}
      <Box pos={[0.12, 0.44, 0.14]} size={[1.38, 0.06, 0.42]} color="#4a3424" />
      <Box pos={[0, 1.88, -0.08]} size={[1.78, 0.07, 0.2]} color="#f7f4ee" />
      {[-0.2, 0.1, 0.4].map((x) => (
        <mesh key={x} position={[x, 1.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.035, 0.01, 8, 14]} />
          <Mat color="#1a1612" metal={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function HallStand() {
  return (
    <group>
      <Box pos={[0, 0.9, 0]} size={[0.55, 1.8, 0.4]} color={wood} />
      <Box pos={[0, 0.2, 0.05]} size={[0.7, 0.4, 0.5]} color={wood} />
      {[-0.12, 0.12].map((x) => (
        <mesh key={x} position={[x, 1.45, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.18, 8]} />
          <Mat color="#333" metal={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Bench() {
  return (
    <group>
      <Box pos={[0, 0.42, 0]} size={[1.4, 0.08, 0.45]} color={wood} />
      <Box pos={[-0.55, 0.2, 0]} size={[0.08, 0.4, 0.4]} color={wood} />
      <Box pos={[0.55, 0.2, 0]} size={[0.08, 0.4, 0.4]} color={wood} />
    </group>
  );
}

function Console() {
  return (
    <group>
      <Box pos={[0, 0.4, 0]} size={[1.2, 0.75, 0.4]} color={cream} />
      <Box pos={[0, 0.8, 0]} size={[1.28, 0.05, 0.46]} color={wood} />
      <Handle pos={[0, 0.45, 0.22]} />
    </group>
  );
}

function Shark() {
  const blue = "#7eb6d4";
  return (
    <group>
      <Box pos={[0, 0.42, 0]} size={[0.72, 0.84, 0.55]} color={blue} />
      <Box pos={[0, 0.68, 0]} size={[0.7, 0.26, 0.54]} color={blue} />
      <Box pos={[0, 0.28, 0.02]} size={[0.58, 0.42, 0.48]} color="#c0392b" />
      {[-0.2, -0.08, 0.04, 0.16].map((x) => (
        <mesh key={`t${x}`} position={[x, 0.5, 0.28]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.045, 0.1, 3]} />
          <Mat color="#f7f7f7" />
        </mesh>
      ))}
      {[-0.2, -0.08, 0.04, 0.16].map((x) => (
        <mesh key={`b${x}`} position={[x, 0.08, 0.28]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.045, 0.1, 3]} />
          <Mat color="#f7f7f7" />
        </mesh>
      ))}
      {[-0.12, 0.12].map((x) => (
        <mesh key={`e${x}`} position={[x, 0.7, 0.28]}>
          <cylinderGeometry args={[0.03, 0.03, 0.04, 10]} />
          <Mat color="#1a1612" />
        </mesh>
      ))}
    </group>
  );
}

function KidsTable() {
  return (
    <group>
      <Box pos={[0, 0.32, 0]} size={[0.9, 0.08, 0.55]} color={cream} />
      {[[-0.35, -0.2], [0.35, -0.2], [-0.35, 0.2], [0.35, 0.2]].map(([x, z]) => (
        <Box key={`${x}${z}`} pos={[x, 0.15, z]} size={[0.07, 0.3, 0.07]} color={wood} />
      ))}
      <Box pos={[-0.7, 0.35, 0]} size={[0.28, 0.45, 0.28]} color={olive} />
    </group>
  );
}

function FoldDesk() {
  return (
    <group>
      <Box pos={[0, 0.7, -0.15]} size={[0.9, 1.1, 0.08]} color={cream} />
      <Box pos={[0, 0.55, 0.2]} size={[0.85, 0.05, 0.55]} color={wood} />
    </group>
  );
}

function Goku() {
  return (
    <group>
      <mesh position={[0, 0.55, 0]} castShadow>
        <torusGeometry args={[0.38, 0.05, 8, 24]} />
        <Mat color={brass} metal={0.4} />
      </mesh>
      <Box pos={[0, 0.55, 0]} size={[0.35, 0.04, 0.18]} color={wood} />
    </group>
  );
}

function Whale() {
  return (
    <group>
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0.4]} castShadow>
        <boxGeometry args={[0.15, 1.1, 0.08]} />
        <Mat color={wood} />
      </mesh>
      <mesh position={[0.25, 0.85, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.15, 0.7, 0.08]} />
        <Mat color={wood} />
      </mesh>
      <Box pos={[-0.15, 0.35, 0]} size={[0.4, 0.04, 0.16]} color={wood} />
      <Box pos={[0.2, 0.7, 0]} size={[0.35, 0.04, 0.16]} color={wood} />
    </group>
  );
}

function Batman() {
  return (
    <group>
      <Box pos={[0, 0.4, 0]} size={[0.7, 0.08, 0.18]} color="#111" />
      <Box pos={[-0.28, 0.52, 0]} size={[0.12, 0.22, 0.08]} color="#111" />
      <Box pos={[0.28, 0.52, 0]} size={[0.12, 0.22, 0.08]} color="#111" />
    </group>
  );
}

function Letter() {
  return (
    <group>
      <Box pos={[0, 0.45, 0]} size={[0.18, 0.9, 0.08]} color={cream} />
      <Box pos={[0.12, 0.82, 0]} size={[0.35, 0.16, 0.08]} color={cream} />
      <Box pos={[0.12, 0.45, 0]} size={[0.28, 0.14, 0.08]} color={cream} />
    </group>
  );
}

function Sign({ color = wood }: { color?: string }) {
  return (
    <group>
      <Box pos={[0, 0.45, 0]} size={[1.15, 0.5, 0.06]} color={color} />
      <Box pos={[0, 0.45, 0.04]} size={[0.9, 0.12, 0.02]} color={brass} metal={0.6} />
    </group>
  );
}

function GeoArt() {
  return (
    <group>
      <Box pos={[0, 0.55, 0]} size={[0.9, 0.9, 0.05]} color={cream} />
      <Box pos={[-0.15, 0.65, 0.04]} size={[0.35, 0.35, 0.05]} color={navy} />
      <Box pos={[0.18, 0.4, 0.04]} size={[0.28, 0.28, 0.05]} color={olive} />
    </group>
  );
}

function PetArt() {
  return (
    <group>
      <Box pos={[0, 0.5, 0]} size={[0.7, 0.7, 0.05]} color={cream} />
      <mesh position={[0, 0.5, 0.04]}>
        <circleGeometry args={[0.18, 16]} />
        <Mat color="#1a1612" />
      </mesh>
    </group>
  );
}

function ShoeRack() {
  return (
    <group>
      <Box pos={[0, 0.7, 0]} size={[0.08, 1.4, 0.35]} color="#111" />
      {[0.2, 0.5, 0.8, 1.1].map((y) => (
        <Box key={y} pos={[0.28, y, 0]} size={[0.55, 0.03, 0.32]} color={cream} />
      ))}
    </group>
  );
}

function Organizer() {
  return (
    <group>
      <Box pos={[0, 0.4, 0]} size={[0.7, 0.08, 0.35]} color={wood} />
      {[-0.22, 0, 0.22].map((x) => (
        <Box key={x} pos={[x, 0.55, 0]} size={[0.18, 0.22, 0.28]} color={cream} />
      ))}
    </group>
  );
}

function PlantShelf() {
  return (
    <group>
      <Box pos={[0, 0.35, 0]} size={[0.9, 0.05, 0.22]} color={wood} />
      <Box pos={[0, 0.7, 0]} size={[0.7, 0.05, 0.22]} color={wood} />
      <mesh position={[-0.2, 0.48, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.12, 12]} />
        <Mat color={olive} />
      </mesh>
    </group>
  );
}

function ArtShelf() {
  return (
    <group>
      <Box pos={[-0.4, 0.6, 0]} size={[0.06, 1.2, 0.28]} color={olive} />
      <Box pos={[0.4, 0.6, 0]} size={[0.06, 1.2, 0.28]} color={olive} />
      {[0.2, 0.55, 0.9].map((y) => (
        <Box key={y} pos={[0, y, 0]} size={[0.85, 0.04, 0.28]} color={wood} />
      ))}
    </group>
  );
}

function GalleryShelf() {
  return (
    <group rotation={[0, 0.2, 0]}>
      <Box pos={[0, 0.55, 0]} size={[0.08, 1.1, 0.08]} color={wood} />
      <Box pos={[0.35, 0.4, 0]} size={[0.55, 0.04, 0.22]} color={wood} />
      <Box pos={[-0.3, 0.75, 0]} size={[0.45, 0.04, 0.22]} color={wood} />
    </group>
  );
}

function IceCream() {
  return (
    <group>
      <Box pos={[0, 0.45, 0]} size={[1.1, 0.9, 0.4]} color={cream} />
      {[-0.28, 0, 0.28].map((x) => (
        <mesh key={x} position={[x, 0.95, 0.05]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <Mat color={x < 0 ? "#f2c1c1" : x > 0 ? "#c1e4f2" : "#f2e4c1"} />
        </mesh>
      ))}
    </group>
  );
}

function FairStand() {
  return (
    <group>
      <Box pos={[0, 0.55, 0]} size={[1.1, 0.08, 0.45]} color={wood} />
      <Box pos={[-0.45, 0.25, 0]} size={[0.08, 0.5, 0.4]} color={wood} />
      <Box pos={[0.45, 0.25, 0]} size={[0.08, 0.5, 0.4]} color={wood} />
      <Box pos={[0, 1.0, -0.18]} size={[1.1, 0.7, 0.06]} color={cream} />
    </group>
  );
}

function RetailStand() {
  return (
    <group>
      {[0.2, 0.5, 0.8].map((y) => (
        <Box key={y} pos={[0, y, 0]} size={[0.9, 0.04, 0.35]} color={cream} />
      ))}
      <Box pos={[-0.42, 0.55, 0]} size={[0.05, 0.85, 0.35]} color={wood} />
      <Box pos={[0.42, 0.55, 0]} size={[0.05, 0.85, 0.35]} color={wood} />
    </group>
  );
}

function CounterModel() {
  return (
    <group>
      <Box pos={[0, 0.5, 0]} size={[1.8, 1, 0.7]} color={navy} />
      <Box pos={[0, 1.02, 0]} size={[1.95, 0.06, 0.82]} color={marble} rough={0.18} />
      <Box pos={[0.2, 0.55, 0.38]} size={[0.7, 0.45, 0.06]} color="#88cde8" metal={0.15} rough={0.12} />
    </group>
  );
}

function TableModel() {
  return (
    <group>
      <Box pos={[0, 0.55, 0]} size={[1.6, 0.07, 0.85]} color={wood} rough={0.5} />
      {[[-0.68, -0.32], [0.68, -0.32], [-0.68, 0.32], [0.68, 0.32]].map(([x, z]) => (
        <Box key={`${x}${z}`} pos={[x, 0.27, z]} size={[0.08, 0.54, 0.08]} color={wood} />
      ))}
    </group>
  );
}

function Alarm() {
  return (
    <group>
      <Box pos={[0, 0.4, 0]} size={[0.45, 0.35, 0.12]} color="#222" />
      <mesh position={[0, 0.4, 0.08]}>
        <circleGeometry args={[0.08, 16]} />
        <Mat color="#c0392b" />
      </mesh>
    </group>
  );
}

export function ProductModel({ product }: { product: Product }) {
  const c = product.color;
  switch (product.mesh) {
    case "kitchen":
      return <KitchenModel />;
    case "bar":
      return <BarModel color={c} />;
    case "island":
      return <IslandModel />;
    case "eventbar":
      return <EventBar />;
    case "highbar":
      return <HighBar />;
    case "pastry":
      return <Pastry />;
    case "navybar":
      return <BarModel color={navy} />;
    case "treeshelf":
      return <TreeShelf />;
    case "catwall":
      return <CatWall />;
    case "pethouse":
      return <PetHouse />;
    case "aero":
      return <Aero />;
    case "cathouse":
      return <CatHouse />;
    case "obelisk":
      return <Obelisk />;
    case "versailles":
      return <Versailles />;
    case "door":
      return <DoorModel />;
    case "mudroom":
      return <Mudroom />;
    case "hallstand":
      return <HallStand />;
    case "bench":
      return <Bench />;
    case "console":
      return <Console />;
    case "shark":
      return <Shark />;
    case "kidstable":
      return <KidsTable />;
    case "folddesk":
      return <FoldDesk />;
    case "goku":
      return <Goku />;
    case "whale":
      return <Whale />;
    case "batman":
      return <Batman />;
    case "letter":
      return <Letter />;
    case "lettersign":
      return <Sign color={wood} />;
    case "woodsign":
      return <Sign color={wood} />;
    case "geoart":
      return <GeoArt />;
    case "petart":
      return <PetArt />;
    case "shoerack":
      return <ShoeRack />;
    case "organizer":
      return <Organizer />;
    case "plantshelf":
      return <PlantShelf />;
    case "artshelf":
      return <ArtShelf />;
    case "galleryshelf":
      return <GalleryShelf />;
    case "icecream":
      return <IceCream />;
    case "fairstand":
      return <FairStand />;
    case "retailstand":
      return <RetailStand />;
    case "counter":
      return <CounterModel />;
    case "table":
      return <TableModel />;
    case "alarm":
      return <Alarm />;
    default:
      return <Box pos={[0, 0.4, 0]} size={[0.8, 0.8, 0.8]} color={c} />;
  }
}
