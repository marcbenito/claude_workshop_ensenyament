import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";

import { CookieBanner } from "@/components/cookie-banner";

describe("CookieBanner", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("mostra el banner a la primera visita amb els dos botons", () => {
    render(<CookieBanner />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /accepto/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /rebutjo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /política de cookies/i })
    ).toHaveAttribute("href", "/politica-cookies");
  });

  it("desa 'accepted' i amaga el banner en acceptar", () => {
    render(<CookieBanner />);

    fireEvent.click(screen.getByRole("button", { name: /accepto/i }));

    expect(window.localStorage.getItem("cookie-consent")).toBe("accepted");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("desa 'rejected' i amaga el banner en rebutjar", () => {
    render(<CookieBanner />);

    fireEvent.click(screen.getByRole("button", { name: /rebutjo/i }));

    expect(window.localStorage.getItem("cookie-consent")).toBe("rejected");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("no reapareix si ja hi ha una decisió desada", () => {
    window.localStorage.setItem("cookie-consent", "accepted");

    render(<CookieBanner />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
