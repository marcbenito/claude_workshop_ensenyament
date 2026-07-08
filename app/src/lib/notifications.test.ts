import { describe, expect, it } from "vitest";

import { reservationStart, upcomingReminders } from "@/lib/notifications";
import type { Reservation } from "@/lib/types";

function makeReservation(date: string, time: string): Reservation {
  return {
    id: `${date}-${time}`,
    userId: "u1",
    professorId: "1",
    date,
    time,
    status: "confirmed",
    createdAt: "2026-07-08T00:00:00.000Z",
  } as Reservation;
}

describe("reservationStart", () => {
  it("combina data i hora en un Date local", () => {
    const d = reservationStart(makeReservation("2026-07-10", "16:00"));
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(6); // juliol (0-indexat)
    expect(d.getDate()).toBe(10);
    expect(d.getHours()).toBe(16);
  });
});

describe("upcomingReminders", () => {
  const now = new Date(2026, 6, 10, 9, 0); // 10 juliol 09:00

  it("inclou les sessions dins de les properes 24 h", () => {
    const reminders = upcomingReminders(
      [makeReservation("2026-07-10", "16:00")],
      now
    );
    expect(reminders).toHaveLength(1);
    expect(reminders[0].hoursUntil).toBe(7);
  });

  it("exclou les sessions ja passades", () => {
    const reminders = upcomingReminders(
      [makeReservation("2026-07-10", "08:00")],
      now
    );
    expect(reminders).toHaveLength(0);
  });

  it("exclou les sessions a més de 24 h", () => {
    const reminders = upcomingReminders(
      [makeReservation("2026-07-12", "10:00")],
      now
    );
    expect(reminders).toHaveLength(0);
  });

  it("ordena per proximitat", () => {
    const reminders = upcomingReminders(
      [makeReservation("2026-07-10", "18:00"), makeReservation("2026-07-10", "11:00")],
      now
    );
    expect(reminders.map((r) => r.reservation.time)).toEqual(["11:00", "18:00"]);
  });
});
