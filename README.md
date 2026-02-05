# LetsTalk

LetsTalk é uma aplicação de chat em tempo real, composta por um backend Node.js (TypeScript) e um frontend React (Vite + TypeScript).

***É importante destacar que o projeto está em andamento ainda.***


## Funcionalidades
- Autenticação de usuários
- Troca de mensagens em tempo real via WebSocket
- Gerenciamento de dispositivos conectados

## Estrutura do Projeto

```
LetsTalk/
├── server/   # Backend Node.js
└── client/   # Frontend React
```

### Backend (`server`)
- Node.js + TypeScript
- Express para rotas HTTP
- WebSocket para comunicação em tempo real
- MongoDB (configuração em `src/config/db.ts`)
- Principais pastas:
  - `controllers/` — Lógica de autenticação
  - `models/` — Modelos de dados (ex: usuário)
  - `services/` — Serviços de negócio
  - `sockets/` — Gerenciamento de conexões WebSocket
  - `routes/` — Rotas da API

### Frontend (`client`)
- React + Vite + TypeScript
- Hooks customizados para WebSocket e mensagens
- Interface moderna e responsiva

## Como rodar o projeto

### Pré-requisitos
- Node.js >= 18
- MongoDB
- Docker (opcional, para facilitar o setup)

### Backend
```bash
cd server
npm install
npm run dev
```

> ***Importante:*** _Configure o arquivo **.env** antes de iniciar o backend._

### Frontend
```bash
cd client
npm install
npm run dev
```

### Usando Docker (Recomendado caso não queira installar o MongoDB)
```bash
docker-compose up
```

## Configuração
- O backend utiliza variáveis de ambiente definidas em `server/.env`.
- O frontend pode ser configurado em `client/.env` (se necessário).

## Contribuição
Pull requests são bem-vindos! Sinta-se à vontade para abrir issues e sugerir melhorias.

