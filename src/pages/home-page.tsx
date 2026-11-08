import { useNavigate } from '@tanstack/react-router'

import { PageContainer } from '@/components/layout/page-container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import {
  CatalogFeedback,
  CatalogPagination,
  CatalogSidebar,
  CatalogToolbar,
  NftGrid,
  useNfts,
} from '@/features/catalog'
import { Route } from '@/routes'
import { MobileHomeHero } from '@/components/home/mobile-home-hero'

const PAGE_SIZE = 3

const journalArticles = [
  {
    image: '/images/nfts/emerald-ape-042.png',
    meta: '12 de setembro  |  Leitura de 6 min',
    title: 'Como funciona a propriedade de NFTs',
    description:
      'Aprenda a colecionar, negociar e verificar ativos digitais.',
  },
  {
    image: '/images/nfts/sage-nomad-009.png',
    meta: '13 de setembro  |  Leitura de 2 min',
    title: '10 artistas digitais para acompanhar',
    description:
      'Conheça criadores que moldam a cultura digital.',
  },
  {
    image: '/images/nfts/ivory-baron-088.png',
    meta: '15 de setembro  |  Leitura de 3 min',
    title: 'Raridade, atributos e procedência',
    description:
      'Entenda raridade, procedência, direitos autorais e utilidade.',
  },
  {
    image: '/images/nfts/golden-beat-207.png',
    meta: '15 de setembro  |  Leitura de 2 min',
    title: 'Como proteger sua carteira',
    description:
      'Proteja sua carteira, seus ativos e sua identidade.',
  },
] as const

const footerProfileLinks = [
  'Meu perfil',
  'Minha coleção',
  'Atividade',
  'Estúdio do criador',
  'Lista de interesse',
] as const

const footerHelpLinks = [
  'Central de ajuda',
  'Como comprar NFTs',
  'Carteira e segurança',
  'Política do mercado',
  'Denunciar item',
] as const

const footerCollectionLinks = [
  'Arte digital',
  'Fotografia',
  'Música',
  'Arte 3D',
  'Utilidade',
] as const

