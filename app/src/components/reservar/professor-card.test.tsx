import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Professor } from "@/lib/types";
import { ProfessorCard } from "@/components/reservar/professor-card";

const professor: Professor = {
  id: "3",
  name: "Carla Ferrer",
  subject: "Producte & UX",
  initials: "CF",
  bio: "Investigació d'usuari.",
};

describe("ProfessorCard", () => {
  it("mostra el nom, la matèria i la bio del professor", () => {
    render(
      <ProfessorCard professor={professor} selected={false} onSelect={vi.fn()} />
    );

    expect(screen.getByText("Carla Ferrer")).toBeInTheDocument();
    expect(screen.getByText("Producte & UX")).toBeInTheDocument();
    expect(screen.getByText("Investigació d'usuari.")).toBeInTheDocument();
    expect(screen.getByText("CF")).toBeInTheDocument();
    expect(screen.getByText("Disponible")).toBeInTheDocument();
  });

  it("marca el botó com a no seleccionat quan `selected` és false", () => {
    render(
      <ProfessorCard professor={professor} selected={false} onSelect={vi.fn()} />
    );

    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("marca el botó com a seleccionat quan `selected` és true", () => {
    render(
      <ProfessorCard professor={professor} selected onSelect={vi.fn()} />
    );

    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("crida `onSelect` amb l'id del professor en fer clic", () => {
    const onSelect = vi.fn();
    render(
      <ProfessorCard professor={professor} selected={false} onSelect={onSelect} />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onSelect).toHaveBeenCalledExactlyOnceWith("3");
  });
});
