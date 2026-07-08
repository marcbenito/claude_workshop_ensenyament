import bcrypt from "bcryptjs";

import { getPool } from "@/lib/db";
import { mapUserRow, type ServerUser } from "@/lib/server/mappers";

/** Cost del hash bcrypt (10 = equilibri estàndard seguretat/rendiment). */
const SALT_ROUNDS = 10;

export async function findByEmail(email: string): Promise<ServerUser | null> {
  const { rows } = await getPool().query(
    `SELECT id, name, email, password_hash, created_at
     FROM users WHERE lower(email) = lower($1)`,
    [email]
  );
  return rows[0] ? mapUserRow(rows[0]) : null;
}

export async function create(input: {
  name: string;
  email: string;
  password: string;
}): Promise<ServerUser> {
  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
  const { rows } = await getPool().query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, password_hash, created_at`,
    [input.name, input.email, passwordHash]
  );
  return mapUserRow(rows[0]);
}

/** Actualitza el hash d'una contrasenya (usat per re-hashejar credencials en pla). */
export async function updatePasswordHash(
  id: string,
  passwordHash: string
): Promise<void> {
  await getPool().query(
    `UPDATE users SET password_hash = $2 WHERE id = $1`,
    [id, passwordHash]
  );
}

/**
 * Verifica una contrasenya contra el hash guardat.
 *
 * Migració transparent: si el hash desat és en text pla (dades antigues,
 * anteriors a bcrypt) i coincideix, es re-hasheja automàticament perquè a
 * partir del proper accés ja quedi xifrat. Retorna `true` si és vàlida.
 */
export async function verifyPassword(
  user: ServerUser,
  password: string
): Promise<boolean> {
  const stored = user.passwordHash;
  const isBcrypt = stored.startsWith("$2");

  if (isBcrypt) {
    return bcrypt.compare(password, stored);
  }

  // Credencial antiga en text pla: valida i migra a bcrypt.
  if (stored === password) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    await updatePasswordHash(user.id, passwordHash);
    return true;
  }

  return false;
}

export async function findById(id: string): Promise<ServerUser | null> {
  const { rows } = await getPool().query(
    `SELECT id, name, email, password_hash, created_at FROM users WHERE id = $1`,
    [id]
  );
  return rows[0] ? mapUserRow(rows[0]) : null;
}
