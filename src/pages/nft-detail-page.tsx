import { Link } from '@tanstack/react-router'

import { PageContainer } from '@/components/layout/page-container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { useNft } from '@/features/catalog'

interface NftDetailPageProps {
  nftId: string
}

export function NftDetailPage({
  nftId,
}: NftDetailPageProps) {
  const nftQuery = useNft(nftId)

  if (nftQuery.isPending) {
    return (
      <PageContainer>
        <Section>
          <p className="text-muted-foreground">
            Carregando NFT...
          </p>
        </Section>
      </PageContainer>
    )
  }

  if (nftQuery.isError) {
    return (
      <PageContainer>
        <Section>
          <div role="alert">
            <h1 className="text-2xl font-bold text-foreground">
              NFT não encontrado
            </h1>

            <Link
              to="/"
              className="mt-4 inline-block text-accent"
            >
              Voltar ao catálogo
            </Link>
          </div>
        </Section>
      </PageContainer>
    )
  }

  const nft = nftQuery.data.item

  return (
    <PageContainer>
      <Section>
        <Link
          to="/"
          className="mb-8 inline-block text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          ← Voltar ao catálogo
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-[15px] bg-card">
            <img
              src={nft.imageUrl}
              alt={`NFT ${nft.name}`}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.1em] text-muted-foreground">
              {nft.collection}
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground lg:text-[43px] lg:leading-[56px]">
              {nft.name}
            </h1>

            <p className="mt-6 text-[24px] font-bold text-accent">
              {nft.priceEth} ETH
            </p>

            <dl className="mt-8 space-y-4 border-y border-border py-6">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">
                  Criador
                </dt>

                <dd className="text-foreground">
                  {nft.creator}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">
                  Rede
                </dt>

                <dd className="capitalize text-foreground">
                  {nft.network}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">
                  Edições disponíveis
                </dt>

                <dd className="text-foreground">
                  {nft.availableEditions}
                </dd>
              </div>
            </dl>

            <Button className="mt-8 w-full lg:w-fit">
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}