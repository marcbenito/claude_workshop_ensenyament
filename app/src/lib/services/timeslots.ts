import type { TimeSlot } from "@/lib/types";

/** Franges horàries actives. */
export async function listTimeSlots(): Promise<TimeSlot[]> {
  const res = await fetch("/api/timeslots", { credentials: "same-origin" });
  if (!res.ok) return [];
  return res.json();
}

/** Franges lliures d'un professor per a una data. */
export async function listAvailableTimeSlots(
  date: string,
  professorId: string
): Promise<TimeSlot[]> {
  const params = new URLSearchParams({ date, professorId });
  const res = await fetch(`/api/timeslots?${params}`, {
    credentials: "same-origin",
  });
  if (!res.ok) return [];
  return res.json();
}
