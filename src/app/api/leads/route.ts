import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { patchOps } from "@/lib/ops";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
  source: z.enum(["web", "whatsapp", "presupuesto", "tienda"]).optional(),
  productId: z.string().optional(),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisa los campos" }, { status: 400 });
  }
  const lead = {
    id: nanoid(8),
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    message: parsed.data.message,
    source: parsed.data.source ?? "web",
    status: "nuevo" as const,
    productId: parsed.data.productId,
    createdAt: new Date().toISOString(),
  };
  patchOps((ops) => {
    ops.leads.unshift(lead);
  });
  return NextResponse.json({ ok: true, id: lead.id });
}
