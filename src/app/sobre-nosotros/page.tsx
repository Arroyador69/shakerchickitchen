import { brand } from "@/lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Quiénes somos: taller de cocinas Shaker y carpintería a medida en Sevilla.",
};

export default function SobreNosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.28em] text-olive">El taller</p>
      <h1 className="mt-3 font-serif text-5xl">Sobre Shaker Chic Kitchen</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
        <p>
          En Shaker Chic Kitchen diseñamos y fabricamos cocinas Shaker a medida combinando tradición
          artesanal y diseño contemporáneo. Desde nuestro taller en Sevilla desarrollamos proyectos
          personalizados en toda España, cuidando cada detalle para crear espacios elegantes y duraderos.
        </p>
        <p>
          No somos un montador de módulos. Cada puerta se lacora aquí, cada medida se toma en casa del
          cliente, cada tirador de latón se elige como se elige un reloj. El resultado debe durar décadas
          y seguir pareciendo inevitable.
        </p>
        <p>
          {brand.location}. Trabajamos con vivienda particular, hostelería y retail.
        </p>
      </div>
    </div>
  );
}
