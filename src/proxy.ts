import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSessionFromToken, SESSION_COOKIE } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDashboard = pathname.startsWith("/dashboard");
  const isOpsApi = pathname.startsWith("/api/ops");
  if (!isDashboard && !isOpsApi) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await readSessionFromToken(token);
  if (!session) {
    if (isOpsApi) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/ops/:path*"],
};
