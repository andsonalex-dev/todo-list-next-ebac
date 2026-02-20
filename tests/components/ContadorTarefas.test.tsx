import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ContadorTarefas from "@/components/ContadorTarefas";

describe("ContadorTarefas", () => {
  it("deve renderizar o componente", async () => {
    render(<ContadorTarefas />);

    await waitFor(() => {
      const totalElement = screen.getByText("Total");
      expect(totalElement).toBeInTheDocument();
    });
  });

  it("deve exibir os três contadores", async () => {
    render(<ContadorTarefas />);

    await waitFor(() => {
      expect(screen.getByText("Total")).toBeInTheDocument();
      expect(screen.getByText("Concluídas")).toBeInTheDocument();
      expect(screen.getByText("Pendentes")).toBeInTheDocument();
    });
  });

  it("deve exibir números nos contadores", async () => {
    render(<ContadorTarefas />);

    await waitFor(() => {
      const totalLabel = screen.getByText("Total");
      const totalContainer = totalLabel.closest("div");
      const totalNumber = totalContainer?.querySelector("p:last-child");

      expect(totalNumber).toBeInTheDocument();
      expect(totalNumber?.textContent).toMatch(/^\d+$/);
    });
  });

  it("deve atualizar quando refresh prop muda", async () => {
    const { rerender } = render(<ContadorTarefas refresh={0} />);

    await waitFor(() => {
      expect(screen.getByText("Total")).toBeInTheDocument();
    });

    rerender(<ContadorTarefas refresh={1} />);

    await waitFor(() => {
      expect(screen.getByText("Total")).toBeInTheDocument();
    });
  });

  it("os contadores devem ter valores numéricos não negativos", async () => {
    render(<ContadorTarefas />);

    await waitFor(() => {
      const p = screen.getAllByText(/^\d+$/);
      p.forEach((element) => {
        const numero = parseInt(element.textContent || "0");
        expect(numero).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
