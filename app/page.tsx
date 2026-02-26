"use client";

import { useState } from "react";
import NovaTarefa from "@/components/NovaTarefa";
import ListaTarefas from "@/components/ListaTarefas";
import ContadorTarefas from "@/components/ContadorTarefas";

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  const handleTarefaAdicionada = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-12 py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold text-black dark:text-white">
            Lista de Tarefas - EBAC
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Organizador de tarefas simples para estudo de Testes Unitários.
          </p>
        </div>

        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
            Estatísticas
          </h2>
          <ContadorTarefas refresh={refresh} />
        </div>

        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
            Nova Tarefa
          </h2>
          <NovaTarefa onTarefaAdicionada={handleTarefaAdicionada} />
        </div>

        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
            Minhas Tarefas
          </h2>
          <ListaTarefas
            refresh={refresh}
            onTarefasAtualizadas={handleTarefaAdicionada}
          />
        </div>
      </main>
    </div>
  );
}
