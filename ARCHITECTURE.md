# Architecture

## Overview

Kurio é uma Single Page Application desenvolvida com React, TypeScript e Vite.

A arquitetura busca separar:

- interface;
- navegação;
- estado remoto;
- comunicação REST;
- domínio por feature;
- infraestrutura de mocks;
- eventos em tempo real;
- testes.

## Core stack

```text
React
TypeScript
Vite
TanStack Router
TanStack Query
Axios
REST
Socket.IO Client
Tailwind CSS
MSW
Playwright
Lighthouse CI
```

## Feature-oriented architecture

O domínio é organizado por feature.

```text
src/features/
├── auth/
├── cart/
├── catalog/
├── checkout/
├── favorites/
├── orders/
├── profile/
└── wallets/
```

Uma feature pode possuir:

```text
components/
hooks/
queries/
mutations/
services/
types/
keys/
```

quando necessários ao domínio.

## Routing

TanStack Router fornece a infraestrutura de navegação.

Principais rotas:

```text
/
/nft/$nftId
/cart
/checkout
/order/$orderId
/login
/register
/profile
/profile/wallets
```

Estados relevantes do catálogo são integrados ao Router para possibilitar navegação reproduzível.

## Remote state

TanStack Query é responsável pelos dados remotos.

Responsabilidades incluem:

- queries;
- mutations;
- query keys;
- invalidação;
- sincronização;
- atualização de cache;
- integração com eventos realtime.

O objetivo é evitar a duplicação de dados remotos em estado global desnecessário.

## REST layer

Axios é utilizado na camada HTTP.

A aplicação segue contratos REST simulados para:

```text
Authentication
Session
NFTs
Favorites
Cart
Checkout Quote
Orders
Profile
Wallets
```

## Mock architecture

MSW intercepta requests no nível da rede.

O Service Worker é disponibilizado em:

```text
public/mockServiceWorker.js
```

Os handlers representam a API usada pela aplicação.

Essa abordagem permite que os mesmos hooks e componentes trabalhem sobre requests HTTP sem conhecer a implementação dos mocks.

## Realtime

A camada realtime utiliza:

```text
socket.io-client
```

Eventos implementados e testados:

```text
nft.updated
order.updated
```

As atualizações relevantes são integradas ao cache do TanStack Query.

A suíte E2E também valida que listeners Socket.IO não são duplicados indevidamente.

## Authentication

A autenticação utiliza REST simulado e estado de sessão.

Fluxos cobertos:

```text
Login
Invalid credentials
Registration
Password validation
Persistent session
Logout
```

## Catalog

O catálogo combina:

```text
TanStack Router
TanStack Query
REST/MSW
responsive UI
```

A interface oferece filtros, ordenação, tabs e paginação.

## Favorites

Favoritos fazem parte do estado remoto simulado e são compartilhados entre catálogo e detalhe por meio da camada de queries.

## Cart

O carrinho suporta:

```text
Add
Remove
Quantity
Persistence
Quote
Coupon
```

A UI não calcula isoladamente o estado completo do checkout. O fluxo de cotação utiliza a camada de API correspondente.

## Checkout

Checkout combina:

```text
Session
Cart
Wallet
Network
Order mutation
Idempotency key
```

A criação do pedido utiliza uma chave de idempotência gerada no cliente para o request correspondente.

## Orders

Pedidos possuem fluxo de estados incluindo:

```text
pending
confirmed
rejected
```

`order.updated` permite alterações em tempo real no pedido aberto.

## Profile

O perfil do colecionador possui:

```text
Display name
Username
Email
ENS
Wallet nickname
Avatar
Password change
```

Atualizações do perfil sincronizam os dados correspondentes da sessão.

## Wallets

O domínio de carteiras suporta:

```text
Ethereum
Polygon
Solana

WalletConnect
MetaMask
Coinbase Wallet
```

Também contém:

```text
primary wallet
secondary wallets
ENS
persistence
remove
change primary wallet
```

## Responsive architecture

A interface diferencia os principais tamanhos avaliados pelo desafio:

```text
390 px
768 px
1440 px
```

Tailwind CSS controla as adaptações de layout.

Em fluxos importantes, Mobile e Desktop usam composições diferentes quando necessário para preservar a hierarquia do Figma.

## Accessibility

A estratégia inclui:

- HTML semântico;
- accessible names;
- labels;
- estados ARIA;
- feedback de loading;
- alertas;
- status;
- controles nativos;
- navegação por links;
- foco visível;
- alt text;
- estados disabled.

## Testing

Playwright fornece a cobertura E2E.

Arquivos de teste incluem fluxos relacionados a:

```text
auth
cart
catalog
checkout
favorites
nft detail
orders
profile
smoke
socket
wallets
```

A suíte final utilizada durante a preparação da entrega contém:

```text
114 testes
```

distribuídos entre:

```text
Mobile
Tablet
Desktop
```

Gate utilizado antes da integração:

```bash
npm run lint
npm run build
npm run test:e2e
```

## Performance

Vite fornece code splitting por rota/chunk.

O projeto também possui:

```text
rollup-plugin-visualizer
Lighthouse CI
```

Scripts:

```bash
npm run analyze
npm run lighthouse
npm run lighthouse:collect
npm run lighthouse:assert
```

## Deployment

Produção:

```text
https://frontend-challenge-theta-inky.vercel.app/
```

O deployment é conectado à branch:

```text
main
```

A configuração do Vercel inclui fallback de SPA para suportar rotas do TanStack Router em acesso direto e refresh.

## Architectural trade-offs

### No real blockchain

A solução deliberadamente não integra blockchain real.

Wallets, ownership, pagamento e estados relacionados são representados pela infraestrutura simulada exigida pelo desafio.

### No external OAuth

Os botões de provedores sociais representam a interface prevista, mas não inicializam OAuth de terceiros.

### Browser-based demonstration

A solução foi construída para ser executável e demonstrável sem infraestrutura privada.

### Test-driven checkpoints

Mudanças de maior impacto foram integradas somente após validação por lint, build e subconjuntos relevantes do Playwright.

A suíte integral foi executada antes dos checkpoints finais para reduzir regressões entre domínios.