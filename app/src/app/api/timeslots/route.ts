import { NextResponse } from "next/server";

import {
  listActive,
  listAvailableForProfessor,
} from "@/lib/server/timeslots.repo";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const professorId = searchParams.get("professorId");

  if (date && professorId) {
    return NextResponse.json(
      await listAvailableForProfessor(professorId, date)
    );
  }

  return NextResponse.json(await listActive());
}
