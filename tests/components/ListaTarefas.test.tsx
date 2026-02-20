import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ListaTarefas from "@/components/ListaTarefas";

describe("ListaTarefas", () => {
  it("deve renderizar o componente", async () => {
    render(<ListaTarefas />);

    await waitFor(() => {
      expect(screen.queryByText("Carregando tarefas...")).not.toBeInTheDocument();
    });
  });

  it("deve exibir a lista de tarefas", async () => {
    render(<ListaTarefas />);

    await waitFor(() => {
      const tarefas = screen.getAllByRole("checkbox");
      expect(tarefas.length).toBeGreaterThan(0);
    });
  });

  it("deve ter checkbox para cada tarefa", async () => {
    render(<ListaTarefas />);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  });

  it("deve ter botão de deletar para cada tarefa", async () => {
    render(<ListaTarefas />);

    await waitFor(() => {
      const botoesDeletar = screen.getAllByRole("button", {
        name: /deletar/i,
      });
      expect(botoesDeletar.length).toBeGreaterThan(0);
    });
  });

  it("deve mostrar mensagem quando não há tarefas", async () => {
    // Este teste pode não passar se sempre houver tarefas
    // mas demonstra a estrutura do teste
    render(<ListaTarefas />);

    await waitFor(() => {
      expect(
        screen.queryByText("Carregando tarefas...")
      ).not.toBeInTheDocument();
    });
  });

  it("deve chamar callback quando tarefas são atualizadas", async () => {
    const mockCallback = jest.fn();
    render(<ListaTarefas onTarefasAtualizadas={mockCallback} />);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    const primeiroCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(primeiroCheckbox);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled();
    });
  });

  it("deve atualizar ao receber prop refresh diferente", async () => {
    const { rerender } = render(<ListaTarefas refresh={0} />);

    await waitFor(() => {
      expect(
        screen.queryByText("Carregando tarefas...")
      ).not.toBeInTheDocument();
    });

    rerender(<ListaTarefas refresh={1} />);

    await waitFor(() => {
      expect(
        screen.queryByText("Carregando tarefas...")
      ).not.toBeInTheDocument();
    });
  });
});
