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

  function handleTabChange(tab: typeof filters.tab) {
    void navigate({
      search: (previous) => ({
        ...previous,
        tab: tab === 'all' ? undefined : tab,
        page: undefined,
      }),
    })
  }

  function handleSortChange(sort: typeof filters.sort) {
    void navigate({
      search: (previous) => ({
        ...previous,
        sort: sort === 'recent' ? undefined : sort,
        page: undefined,
      }),
    })
  }

  function handleCollectionChange(collection?: string) {
    void navigate({
      search: (previous) => ({
        ...previous,
        collection,
        page: undefined,
      }),
    })
  }

  function handleNetworkChange(network?: string) {
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
        page: page === 1 ? undefined : page,
      }),
    })
  }

  return (
    <PageContainer>
      <Section>
        <p className="mb-3 text-sm tracking-wide text-foreground">
          Bem-vindo à Kurio
        </p>

        <h1 className="max-w-[600px] text-3xl font-bold uppercase leading-tight md:text-4xl lg:text-[43px] lg:leading-[70px]">
          Seja dono da cultura digital
        </h1>

        <p className="mt-4 max-w-[557px] text-sm leading-6 text-muted-foreground">
          Descubra NFTs selecionados de criadores do mundo todo.
        </p>

        <Button className="mt-8">
          Explorar
        </Button>
      </Section>

      <Section aria-label="Marketplace">
        <div className="flex items-start gap-12">
          <CatalogSidebar
            collection={filters.collection}
            network={filters.network}
            onCollectionChange={handleCollectionChange}
            onNetworkChange={handleNetworkChange}
          />

          <div className="min-w-0 flex-1 lg:max-w-[842px]">
            <CatalogToolbar
              tab={filters.tab}
              sort={filters.sort}
              onTabChange={handleTabChange}
              onSortChange={handleSortChange}
            />

            {nftsQuery.isPending && (
              <CatalogFeedback type="loading" />
            )}

            {nftsQuery.isError && (
              <CatalogFeedback type="error" />
            )}

            {nftsQuery.isSuccess &&
              nftsQuery.data.items.length === 0 && (
                <CatalogFeedback type="empty" />
              )}

            {nftsQuery.isSuccess &&
              nftsQuery.data.items.length > 0 && (
                <>
                  <NftGrid nfts={nftsQuery.data.items} />

                  <CatalogPagination
                    page={filters.page}
                    total={nftsQuery.data.total}
                    pageSize={PAGE_SIZE}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}