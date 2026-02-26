"use client";

import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";
import { useEffect } from "react";

interface ContadorTarefasProps {
  refresh?: number;
}

export default function ContadorTarefas({ refresh = 0 }: ContadorTarefasProps) {
  const { contador, atualizar } = useContadorDeTarefas();

  useEffect(() => {
    atualizar();
  }, [refresh, atualizar]);

  return (
    <div className="flex gap-6 text-center">
      <div className="px-6 py-4 bg-blue-100 rounded-lg dark:bg-blue-900">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Total</p>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {contador.total}
        </p>
      </div>
      <div className="px-6 py-4 bg-green-100 rounded-lg dark:bg-green-900">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Concluídas</p>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
          {contador.concluidas}
        </p>
      </div>
      <div className="px-6 py-4 bg-yellow-100 rounded-lg dark:bg-yellow-900">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Pendentes</p>
        <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
          {contador.pendentes}
        </p>
      </div>
    </div>
  );
}
