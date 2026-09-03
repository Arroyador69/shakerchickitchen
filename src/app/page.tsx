import Link from "next/link";
import Image from "next/image";
import { KitchenShowroom } from "@/components/scene/KitchenShowroom";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { brand, testimonials } from "@/lib/brand";
import { categories, featuredProducts, portfolio } from "@/lib/products";

export default function HomePage() {
  const featured = featuredProducts().slice(0, 6);

  return (
    <div>
      <JsonLd />
      <section className="relative grid min-h-[88vh] overflow-hidden lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10 flex flex-col justify-end px-6 py-16 md:px-12 lg:py-24">
          <p className="text-xs uppercase tracking-[0.32em] text-olive">Sevilla · Inglaterra · A medida</p>
          <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[0.95] text-ink md:text-7xl">
            {brand.tagline}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Diseño y fabricación artesanal en Sevilla. Creamos cocinas Shaker tipo inglés y carpintería a
            medida para hogares y negocios en toda España.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/presupuesto"
              className="rounded-full bg-navy px-6 py-3 text-sm uppercase tracking-[0.16em] text-ivory"
            >
              Solicitar presupuesto
            </Link>
            <Link
              href="/tienda"
              className="rounded-full border border-brass/50 px-6 py-3 text-sm uppercase tracking-[0.16em]"
            >
              Ver tienda
            </Link>
          </div>
        </div>
        <div className="relative min-h-[420px] lg:min-h-[88vh]">
          <KitchenShowroom className="absolute inset-0" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-olive">El taller</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">
            Diseño y fabricación de cocinas Shaker a medida
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Creamos cocinas Shaker tipo inglés que combinan elegancia, funcionalidad y durabilidad. Desde
            nuestro taller en Sevilla desarrollamos proyectos personalizados para clientes en toda España,
            cuidando cada detalle para lograr espacios únicos.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="rounded-3xl border border-brass/20 bg-white p-6 transition hover:border-olive/40"
            >
              <p className="font-serif text-2xl">{c.name}</p>
              <p className="mt-2 text-sm text-muted">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-navy py-20 text-ivory">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-brass">Portfolio</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">Cocinas que permanecen</h2>
            </div>
            <Link href="/proyectos" className="hidden text-sm uppercase tracking-[0.16em] text-brass md:block">
              Ver proyectos
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {portfolio.map((item) => (
              <article key={item.slug} className="overflow-hidden rounded-3xl bg-white/5">
                <div className="relative h-72">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-3xl">{item.title}</h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-ivory/75">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-olive">Tienda</p>
            <h2 className="mt-3 font-serif text-4xl">Piezas del taller</h2>
          </div>
          <Link href="/tienda" className="text-sm uppercase tracking-[0.16em] text-olive">
            Ver catálogo
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="border-y border-brass/20 bg-paper py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.author} className="rounded-3xl bg-white p-8">
              <p className="font-serif text-2xl leading-snug">“{t.quote}”</p>
              <footer className="mt-6 text-sm uppercase tracking-[0.16em] text-olive">
                — {t.author}, {t.city}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-olive">Sobre Shaker Chic Kitchen</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Taller en Sevilla, obra en toda España</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            En Shaker Chic Kitchen diseñamos y fabricamos cocinas Shaker a medida combinando tradición
            artesanal y diseño contemporáneo. Desde nuestro taller en Sevilla desarrollamos proyectos
            personalizados en toda España, cuidando cada detalle para crear espacios elegantes y duraderos.
          </p>
          <Link
            href="/sobre-nosotros"
            className="mt-8 inline-flex rounded-full border border-brass/50 px-6 py-3 text-sm uppercase tracking-[0.16em]"
          >
            Conocer el taller
          </Link>
        </div>
        <LeadForm source="web" heading="Solicita tu presupuesto sin compromiso" />
      </section>
    </div>
  );
}
