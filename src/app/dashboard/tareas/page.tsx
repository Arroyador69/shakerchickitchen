"use client";

import { useOps } from "@/components/dashboard/useOps";

export default function TareasPage() {
  const { data, patch } = useOps();
  if (!data) return <p>Cargando…</p>;

  async function add(formData: FormData) {
    await patch({
      entity: "task-create",
      title: String(formData.get("title")),
      assignee: String(formData.get("assignee")),
      dueDate: String(formData.get("dueDate")),
    });
  }

  return (
    <div>
      <h1 className="font-serif text-4xl">Tareas del día</h1>
      <form action={add} className="mt-6 flex flex-wrap gap-2">
        <input name="title" required placeholder="Tarea" className="min-w-[220px] flex-1 rounded-xl bg-white/10 px-3 py-2 text-sm" />
        <select name="assignee" className="rounded-xl bg-white/10 px-3 py-2 text-sm">
          <option value="taller">Taller</option>
          <option value="diseno">Diseño</option>
          <option value="admin">Admin</option>
        </select>
        <input name="dueDate" type="date" className="rounded-xl bg-white/10 px-3 py-2 text-sm" />
        <button className="rounded-full bg-brass px-4 py-2 text-xs uppercase tracking-widest text-navy">
          Añadir
        </button>
      </form>
      <ul className="mt-8 space-y-3">
        {data.tasks.map((t) => (
          <li key={t.id} className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3">
            <input
              type="checkbox"
              checked={t.done}
              onChange={(e) => patch({ entity: "task", id: t.id, done: e.target.checked })}
            />
            <div className={t.done ? "text-ivory/40 line-through" : ""}>
              <p>{t.title}</p>
              <p className="text-xs uppercase tracking-widest text-ivory/40">
                {t.assignee}
                {t.dueDate ? ` · ${t.dueDate}` : ""}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
