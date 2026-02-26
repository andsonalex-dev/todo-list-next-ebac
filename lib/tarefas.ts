// Simulando um banco de dados local com array
const tarefas: Array<{
  id: number;
  titulo: string;
  concluida: boolean;
  dataCriacao: string;
}> = [
  {
    id: 1,
    titulo: "Aprender Next.js",
    concluida: false,
    dataCriacao: new Date().toISOString(),
  },
  {
    id: 2,
    titulo: "Criar todo-list",
    concluida: false,
    dataCriacao: new Date().toISOString(),
  },
  {
    id: 3,
    titulo: "Implementar hooks",
    concluida: true,
    dataCriacao: new Date().toISOString(),
  },
];

export interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
  dataCriacao: string;
}

// Simula uma chamada à API com Promise
export async function getTarefas(): Promise<Tarefa[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tarefas);
    }, 300); // Simula latência de rede
  });
}

// Simula adição de uma nova tarefa
export async function adicionarTarefa(titulo: string): Promise<Tarefa> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const novaTarefa: Tarefa = {
        id: Math.max(...tarefas.map((t) => t.id), 0) + 1,
        titulo,
        concluida: false,
        dataCriacao: new Date().toISOString(),
      };
      tarefas.push(novaTarefa);
      resolve(novaTarefa);
    }, 300); // Simula latência de rede
  });
}

// Simula atualizar o status de uma tarefa
export async function atualizarTarefa(
  id: number,
  concluida: boolean
): Promise<Tarefa | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tarefa = tarefas.find((t) => t.id === id);
      if (tarefa) {
        tarefa.concluida = concluida;
        resolve(tarefa);
      } else {
        resolve(null);
      }
    }, 300);
  });
}

// Simula deletar uma tarefa
export async function deletarTarefa(id: number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = tarefas.findIndex((t) => t.id === id);
      if (index !== -1) {
        tarefas.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
}

// Retorna a contagem de tarefas
export function getContadorTarefas() {
  return {
    total: tarefas.length,
    concluidas: tarefas.filter((t) => t.concluida).length,
    pendentes: tarefas.filter((t) => !t.concluida).length,
  };
}
