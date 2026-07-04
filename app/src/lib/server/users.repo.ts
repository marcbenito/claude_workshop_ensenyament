import { getPool } from "@/lib/db";
import { mapUserRow, type ServerUser } from "@/lib/server/mappers";

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
  /** TODO: bcrypt — decisió temporal, BD efímera de proves (vegeu tasks/00-PLAN.md). */
  password: string;
}): Promise<ServerUser> {
  const { rows } = await getPool().query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, password_hash, created_at`,
    [input.name, input.email, input.password]
  );
  return mapUserRow(rows[0]);
}

export async function findById(id: string): Promise<ServerUser | null> {
  const { rows } = await getPool().query(
    `SELECT id, name, email, password_hash, created_at FROM users WHERE id = $1`,
    [id]
  );
  return rows[0] ? mapUserRow(rows[0]) : null;
}
