import Image from "next/image";
import { portfolio } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos cocinas shaker",
  description: "Portfolio de cocinas Shaker y carpintería artesanal realizadas en Sevilla.",
};

export default function ProyectosPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.28em] text-olive">Portfolio</p>
      <h1 className="mt-3 font-serif text-5xl">Proyectos de cocinas Shaker</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Una selección del taller. Cada cocina se diseña, lacora e instala como un traje: no hay dos iguales.
      </p>
      <div className="mt-12 space-y-16">
        {portfolio.map((item, i) => (
          <article
            key={item.slug}
            className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div className="relative h-80 overflow-hidden rounded-3xl md:h-[420px]">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-4xl">{item.title}</h2>
              <p className="mt-4 leading-relaxed text-muted">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
