import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Stepper } from "@/components/reservar/stepper";

const steps = ["Professor", "Data i hora", "Confirmació"];

describe("Stepper", () => {
  it("mostra l'etiqueta de cada pas", () => {
    render(<Stepper steps={steps} current={0} />);

    for (const label of steps) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("numera els passos encara no completats", () => {
    render(<Stepper steps={steps} current={0} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("marca com a completats (amb icona) els passos anteriors a l'actual", () => {
    const { container } = render(<Stepper steps={steps} current={2} />);

    // Els passos 0 i 1 estan completats i mostren la icona `Check` en lloc del número.
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });

  it("no mostra cap pas completat quan `current` és el primer pas", () => {
    const { container } = render(<Stepper steps={steps} current={0} />);

    expect(container.querySelectorAll("svg")).toHaveLength(0);
  });

  it("renderitza tants elements de llista com passos", () => {
    render(<Stepper steps={steps} current={1} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(steps.length);
  });

  it("marca només com a completat el pas anterior a l'actual quan `current` és intermedi", () => {
    const { container } = render(<Stepper steps={steps} current={1} />);

    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("destaca l'etiqueta del pas actual amb `text-foreground`", () => {
    render(<Stepper steps={steps} current={1} />);

    expect(screen.getByText("Data i hora")).toHaveClass("text-foreground");
    expect(screen.getByText("Professor")).toHaveClass("text-muted-foreground");
    expect(screen.getByText("Confirmació")).toHaveClass("text-muted-foreground");
  });
});
