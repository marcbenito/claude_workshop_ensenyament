import { NextResponse } from "next/server";

import { create, findByEmail } from "@/lib/server/users.repo";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const limit = checkRateLimit(`register:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Massa intents. Torna-ho a provar d'aquí una estona." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  const body = await request.json().catch(() => null);

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(body?.password ?? "");

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Falten dades." }, { status: 400 });
  }

  const existing = await findByEmail(email);
  if (existing) {
    return NextResponse.json(
      { error: "Ja existeix un compte amb aquest email." },
      { status: 409 }
    );
  }

  await create({ name, email, password });

  return NextResponse.json({ ok: true }, { status: 201 });
}
