# Kurio NFT Marketplace

Frontend de um marketplace de NFTs desenvolvido como desafio técnico, com foco em arquitetura frontend, experiência responsiva, integração REST simulada, gerenciamento de estado assíncrono, atualizações em tempo real e testes end-to-end.

## Demo

Produção:

https://frontend-challenge-theta-inky.vercel.app/

### Usuário de demonstração

```text
E-mail: collector@kurio.com
Senha: Kurio123!
```

Também é possível criar uma nova conta pela própria aplicação.

---

## Stack

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Axios
- Tailwind CSS
- shadcn/ui
- Mock Service Worker (MSW)
- Socket.IO Client
- Playwright
- ESLint

---

## Funcionalidades

### Marketplace

- catálogo de NFTs;
- filtros por coleção e rede;
- filtros combináveis;
- ordenação;
- paginação;
- abas de catálogo;
- estados de loading, erro e vazio;
- layout responsivo para mobile, tablet e desktop.

### Detalhe do NFT

- detalhes do ativo;
- coleção;
- criador;
- blockchain;
- preço;
- disponibilidade;
- galeria;
- favoritos;
- stepper de quantidade;
- limite baseado nas edições disponíveis;
- ação de compra;
- adição ao carrinho;
- abas de detalhes e avaliações;
- estado de NFT não encontrado.

### Favoritos

- adicionar NFT aos favoritos;
- remover dos favoritos;
- persistência entre páginas.

### Carrinho

- adicionar NFT;
- alterar quantidade;
- impedir quantidade inferior a 1;
- respeitar disponibilidade máxima;
- remover item;
- persistência após reload;
- subtotal por item;
- resumo do pedido;
- cupom;
- desconto;
- taxa de rede;
- total.

### Cupons

Exemplos utilizados pelo ambiente mock:

```text
KURIO10
KURIOEXPIRED
```

O fluxo possui cenários para:

- cupom válido;
- cupom inválido;
- cupom expirado.

### Autenticação

- login;
- logout;
- cadastro;
- confirmação de senha;
- mostrar e ocultar senha;
- persistência da sessão;
- tratamento de credenciais inválidas;
- prevenção de cadastro inconsistente.

As senhas de usuários criados pelo mock não são persistidas em texto puro. O mock armazena somente `passwordHash`.

> Observação: SHA-256 neste projeto é utilizado apenas para evitar armazenamento da senha em texto puro dentro do ambiente frontend simulado. Em um backend real, o armazenamento de credenciais deve utilizar algoritmos apropriados para senhas, como Argon2id, scrypt ou bcrypt, com salt e parâmetros de custo adequados.

### Perfil do colecionador

- consulta do perfil;
- nome de exibição;
- nome de usuário;
- e-mail;
- ENS;
- apelido da carteira;
- avatar;
- edição e persistência;
- sincronização do nome do perfil com a sessão;
- alteração de senha.

### Carteiras

- cadastro de carteiras;
- carteira principal;
- carteiras secundárias;
- definição de nova carteira principal;
- remoção;
- persistência;
- integração com o checkout.

Redes suportadas:

```text
Ethereum
Polygon
Solana
```

Provedores apresentados:

```text
WalletConnect
MetaMask
Coinbase Wallet
```

O campo ENS é utilizado somente quando aplicável ao fluxo Ethereum.

### Checkout

- dados do colecionador;
- seleção automática da carteira principal;
- escolha entre carteiras cadastradas;
- endereço e rede herdados da carteira;
- opção de utilizar outra carteira manualmente;
- resumo dos NFTs;
- criação do pedido.

### Pedidos

Estados implementados:

```text
pending
confirmed
rejected
```

O fluxo inclui:

- criação do pedido;
- snapshot dos itens comprados;
- persistência após reload;
- confirmação de pagamento;
- rejeição;
- `transactionId`;
- limpeza do carrinho após confirmação;
- preservação do carrinho após rejeição;
- idempotência.

### Atualizações em tempo real

Socket.IO Client é integrado ao TanStack Query.

Eventos tratados:

```text
nft.updated
order.updated
```

Os eventos atualizam o cache da aplicação sem exigir reload da página.

O lifecycle do socket também evita duplicação de listeners durante navegação SPA.

---

## Mock API

O backend do desafio é simulado com MSW.

A camada mock cobre recursos como:

```text
/api/auth
/api/nfts
/api/cart
/api/checkout
/api/orders
/api/profile
/api/wallets
/api/favorites
```

O MSW também é habilitado no build publicado para permitir que a demonstração na Vercel funcione sem backend externo.

---

## Persistência

Como o projeto funciona sem backend real, determinados estados são persistidos no `localStorage`, incluindo:

- sessão;
- usuários mockados;
- perfil;
- carteiras;
- favoritos;
- carrinho;
- pedidos.

