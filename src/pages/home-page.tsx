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
        className="pt-8 lg:pt-10"
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