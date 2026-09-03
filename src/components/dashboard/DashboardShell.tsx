"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Boxes,
  ClipboardList,
  Factory,
  LayoutDashboard,
  LogOut,
  Mail,
  ScrollText,
  CheckSquare,
} from "lucide-react";
import type { SessionUser } from "@/lib/types";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Resumen", icon: LayoutDashboard },
  { href: "/dashboard/inventario", label: "Inventario", icon: Boxes },
  { href: "/dashboard/produccion", label: "Producción", icon: Factory },
  { href: "/dashboard/leads", label: "Leads", icon: Mail },
  { href: "/dashboard/presupuestos", label: "Presupuestos", icon: ScrollText },
  { href: "/dashboard/tareas", label: "Tareas del día", icon: CheckSquare },
  { href: "/dashboard/materiales", label: "Materiales", icon: ClipboardList },
];

export function DashboardShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-[#141821] text-ivory">
      <aside className="hidden w-64 shrink-0 border-r border-white/10 p-5 md:block">
        <Link href="/" className="font-serif text-2xl text-brass">
          Shaker Chic
        </Link>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ivory/50">
          {user.role === "admin" ? "Estudio" : "Taller cliente"}
        </p>
        <nav className="mt-8 grid gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm",
                pathname === l.href ? "bg-white/10 text-brass" : "text-ivory/70 hover:bg-white/5",
              )}
            >
              <l.icon size={16} />
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-10 flex items-center gap-2 px-3 text-sm text-ivory/50 hover:text-ivory"
        >
          <LogOut size={16} />
          Salir
        </button>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex gap-3 overflow-x-auto md:hidden">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="whitespace-nowrap text-xs uppercase tracking-wider text-ivory/70">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="ml-auto text-sm text-ivory/70">{user.name}</p>
        </header>
        <div className="flex-1 overflow-auto p-5 md:p-8">{children}</div>
      </div>
    </div>
  );
}
