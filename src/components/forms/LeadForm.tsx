"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  source?: "web" | "presupuesto" | "tienda";
  productId?: string;
  heading?: string;
};

export function LeadForm({ source = "web", productId, heading }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(formData: FormData) {
    setStatus("sending");
    const body = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      source,
      productId,
    };
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      setStatus("error");
      return;
    }
    setStatus("ok");
    router.refresh();
  }

  if (status === "ok") {
    return (
      <div className="rounded-3xl border border-brass/30 bg-white p-8">
        <p className="font-serif text-3xl">Recibido.</p>
        <p className="mt-3 text-muted">
          Te escribimos en menos de 24 h laborables con una primera orientación de presupuesto.
        </p>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="rounded-3xl border border-brass/25 bg-white p-6 shadow-sm md:p-8">
      {heading && <h3 className="font-serif text-3xl">{heading}</h3>}
      <div className="mt-6 grid gap-4">
        <label className="grid gap-1 text-sm">
          Nombre
          <input required name="name" className="rounded-xl border border-brass/30 bg-ivory px-4 py-3 outline-none focus:border-olive" />
        </label>
        <label className="grid gap-1 text-sm">
          Email
          <input required type="email" name="email" className="rounded-xl border border-brass/30 bg-ivory px-4 py-3 outline-none focus:border-olive" />
        </label>
        <label className="grid gap-1 text-sm">
          Teléfono
          <input name="phone" className="rounded-xl border border-brass/30 bg-ivory px-4 py-3 outline-none focus:border-olive" />
        </label>
        <label className="grid gap-1 text-sm">
          Mensaje
          <textarea
            required
            name="message"
            rows={4}
            className="rounded-xl border border-brass/30 bg-ivory px-4 py-3 outline-none focus:border-olive"
            placeholder="Metros, estilo (crema, oliva, azul), ciudad…"
          />
        </label>
        <button
          disabled={status === "sending"}
          className="rounded-full bg-navy px-6 py-3 text-sm uppercase tracking-[0.16em] text-ivory disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Enviar"}
        </button>
        {status === "error" && (
          <p className="text-sm text-red-700">No se ha podido enviar. Prueba WhatsApp o el teléfono.</p>
        )}
        <p className="text-xs text-muted">
          Al enviar aceptas que usemos tus datos solo para responder a este presupuesto.
        </p>
      </div>
    </form>
  );
}
