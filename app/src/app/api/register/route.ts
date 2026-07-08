import { NextResponse } from "next/server";

import { create, findByEmail } from "@/lib/server/users.repo";
import { firstErrorMessage, registerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: firstErrorMessage(parsed.error) },
      { status: 400 }
    );
  }
  const { name, email, password } = parsed.data;

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
