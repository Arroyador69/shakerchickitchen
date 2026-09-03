"use client";

import { useMemo, useState } from "react";
import { useOps } from "@/components/dashboard/useOps";
import { products } from "@/lib/products";
import { formatEUR } from "@/lib/utils";
import type { InventoryStatus } from "@/lib/types";

const statuses: InventoryStatus[] = ["disponible", "bajo_pedido", "en_produccion", "agotado"];

export default function InventarioPage() {
  const { data, patch } = useOps();
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    if (!data) return [];
    return data.inventory
      .map((item) => ({ item, product: products.find((p) => p.id === item.productId)! }))
      .filter((r) => r.product)
      .filter((r) => r.product.name.toLowerCase().includes(q.toLowerCase()) || r.product.sku.toLowerCase().includes(q.toLowerCase()));
  }, [data, q]);

  if (!data) return <p>Cargando…</p>;

  return (
    <div>
      <h1 className="font-serif text-4xl">Inventario</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar SKU o nombre"
        className="mt-4 w-full max-w-md rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm"
      />
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-ivory/40">
            <tr>
              <th className="py-2">SKU</th>
              <th>Pieza</th>
              <th>Stock</th>
              <th>Reserva</th>
              <th>Estado</th>
              <th>PVP</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ item, product }) => (
              <tr key={item.productId} className="border-t border-white/10">
                <td className="py-3 text-ivory/50">{product.sku}</td>
                <td className="pr-4">{product.name}</td>
                <td>
                  <input
                    type="number"
                    defaultValue={item.stock}
                    className="w-16 rounded bg-white/10 px-2 py-1"
                    onBlur={(e) =>
                      patch({
                        entity: "inventory",
                        productId: item.productId,
                        data: { stock: Number(e.target.value) },
                      })
                    }
                  />
                </td>
                <td>{item.reserved}</td>
                <td>
                  <select
                    defaultValue={item.status}
                    className="rounded bg-white/10 px-2 py-1"
                    onChange={(e) =>
                      patch({
                        entity: "inventory",
                        productId: item.productId,
                        data: { status: e.target.value },
                      })
                    }
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{formatEUR(product.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
