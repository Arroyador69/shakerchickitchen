"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { finishes, type FinishId } from "@/lib/brand";
import { cn } from "@/lib/utils";

const KitchenScene = dynamic(
  () => import("./KitchenScene").then((m) => m.KitchenScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-marble">
        <p className="font-serif text-2xl text-olive">Montando el taller…</p>
      </div>
    ),
  },
);

export function KitchenShowroom({ className }: { className?: string }) {
  const [finish, setFinish] = useState<FinishId>("oliva");
  const current = finishes.find((f) => f.id === finish)!;

  return (
    <div className={cn("relative overflow-hidden bg-marble", className)}>
      <KitchenScene finish={finish} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ivory/90 to-transparent" />
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-brass/40 bg-ivory/85 px-3 py-2 backdrop-blur-md">
        {finishes.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFinish(f.id)}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs tracking-wide uppercase transition",
              finish === f.id ? "bg-navy text-ivory" : "text-ink/70 hover:text-ink",
            )}
          >
            <span
              className="h-3.5 w-3.5 rounded-full border border-black/10"
              style={{ background: f.color }}
            />
            {f.label}
          </button>
        ))}
      </div>
      <p className="absolute left-6 top-6 font-serif text-lg text-ink/70">{current.label}</p>
    </div>
  );
}
