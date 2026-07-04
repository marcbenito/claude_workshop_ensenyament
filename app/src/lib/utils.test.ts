import { describe, expect, it } from "vitest";

import { PROFESSORS } from "@/lib/data/professors";
import { capitalizeFirst, cn } from "@/lib/utils";

describe("cn", () => {
  it("combina clases y descarta valores falsy", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });

  it("resuelve conflictos de Tailwind quedándose con la última", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});

describe("capitalizeFirst", () => {
  it("pone en mayúscula solo la primera letra", () => {
    expect(capitalizeFirst("lunes")).toBe("Lunes");
  });
});

describe("PROFESSORS", () => {
  it("todos los profesores tienen id, nombre e iniciales", () => {
    for (const professor of PROFESSORS) {
      expect(professor.id).toBeTruthy();
      expect(professor.name).toBeTruthy();
      expect(professor.initials).toHaveLength(2);
    }
  });
});
