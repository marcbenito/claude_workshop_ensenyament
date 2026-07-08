import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { authConfig } from "../auth.config";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

const { auth } = NextAuth(authConfig);

/** Endpoint intern de NextAuth on s'envia el formulari de login. */
const LOGIN_ENDPOINT = "/api/auth/callback/credentials";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Limitació de força bruta al login.
  if (req.method === "POST" && pathname === LOGIN_ENDPOINT) {
    const ip = clientIp(req.headers);
    const limit = checkRateLimit(`login:${ip}`);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Massa intents de login. Torna-ho a provar d'aquí una estona." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
      );
    }
    return NextResponse.next();
  }

  // Rutes protegides: redirigeix a /login si no hi ha sessió.
  if (!req.auth) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/reservar/:path*",
    "/api/auth/callback/credentials",
  ],
};
