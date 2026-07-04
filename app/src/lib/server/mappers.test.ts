import { describe, expect, it } from "vitest";

import {
  hhmmToPgTime,
  mapProfessorRow,
  mapReservationRow,
  mapTimeSlotRow,
  mapUserRow,
  pgTimeToHHmm,
} from "@/lib/server/mappers";

describe("pgTimeToHHmm", () => {
  it("retalla els segons d'un `time` de Postgres", () => {
    expect(pgTimeToHHmm("09:00:00")).toBe("09:00");
  });
});

describe("hhmmToPgTime", () => {
  it("afegeix els segons a una hora `HH:mm`", () => {
    expect(hhmmToPgTime("09:00")).toBe("09:00:00");
  });
});

describe("mapProfessorRow", () => {
  it("converteix l'id bigint (string) del professor", () => {
    const professor = mapProfessorRow({
      id: "3",
      name: "Carla Ferrer",
      subject: "Producte & UX",
      initials: "CF",
      bio: "Investigació d'usuari.",
    });

    expect(professor).toEqual({
      id: "3",
      name: "Carla Ferrer",
      subject: "Producte & UX",
      initials: "CF",
      bio: "Investigació d'usuari.",
    });
  });
});

describe("mapTimeSlotRow", () => {
  it("converteix l'id i l'hora d'una franja", () => {
    expect(mapTimeSlotRow({ id: "2", slot_time: "10:00:00" })).toEqual({
      id: "2",
      time: "10:00",
    });
  });
});

describe("mapReservationRow", () => {
  it("converteix ids bigint, hora i data ISO d'una reserva", () => {
    const reservation = mapReservationRow({
      id: "7",
      user_id: "42",
      professor_id: "3",
      date: "2026-08-01",
      slot_time: "16:00:00",
      status: "confirmed",
      created_at: "2026-07-01T10:00:00.000Z",
    });

    expect(reservation).toEqual({
      id: "7",
      userId: "42",
      professorId: "3",
      date: "2026-08-01",
      time: "16:00",
      status: "confirmed",
      createdAt: "2026-07-01T10:00:00.000Z",
    });
  });

  it("accepta `created_at` com a objecte Date", () => {
    const createdAt = new Date("2026-07-01T10:00:00.000Z");
    const reservation = mapReservationRow({
      id: "7",
      user_id: "42",
      professor_id: "3",
      date: "2026-08-01",
      slot_time: "16:00:00",
      status: "confirmed",
      created_at: createdAt,
    });

    expect(reservation.createdAt).toBe(createdAt.toISOString());
  });
});

describe("mapUserRow", () => {
  it("converteix `password_hash` a `passwordHash` sense exposar-lo canviat", () => {
    const user = mapUserRow({
      id: "1",
      name: "Marc",
      email: "marc@example.com",
      password_hash: "secret",
      created_at: "2026-07-01T10:00:00.000Z",
    });

    expect(user).toEqual({
      id: "1",
      name: "Marc",
      email: "marc@example.com",
      passwordHash: "secret",
      createdAt: "2026-07-01T10:00:00.000Z",
    });
  });
});
