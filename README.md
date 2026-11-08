# Kurio - NFT Marketplace

Marketplace de NFTs desenvolvido como solução para o Frontend Challenge da Jungle Gaming.

A aplicação implementa descoberta e detalhamento de NFTs, favoritos, carrinho, cotação, checkout, pedidos, autenticação, perfil de colecionador, carteiras digitais e atualizações em tempo real, utilizando APIs simuladas para permitir execução completa sem dependências externas.

## Demo

Produção:

https://frontend-challenge-theta-inky.vercel.app/

Repositório:

https://github.com/mayconwallas/frontend-challenge

## Stack

- React 19
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Axios
- REST
- Socket.IO Client
- Tailwind CSS
- Base UI / componentes UI
- MSW
- Playwright
- Lighthouse CI
- ESLint

## Funcionalidades

### Marketplace

- catálogo de NFTs;
- ordenação;
- filtros por categoria/rede;
- abas de catálogo;
- paginação;
- estado dos filtros integrado ao Router;
- layout responsivo.

### NFT

- rota individual por NFT;
- acesso direto pelo identificador;
- estado de carregamento;
- tratamento de NFT inexistente;
- favoritos;
- quantidade;
- preço em ETH;
- inclusão no carrinho;
- atributos e informações do NFT.

### Favoritos

- adicionar NFT aos favoritos;
- remover dos favoritos;
- persistência simulada;
- sincronização entre catálogo e detalhe.

### Carrinho

- adicionar NFT;
- remover NFT;
- alterar quantidade;
- persistência após reload;
- cálculo de subtotal;
- integração com cotação;
- cupom de desconto;
- cupom inválido;
- cupom expirado.

### Autenticação

- login;
- cadastro;
- validação de credenciais;
- validação de senha;
- confirmação de senha;
- sessão persistente;
- logout.

### Checkout e pedidos

- dados do colecionador;
- seleção de carteira;
- carteira manual;
- seleção de rede;
- criação do pedido;
- idempotency key;
- pedido pendente;
- confirmação do pedido;
- recusa do pedido;
- persistência do estado do pedido.

### Perfil

- edição do nome de exibição;
- username;
- e-mail;
- ENS;
- apelido de carteira;
- avatar;
- alteração de senha;
- persistência dos dados;
- sincronização com a sessão.

### Carteiras

- cadastro de carteira;
- Ethereum;
- Polygon;
- Solana;
- WalletConnect;
- MetaMask;
- Coinbase Wallet;
- ENS para Ethereum;
- carteira principal;
- carteiras secundárias;
- alteração da carteira principal;
- remoção;
- persistência;
- uso da carteira principal no checkout.

### Tempo real

A aplicação utiliza `socket.io-client` para atualizações em tempo real.

Eventos exercitados:

- `nft.updated`
- `order.updated`

A integração atualiza os dados mantidos pelo TanStack Query e possui cobertura automatizada para evitar duplicação de listeners.

## Arquitetura

O projeto utiliza organização orientada a features.

Estrutura principal:

```text
src/
├── components/
│   ├── layout/
│   └── ui/
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
├── pages/
└── routes/
```

Cada feature concentra suas responsabilidades de domínio, incluindo tipos, hooks, queries, mutations e integração com a camada de dados.

Mais detalhes estão em `ARCHITECTURE.md`.

## Rotas principais

```text
/                       Home / Marketplace
/nft/$nftId             Detalhe do NFT
/cart                    Carrinho
/checkout                Pagamento
/order/$orderId          Pedido
/login                   Login
/register                Cadastro
/profile                 Perfil
/profile/wallets         Carteiras
```

O roteamento é implementado com TanStack Router.

## REST e Axios

Axios é utilizado como cliente HTTP da aplicação.

Os principais recursos simulados abrangem:

```text
Session / Authentication
NFTs
Favorites
Cart
Checkout Quote
Orders
Collector Profile
Wallets
```

A camada REST é consumida por hooks e mutations integrados ao TanStack Query.

## TanStack Query

TanStack Query é responsável pelo estado remoto da aplicação.

A solução utiliza:

- queries;
- mutations;
- query keys;
- invalidação;
- atualização de cache;
- sincronização entre telas;
- integração com eventos Socket.IO.

## MSW

Mock Service Worker é utilizado para simular a API da aplicação no nível da rede.

Configuração do worker:

```text
public/mockServiceWorker.js
```

O `package.json` configura:

```json
{
  "msw": {
    "workerDirectory": [
      "public"
    ]
  }
}
```

Isso permite desenvolver e demonstrar a aplicação sem depender de uma API privada ou blockchain real.

Os mocks implementam estado de aplicação suficiente para os fluxos de autenticação, catálogo, favoritos, carrinho, checkout, pedidos, perfil e carteiras.

## Instalação

Pré-requisitos:

- Node.js compatível com Vite 8;
- npm.

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

