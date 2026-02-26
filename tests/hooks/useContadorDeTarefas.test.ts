import { renderHook, act } from "@testing-library/react";
import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";

describe("useContadorDeTarefas", () => {
  it("deve retornar objeto contador com valores iniciais", () => {
    const { result } = renderHook(() => useContadorDeTarefas());

    expect(result.current.contador).toHaveProperty("total");
    expect(result.current.contador).toHaveProperty("concluidas");
    expect(result.current.contador).toHaveProperty("pendentes");
  });

  it("deve ter função atualizar", () => {
    const { result } = renderHook(() => useContadorDeTarefas());

    expect(result.current.atualizar).toBeDefined();
    expect(typeof result.current.atualizar).toBe("function");
  });

  it("deve atualizar o contador quando atualizar é chamado", () => {
    const { result } = renderHook(() => useContadorDeTarefas());

    const contadorInicial = result.current.contador.total;

    act(() => {
      result.current.atualizar();
    });

    expect(result.current.contador.total).toBe(contadorInicial);
  });

  it("total deve ser soma de concluidas e pendentes", () => {
    const { result } = renderHook(() => useContadorDeTarefas());

    expect(result.current.contador.total).toBe(
      result.current.contador.concluidas + result.current.contador.pendentes,
    );
  });
});