export function HomePage() {
  const search = Route.useSearch()
  const navigate = useNavigate({
    from: '/',
  })

  const filters = {
    tab: search.tab ?? 'all',
    collection: search.collection,
    network: search.network,
    sort: search.sort ?? 'recent',
    page: search.page ?? 1,
  } as const

  const nftsQuery = useNfts(filters)

  function handleTabChange(
    tab: typeof filters.tab,
  ) {
    void navigate({
      search: (previous) => ({
        ...previous,
        tab:
          tab === 'all'
            ? undefined
            : tab,
        page: undefined,
      }),
    })
  }

  function handleSortChange(
    sort: typeof filters.sort,
  ) {
    void navigate({
      search: (previous) => ({
        ...previous,
        sort:
          sort === 'recent'
            ? undefined
            : sort,
        page: undefined,
      }),
    })
  }

  function handleCollectionChange(
    collection?: string,
  ) {
    void navigate({
      search: (previous) => ({
        ...previous,
        collection,
        page: undefined,
      }),
    })
  }

  function handleNetworkChange(
    network?: string,
  ) {
    void navigate({
      search: (previous) => ({
        ...previous,
        network,
        page: undefined,
      }),
    })
  }

  function handlePageChange(
    page: number,
  ) {
    void navigate({
      search: (previous) => ({
        ...previous,
        page:
          page === 1
            ? undefined
            : page,
      }),
    })
  }

  function handleExplore() {
    document
      .getElementById('marketplace')
      ?.scrollIntoView({
        behavior: 'smooth',
      })
  }

  return (
    <>
      <PageContainer>
        <MobileHomeHero
        onExplore={handleExplore}
      />
        <Section className="pb-8 pt-7 md:pb-10 lg:pb-12 lg:pt-10">
          <div className="overflow-hidden lg:grid lg:min-h-[440px] lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center lg:gap-16">
            <div className="flex flex-col justify-center py-8 lg:py-10">
              <p className="text-xs font-medium tracking-[0.08em] text-foreground">
                Bem-vindo à Kurio
              </p>

              <h1 className="mt-5 max-w-[620px] text-[38px] font-bold uppercase leading-[1.24] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[52px]">
                Seja dono do futuro
                <br />
                da arte digital
              </h1>

              <p className="mt-5 max-w-[520px] text-sm leading-6 text-muted-foreground">
                Descubra NFTs selecionados de criadores
                emergentes e consagrados. Colecione arte
                digital rara, apoie artistas e tenha uma
                parte da cultura da internet.
              </p>

              <div className="mt-7">
                <Button
                  type="button"
                  onClick={handleExplore}
                  className="h-11 rounded-[4px] px-7 text-sm font-bold uppercase"
                >
                  Explorar
                </Button>
              </div>

              <div
                aria-hidden="true"
                className="mt-10 hidden items-center justify-end gap-2 lg:flex"
              >
                <span className="size-2 rounded-full bg-primary" />
                <span className="size-2 rounded-full bg-primary/45" />
                <span className="size-2 rounded-full bg-primary/45" />
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[390px] lg:mx-0">
              <div className="overflow-hidden rounded-[12px] bg-[#e8e7c8]">
                <img
                  src="/images/nfts/emerald-ape-042.png"
                  alt="Emerald Ape, NFT em destaque"
                  width={720}
                  height={720}
                  fetchPriority="high"
                  className="aspect-square w-full object-cover"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                <p>NFT em destaque</p>
                <p>Arte digital selecionada</p>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="marketplace"
          aria-label="Marketplace"
          className="pb-8 pt-6 lg:py-16"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8 xl:gap-10">
            <CatalogSidebar
              collection={filters.collection}
              network={filters.network}
              onCollectionChange={
                handleCollectionChange
              }
              onNetworkChange={
                handleNetworkChange
              }
            />

            <div className="min-w-0 flex-1">
              <CatalogToolbar
                tab={filters.tab}
                sort={filters.sort}
                onTabChange={handleTabChange}
                onSortChange={handleSortChange}
              />

              <div className="mt-5">
                {nftsQuery.isPending && (
                  <CatalogFeedback type="loading" />
                )}

                {nftsQuery.isError && (
                  <CatalogFeedback type="error" />
                )}

                {nftsQuery.isSuccess &&
                  nftsQuery.data.items.length ===
                    0 && (
                    <CatalogFeedback type="empty" />
                  )}

                {nftsQuery.isSuccess &&
                  nftsQuery.data.items.length >
                    0 && (
                    <>
                      <NftGrid
                        nfts={
                          nftsQuery.data.items
                        }
                      />

                      <CatalogPagination
                        page={filters.page}
                        total={
                          nftsQuery.data.total
                        }
                        pageSize={PAGE_SIZE}
                        onPageChange={
                          handlePageChange
                        }
                      />
                    </>
                  )}
              </div>
            </div>
          </div>
        </Section>

        <Section
          aria-label="NFT em destaque"
          className="pt-6 lg:pt-10"
        >
          <div className="overflow-hidden rounded-[10px] bg-card">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_0.8fr]">
              <div className="relative min-h-[340px] overflow-hidden sm:min-h-[420px] lg:min-h-[500px]">
                <img
                  src="/images/nfts/golden-beat-207.png"
                  alt="Arte digital em oferta limitada"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/55" />
              </div>

              <div className="flex flex-col justify-center px-6 py-10 sm:px-9 lg:px-12">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  NFT em destaque
                </p>

                <h2 className="mt-4 max-w-md text-3xl font-bold uppercase leading-[1.15] text-foreground sm:text-4xl">
                  Oferta limitada
                </h2>

                <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
                  Uma seleção limitada para
                  colecionadores que buscam arte
                  digital rara e edições especiais.
                </p>

                <div className="mt-8 flex items-end justify-between gap-4 border-t border-border pt-5">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      A partir de
                    </p>

                    <p className="mt-1 text-xl font-bold text-primary">
                      0.99 ETH
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleExplore}
                    className="rounded-[4px] bg-primary px-5 py-3 text-xs font-bold uppercase text-primary-foreground transition-colors hover:bg-accent"
                  >
                    Ver oferta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section
          aria-label="Seleções editoriais"
          className="pt-6 lg:pt-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <article className="overflow-hidden rounded-[8px] bg-card">
              <div className="grid min-h-[260px] grid-cols-[0.9fr_1.1fr]">
                <div className="relative overflow-hidden">
                  <img
                    src="/images/nfts/emerald-ape-042.png"
                    alt="Coleção de edição limitada"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 lg:p-8">
                  <h2 className="text-xl font-bold leading-snug text-foreground">
                    Lançamentos gênesis
                    <br />
                    de edição limitada
                  </h2>

                  <p className="mt-4 text-xs leading-5 text-muted-foreground">
                    Colecione edições escassas
                    diretamente dos criadores antes da
                    revelação pública.
                  </p>

                  <button
                    type="button"
                    onClick={handleExplore}
                    className="mt-6 w-fit text-xs font-bold text-primary transition-colors hover:text-accent"
                  >
                    Explorar →
                  </button>
                </div>
              </div>
            </article>

            <article className="overflow-hidden rounded-[8px] bg-card">
              <div className="grid min-h-[260px] grid-cols-[0.9fr_1.1fr]">
                <div className="relative overflow-hidden">
                  <img
                    src="/images/nfts/sage-nomad-009.png"
                    alt="Arte digital selecionada"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 lg:p-8">
                  <h2 className="text-xl font-bold leading-snug text-foreground">
                    Arte digital selecionada
                    <br />
                    e muito mais
                  </h2>

                  <p className="mt-4 text-xs leading-5 text-muted-foreground">
                    Explore novos artistas, coleções
                    verificadas e obras digitais que
                    definem a cultura.
                  </p>

                  <button
                    type="button"
                    onClick={handleExplore}
                    className="mt-6 w-fit text-xs font-bold text-primary transition-colors hover:text-accent"
                  >
                    Explorar →
                  </button>
                </div>
              </div>
            </article>
          </div>
        </Section>

        <Section
          aria-labelledby="mint-journal-title"
          className="pt-10 lg:pt-14"
        >
          <header className="mx-auto max-w-2xl text-center">
            <h2
              id="mint-journal-title"
              className="text-2xl font-bold text-foreground sm:text-3xl"
            >
              Diário da Cunhagem
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Histórias, guias e insights para
              colecionadores sobre o universo da
              propriedade digital.
            </p>
          </header>

          <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {journalArticles.map(
              (article) => (
                <article
                  key={article.title}
                  className="min-w-0"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-[8px] bg-card">
                    <img
                      src={article.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </div>

                  <p className="mt-4 text-[10px] leading-4 text-primary">
                    {article.meta}
                  </p>

                  <h3 className="mt-3 text-base font-bold leading-6 text-foreground">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    {
                      article.description
                    }
                  </p>

                  <button
                    type="button"
                    className="mt-4 text-xs font-bold text-primary transition-colors hover:text-accent"
                  >
                    Ler mais →
                  </button>
                </article>
              ),
            )}
          </div>
        </Section>
      </PageContainer>

      <section
        aria-label="Benefícios Kurio"
        className="mt-4 border-y border-border bg-card"
      >
        <PageContainer>
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            <article className="border-b border-border px-6 py-9 md:border-r lg:border-b-0 lg:px-7">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                W
              </div>

              <h2 className="mt-6 text-sm font-bold text-foreground">
                Segurança da carteira
              </h2>

              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Proteja sua carteira e colecione arte
                digital verificada com confiança.
              </p>
            </article>

            <article className="border-b border-border px-6 py-9 lg:border-b-0 lg:border-r lg:px-7">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                C
              </div>

              <h2 className="mt-6 text-sm font-bold text-foreground">
                Criadores em destaque
              </h2>

              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Conheça artistas, estúdios e
                comunidades que moldam a cultura
                digital na rede.
              </p>
            </article>

            <article className="border-b border-border px-6 py-9 md:border-r lg:border-b-0 lg:px-7">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                D
              </div>

              <h2 className="mt-6 text-sm font-bold text-foreground">
                Alertas de lançamentos
              </h2>

              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Receba calendários de cunhagem,
                novidades de listas de acesso e
                análises do mercado.
              </p>
            </article>

            <article className="px-6 py-9 lg:px-7">
              <h2 className="text-lg font-bold leading-6 text-foreground">
                Antecipe-se ao próximo lançamento
              </h2>

              <form
                className="mt-5 flex"
                onSubmit={(event) =>
                  event.preventDefault()
                }
              >
                <label
                  htmlFor="launch-email"
                  className="sr-only"
                >
                  E-mail para alertas de lançamentos
                </label>

                <input
                  id="launch-email"
                  type="email"
                  placeholder="digite seu e-mail..."
                  className="min-w-0 flex-1 rounded-l-[4px] border border-border bg-background px-3 py-2.5 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />

                <button
                  type="submit"
                  className="rounded-r-[4px] bg-primary px-4 text-xs font-bold text-primary-foreground"
                >
                  Enviar
                </button>
              </form>

              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Receba lançamentos selecionados,
                histórias de criadores e novidades do
                mercado.
              </p>
            </article>
          </div>
        </PageContainer>
      </section>

      <footer className="bg-[#0e0907]">
        <PageContainer>
          <div className="grid gap-8 border-b border-border py-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:py-12">
            <div>
              <p className="text-base font-bold tracking-[0.3em] text-foreground">
                KURIO
              </p>

              <p className="mt-5 max-w-[260px] text-sm leading-6 text-muted-foreground">
                Feito para colecionadores,
                <br />
                criadores e cultura
              </p>

              <p className="mt-6 text-xs text-muted-foreground">
                contato@email.com
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                +55 11 4002 8922
              </p>
            </div>

            <FooterColumn
              title="Meu perfil"
              links={footerProfileLinks}
            />

            <FooterColumn
              title="Central de ajuda"
              links={footerHelpLinks}
            />

            <FooterColumn
              title="Coleções"
              links={footerCollectionLinks}
            />
          </div>

          <div className="grid gap-8 border-b border-border py-7 md:grid-cols-2 md:items-end">
            <div>
              <p className="text-xs font-bold text-foreground">
                Redes sociais
              </p>

              <div className="mt-4 flex gap-3">
                {['I', 'X', 'D'].map(
                  (network) => (
                    <span
                      key={network}
                      className="flex size-8 items-center justify-center rounded-full border border-border text-[10px] font-bold text-muted-foreground"
                    >
                      {network}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="md:text-right">
              <p className="text-xs font-bold text-foreground">
                Carteiras compatíveis
              </p>

              <p className="mt-4 text-xs font-bold tracking-[0.12em] text-muted-foreground">
                METAMASK • WALLETCONNECT • COINBASE
              </p>
            </div>
          </div>

          <p className="py-6 text-center text-[11px] text-muted-foreground">
            © 2026 Kurio. Propriedade digital para todos.
          </p>
        </PageContainer>
      </footer>
    </>
  )
}

interface FooterColumnProps {
  title: string
  links: readonly string[]
}

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h2 className="text-xs font-bold text-foreground">
        {title}
      </h2>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <span className="text-xs text-muted-foreground">
              {link}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}