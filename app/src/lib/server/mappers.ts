/**
 * Funcions pures de mapeig de files SQL (snake_case) a tipus de domini.
 *
 * `bigint`/`int8` ja arriben com a `string` des de node-postgres; `slot_time`
 * arriba com a `"HH:mm:ss"` i cal retallar-lo a `"HH:mm"`.
 */
import type { Professor, Reservation, ServerUser, TimeSlot } from "@/lib/types";

export type { TimeSlot, ServerUser };

interface ProfessorRow {
  id: string | number;
  name: string;
  subject: string;
  initials: string;
  bio: string;
}

interface TimeSlotRow {
  id: string | number;
  slot_time: string;
}

interface ReservationRow {
  id: string | number;
  user_id: string | number;
  professor_id: string | number;
  /** Ja formatada com `"YYYY-MM-DD"` (via `to_char` a la query). */
  date: string;
  slot_time: string;
  status: "confirmed" | "cancelled";
  created_at: string | Date;
}

interface UserRow {
  id: string | number;
  name: string;
  email: string;
  password_hash: string;
  created_at: string | Date;
}

export function pgTimeToHHmm(pgTime: string): string {
  return pgTime.slice(0, 5);
}

export function hhmmToPgTime(hhmm: string): string {
  return `${hhmm}:00`;
}

function toISOString(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

export function mapProfessorRow(row: ProfessorRow): Professor {
  return {
    id: String(row.id),
    name: row.name,
    subject: row.subject,
    initials: row.initials,
    bio: row.bio,
  };
}

export function mapTimeSlotRow(row: TimeSlotRow): TimeSlot {
  return {
    id: String(row.id),
    time: pgTimeToHHmm(row.slot_time),
  };
}

export function mapReservationRow(row: ReservationRow): Reservation {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    professorId: String(row.professor_id),
    date: row.date,
    time: pgTimeToHHmm(row.slot_time),
    status: row.status,
    createdAt: toISOString(row.created_at),
  };
}

export function mapUserRow(row: UserRow): ServerUser {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    createdAt: toISOString(row.created_at),
  };
}
