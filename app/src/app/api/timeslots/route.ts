import { NextResponse } from "next/server";

import { listActive } from "@/lib/server/timeslots.repo";

export async function GET() {
  return NextResponse.json(await listActive());
}
