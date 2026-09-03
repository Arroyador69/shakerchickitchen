"use client";

import Link from "next/link";
import { useOps } from "@/components/dashboard/useOps";
import { products } from "@/lib/products";
import { formatEUR } from "@/lib/utils";

export default function DashboardHome() {
  const { data, loading } = useOps();
  if (loading || !data) return <p className="text-ivory/60">Cargando taller…</p>;

  const catalogValue = products.reduce((acc, p) => acc + (p.price || 0), 0);
  const openJobs = data.jobs.filter((j) => j.stage !== "entregado").length;
  const newLeads = data.leads.filter((l) => l.status === "nuevo").length;
  const openTasks = data.tasks.filter((t) => !t.done).length;
  const lowMaterials = data.materials.filter((m) => m.stock <= m.minStock);

  return (
    <div>
      <h1 className="font-serif text-4xl">Resumen del taller</h1>
      <p className="mt-2 text-ivory/60">Inventario, producción y comercial en un vistazo.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Valor catálogo", formatEUR(catalogValue)],
          ["Órdenes abiertas", String(openJobs)],
          ["Leads nuevos", String(newLeads)],
          ["Tareas pendientes", String(openTasks)],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-brass">{k}</p>
            <p className="mt-2 font-serif text-3xl">{v}</p>
          </div>
        ))}
      </div>
      {lowMaterials.length > 0 && (
        <div className="mt-8 rounded-2xl border border-brass/30 bg-brass/10 p-5">
          <p className="text-sm uppercase tracking-[0.16em] text-brass">Reponer materiales</p>
          <ul className="mt-3 space-y-1 text-sm">
            {lowMaterials.map((m) => (
              <li key={m.id}>
                {m.name}: {m.stock} {m.unit} (mín. {m.minStock})
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 p-5">
          <div className="flex justify-between">
            <h2 className="font-serif text-2xl">Producción</h2>
            <Link href="/dashboard/produccion" className="text-xs uppercase tracking-widest text-brass">
              Ver tablero
            </Link>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {data.jobs.slice(0, 4).map((j) => (
              <li key={j.id} className="flex justify-between gap-4">
                <span>{j.title}</span>
                <span className="text-ivory/50">{j.stage}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 p-5">
          <div className="flex justify-between">
            <h2 className="font-serif text-2xl">Bandeja de leads</h2>
            <Link href="/dashboard/leads" className="text-xs uppercase tracking-widest text-brass">
              Abrir
            </Link>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {data.leads.slice(0, 4).map((l) => (
              <li key={l.id}>
                <p>{l.name}</p>
                <p className="text-ivory/50">{l.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
