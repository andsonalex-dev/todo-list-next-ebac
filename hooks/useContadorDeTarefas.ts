import { getContadorTarefas } from "@/lib/tarefas";
import { useCallback, useEffect, useState } from "react";

type ContadorTarefas = {
  total: number;
  concluidas: number;
  pendentes: number;
};

export function useContadorDeTarefas() {
  const [contador, setContador] = useState<ContadorTarefas>({
    total: 0,
    concluidas: 0,
    pendentes: 0,
  });

  const atualizar = useCallback(() => {
    const novoContador = getContadorTarefas();
    setContador(novoContador);
  }, []);

  useEffect(() => {
    atualizar();
  }, [atualizar]);

  return { contador, atualizar };
}
