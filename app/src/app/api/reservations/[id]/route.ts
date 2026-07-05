import { NextResponse } from "next/server";

import { cancel } from "@/lib/server/reservations.repo";

import { auth } from "../../../../../auth";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "No autenticat." }, { status: 401 });
  }

  const { id } = await params;
  const done = await cancel(userId, id);
  if (!done) {
    return NextResponse.json({ error: "Reserva no trobada." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
