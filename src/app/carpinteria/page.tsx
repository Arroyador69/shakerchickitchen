import { ProductGrid } from "@/components/shop/ProductGrid";
import { products } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carpintería a medida",
  description: "Carpintería artesanal a medida: hogar, negocio, jardín y piezas únicas.",
};

export default function CarpinteriaPage() {
  const custom = products.filter((p) => p.madeToMeasure).slice(0, 9);
  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.28em] text-olive">Oficio</p>
      <h1 className="mt-3 font-serif text-5xl">Carpintería a medida</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Del hall al jardín, del bar a la habitación infantil. Si se puede dibujar y se puede cortar en
        madera, lo hacemos en el taller.
      </p>
      <div className="mt-10">
        <ProductGrid products={custom} />
      </div>
    </div>
  );
}
