"use client";

import { useState } from "react";
import { adicionarTarefa } from "@/lib/tarefas";

interface NovaTarefaProps {
  onTarefaAdicionada?: () => void;
}

export default function NovaTarefa({ onTarefaAdicionada }: NovaTarefaProps) {
  const [titulo, setTitulo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setErro("Por favor, digite qual é a tarefa");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      await adicionarTarefa(titulo);
      setTitulo("");
      onTarefaAdicionada?.();
    } catch (err) {
      setErro("Erro ao adicionar a tarefa. Tente novamente.");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite uma nova tarefa..."
            disabled={carregando}
            className="flex-1 px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-white disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={carregando}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {carregando ? "Adicionando..." : "Adicionar"}
          </button>
        </div>
        {erro && <p className="text-red-500 text-sm">{erro}</p>}
      </div>
    </form>
  );
}
