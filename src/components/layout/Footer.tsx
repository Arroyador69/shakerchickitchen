"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/lib/brand";
import { categories } from "@/lib/products";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;
  return (
    <footer className="mt-auto border-t border-brass/25 bg-navy text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4">
        <div>
          <p className="font-serif text-3xl">Shaker Chic</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/70">
            {brand.tagline}. Diseño y fabricación artesanal en Sevilla para toda España.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brass">Colecciones</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link href={c.href} className="hover:text-brass">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brass">Taller</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>{brand.location}</li>
            <li>
              <a href={brand.phoneHref}>{brand.phone}</a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
            <li>{brand.hours}</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brass">Estudio</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>
              <Link href="/sobre-nosotros">Sobre nosotros</Link>
            </li>
            <li>
              <Link href="/carpinteria">Carpintería a medida</Link>
            </li>
            <li>
              <Link href="/proyectos">Proyectos</Link>
            </li>
            <li>
              <Link href="/login">Acceso cliente / taller</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-ivory/50">
        © {new Date().getFullYear()} {brand.legalName}. Fabricado en Sevilla.
      </div>
    </footer>
  );
}
