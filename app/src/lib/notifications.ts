import type { Reservation } from "@/lib/types";

/**
 * Notificacions in-app de reserves.
 *
 * El canal escollit és **in-app**: no depenem de cap servei extern d'email.
 * - La *confirmació* es mostra a l'usuari just després de crear la reserva.
 * - Els *recordatoris* es calculen aquí a partir de les reserves properes.
 */

/** Finestra (hores) dins la qual una sessió es considera "propera". */
export const REMINDER_WINDOW_HOURS = 24;

export interface Reminder {
  reservation: Reservation;
  /** Hores que falten per a l'inici (arrodonides cap avall). */
  hoursUntil: number;
  /** Missatge llest per mostrar. */
  message: string;
}

/** Combina data (`YYYY-MM-DD`) i hora (`HH:mm`) en un `Date` local. */
export function reservationStart(reservation: Reservation): Date {
  const [y, m, d] = reservation.date.split("-").map(Number);
  const [hh, mm] = reservation.time.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0);
}

/**
 * Retorna els recordatoris de les sessions que comencen dins de les properes
 * `REMINDER_WINDOW_HOURS` hores (excloent les que ja han passat), ordenats per
 * proximitat.
 */
export function upcomingReminders(
  reservations: Reservation[],
  now: Date = new Date()
): Reminder[] {
  const windowMs = REMINDER_WINDOW_HOURS * 60 * 60 * 1000;

  return reservations
    .map((reservation) => {
      const diffMs = reservationStart(reservation).getTime() - now.getTime();
      return { reservation, diffMs };
    })
    .filter(({ diffMs }) => diffMs > 0 && diffMs <= windowMs)
    .sort((a, b) => a.diffMs - b.diffMs)
    .map(({ reservation, diffMs }) => {
      const hoursUntil = Math.floor(diffMs / (60 * 60 * 1000));
      const quan =
        hoursUntil >= 1
          ? `d'aquí a ${hoursUntil} h`
          : "d'aquí a menys d'una hora";
      return {
        reservation,
        hoursUntil,
        message: `Tens una sessió ${quan} (${reservation.date} a les ${reservation.time}).`,
      };
    });
}
