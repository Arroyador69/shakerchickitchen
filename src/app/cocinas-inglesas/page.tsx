import { KitchenShowroom } from "@/components/scene/KitchenShowroom";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cocinas inglesas",
  description: "El estilo Shaker británico interpretado desde un taller de Sevilla.",
};

export default function CocinasInglesasPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.28em] text-olive">Cocinas inglesas</p>
      <h1 className="mt-3 font-serif text-5xl">La cocina inglesa, sin copiar un catálogo</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        El Shaker inglés no es una moda: es un sistema de puertas, proporciones y herrajes. En el taller
        traducimos ese lenguaje a viviendas españolas — luz del sur, mármol, latón y madera — sin perder
        la calma de una cocina de campo británica.
      </p>
      <div className="mt-10 h-[520px] overflow-hidden rounded-3xl">
        <KitchenShowroom className="h-full" />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          ["Puerta enmarcada", "Marco, panel hundido y sombra. El detalle que distingue un Shaker de un plano lacado."],
          ["Latón que envejece", "Tiradores y grifería que ganan pátina. Nada de cromo frío."],
          ["Hecho al hueco", "Cada módulo nace de la medida real de tu pared, no de un grid de 60 cm."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-3xl border border-brass/20 bg-white p-6">
            <h2 className="font-serif text-2xl">{t}</h2>
            <p className="mt-2 text-sm text-muted">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
