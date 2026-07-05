import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { SiteHeader } from "@/components/site-header";

vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const mockedUseSession = vi.mocked(useSession);
const mockedSignOut = vi.mocked(signOut);
const mockedUseRouter = vi.mocked(useRouter);

describe("SiteHeader", () => {
  const replace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseRouter.mockReturnValue({
      replace,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it("mostra el nom de l'aplicació i l'enllaç al dashboard", () => {
    mockedUseSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
    } as unknown as ReturnType<typeof useSession>);

    render(<SiteHeader />);

    const link = screen.getByRole("link", { name: /sesiones/i });
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("no mostra la informació de l'usuari quan no hi ha sessió", () => {
    mockedUseSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
    } as unknown as ReturnType<typeof useSession>);

    render(<SiteHeader />);

    expect(screen.queryByText(/salir/i)).not.toBeInTheDocument();
  });

  it("mostra el nom de l'usuari i el botó de sortir quan hi ha sessió", () => {
    mockedUseSession.mockReturnValue({
      data: { user: { name: "Marc Benito" } },
      status: "authenticated",
    } as unknown as ReturnType<typeof useSession>);

    render(<SiteHeader />);

    expect(screen.getByText("Marc Benito")).toBeInTheDocument();
    expect(screen.getByText("MB")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salir/i })).toBeInTheDocument();
  });

  it("crida `signOut` i redirigeix a l'arrel en fer clic a Salir", async () => {
    mockedUseSession.mockReturnValue({
      data: { user: { name: "Marc Benito" } },
      status: "authenticated",
    } as unknown as ReturnType<typeof useSession>);
    mockedSignOut.mockResolvedValue(undefined as never);

    render(<SiteHeader />);

    fireEvent.click(screen.getByRole("button", { name: /salir/i }));

    expect(mockedSignOut).toHaveBeenCalledWith({ redirect: false });
    await vi.waitFor(() => expect(replace).toHaveBeenCalledWith("/"));
  });
});
