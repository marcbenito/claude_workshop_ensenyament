import { NextResponse } from "next/server";

import { listAll, listAvailable } from "@/lib/server/professors.repo";
import { idByTime } from "@/lib/server/timeslots.repo";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const slot = searchParams.get("slot");

  if (date && slot) {
    const slotId = await idByTime(slot);
    if (!slotId) {
      return NextResponse.json(
        { error: "Franja horària no vàlida." },
        { status: 400 }
      );
    }
    return NextResponse.json(await listAvailable(date, slotId));
  }

  return NextResponse.json(await listAll());
}
