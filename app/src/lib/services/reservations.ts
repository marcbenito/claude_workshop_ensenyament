import type { Reservation } from "@/lib/types";
import { newId, readJSON, writeJSON } from "@/lib/services/storage";

const RESERVATIONS_KEY = "reserva.reservations";

function getAll(): Reservation[] {
  return readJSON<Reservation[]>(RESERVATIONS_KEY, []);
}

function setAll(reservations: Reservation[]): void {
  writeJSON(RESERVATIONS_KEY, reservations);
}

/** Reservas de un usuario, ordenadas por fecha/hora ascendente. */
export function listReservations(userId: string): Reservation[] {
  return getAll()
    .filter((r) => r.userId === userId)
    .sort((a, b) =>
      `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
    );
}

export type CreateResult =
  | { ok: true; reservation: Reservation }
  | { ok: false; error: string };

/** Crea una reserva (mock). Evita duplicados exactos para el mismo usuario. */
export function createReservation(input: {
  userId: string;
  professorId: string;
  date: string;
  time: string;
}): CreateResult {
  const all = getAll();

  const duplicated = all.some(
    (r) =>
      r.userId === input.userId &&
      r.professorId === input.professorId &&
      r.date === input.date &&
      r.time === input.time &&
      r.status === "confirmed"
  );

  if (duplicated) {
    return { ok: false, error: "Ya tienes esa reserva." };
  }

  const reservation: Reservation = {
    id: newId("res"),
    userId: input.userId,
    professorId: input.professorId,
    date: input.date,
    time: input.time,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  setAll([...all, reservation]);
  return { ok: true, reservation };
}

/** Cancela (elimina) una reserva del usuario. */
export function cancelReservation(userId: string, reservationId: string): void {
  setAll(getAll().filter((r) => !(r.id === reservationId && r.userId === userId)));
}
