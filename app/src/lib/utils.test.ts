import { describe, expect, it } from "vitest";

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
