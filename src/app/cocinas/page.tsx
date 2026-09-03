import Image from "next/image";
import Link from "next/link";
import { KitchenShowroom } from "@/components/scene/KitchenShowroom";
import { LeadForm } from "@/components/forms/LeadForm";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { productsByCategory, portfolio } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cocinas Shaker a medida",
  description:
    "Cocinas Shaker tipo inglés fabricadas en Sevilla. Verde oliva, blanco crema y azul profundo, con mármol y latón.",
};

export default function CocinasPage() {
  const kitchens = productsByCategory("cocinas");

  return (
    <div>
      <section className="grid min-h-[70vh] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 md:px-12">
          <p className="text-xs uppercase tracking-[0.28em] text-olive">Cocinas inglesas</p>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl">Cocinas Shaker a medida</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Puertas enmarcadas, lacados atemporales y herrajes de latón. Diseñamos la cocina alrededor de tu
            casa, no al revés. Fabricación artesanal en Sevilla e instalación en toda España.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/presupuesto" className="rounded-full bg-navy px-6 py-3 text-sm uppercase tracking-[0.16em] text-ivory">
              Pedir proyecto
            </Link>
            <Link href="/cocinas-inglesas" className="rounded-full border border-brass/40 px-6 py-3 text-sm uppercase tracking-[0.16em]">
              Estilo inglés
            </Link>
          </div>
        </div>
        <div className="min-h-[420px]">
          <KitchenShowroom className="h-full min-h-[420px]" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="font-serif text-4xl">Tres acabados que no pasan de moda</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {portfolio.slice(0, 3).map((item) => (
            <article key={item.slug} className="overflow-hidden rounded-3xl border border-brass/20 bg-white">
              <div className="relative h-56">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 line-clamp-4 text-sm text-muted">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16">
          <ProductGrid products={kitchens} />
        </div>
        <div className="mt-16 max-w-xl">
          <LeadForm source="presupuesto" heading="Cuéntanos tu cocina" />
        </div>
      </section>
    </div>
  );
}
