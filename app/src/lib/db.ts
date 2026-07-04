/**
 * Connexió a la base de dades Postgres corporativa.
 *
 * El pool es crea a partir de `DATABASE_URL` (vegeu `app/.env`). L'esquema i les
 * dades inicials són a `bd/`. Consumit pels repositoris a `src/lib/server/`.
 */
import { Pool } from "pg";

let pool: Pool | null = null;

/** Retorna el pool de connexions (singleton), creant-lo la primera vegada. */
export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("Falta DATABASE_URL a l'entorn (app/.env).");
    }
    pool = new Pool({ connectionString });
  }
  return pool;
}
