import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { ProductViewer } from "@/components/scene/ProductViewer";
import { categoryLabel, getProduct, products } from "@/lib/products";
import { formatEUR, whatsappLink } from "@/lib/utils";
import type { Metadata } from "next";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.short };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <p className="text-xs uppercase tracking-[0.22em] text-olive">
        {categoryLabel[product.category]} · {product.sku}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <ProductViewer product={product} />
        </div>
        <div>
          <h1 className="font-serif text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-2xl text-olive">
            {product.madeToMeasure ? "Desde " : ""}
            {formatEUR(product.price)}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted">{product.description}</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>Materiales: {product.materials.join(", ")}</li>
            <li>Plazo orientativo: {product.leadTimeDays} días</li>
            <li>{product.madeToMeasure ? "Fabricación a medida en Sevilla" : "Stock de taller"}</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(`Hola, me interesa ${product.name} (${formatEUR(product.price)}).`)}
              className="rounded-full bg-[#25D366] px-6 py-3 text-sm uppercase tracking-[0.14em] text-white"
            >
              Pedir por WhatsApp
            </a>
            <Link
              href="/presupuesto"
              className="rounded-full bg-navy px-6 py-3 text-sm uppercase tracking-[0.14em] text-ivory"
            >
              Presupuesto a medida
            </Link>
          </div>
          <div className="mt-10">
            <LeadForm
              source="tienda"
              productId={product.id}
              heading="¿La quieres a tu medida?"
            />
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-3xl">También del taller</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((p) => (
              <Link key={p.id} href={`/tienda/${p.slug}`} className="rounded-2xl border border-brass/20 p-4">
                <p className="font-serif text-xl">{p.name}</p>
                <p className="mt-1 text-sm text-olive">{formatEUR(p.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
