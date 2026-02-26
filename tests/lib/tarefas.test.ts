import {
  getTarefas,
  adicionarTarefa,
  atualizarTarefa,
  deletarTarefa,
  getContadorTarefas
} from "@/lib/tarefas";

describe("lib/tarefas", () => {
  describe("getTarefas", () => {
    it("deve retornar array de tarefas", async () => {
      const tarefas = await getTarefas();
      expect(Array.isArray(tarefas)).toBe(true);
      expect(tarefas.length).toBeGreaterThan(0);
    });

    it("cada tarefa deve ter os campos obrigatórios", async () => {
      const tarefas = await getTarefas();
      tarefas.forEach((tarefa) => {
        expect(tarefa).toHaveProperty("id");
        expect(tarefa).toHaveProperty("titulo");
        expect(tarefa).toHaveProperty("concluida");
        expect(tarefa).toHaveProperty("dataCriacao");
      });
    });
  });

  describe("adicionarTarefa", () => {
    it("deve adicionar uma nova tarefa com sucesso", async () => {
      const tituloNova = "Teste de tarefa " + Date.now();
      const tarefaAdicionada = await adicionarTarefa(tituloNova);

      expect(tarefaAdicionada.titulo).toBe(tituloNova);
      expect(tarefaAdicionada.concluida).toBe(false);
      expect(tarefaAdicionada.id).toBeDefined();
    });

    it("a tarefa adicionada deve estar na lista", async () => {
      const tituloNova = "Tarefa verificavel " + Date.now();
      await adicionarTarefa(tituloNova);

      const tarefas = await getTarefas();
      const tarefaEncontrada = tarefas.find(
        (t) => t.titulo === tituloNova
      );
      expect(tarefaEncontrada).toBeDefined();
    });
  });

  describe("atualizarTarefa", () => {
    it("deve atualizar o status de concluída", async () => {
      const tarefas = await getTarefas();
      const primeiraTarefa = tarefas[0];

      const tarefaAtualizada = await atualizarTarefa(
        primeiraTarefa.id,
        true
      );
      expect(tarefaAtualizada?.concluida).toBe(true);
    });

    it("deve retornar null se tarefa não existir", async () => {
      const resultado = await atualizarTarefa(99999, false);
      expect(resultado).toBeNull();
    });
  });

  describe("deletarTarefa", () => {
    it("deve deletar uma tarefa existente", async () => {
      const tituloParaDeletar = "Tarefa para deletar " + Date.now();
      const tarefaCriada = await adicionarTarefa(tituloParaDeletar);

      const resultadoDelecao = await deletarTarefa(tarefaCriada.id);
      expect(resultadoDelecao).toBe(true);

      const tarefas = await getTarefas();
      const tarefaEncontrada = tarefas.find(
        (t) => t.id === tarefaCriada.id
      );
      expect(tarefaEncontrada).toBeUndefined();
    });

    it("deve retornar false se tarefa não existir", async () => {
      const resultado = await deletarTarefa(99999);
      expect(resultado).toBe(false);
    });
  });

  describe("getContadorTarefas", () => {
    it("deve retornar objeto com total, concluidas e pendentes", () => {
      const contador = getContadorTarefas();

      expect(contador).toHaveProperty("total");
      expect(contador).toHaveProperty("concluidas");
      expect(contador).toHaveProperty("pendentes");
    });

    it("total deve ser soma de concluidas e pendentes", () => {
      const contador = getContadorTarefas();
      expect(contador.total).toBe(
        contador.concluidas + contador.pendentes
      );
    });

    it("total deve ser maior que zero", () => {
      const contador = getContadorTarefas();
      expect(contador.total).toBeGreaterThan(0);
    });
  });
});
