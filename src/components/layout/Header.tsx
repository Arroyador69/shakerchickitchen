"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { nav } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const overHero = pathname === "/";
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-brass/20 backdrop-blur-md",
        overHero ? "bg-ivory/70" : "bg-ivory/92",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-brass bg-navy font-serif text-lg text-brass">
            SC
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-xl tracking-tight">Shaker Chic</span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-muted">
              Kitchen · Sevilla
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[13px] uppercase tracking-[0.16em] transition hover:text-olive",
                pathname === item.href ? "text-olive" : "text-ink/75",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/presupuesto"
            className="hidden rounded-full bg-navy px-4 py-2 text-xs uppercase tracking-[0.16em] text-ivory md:inline-flex"
          >
            Presupuesto
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-brass/40 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-brass/20 bg-ivory px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-serif text-2xl"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setOpen(false)} className="text-sm text-muted">
              Acceso taller
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
