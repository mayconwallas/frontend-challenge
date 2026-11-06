import { PageContainer } from '@/components/layout/page-container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import {
  CatalogFeedback,
  CatalogSidebar,
  CatalogToolbar,
  NftGrid,
  useNfts,
} from '@/features/catalog'

export function HomePage() {
  const nftsQuery = useNfts()

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
          <CatalogSidebar />

          <div className="min-w-0 flex-1 lg:max-w-[842px]">
            <CatalogToolbar />

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
                <NftGrid nfts={nftsQuery.data.items} />
              )}
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}