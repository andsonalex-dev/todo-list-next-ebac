# Lista de Tarefas - EBAC

Um aplicativo de gerenciamento de tarefas (todo-list) desenvolvido com **Next.js 16**, **React 19** e **TypeScript**, focado em estudar e implementar **testes unitários** com Jest e React Testing Library.

## Tecnologias Utilizadas

- **Next.js 16** - React framework para produção
- **React 19** - Biblioteca JavaScript para UI
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Jest** - Framework de testes
- **React Testing Library** - Teste de componentes React
- **ESLint** - Linter para manter qualidade de código

## Funcionalidades

- ✅ Adicionar novas tarefas
- ✅ Listar todas as tarefas
- ✅ Marcar tarefas como concluídas/não concluídas
- ✅ Deletar tarefas
- ✅ Contador de tarefas (total e concluídas)
- ✅ Persistência de dados com localStorage

## Como Começar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn configurado

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/andsonalex-dev/todo-list-next-ebac.git
cd todo-list-next
```

2. Instale as dependências:
```bash
npm install
```

### Desenvolvimento

Para rodar o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação em funcionamento.

### Testes

Executar todos os testes:
```bash
npm test
```

Modo de observação (watch mode):
```bash
npm run test:watch
```

Com cobertura de testes:
```bash
npm run test:coverage
```

### Build

Para criar uma build otimizada para produção:

```bash
npm run build
npm start
```

## Estrutura do Projeto

```
src/
├── app/                      # Aplicação principal
│   ├── page.tsx             # Página inicial
│   ├── layout.tsx           # Layout da aplicação
│   └── globals.css          # Estilos globais
├── components/              # Componentes reutilizáveis
│   ├── NovaTarefa.tsx       # Formulário para adicionar tarefa
│   ├── ListaTarefas.tsx     # Listagem de tarefas
│   └── ContadorTarefas.tsx  # Exibe contadores
├── hooks/                   # Custom hooks
│   └── useContadorDeTarefas.ts  # Hook para contar tarefas
├── lib/                     # Funções utilitárias
│   └── tarefas.ts          # Lógica de gerenciamento de tarefas
└── tests/                   # Testes unitários
    ├── components/
    ├── hooks/
    └── lib/
```

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build para produção
- `npm start` - Inicia aplicação em produção
- `npm test` - Executa testes unitários
- `npm run test:watch` - Executa testes em modo observação
- `npm run test:coverage` - Gera relatório de cobertura de testes
- `npm run lint` - Verifica erros de lint

## Autor

Desenvolvido como projeto educacional da **EBAC** para aprendizado de testes unitários.

## Licença

Projeto de código aberto para fins educacionais.
