"use client";

import { useOps } from "@/components/dashboard/useOps";
import { formatEUR } from "@/lib/utils";
import type { QuoteStatus } from "@/lib/types";

const statuses: QuoteStatus[] = ["borrador", "enviado", "aceptado", "rechazado"];

export default function QuotesPage() {
  const { data, patch } = useOps();
  if (!data) return <p>Cargando…</p>;

  async function create(formData: FormData) {
    await patch({
      entity: "quote-create",
      clientName: String(formData.get("clientName")),
      email: String(formData.get("email")),
      items: [
        {
          description: String(formData.get("description")),
          qty: Number(formData.get("qty") || 1),
          price: Number(formData.get("price") || 0),
        },
      ],
    });
  }

  return (
    <div>
      <h1 className="font-serif text-4xl">Presupuestos</h1>
      <form action={create} className="mt-6 grid gap-2 md:grid-cols-5">
        <input name="clientName" required placeholder="Cliente" className="rounded-xl bg-white/10 px-3 py-2 text-sm" />
        <input name="email" type="email" required placeholder="Email" className="rounded-xl bg-white/10 px-3 py-2 text-sm" />
        <input name="description" required placeholder="Partida" className="rounded-xl bg-white/10 px-3 py-2 text-sm md:col-span-1" />
        <input name="qty" type="number" defaultValue={1} className="rounded-xl bg-white/10 px-3 py-2 text-sm" />
        <input name="price" type="number" placeholder="Importe" className="rounded-xl bg-white/10 px-3 py-2 text-sm" />
        <button className="rounded-full bg-brass px-4 py-2 text-xs uppercase tracking-widest text-navy md:col-span-5">
          Crear borrador
        </button>
      </form>
      <div className="mt-8 space-y-4">
        {data.quotes.map((q) => (
          <article key={q.id} className="rounded-2xl border border-white/10 p-5">
            <div className="flex justify-between gap-4">
              <div>
                <p className="text-xs text-ivory/40">{q.id}</p>
                <p className="font-serif text-2xl">{q.clientName}</p>
                <p className="text-sm text-ivory/50">{q.email}</p>
              </div>
              <div className="text-right">
                <p className="font-serif text-3xl">{formatEUR(q.total)}</p>
                <select
                  value={q.status}
                  className="mt-2 rounded bg-white/10 px-2 py-1 text-sm"
                  onChange={(e) => patch({ entity: "quote", id: q.id, status: e.target.value })}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <ul className="mt-4 text-sm text-ivory/70">
              {q.items.map((i, idx) => (
                <li key={idx}>
                  {i.qty} × {i.description} · {formatEUR(i.price)}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
