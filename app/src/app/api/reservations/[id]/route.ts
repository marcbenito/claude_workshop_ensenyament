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
  const result = await cancel(userId, id);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status }
    );
  }

  return NextResponse.json({ ok: true });
}
