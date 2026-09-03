import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { Role, SessionUser } from "./types";

const COOKIE = "sc_session";

function secret() {
  const value = process.env.AUTH_SECRET || "shaker-chic-dev-secret-change-in-prod-32";
  return new TextEncoder().encode(value);
}

const users: Array<SessionUser & { password: string }> = [
  {
    email: (process.env.ADMIN_EMAIL || "alberto@shakerchic.dev").toLowerCase(),
    password: process.env.ADMIN_PASSWORD || "ShakerAdmin2026",
    name: "Alberto · Estudio",
    role: "admin",
  },
  {
    email: (process.env.CLIENT_EMAIL || "info@shakerchickitchen.com").toLowerCase(),
    password: process.env.CLIENT_PASSWORD || "ShakerChic2026",
    name: "Shaker Chic Kitchen",
    role: "client",
  },
];

export function findUser(email: string, password: string) {
  const user = users.find((u) => u.email === email.toLowerCase().trim());
  if (!user || user.password !== password) return null;
  return { email: user.email, name: user.name, role: user.role };
}

export async function createSession(user: SessionUser) {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function readSessionFromToken(token?: string) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (!payload.email || !payload.role) return null;
    return {
      email: String(payload.email),
      name: String(payload.name || ""),
      role: payload.role as Role,
    };
  } catch {
    return null;
  }
}

export async function getSession() {
  const jar = await cookies();
  return readSessionFromToken(jar.get(COOKIE)?.value);
}

export async function setSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export { COOKIE as SESSION_COOKIE };
