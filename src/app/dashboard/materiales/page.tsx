"use client";

import { useOps } from "@/components/dashboard/useOps";

export default function MaterialesPage() {
  const { data, patch } = useOps();
  if (!data) return <p>Cargando…</p>;

  return (
    <div>
      <h1 className="font-serif text-4xl">Materiales</h1>
      <p className="mt-2 text-ivory/60">Stock de tablero, laca, herrajes y encimeras.</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-ivory/40">
            <tr>
              <th className="py-2">Material</th>
              <th>Familia</th>
              <th>Stock</th>
              <th>Mínimo</th>
            </tr>
          </thead>
          <tbody>
            {data.materials.map((m) => (
              <tr key={m.id} className="border-t border-white/10">
                <td className="py-3">{m.name}</td>
                <td className="text-ivory/50">{m.category}</td>
                <td>
                  <input
                    type="number"
                    defaultValue={m.stock}
                    className="w-20 rounded bg-white/10 px-2 py-1"
                    onBlur={(e) => patch({ entity: "material", id: m.id, stock: Number(e.target.value) })}
                  />{" "}
                  {m.unit}
                </td>
                <td className={m.stock <= m.minStock ? "text-brass" : "text-ivory/50"}>{m.minStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
