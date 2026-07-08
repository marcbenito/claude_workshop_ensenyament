import { z } from "zod";

/**
 * Esquemes de validació dels cossos de petició de les route handlers.
 * Els missatges estan en català perquè es retornen directament a l'usuari.
 */

/** Franges horàries fixes permeses pel PRD: 09–13 i 16–19. */
export const FRANGES_VALIDES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
] as const;

/** Registre d'un nou usuari. */
export const registerSchema = z.object({
  name: z.string().trim().min(1, "El nom és obligatori."),
  email: z.string().trim().toLowerCase().email("L'email no té un format vàlid."),
  password: z
    .string()
    .min(8, "La contrasenya ha de tenir com a mínim 8 caràcters."),
});

/** Creació d'una reserva. */
export const reservationSchema = z.object({
  professorId: z.string().trim().min(1, "Cal indicar el professor."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La data ha de tenir el format YYYY-MM-DD.")
    .refine((d) => !Number.isNaN(Date.parse(d)), "La data no és vàlida."),
  time: z.enum(FRANGES_VALIDES, {
    message: "La franja horària no és vàlida (09–13 o 16–19).",
  }),
});

/**
 * Extreu el primer missatge d'error d'un `ZodError` per retornar-lo a l'usuari.
 */
export function firstErrorMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Dades no vàlides.";
}
