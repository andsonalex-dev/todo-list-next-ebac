"use client";

import { useEffect, useState } from "react";
import {
  Tarefa,
  getTarefas,
  atualizarTarefa,
  deletarTarefa,
} from "@/lib/tarefas";

interface ListaTarefasProps {
  refresh?: number;
  onTarefasAtualizadas?: () => void;
}

export default function ListaTarefas({ refresh = 0, onTarefasAtualizadas }: ListaTarefasProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarTarefas = async () => {
    setCarregando(true);
    setErro("");
    try {
      const dados = await getTarefas();
      setTarefas(dados);
    } catch (err) {
      setErro("Erro ao carregar as tarefas");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarTarefas();
  }, [refresh]);

  const handleToggleTarefa = async (id: number, concluida: boolean) => {
    try {
      await atualizarTarefa(id, !concluida);
      await carregarTarefas();
      onTarefasAtualizadas?.();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletarTarefa = async (id: number) => {
    try {
      await deletarTarefa(id);
      await carregarTarefas();
      onTarefasAtualizadas?.();
    } catch (err) {
      console.error(err);
    }
  };

  if (carregando) {
    return (
      <div className="text-center py-8">
        <p className="text-zinc-500">Carregando tarefas...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{erro}</p>
        <button
          onClick={carregarTarefas}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (tarefas.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-zinc-500">Nenhuma tarefa adicionada ainda.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <ul className="space-y-2">
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className="flex items-center gap-3 p-4 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={() =>
                handleToggleTarefa(tarefa.id, tarefa.concluida)
              }
              className="w-5 h-5 rounded cursor-pointer"
            />
            <span
              className={`flex-1 ${
                tarefa.concluida
                  ? "line-through text-zinc-500"
                  : "text-zinc-900 dark:text-white"
              }`}
            >
              {tarefa.titulo}
            </span>
            <button
              onClick={() => handleDeletarTarefa(tarefa.id)}
              className="px-3 py-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
