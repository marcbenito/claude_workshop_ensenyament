import type { TimeSlot } from "@/lib/types";

/** Franges horàries actives. */
export async function listTimeSlots(): Promise<TimeSlot[]> {
  const res = await fetch("/api/timeslots", { credentials: "same-origin" });
  if (!res.ok) return [];
  return res.json();
}
