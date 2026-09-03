import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getOps, patchOps } from "@/lib/ops";
import type { JobStage, LeadStatus, QuoteStatus } from "@/lib/types";

export async function GET() {
  return NextResponse.json(getOps());
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.entity) {
    return NextResponse.json({ error: "Falta entidad" }, { status: 400 });
  }

  const next = patchOps((ops) => {
    if (body.entity === "inventory") {
      const item = ops.inventory.find((i) => i.productId === body.productId);
      if (item) Object.assign(item, body.data);
    }
    if (body.entity === "job") {
      const job = ops.jobs.find((j) => j.id === body.id);
      if (job && body.stage) job.stage = body.stage as JobStage;
      if (job && body.data) Object.assign(job, body.data);
    }
    if (body.entity === "job-create") {
      ops.jobs.unshift({
        id: nanoid(8),
        title: body.title,
        clientName: body.clientName,
        stage: "nuevo",
        dueDate: body.dueDate || new Date().toISOString().slice(0, 10),
        priority: body.priority || "media",
        notes: body.notes || "",
        productId: body.productId,
      });
    }
    if (body.entity === "lead") {
      const lead = ops.leads.find((l) => l.id === body.id);
      if (lead && body.status) lead.status = body.status as LeadStatus;
    }
    if (body.entity === "task") {
      const task = ops.tasks.find((t) => t.id === body.id);
      if (task) task.done = Boolean(body.done);
    }
    if (body.entity === "task-create") {
      ops.tasks.unshift({
        id: nanoid(8),
        title: body.title,
        done: false,
        assignee: body.assignee || "taller",
        dueDate: body.dueDate,
      });
    }
    if (body.entity === "material") {
      const mat = ops.materials.find((m) => m.id === body.id);
      if (mat && typeof body.stock === "number") mat.stock = body.stock;
    }
    if (body.entity === "quote") {
      const q = ops.quotes.find((x) => x.id === body.id);
      if (q && body.status) q.status = body.status as QuoteStatus;
    }
    if (body.entity === "quote-create") {
      const items = body.items || [];
      const total = items.reduce(
        (acc: number, i: { qty: number; price: number }) => acc + i.qty * i.price,
        0,
      );
      ops.quotes.unshift({
        id: `SC-Q-${nanoid(4).toUpperCase()}`,
        clientName: body.clientName,
        email: body.email,
        items,
        status: "borrador",
        total,
        createdAt: new Date().toISOString(),
      });
    }
  });

  return NextResponse.json(next);
}
