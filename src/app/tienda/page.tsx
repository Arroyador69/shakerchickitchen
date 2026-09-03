import Link from "next/link";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { categories, products, productsByCategory } from "@/lib/products";
import type { CategoryId } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Catálogo artesanal Shaker Chic: cocinas, hogar, jardín, hostelería y piezas a medida.",
};

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const active = (categoria as CategoryId | undefined) ?? "all";
  const list = productsByCategory(active === "all" ? undefined : active);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <p className="text-xs uppercase tracking-[0.28em] text-olive">Catálogo</p>
      <h1 className="mt-3 font-serif text-5xl">Tienda del taller</h1>
      <p className="mt-4 max-w-2xl text-muted">
        {products.length} piezas fabricadas en Sevilla. Precios de partida; casi todo se hace a medida.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/tienda"
          className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] ${
            active === "all" ? "bg-navy text-ivory" : "border border-brass/30"
          }`}
        >
          Todo
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/tienda?categoria=${c.id}`}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] ${
              active === c.id ? "bg-navy text-ivory" : "border border-brass/30"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="mt-10">
        <ProductGrid products={list} />
      </div>
    </div>
  );
}
