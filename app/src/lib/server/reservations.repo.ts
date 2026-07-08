import { getPool } from "@/lib/db";
import { hhmmToPgTime, mapReservationRow } from "@/lib/server/mappers";
import type { Reservation } from "@/lib/types";

const PG_UNIQUE_VIOLATION = "23505";

/** Reserves d'un usuari, ordenades per data/hora ascendent. */
export async function listByUser(userId: string): Promise<Reservation[]> {
  const { rows } = await getPool().query(
    `SELECT r.id, r.user_id, r.professor_id,
            to_char(r.reservation_date, 'YYYY-MM-DD') AS date,
            ts.slot_time, r.status, r.created_at
     FROM reservations r
     JOIN time_slots ts ON ts.id = r.time_slot_id
     WHERE r.user_id = $1 AND r.status = 'confirmed'
     ORDER BY r.reservation_date, ts.slot_time`,
    [userId]
  );
  return rows.map(mapReservationRow);
}

export type CreateReservationResult =
  | { ok: true; reservation: Reservation }
  | { ok: false; error: string };

export async function create(input: {
  userId: string;
  professorId: string;
  date: string;
  time: string;
}): Promise<CreateReservationResult> {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");

    const slot = await client.query(
      `SELECT id FROM time_slots WHERE slot_time = $1`,
      [hhmmToPgTime(input.time)]
    );
    const timeSlotId = slot.rows[0]?.id;
    if (!timeSlotId) {
      await client.query("ROLLBACK");
      return { ok: false, error: "Franja horària no vàlida." };
    }

    // No-solapament per usuari (PRD §4): la BD no ho imposa, cal validar-ho aquí.
    const overlap = await client.query(
      `SELECT 1 FROM reservations
       WHERE user_id = $1
         AND reservation_date = $2
         AND time_slot_id = $3
         AND status = 'confirmed'`,
      [input.userId, input.date, timeSlotId]
    );
    if ((overlap.rowCount ?? 0) > 0) {
      await client.query("ROLLBACK");
      return { ok: false, error: "Ja tens una reserva en aquesta franja." };
    }

    const inserted = await client.query(
      `INSERT INTO reservations (user_id, professor_id, reservation_date, time_slot_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, professor_id,
                 to_char(reservation_date, 'YYYY-MM-DD') AS date,
                 status, created_at`,
      [input.userId, input.professorId, input.date, timeSlotId]
    );

    await client.query("COMMIT");

    return {
      ok: true,
      reservation: mapReservationRow({
        ...inserted.rows[0],
        slot_time: hhmmToPgTime(input.time),
      }),
    };
  } catch (error) {
    await client.query("ROLLBACK");
    // Índex `reservations_slot_unique`: un altre professor/data/franja ja reservat.
    if (isUniqueViolation(error)) {
      return {
        ok: false,
        error: "Aquest professor ja té una reserva en aquesta franja.",
      };
    }
    throw error;
  } finally {
    client.release();
  }
}

export type CancelReservationResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

/**
 * Cancel·la (marca `status='cancelled'`) una reserva de l'usuari.
 *
 * Regla de negoci (FAQ): només es pot cancel·lar fins a **12 h abans** de
 * l'inici de la sessió. En marcar-la com a cancel·lada, el buit torna a quedar
 * lliure automàticament (la disponibilitat filtra per `status='confirmed'`).
 */
export async function cancel(
  userId: string,
  id: string
): Promise<CancelReservationResult> {
  // Comprova existència i l'antelació de 12 h en una sola consulta. La resta
  // (data + franja) es compara amb `now()` dins de Postgres per evitar
  // ambigüitats de zona horària.
  const { rows } = await getPool().query(
    `SELECT (r.reservation_date + ts.slot_time) > now() + interval '12 hours'
              AS allowed
     FROM reservations r
     JOIN time_slots ts ON ts.id = r.time_slot_id
     WHERE r.id = $1 AND r.user_id = $2 AND r.status = 'confirmed'`,
    [id, userId]
  );

  if (!rows[0]) {
    return { ok: false, error: "Reserva no trobada.", status: 404 };
  }
  if (!rows[0].allowed) {
    return {
      ok: false,
      error: "No es pot cancel·lar amb menys de 12 h d'antelació.",
      status: 409,
    };
  }

  const { rowCount } = await getPool().query(
    `UPDATE reservations SET status = 'cancelled'
     WHERE id = $1 AND user_id = $2 AND status = 'confirmed'`,
    [id, userId]
  );
  if ((rowCount ?? 0) === 0) {
    return { ok: false, error: "Reserva no trobada.", status: 404 };
  }
  return { ok: true };
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === PG_UNIQUE_VIOLATION
  );
}
