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

const PAGE_SIZE = 3

export function HomePage() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: '/' })

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

  function handlePageChange(page: number) {
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
    <PageContainer>
      <Section>
        <div className="overflow-hidden border border-border bg-card">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)]">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Bem-vindo à Kurio
              </p>

              <h1 className="mt-5 max-w-[650px] text-4xl font-bold uppercase leading-[1.08] text-foreground sm:text-5xl lg:text-[58px]">
                Seja dono da cultura digital
              </h1>

              <p className="mt-6 max-w-[560px] text-sm leading-7 text-muted-foreground sm:text-base">
                Descubra NFTs selecionados de
                criadores do mundo todo e encontre
                novas obras para sua coleção.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  onClick={handleExplore}
                  className="h-12 px-8 text-base font-bold"
                >
                  Explorar NFTs
                </Button>

                <button
                  type="button"
                  onClick={handleExplore}
                  className="h-12 border border-border px-8 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Ver coleções
                </button>
              </div>

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Mercado
                  </dt>

                  <dd className="mt-1 font-semibold text-foreground">
                    NFTs
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Redes
                  </dt>

                  <dd className="mt-1 font-semibold text-foreground">
                    3
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Compra
                  </dt>

                  <dd className="mt-1 font-semibold text-foreground">
                    Segura
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative min-h-[300px] border-t border-border bg-background lg:min-h-[520px] lg:border-l lg:border-t-0">
              <div className="absolute inset-6 border border-primary/30 sm:inset-8">
                <div className="absolute inset-4 border border-border">
                  <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-primary">
                        Kurio Marketplace
                      </p>

                      <p className="mt-3 max-w-xs text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                        Arte digital para uma nova
                        geração de colecionadores.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="aspect-[4/3] bg-primary/20" />
                      <div className="aspect-[4/3] translate-y-5 bg-primary/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="marketplace"
        aria-label="Marketplace"
      >
        <div className="mb-8 flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              Marketplace
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-foreground">
              Coleções
            </h2>
          </div>

          {nftsQuery.isSuccess && (
            <p className="text-sm text-muted-foreground">
              {nftsQuery.data.total}{' '}
              {nftsQuery.data.total === 1
                ? 'NFT encontrado'
                : 'NFTs encontrados'}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
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
              onTabChange={
                handleTabChange
              }
              onSortChange={
                handleSortChange
              }
            />

            <div className="mt-6">
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

      <Section aria-label="Destaque Kurio">
        <div className="grid overflow-hidden border border-border md:grid-cols-2">
          <div className="bg-primary px-6 py-10 text-primary-foreground sm:px-8 lg:px-10 lg:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">
              Seleção Kurio
            </p>

            <h2 className="mt-4 max-w-md text-3xl font-bold uppercase leading-tight">
              Descubra novas expressões da cultura
              digital
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 opacity-80">
              Explore coleções, acompanhe os NFTs em
              alta e monte sua seleção de favoritos.
            </p>

            <button
              type="button"
              onClick={handleExplore}
              className="mt-7 border border-current px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
            >
              Explorar marketplace
            </button>
          </div>

          <div className="grid min-h-[260px] grid-cols-2 gap-px bg-border">
            <div className="bg-card p-6">
              <p className="text-xs uppercase tracking-wider text-primary">
                Novos
              </p>

              <p className="mt-3 text-xl font-semibold">
                Novos lançamentos
              </p>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Conheça as obras que acabaram de
                chegar à Kurio.
              </p>
            </div>

            <div className="bg-card p-6">
              <p className="text-xs uppercase tracking-wider text-primary">
                Trending
              </p>

              <p className="mt-3 text-xl font-semibold">
                Em alta
              </p>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Veja quais NFTs estão recebendo mais
                atenção no marketplace.
              </p>
            </div>

            <div className="col-span-2 bg-card p-6">
              <p className="text-xs uppercase tracking-wider text-primary">
                Colecione
              </p>

              <p className="mt-3 text-xl font-semibold">
                Sua coleção, suas escolhas
              </p>

              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Favorite obras, organize suas
                carteiras e acompanhe cada compra em
                um único lugar.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section aria-label="Newsletter">
        <div className="border-y border-border py-10 text-center sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Diário da Kurio
          </p>

          <h2 className="mx-auto mt-3 max-w-xl text-2xl font-semibold sm:text-3xl">
            Acompanhe novidades da cultura digital
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
            Descubra novos criadores, coleções e
            tendências do universo NFT.
          </p>

          <form
            className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row"
            onSubmit={(event) =>
              event.preventDefault()
            }
          >
            <label
              htmlFor="newsletter-email"
              className="sr-only"
            >
              E-mail para newsletter
            </label>

            <input
              id="newsletter-email"
              type="email"
              placeholder="seu@email.com"
              className="min-w-0 flex-1 border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
            />

            <button
              type="submit"
              className="bg-primary px-6 py-3 font-semibold text-primary-foreground"
            >
              Assinar
            </button>
          </form>
        </div>
      </Section>
    </PageContainer>
  )
}