## Build

```bash
npm run build
```

O comando executa:

```text
tsc -b
vite build
```

A saída de produção é gerada em:

```text
dist/
```

Para visualizar o build local:

```bash
npm run preview
```

## Análise do bundle

```bash
npm run analyze
```

## Lint

```bash
npm run lint
```

## Testes E2E

A aplicação utiliza Playwright.

Execute toda a suíte:

```bash
npm run test:e2e
```

A suíte atual possui:

```text
114 testes E2E
```

executados nos projetos/viewports configurados para:

- Mobile;
- Tablet;
- Desktop.

Os testes cobrem, entre outros:

- autenticação;
- cadastro;
- logout;
- sessão;
- catálogo;
- filtros;
- ordenação;
- paginação;
- detalhe do NFT;
- 404;
- favoritos;
- carrinho;
- persistência;
- cupom;
- checkout;
- pedidos;
- perfil;
- alteração de senha;
- carteiras;
- Socket.IO;
- shell responsivo.

Último gate executado durante a preparação da entrega:

```text
ESLint: PASS
TypeScript: PASS
Vite production build: PASS
Playwright: 114/114 PASS
```

### Playwright UI

```bash
npm run test:e2e:ui
```

### Relatório

```bash
npm run test:e2e:report
```

## Lighthouse

Lighthouse CI está configurado como dependência do projeto.

Executar auditoria completa:

```bash
npm run lighthouse
```

Ou separadamente:

```bash
npm run lighthouse:collect
npm run lighthouse:assert
```

O script principal executa primeiro o build de produção:

```text
npm run build
lhci autorun
```

## Responsividade

A interface foi implementada para os três principais contextos avaliados pelo desafio:

```text
390 px   Mobile
768 px   Tablet
1440 px  Desktop
```

A aplicação possui composições específicas para Mobile e Desktop em partes relevantes da interface, em vez de apenas reduzir proporcionalmente o layout Desktop.

## Acessibilidade

A implementação utiliza, entre outros:

- elementos HTML semânticos;
- labels de formulário;
- accessible names;
- `aria-label`;
- `aria-current`;
- `aria-selected`;
- `aria-pressed`;
- `role="alert"`;
- `role="status"`;
- navegação por links e botões nativos;
- estados disabled;
- feedback de erro e sucesso;
- textos alternativos para imagens relevantes;
- estilos de foco.

## Persistência simulada

Como a solução é executada integralmente no navegador com API simulada, os principais estados do usuário são mantidos pela infraestrutura de mocks correspondente aos fluxos implementados.

Os testes automatizados verificam persistência após reload para os principais recursos cobertos pelo desafio.

## Deployment

A aplicação está publicada na Vercel:

https://frontend-challenge-theta-inky.vercel.app/

A branch de produção é:

```text
main
```

O projeto utiliza configuração de SPA routing para permitir acesso e refresh de rotas do TanStack Router no ambiente de produção.

## Scripts disponíveis

| Script | Função |
|---|---|
| `npm run dev` | inicia Vite em desenvolvimento |
| `npm run build` | executa TypeScript e gera build |
| `npm run analyze` | gera build em modo de análise |
| `npm run lint` | executa ESLint |
| `npm run preview` | executa preview do build |
| `npm run test:e2e` | executa Playwright |
| `npm run test:e2e:ui` | abre Playwright UI |
| `npm run test:e2e:report` | abre relatório Playwright |
| `npm run lighthouse` | build + Lighthouse CI |
| `npm run lighthouse:collect` | coleta auditorias |
| `npm run lighthouse:assert` | valida assertions |

## Decisões técnicas

### API simulada

O desafio não exige integração real com blockchain, extensão de wallet ou gateway de pagamento. Esses recursos são representados por contratos e mocks para tornar a aplicação reproduzível.

### Estado remoto

Dados provenientes da API são tratados como estado remoto e gerenciados pelo TanStack Query, evitando duplicar estado de servidor desnecessariamente em stores globais.

### Routing

TanStack Router é responsável pelas rotas e pelos estados de navegação relevantes ao catálogo.

### E2E como gate de regressão

Os fluxos de negócio possuem cobertura Playwright em diferentes tamanhos de viewport.

Mudanças relevantes foram validadas com:

```bash
npm run lint
npm run build
npm run test:e2e
```

antes de serem integradas à branch principal.

## Limitações conhecidas

- blockchain e transações são simuladas;
- provedores de carteira são simulados;
- login social é apresentado como parte da interface, sem autenticação OAuth externa;
- a aplicação não depende de backend privado para a demonstração;
- alguns conteúdos editoriais da interface são demonstrativos;
- a cobertura prioriza os fluxos essenciais do desafio.

## Repositórios

Desafio original:

https://github.com/junglegaming/frontend-challenge

Implementação:

https://github.com/mayconwallas/frontend-challenge