import { describe, expect, it } from "vitest";

import { registerSchema, reservationSchema } from "@/lib/validation";

describe("registerSchema", () => {
  it("accepta dades vàlides i normalitza l'email", () => {
    const r = registerSchema.safeParse({
      name: "  Anna  ",
      email: "ANNA@Example.com",
      password: "secret123",
    });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.name).toBe("Anna");
      expect(r.data.email).toBe("anna@example.com");
    }
  });

  it("rebutja email amb format invàlid", () => {
    expect(
      registerSchema.safeParse({ name: "A", email: "no-email", password: "secret123" })
        .success
    ).toBe(false);
  });

  it("rebutja contrasenya massa curta", () => {
    expect(
      registerSchema.safeParse({ name: "A", email: "a@b.com", password: "123" }).success
    ).toBe(false);
  });
});

describe("reservationSchema", () => {
  it("accepta una franja i data vàlides", () => {
    expect(
      reservationSchema.safeParse({ professorId: "1", date: "2026-07-10", time: "10:00" })
        .success
    ).toBe(true);
  });

  it("rebutja una franja fora del PRD", () => {
    expect(
      reservationSchema.safeParse({ professorId: "1", date: "2026-07-10", time: "14:00" })
        .success
    ).toBe(false);
  });

  it("rebutja un format de data incorrecte", () => {
    expect(
      reservationSchema.safeParse({ professorId: "1", date: "10/07/2026", time: "10:00" })
        .success
    ).toBe(false);
  });
});
