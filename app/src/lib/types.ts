/**
 * Tipus de domini del sistema de reserva de sessions de treball.
 *
 * Model alineat amb l'esquema de la BD Postgres (`bd/01_schema.sql`). Tots els
 * ids són `string` (node-postgres retorna `bigint`/`int8` com a string). Per
 * exemple, `professorId` és l'id de BD com a string (`"1"`, no `"prof-1"`).
 */

/** Usuari exposat a la UI: mai porta credencials. */
export interface PublicUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

/**
 * Usuari complet tal com viu al servidor, amb `passwordHash`. Mai s'ha
 * d'exposar a components client ni a respostes d'API.
 */
export interface ServerUser extends PublicUser {
  passwordHash: string;
}

export interface Professor {
  id: string;
  name: string;
  subject: string;
  /** Inicials per a l'avatar. */
  initials: string;
  bio: string;
}

export interface TimeSlot {
  id: string;
  /** Hora en format `HH:mm`. */
  time: string;
}

export interface Reservation {
  id: string;
  userId: string;
  /** Id del professor a la BD, com a string (p. ex. `"1"`). */
  professorId: string;
  /** Data en format ISO `yyyy-MM-dd`. */
  date: string;
  /** Hora en format `HH:mm`. */
  time: string;
  createdAt: string;
  status: "confirmed" | "cancelled";
}
