import { getPool } from "@/lib/db";
import { mapProfessorRow } from "@/lib/server/mappers";
import type { Professor } from "@/lib/types";

export async function listAll(): Promise<Professor[]> {
  const { rows } = await getPool().query(
    `SELECT id, name, subject, initials, bio FROM professors ORDER BY id`
  );
  return rows.map(mapProfessorRow);
}

export async function getById(id: string): Promise<Professor | null> {
  const { rows } = await getPool().query(
    `SELECT id, name, subject, initials, bio FROM professors WHERE id = $1`,
    [id]
  );
  return rows[0] ? mapProfessorRow(rows[0]) : null;
}

/** Professors sense cap reserva `confirmed` per a la data i franja donades. */
export async function listAvailable(
  date: string,
  slotId: string
): Promise<Professor[]> {
  const { rows } = await getPool().query(
    `SELECT p.id, p.name, p.subject, p.initials, p.bio
     FROM professors p
     WHERE NOT EXISTS (
       SELECT 1 FROM reservations r
       WHERE r.professor_id = p.id
         AND r.reservation_date = $1
         AND r.time_slot_id = $2
         AND r.status = 'confirmed'
     )
     ORDER BY p.id`,
    [date, slotId]
  );
  return rows.map(mapProfessorRow);
}
