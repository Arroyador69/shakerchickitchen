"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    setPending(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    if (!res.ok) {
      setError("Acceso no válido.");
      setPending(false);
      return;
    }
    router.push(params.get("next") || "/dashboard");
    router.refresh();
  }

  return (
    <form action={onSubmit} className="mx-auto w-full max-w-md rounded-3xl border border-brass/25 bg-white p-8">
      <p className="text-xs uppercase tracking-[0.28em] text-olive">Taller</p>
      <h1 className="mt-2 font-serif text-4xl">Acceso</h1>
      <p className="mt-2 text-sm text-muted">
        Cliente y estudio. Inventario, producción y leads en un mismo tablero.
      </p>
      <label className="mt-6 grid gap-1 text-sm">
        Email
        <input name="email" type="email" required className="rounded-xl border border-brass/30 bg-ivory px-4 py-3" />
      </label>
      <label className="mt-4 grid gap-1 text-sm">
        Contraseña
        <input name="password" type="password" required className="rounded-xl border border-brass/30 bg-ivory px-4 py-3" />
      </label>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      <button
        disabled={pending}
        className="mt-6 w-full rounded-full bg-navy py-3 text-sm uppercase tracking-[0.16em] text-ivory"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center px-5 py-16">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
