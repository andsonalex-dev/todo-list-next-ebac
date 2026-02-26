import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NovaTarefa from "@/components/NovaTarefa";

describe("NovaTarefa", () => {
  it("deve renderizar o formulário", () => {
    render(<NovaTarefa />);

    const input = screen.getByPlaceholderText("Digite uma nova tarefa...");
    const botao = screen.getByRole("button", { name: /adicion/i });

    expect(input).toBeInTheDocument();
    expect(botao).toBeInTheDocument();
  });

  it("deve mostrar erro quando tentar adicionar tarefa vazia", async () => {
    render(<NovaTarefa />);

    const botao = screen.getByRole("button", { name: /adicion/i });
    fireEvent.click(botao);

    const mensagemErro = await screen.findByText(
      /por favor, digite qual é a tarefa/i,
    );
    expect(mensagemErro).toBeInTheDocument();
  });

  it("deve limpar o input após adicionar uma tarefa", async () => {
    render(<NovaTarefa />);

    const input = screen.getByPlaceholderText(
      "Digite uma nova tarefa...",
    ) as HTMLInputElement;
    const botao = screen.getByRole("button", { name: /adicion/i });

    fireEvent.change(input, { target: { value: "Nova tarefa de teste" } });
    fireEvent.click(botao);

    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });

  it("deve chamar callback quando tarefa é adicionada", async () => {
    const mockCallback = jest.fn();
    render(<NovaTarefa onTarefaAdicionada={mockCallback} />);

    const input = screen.getByPlaceholderText("Digite uma nova tarefa...");
    const botao = screen.getByRole("button", { name: /adicion/i });

    fireEvent.change(input, { target: { value: "Tarefa teste" } });
    fireEvent.click(botao);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled();
    });
  });

  it("deve desabilitar o botão enquanto carrega", async () => {
    render(<NovaTarefa />);

    const input = screen.getByPlaceholderText("Digite uma nova tarefa...");
    const botao = screen.getByRole("button", { name: /adicion/i });

    fireEvent.change(input, { target: { value: "Tarefa teste" } });
    fireEvent.click(botao);

    expect(botao).toBeDisabled();

    await waitFor(() => {
      expect(botao).not.toBeDisabled();
    });
  });
});
