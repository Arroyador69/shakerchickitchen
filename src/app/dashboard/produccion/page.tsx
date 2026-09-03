"use client";

import { useOps } from "@/components/dashboard/useOps";
import type { JobStage } from "@/lib/types";

const stages: JobStage[] = [
  "nuevo",
  "diseno",
  "corte",
  "ensamblaje",
  "acabado",
  "instalacion",
  "entregado",
];

const labels: Record<JobStage, string> = {
  nuevo: "Nuevo",
  diseno: "Diseño",
  corte: "Corte",
  ensamblaje: "Ensamblaje",
  acabado: "Acabado",
  instalacion: "Instalación",
  entregado: "Entregado",
};

export default function ProduccionPage() {
  const { data, patch } = useOps();
  if (!data) return <p>Cargando…</p>;

  async function addJob(formData: FormData) {
    await patch({
      entity: "job-create",
      title: String(formData.get("title")),
      clientName: String(formData.get("clientName")),
      dueDate: String(formData.get("dueDate")),
      priority: String(formData.get("priority")),
    });
  }

  return (
    <div>
      <h1 className="font-serif text-4xl">Producción</h1>
      <p className="mt-2 text-ivory/60">Kanban del taller: de diseño a instalación.</p>
      <form action={addJob} className="mt-6 flex flex-wrap gap-2">
        <input name="title" required placeholder="Trabajo" className="rounded-xl bg-white/10 px-3 py-2 text-sm" />
        <input name="clientName" required placeholder="Cliente" className="rounded-xl bg-white/10 px-3 py-2 text-sm" />
        <input name="dueDate" type="date" className="rounded-xl bg-white/10 px-3 py-2 text-sm" />
        <select name="priority" className="rounded-xl bg-white/10 px-3 py-2 text-sm">
          <option value="media">Media</option>
          <option value="alta">Alta</option>
          <option value="baja">Baja</option>
        </select>
        <button className="rounded-full bg-brass px-4 py-2 text-xs uppercase tracking-widest text-navy">
          Añadir
        </button>
      </form>
      <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div key={stage} className="w-64 shrink-0 rounded-2xl bg-white/5 p-3">
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-brass">{labels[stage]}</p>
            <div className="space-y-3">
              {data.jobs
                .filter((j) => j.stage === stage)
                .map((job) => (
                  <article key={job.id} className="rounded-xl border border-white/10 bg-[#1b2030] p-3">
                    <p className="text-sm font-medium">{job.title}</p>
                    <p className="mt-1 text-xs text-ivory/50">
                      {job.clientName} · {job.dueDate}
                    </p>
                    <select
                      value={job.stage}
                      className="mt-2 w-full rounded bg-white/10 px-2 py-1 text-xs"
                      onChange={(e) => patch({ entity: "job", id: job.id, stage: e.target.value })}
                    >
                      {stages.map((s) => (
                        <option key={s} value={s}>
                          {labels[s]}
                        </option>
                      ))}
                    </select>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
