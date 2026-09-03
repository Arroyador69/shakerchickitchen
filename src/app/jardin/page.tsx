import { ProductGrid } from "@/components/shop/ProductGrid";
import { productsByCategory } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jardín",
  description: "Obeliscos, maceteros Versalles y carpintería de exterior de inspiración inglesa.",
};

export default function JardinPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.28em] text-olive">Exterior</p>
      <h1 className="mt-3 font-serif text-5xl">Jardín de carpintería inglesa</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Obeliscos blancos, cajones Versalles y piezas de orangerie. Madera tratada y laca de exterior,
        fabricadas en el mismo taller que las cocinas.
      </p>
      <div className="mt-10">
        <ProductGrid products={productsByCategory("jardin")} />
      </div>
    </div>
  );
}
