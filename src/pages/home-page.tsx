import { PageContainer } from '@/components/layout/page-container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { useNfts } from '@/features/catalog'

export function HomePage() {
  const nftsQuery = useNfts()

  return (
    <PageContainer>
      <Section>
        <p className="mb-3 text-sm tracking-wide text-primary">
          Bem-vindo à Kurio
        </p>

        <h1 className="max-w-xl text-3xl font-bold uppercase leading-tight md:text-4xl lg:text-5xl">
          Seja dono da cultura digital
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
          Descubra NFTs selecionados de criadores do mundo todo.
        </p>

        <Button className="mt-6">
          Explorar
        </Button>
      </Section>

      <Section aria-labelledby="catalog-title">
        <h2
          id="catalog-title"
          className="text-xl font-semibold uppercase"
        >
          NFTs em destaque
        </h2>

        {nftsQuery.isPending && (
          <p className="mt-4 text-muted-foreground">
            Carregando NFTs...
          </p>
        )}

        {nftsQuery.isError && (
          <p
            role="alert"
            className="mt-4 text-destructive"
          >
            Não foi possível carregar os NFTs.
          </p>
        )}

        {nftsQuery.isSuccess && (
          <p className="mt-4 text-muted-foreground">
            {nftsQuery.data.total} NFTs disponíveis
          </p>
        )}
      </Section>
    </PageContainer>
  )
}