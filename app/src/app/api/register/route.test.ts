import { describe, expect, it, vi } from "vitest";

const create = vi.fn();
const findByEmail = vi.fn();

vi.mock("@/lib/server/users.repo", () => ({
  create: (...args: unknown[]) => create(...args),
  findByEmail: (...args: unknown[]) => findByEmail(...args),
}));

import { POST } from "@/app/api/register/route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/register", {
    method: "POST",
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

describe("POST /api/register", () => {
  it("retorna 400 quan el body és buit", async () => {
    const res = await POST(makeRequest(undefined));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Falten dades." });
  });

  it("retorna 400 quan falten name, email o password", async () => {
    const res = await POST(makeRequest({ email: "marc@example.com" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Falten dades." });
  });

  it("retorna 409 quan ja existeix un usuari amb aquest email", async () => {
    findByEmail.mockResolvedValueOnce({
      id: "1",
      name: "Marc",
      email: "marc@example.com",
      passwordHash: "secret",
      createdAt: "2026-07-01T10:00:00.000Z",
    });

    const res = await POST(
      makeRequest({
        name: "Marc",
        email: "marc@example.com",
        password: "secret123",
      })
    );

    expect(res.status).toBe(409);
    expect(await res.json()).toEqual({
      error: "Ja existeix un compte amb aquest email.",
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("retorna 201 i crea l'usuari quan les dades són vàlides", async () => {
    findByEmail.mockResolvedValueOnce(null);
    create.mockResolvedValueOnce({
      id: "2",
      name: "Marc",
      email: "marc@example.com",
      passwordHash: "secret123",
      createdAt: "2026-07-01T10:00:00.000Z",
    });

    const res = await POST(
      makeRequest({
        name: "Marc",
        email: "marc@example.com",
        password: "secret123",
      })
    );

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ ok: true });
    expect(create).toHaveBeenCalledWith({
      name: "Marc",
      email: "marc@example.com",
      password: "secret123",
    });
  });
});
