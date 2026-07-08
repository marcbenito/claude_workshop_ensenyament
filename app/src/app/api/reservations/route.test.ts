import { describe, expect, it, vi } from "vitest";

const create = vi.fn();
const listByUser = vi.fn();
const auth = vi.fn();

vi.mock("@/lib/server/reservations.repo", () => ({
  create: (...args: unknown[]) => create(...args),
  listByUser: (...args: unknown[]) => listByUser(...args),
}));

vi.mock("../../../../auth", () => ({
  auth: (...args: unknown[]) => auth(...args),
}));

import { GET, POST } from "@/app/api/reservations/route";

function makeRequest(body?: unknown) {
  return new Request("http://localhost/api/reservations", {
    method: "POST",
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

describe("GET /api/reservations", () => {
  it("retorna 401 quan no hi ha sessió", async () => {
    auth.mockResolvedValueOnce(null);

    const res = await GET();

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "No autenticat." });
  });

  it("retorna la llista de reserves de l'usuari autenticat", async () => {
    auth.mockResolvedValueOnce({ user: { id: "42" } });
    const reservations = [
      {
        id: "1",
        userId: "42",
        professorId: "3",
        date: "2026-08-01",
        time: "09:00",
        status: "confirmed",
        createdAt: "2026-07-01T10:00:00.000Z",
      },
    ];
    listByUser.mockResolvedValueOnce(reservations);

    const res = await GET();

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(reservations);
    expect(listByUser).toHaveBeenCalledWith("42");
  });
});

describe("POST /api/reservations", () => {
  it("retorna 401 quan no hi ha sessió", async () => {
    auth.mockResolvedValueOnce(null);

    const res = await POST(makeRequest({}));

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "No autenticat." });
  });

  it("retorna 400 quan falten dades al body", async () => {
    auth.mockResolvedValueOnce({ user: { id: "42" } });

    const res = await POST(makeRequest({ professorId: "3" }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Falten dades." });
  });

  it("retorna 400 quan la franja no és vàlida", async () => {
    auth.mockResolvedValueOnce({ user: { id: "42" } });
    create.mockResolvedValueOnce({
      ok: false,
      error: "Franja horària no vàlida.",
    });

    const res = await POST(
      makeRequest({ professorId: "3", date: "2026-08-01", time: "09:00" })
    );

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Franja horària no vàlida." });
  });

  it("retorna 409 quan hi ha un conflicte de solapament", async () => {
    auth.mockResolvedValueOnce({ user: { id: "42" } });
    create.mockResolvedValueOnce({
      ok: false,
      error: "Ja tens una reserva en aquesta franja.",
    });

    const res = await POST(
      makeRequest({ professorId: "3", date: "2026-08-01", time: "09:00" })
    );

    expect(res.status).toBe(409);
    expect(await res.json()).toEqual({
      error: "Ja tens una reserva en aquesta franja.",
    });
  });

  it("retorna 201 amb la reserva creada", async () => {
    auth.mockResolvedValueOnce({ user: { id: "42" } });
    const reservation = {
      id: "1",
      userId: "42",
      professorId: "3",
      date: "2026-08-01",
      time: "09:00",
      status: "confirmed",
      createdAt: "2026-07-01T10:00:00.000Z",
    };
    create.mockResolvedValueOnce({ ok: true, reservation });

    const res = await POST(
      makeRequest({ professorId: "3", date: "2026-08-01", time: "09:00" })
    );

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual(reservation);
    expect(create).toHaveBeenCalledWith({
      userId: "42",
      professorId: "3",
      date: "2026-08-01",
      time: "09:00",
    });
  });
});
