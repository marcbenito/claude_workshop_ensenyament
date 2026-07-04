import type { Reservation } from "@/lib/types";

export type CreateResult =
  | { ok: true; reservation: Reservation }
  | { ok: false; error: string };

/** Reserves de l'usuari de la sessió, ordenades per data/hora ascendent. */
export async function listReservations(): Promise<Reservation[]> {
  const res = await fetch("/api/reservations", { credentials: "same-origin" });
  if (!res.ok) return [];
  return res.json();
}

/** Crea una reserva. L'`userId` el deriva el servidor de la sessió. */
export async function createReservation(input: {
  professorId: string;
  date: string;
  time: string;
}): Promise<CreateResult> {
  const res = await fetch("/api/reservations", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return {
      ok: false,
      error: data.error ?? "No s'ha pogut crear la reserva.",
    };
  }
  return { ok: true, reservation: data };
}

/** Cancel·la una reserva de l'usuari de la sessió. */
export async function cancelReservation(id: string): Promise<void> {
  await fetch(`/api/reservations/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
}
