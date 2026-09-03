import { NextResponse } from "next/server";
import { createSession, findUser, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "");
  const password = String(body?.password || "");
  const user = findUser(email, password);
  if (!user) {
    return NextResponse.json({ error: "Credenciales no válidas" }, { status: 401 });
  }
  const token = await createSession(user);
  await setSessionCookie(token);
  return NextResponse.json({ ok: true, user });
}
