import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { categoryLabel } from "@/lib/products";
import { formatEUR } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/tienda/${product.slug}`}
      className="group overflow-hidden rounded-3xl border border-brass/20 bg-white shadow-[0_20px_50px_-32px_rgba(26,22,18,0.45)] transition hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-marble">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-navy">
          {categoryLabel[product.category]}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-2xl leading-tight">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{product.short}</p>
        <div className="mt-4 flex items-end justify-between">
          <p className="text-sm uppercase tracking-[0.14em] text-olive">
            {product.madeToMeasure ? "Desde " : ""}
            {formatEUR(product.price)}
          </p>
          <span className="text-xs text-brass-deep">{product.leadTimeDays} días</span>
        </div>
      </div>
    </Link>
  );
}
