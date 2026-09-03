"use client";

import { useOps } from "@/components/dashboard/useOps";
import type { LeadStatus } from "@/lib/types";

const statuses: LeadStatus[] = ["nuevo", "contactado", "presupuesto", "ganado", "perdido"];

export default function LeadsPage() {
  const { data, patch } = useOps();
  if (!data) return <p>Cargando…</p>;

  return (
    <div>
      <h1 className="font-serif text-4xl">Leads</h1>
      <p className="mt-2 text-ivory/60">Entradas de la web, presupuesto y ficha de producto.</p>
      <div className="mt-6 space-y-4">
        {data.leads.map((lead) => (
          <article key={lead.id} className="rounded-2xl border border-white/10 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium">
                  {lead.name} · {lead.email}
                </p>
                {lead.phone && <p className="text-sm text-ivory/50">{lead.phone}</p>}
              </div>
              <select
                value={lead.status}
                className="rounded bg-white/10 px-2 py-1 text-sm"
                onChange={(e) => patch({ entity: "lead", id: lead.id, status: e.target.value })}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-3 text-sm text-ivory/80">{lead.message}</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-ivory/40">
              {lead.source} · {new Date(lead.createdAt).toLocaleString("es-ES")}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
