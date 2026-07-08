import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  COOKIE_CONSENT_KEY,
  CookieBanner,
} from "@/components/cookie-banner";

describe("CookieBanner", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  afterEach(() => {
    window.localStorage.clear();
  });

  it("es mostra a la primera visita (sense decisió desada)", () => {
    render(<CookieBanner />);
    expect(
      screen.getByRole("region", { name: /consentiment de cookies/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /accepto/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /rebutjo/i })).toBeInTheDocument();
  });

  it("no es mostra si ja hi ha una decisió desada", () => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    render(<CookieBanner />);
    expect(
      screen.queryByRole("region", { name: /consentiment de cookies/i })
    ).not.toBeInTheDocument();
  });

  it("desa 'accepted' i amaga el banner en clicar Accepto", () => {
    render(<CookieBanner />);
    fireEvent.click(screen.getByRole("button", { name: /accepto/i }));
    expect(window.localStorage.getItem(COOKIE_CONSENT_KEY)).toBe("accepted");
    expect(
      screen.queryByRole("region", { name: /consentiment de cookies/i })
    ).not.toBeInTheDocument();
  });

  it("desa 'rejected' en clicar Rebutjo", () => {
    render(<CookieBanner />);
    fireEvent.click(screen.getByRole("button", { name: /rebutjo/i }));
    expect(window.localStorage.getItem(COOKIE_CONSENT_KEY)).toBe("rejected");
  });
});
