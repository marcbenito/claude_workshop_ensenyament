import { describe, expect, it, vi } from "vitest";

const clientQuery = vi.fn();
const release = vi.fn();
const connect = vi.fn(() => Promise.resolve({ query: clientQuery, release }));

vi.mock("@/lib/db", () => ({
  getPool: () => ({ connect }),
}));

import { create } from "@/lib/server/reservations.repo";

const baseInput = {
  userId: "42",
  professorId: "3",
  date: "2026-08-01",
  time: "09:00",
};

describe("create (reservations.repo)", () => {
  it("retorna error quan la franja horària no existeix", async () => {
    clientQuery.mockImplementation((sql: string) => {
      if (sql.startsWith("BEGIN")) return Promise.resolve();
      if (sql.includes("FROM time_slots")) {
        return Promise.resolve({ rows: [] });
      }
      if (sql.startsWith("ROLLBACK")) return Promise.resolve();
      throw new Error(`Query inesperada: ${sql}`);
    });

    const result = await create(baseInput);

    expect(result).toEqual({
      ok: false,
      error: "Franja horària no vàlida.",
    });
    expect(clientQuery).toHaveBeenCalledWith("ROLLBACK");
    expect(release).toHaveBeenCalled();
  });

  it("retorna error quan l'usuari ja té una reserva en aquesta franja (no-solapament)", async () => {
    clientQuery.mockImplementation((sql: string) => {
      if (sql.startsWith("BEGIN")) return Promise.resolve();
      if (sql.includes("FROM time_slots")) {
        return Promise.resolve({ rows: [{ id: "5" }] });
      }
      if (sql.includes("FROM reservations")) {
        return Promise.resolve({ rowCount: 1 });
      }
      if (sql.startsWith("ROLLBACK")) return Promise.resolve();
      throw new Error(`Query inesperada: ${sql}`);
    });

    const result = await create(baseInput);

    expect(result).toEqual({
      ok: false,
      error: "Ja tens una reserva en aquesta franja.",
    });
    expect(clientQuery).toHaveBeenCalledWith("ROLLBACK");
  });

  it("retorna error quan un altre usuari ja té reservat aquest professor/franja (violació d'unicitat)", async () => {
    clientQuery.mockImplementation((sql: string) => {
      if (sql.startsWith("BEGIN")) return Promise.resolve();
      if (sql.includes("FROM time_slots")) {
        return Promise.resolve({ rows: [{ id: "5" }] });
      }
      if (sql.includes("FROM reservations")) {
        return Promise.resolve({ rowCount: 0 });
      }
      if (sql.startsWith("INSERT INTO reservations")) {
        const error = new Error("duplicate key") as Error & { code: string };
        error.code = "23505";
        throw error;
      }
      if (sql.startsWith("ROLLBACK")) return Promise.resolve();
      throw new Error(`Query inesperada: ${sql}`);
    });

    const result = await create(baseInput);

    expect(result).toEqual({
      ok: false,
      error: "Aquest professor ja té una reserva en aquesta franja.",
    });
    expect(clientQuery).toHaveBeenCalledWith("ROLLBACK");
  });

  it("crea la reserva quan tot és vàlid", async () => {
    clientQuery.mockImplementation((sql: string) => {
      if (sql.startsWith("BEGIN")) return Promise.resolve();
      if (sql.includes("FROM time_slots")) {
        return Promise.resolve({ rows: [{ id: "5" }] });
      }
      if (sql.includes("FROM reservations")) {
        return Promise.resolve({ rowCount: 0 });
      }
      if (sql.startsWith("INSERT INTO reservations")) {
        return Promise.resolve({
          rows: [
            {
              id: "1",
              user_id: "42",
              professor_id: "3",
              date: "2026-08-01",
              status: "confirmed",
              created_at: "2026-07-01T10:00:00.000Z",
            },
          ],
        });
      }
      if (sql.startsWith("COMMIT")) return Promise.resolve();
      throw new Error(`Query inesperada: ${sql}`);
    });

    const result = await create(baseInput);

    expect(result).toEqual({
      ok: true,
      reservation: {
        id: "1",
        userId: "42",
        professorId: "3",
        date: "2026-08-01",
        time: "09:00",
        status: "confirmed",
        createdAt: "2026-07-01T10:00:00.000Z",
      },
    });
    expect(clientQuery).toHaveBeenCalledWith("COMMIT");
    expect(release).toHaveBeenCalled();
  });
});
