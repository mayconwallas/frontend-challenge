import { Link } from '@tanstack/react-router'

import { PageContainer } from '@/components/layout/page-container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { useNft } from '@/features/catalog'
import { FavoriteButton } from '@/features/favorites'

interface NftDetailPageProps {
  nftId: string
}

const networkLabels = {
  ethereum: 'Ethereum',
  polygon: 'Polygon',
  solana: 'Solana',
} as const

export function NftDetailPage({
  nftId,
}: NftDetailPageProps) {
  const nftQuery = useNft(nftId)

  if (nftQuery.isPending) {
    return (
      <PageContainer>
        <Section>
          <div
            role="status"
            className="flex min-h-[320px] items-center justify-center"
          >
            <p className="text-sm text-muted-foreground">
              Carregando NFT...
            </p>
          </div>
        </Section>
      </PageContainer>
    )
  }

  if (nftQuery.isError) {
    return (
      <PageContainer>
        <Section>
          <div
            role="alert"
            className="flex min-h-[320px] flex-col items-center justify-center text-center"
          >
            <h1 className="text-2xl font-bold text-foreground">
              NFT não encontrado
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              O NFT solicitado não existe ou não está mais disponível.
            </p>

            <Link
              to="/"
              className="mt-6 text-sm font-medium text-accent transition-colors hover:text-primary"
            >
              ← Voltar ao catálogo
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
          className="mb-6 inline-flex text-sm text-muted-foreground transition-colors hover:text-accent lg:mb-8"
        >
          ← Voltar ao catálogo
        </Link>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="mx-auto w-full max-w-[520px] lg:mx-0">
            <div className="bg-card p-1">
              <img
                src={nft.imageUrl}
                alt={`NFT ${nft.name}`}
                className="aspect-square w-full rounded-[15px] object-cover"
              />
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-[14px] font-medium uppercase leading-4 tracking-[0.1em] text-muted-foreground">
              {nft.collection.replace('-', ' ')}
            </p>

            <div className="mt-3 flex items-start justify-between gap-4">
              <h1 className="min-w-0 text-[28px] font-bold leading-tight text-foreground sm:text-[34px] lg:text-[43px] lg:leading-[56px]">
                {nft.name}
              </h1>

              <FavoriteButton
                nftId={nft.id}
                className="mt-1 shrink-0"
              />
            </div>

            <p className="mt-6 text-[24px] font-bold leading-none text-accent">
              {nft.priceEth} ETH
            </p>

            <div className="mt-8 border-y border-border py-6">
              <dl className="space-y-5">
                <div className="flex items-center justify-between gap-6">
                  <dt className="text-sm text-muted-foreground">
                    Criador
                  </dt>

                  <dd className="text-sm font-medium text-foreground">
                    {nft.creator}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-6">
                  <dt className="text-sm text-muted-foreground">
                    Rede
                  </dt>

                  <dd className="text-sm font-medium text-foreground">
                    {networkLabels[nft.network]}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-6">
                  <dt className="text-sm text-muted-foreground">
                    Edições disponíveis
                  </dt>

                  <dd className="text-sm font-medium text-foreground">
                    {nft.availableEditions}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8">
              <p className="text-sm leading-6 text-muted-foreground">
                Obra digital disponível na Kurio. Consulte as
                informações da edição, rede e disponibilidade antes
                de continuar com a compra.
              </p>
            </div>

            <Button
              type="button"
              className="mt-8 h-10 w-full rounded-[6px] px-7 text-[16px] font-bold lg:w-auto"
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}