Esses dados são isolados por origem do navegador. Por isso, contas criadas em `localhost` não aparecem automaticamente no domínio publicado na Vercel.

---

## Arquitetura

O projeto utiliza organização baseada em features.

```text
src/
├── app/
├── components/
├── features/
│   ├── auth/
│   ├── cart/
│   ├── catalog/
│   ├── checkout/
│   ├── favorites/
│   ├── orders/
│   ├── profile/
│   └── wallets/
├── mocks/
│   ├── fixtures/
│   ├── handlers/
│   └── state/
├── pages/
├── routes/
├── services/
│   ├── api/
│   └── socket/
└── types/
```

A separação busca manter:

```text
UI
↓
hooks / TanStack Query
↓
services
↓
HTTP
↓
MSW
↓
estado mockado
```

Os eventos em tempo real seguem:

```text
Socket.IO
↓
socket query bridge
↓
TanStack Query
↓
UI
```

---

## Rotas principais

```text
/                   Marketplace
/login              Login
/register           Cadastro
/nft/:nftId         Detalhe do NFT
/cart                Carrinho
/checkout            Pagamento
/order/:orderId      Pedido
/profile             Perfil
/profile/wallets     Carteiras
```

O projeto utiliza file-based routing com TanStack Router.

---

## Executando localmente

### Requisitos

- Node.js
- npm

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível no endereço informado pelo Vite, normalmente:

```text
http://localhost:5173
```

---

## Build

```bash
npm run build
```

O comando executa:

```text
tsc -b
+
vite build
```

---

## Lint

```bash
npm run lint
```

---

## Testes E2E

A suíte utiliza Playwright.

```bash
npm run test:e2e
```

Cobertura atual:

```text
114 testes E2E
```

Os testes são executados em três projetos:

```text
Mobile   390 x 844
Tablet   768 x 1024
Desktop  1440 x 900
```

Principais jornadas cobertas:

- autenticação;
- cadastro;
- sessão;
- confirmação de senha;
- catálogo;
- filtros;
- ordenação;
- paginação;
- favoritos;
- detalhe do NFT;
- carrinho;
- quantidade;
- persistência;
- cupons;
- checkout;
- pedidos;
- confirmação e rejeição;
- perfil;
- carteiras;
- integração carteira/checkout;
- Socket.IO;
- prevenção de listeners duplicados;
- shell responsivo.

Para executar apenas um conjunto:

```bash
npx playwright test tests/e2e/auth.spec.ts
```

Exemplo:

```bash
npx playwright test tests/e2e/orders.spec.ts
```

---

## Qualidade

Antes dos principais checkpoints do projeto são executados:

```bash
npm run lint
npm run build
npm run test:e2e
```

O objetivo é manter:

```text
ESLint        verde
TypeScript    verde
Vite build    verde
Playwright    verde
```

---

## Responsividade

A interface foi desenvolvida para três referências principais:

```text
Mobile
Tablet
Desktop
```

A adaptação não se limita à redução de largura. Algumas telas alteram composição, espaçamento, navegação e hierarquia para acomodar corretamente cada viewport.

---

## Decisões técnicas

### TanStack Query

Utilizado para estado assíncrono, cache, mutations, invalidação e sincronização entre REST e eventos Socket.IO.

### TanStack Router

Utilizado para roteamento tipado, parâmetros de rota e filtros de catálogo representados na URL.

### MSW

Permite simular uma API REST realista sem acoplar a interface diretamente às fixtures.

### Socket.IO

A camada de realtime atualiza dados do NFT e pedidos através do cache do TanStack Query.

### LocalStorage

Utilizado somente como persistência do ambiente mockado, já que o desafio não possui backend persistente real.

### Idempotência

A criação de pedidos utiliza uma chave de idempotência para reduzir o risco de pedidos duplicados em tentativas repetidas.

---

## Limitações do ambiente mockado

Este projeto é um frontend demonstrativo.

Por isso:

- não existe blockchain real;
- não existem transações financeiras reais;
- WalletConnect, MetaMask e Coinbase Wallet fazem parte da representação do fluxo;
- Google e Facebook são elementos de interface e não possuem OAuth real;
- contas e pedidos são armazenados localmente;
- Socket.IO é exercitado como camada frontend de atualização;
- o ambiente MSW substitui um backend externo.

---

## Deploy

Aplicação:

https://frontend-challenge-theta-inky.vercel.app/

O deploy é realizado pela Vercel a partir da branch `main`.

---

## Status

```text
Build        OK
Lint         OK
E2E          114/114
Responsive   Mobile / Tablet / Desktop
Deploy       Vercel
```

---

## Autor

Desenvolvido para o Frontend Challenge da Kurio.