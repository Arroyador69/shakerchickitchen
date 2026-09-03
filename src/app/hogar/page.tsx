import { ProductGrid } from "@/components/shop/ProductGrid";
import { productsByCategory } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hogar",
  description: "Recibidores, mudrooms, puertas y mobiliario artesanal Shaker Chic.",
};

export default function HogarPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.28em] text-olive">Interior</p>
      <h1 className="mt-3 font-serif text-5xl">Hogar a medida</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        El lenguaje Shaker no se queda en la cocina: mudrooms, percheros ingleses, bancos de hall y
        puertas clásicas. El mismo lacado, el mismo latón, el mismo taller.
      </p>
      <div className="mt-10">
        <ProductGrid products={productsByCategory("hogar")} />
      </div>
    </div>
  );
}
