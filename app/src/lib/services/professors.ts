import type { Professor } from "@/lib/types";

/** Tots els professors. */
export async function listProfessors(): Promise<Professor[]> {
  const res = await fetch("/api/professors", { credentials: "same-origin" });
  if (!res.ok) return [];
  return res.json();
}

/** Professors sense reserva confirmada per a la data i hora donades. */
export async function listAvailableProfessors(
  date: string,
  time: string
): Promise<Professor[]> {
  const params = new URLSearchParams({ date, slot: time });
  const res = await fetch(`/api/professors?${params}`, {
    credentials: "same-origin",
  });
  if (!res.ok) return [];
  return res.json();
}
