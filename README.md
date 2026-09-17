# Mercadinho express

Aplicação Node.js/Express com uma pasta `public` para o front-end.

## Sobre o projeto

Este repositório contém:

- `server.js` — servidor Express (back-end)
- `public/` — arquivos estáticos do front-end (HTML/CSS/JS)
- `package.json` / `package-lock.json` — dependências e scripts do projeto

## ⚠️ Limitação conhecida: cadastro de itens não funciona no GitHub Pages

O site publicado em GitHub Pages **só serve arquivos estáticos** (HTML, CSS, JS). O GitHub Pages não executa Node.js, então as rotas do `server.js` (por exemplo, a rota responsável por cadastrar/salvar itens) **não rodam** nesse ambiente.

Por isso, ao acessar a versão publicada no GitHub Pages, o formulário de cadastro de itens carrega normalmente, mas nenhum item é salvo — porque não existe um back-end respondendo às requisições.

### Como rodar com o back-end funcionando

```bash
npm install
npm run dev
```

Isso inicia o servidor Express localmente (via `nodemon`), com as rotas de cadastro funcionando de verdade.

### Publicando atualizações do front-end no GitHub Pages

```bash
npm run deploy
```

Esse comando usa o pacote `gh-pages` para publicar o conteúdo estático na branch `gh-pages`. Lembre-se: isso atualiza apenas a aparência/front-end do site, não o back-end.

## Versões

### v1.1.0 — Deploy no GitHub Pages
- Configurado `gh-pages` para publicar o front-end estático em `https://samuellacerdx.github.io/express2/`
- **Problema conhecido:** cadastro de itens não funciona nessa versão publicada, pois o GitHub Pages não executa o back-end Express. O formulário aparece, mas as requisições ao servidor não têm resposta.
- Próximo passo planejado: mover o back-end (`server.js`) para um serviço que suporte Node.js (Render, Railway ou similar), ou migrar o cadastro de itens para `localStorage` caso o projeto não precise de um back-end real.

### v1.0.0 — Versão inicial
- Estrutura inicial do projeto com Express (`server.js`) e pasta `public`
- Servidor local funcional via `npm run dev`

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor local com `nodemon` (back-end funcionando) |
| `npm run deploy` | Publica o front-end estático no GitHub Pages |
  
