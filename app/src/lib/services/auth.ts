import type { PublicUser, User } from "@/lib/types";
import { newId, readJSON, writeJSON } from "@/lib/services/storage";

const USERS_KEY = "reserva.users";
const SESSION_KEY = "reserva.session";

function getUsers(): User[] {
  return readJSON<User[]>(USERS_KEY, []);
}

function setUsers(users: User[]): void {
  writeJSON(USERS_KEY, users);
}

function toPublic(user: User): PublicUser {
  const { password: _password, ...rest } = user;
  return rest;
}

export type AuthResult =
  | { ok: true; user: PublicUser }
  | { ok: false; error: string };

/** Registra un usuario nuevo (mock). */
export function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): AuthResult {
  const email = input.email.trim().toLowerCase();
  const users = getUsers();

  if (users.some((u) => u.email === email)) {
    return { ok: false, error: "Ya existe una cuenta con ese email." };
  }

  const user: User = {
    id: newId("user"),
    name: input.name.trim(),
    email,
    password: input.password,
    createdAt: new Date().toISOString(),
  };

  setUsers([...users, user]);
  writeJSON(SESSION_KEY, user.id);
  return { ok: true, user: toPublic(user) };
}

/** Inicia sesión validando credenciales (mock). */
export function loginUser(input: {
  email: string;
  password: string;
}): AuthResult {
  const email = input.email.trim().toLowerCase();
  const user = getUsers().find((u) => u.email === email);

  if (!user || user.password !== input.password) {
    return { ok: false, error: "Email o contraseña incorrectos." };
  }

  writeJSON(SESSION_KEY, user.id);
  return { ok: true, user: toPublic(user) };
}

export function logoutUser(): void {
  writeJSON(SESSION_KEY, null);
}

/** Devuelve el usuario de la sesión actual, o null. */
export function getCurrentUser(): PublicUser | null {
  const sessionId = readJSON<string | null>(SESSION_KEY, null);
  if (!sessionId) return null;
  const user = getUsers().find((u) => u.id === sessionId);
  return user ? toPublic(user) : null;
}
