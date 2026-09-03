import { LeadForm } from "@/components/forms/LeadForm";
import { brand } from "@/lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Taller Shaker Chic Kitchen en Marqués de Nervión, Sevilla.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-olive">Taller</p>
        <h1 className="mt-3 font-serif text-5xl">Contacto</h1>
        <ul className="mt-8 space-y-4 text-lg">
          <li>{brand.location}</li>
          <li>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </li>
          <li>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </li>
          <li>{brand.hours}</li>
        </ul>
        <iframe
          title="Mapa Shaker Chic"
          className="mt-8 h-64 w-full rounded-3xl border-0"
          loading="lazy"
          src="https://maps.google.com/maps?q=Marqu%C3%A9s%20de%20Nervi%C3%B3n%204%20Sevilla&t=&z=15&ie=UTF8&iwloc=&output=embed"
        />
      </div>
      <LeadForm source="web" heading="Escríbenos" />
    </div>
  );
}
