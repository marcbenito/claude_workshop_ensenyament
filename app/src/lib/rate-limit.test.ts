import { describe, expect, it } from "vitest";

import { checkRateLimit, clientIp } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  it("permet fins al límit i bloqueja després", () => {
    const key = `test:${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(key, 5, 60_000).allowed).toBe(true);
    }
    const blocked = checkRateLimit(key, 5, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("reinicia la finestra quan expira", () => {
    const key = `test:${Math.random()}`;
    // Finestra de 0 ms: cada intent obre una finestra nova.
    expect(checkRateLimit(key, 1, 0).allowed).toBe(true);
    expect(checkRateLimit(key, 1, 0).allowed).toBe(true);
  });
});

describe("clientIp", () => {
  it("agafa la primera IP de x-forwarded-for", () => {
    const h = new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(clientIp(h)).toBe("1.2.3.4");
  });

  it("retorna 'unknown' sense capçaleres", () => {
    expect(clientIp(new Headers())).toBe("unknown");
  });
});
