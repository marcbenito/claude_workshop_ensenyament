import { NextResponse } from "next/server";

import { create, listByUser } from "@/lib/server/reservations.repo";

import { auth } from "../../../../auth";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "No autenticat." }, { status: 401 });
  }

  return NextResponse.json(await listByUser(userId));
}

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "No autenticat." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const professorId = String(body?.professorId ?? "").trim();
  const date = String(body?.date ?? "").trim();
  const time = String(body?.time ?? "").trim();

  if (!professorId || !date || !time) {
    return NextResponse.json({ error: "Falten dades." }, { status: 400 });
  }

  const result = await create({ userId, professorId, date, time });
  if (!result.ok) {
    // "Franja horària no vàlida." -> 400; conflictes (usuari/professor) -> 409.
    const status = result.error.includes("no vàlida") ? 400 : 409;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json(result.reservation, { status: 201 });
}
