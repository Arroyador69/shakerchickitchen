import { LeadForm } from "@/components/forms/LeadForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presupuesto gratis",
  description: "Solicita presupuesto sin compromiso de cocina Shaker o carpintería a medida.",
};

export default function PresupuestoPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-olive">Sin compromiso</p>
        <h1 className="mt-3 font-serif text-5xl">Solicita tu presupuesto gratis</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Cuéntanos metros, estilo (crema, oliva o azul profundo), ciudad y si hay encimera o instalación.
          Respondemos con una primera cifra y los siguientes pasos del taller.
        </p>
        <ol className="mt-8 space-y-4 text-sm">
          <li>01 · Brief y fotos del espacio</li>
          <li>02 · Propuesta y acabados</li>
          <li>03 · Fabricación en Sevilla</li>
          <li>04 · Instalación en tu casa</li>
        </ol>
      </div>
      <LeadForm source="presupuesto" heading="Empieza aquí" />
    </div>
  );
}
