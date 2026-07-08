import { describe, expect, it, vi } from "vitest";

const listActive = vi.fn();
const listAvailableForProfessor = vi.fn();

vi.mock("@/lib/server/timeslots.repo", () => ({
  listActive: (...args: unknown[]) => listActive(...args),
  listAvailableForProfessor: (...args: unknown[]) =>
    listAvailableForProfessor(...args),
}));

import { GET } from "@/app/api/timeslots/route";

function makeRequest(url: string) {
  return new Request(url);
}

describe("GET /api/timeslots", () => {
  it("retorna totes les franges actives quan no hi ha date ni professorId", async () => {
    const slots = [
      { id: "1", time: "09:00" },
      { id: "2", time: "10:00" },
    ];
    listActive.mockResolvedValueOnce(slots);

    const res = await GET(makeRequest("http://localhost/api/timeslots"));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(slots);
    expect(listActive).toHaveBeenCalled();
    expect(listAvailableForProfessor).not.toHaveBeenCalled();
  });

  it("retorna les franges disponibles per a un professor i data concrets", async () => {
    const slots = [{ id: "1", time: "09:00" }];
    listAvailableForProfessor.mockResolvedValueOnce(slots);

    const res = await GET(
      makeRequest(
        "http://localhost/api/timeslots?date=2026-08-01&professorId=3"
      )
    );

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(slots);
    expect(listAvailableForProfessor).toHaveBeenCalledWith("3", "2026-08-01");
  });
});
