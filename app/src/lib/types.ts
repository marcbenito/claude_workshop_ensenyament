/**
 * Tipos de dominio del sistema de reservas.
 *
 * Nota: por ahora la persistencia es falsa (mock en localStorage). Estos tipos
 * están pensados para mapear de forma directa a tablas de Supabase en el futuro.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  /** Solo para el mock — NO hacer esto con una BD real. */
  password: string;
  createdAt: string;
}

/** Usuario expuesto a la UI (sin credenciales). */
export type PublicUser = Omit<User, "password">;

export interface Professor {
  id: string;
  name: string;
  subject: string;
  /** Iniciales para el avatar. */
  initials: string;
  bio: string;
}

export interface Reservation {
  id: string;
  userId: string;
  professorId: string;
  /** Fecha en formato ISO `yyyy-MM-dd`. */
  date: string;
  /** Hora en formato `HH:mm`. */
  time: string;
  createdAt: string;
  status: "confirmed" | "cancelled";
}
