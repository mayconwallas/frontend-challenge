import { useState } from 'react'
import { Link } from '@tanstack/react-router'

import { PageContainer } from '@/components/layout/page-container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { useAddCartItem } from '@/features/cart'
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

type DetailTab = 'details' | 'reviews'

export function NftDetailPage({
  nftId,
}: NftDetailPageProps) {
  const nftQuery = useNft(nftId)
  const addCartItemMutation = useAddCartItem()

  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] =
    useState<DetailTab>('details')

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

  if (
    nftQuery.isError ||
    !nftQuery.data
  ) {
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
              O NFT solicitado não existe ou não está
              mais disponível.
            </p>

            <Link
              to="/"
              className="mt-6 text-sm font-medium text-primary transition-colors hover:text-accent"
            >
              Voltar ao catálogo
            </Link>
          </div>
        </Section>
      </PageContainer>
    )
  }

  const nft = nftQuery.data.item

  const totalPrice = (
    Number(nft.priceEth) * quantity
  ).toFixed(4)

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(1, current - 1),
    )
  }

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(
        nft.availableEditions,
        current + 1,
      ),
    )
  }

  function handleAddToCart() {
    addCartItemMutation.mutate({
      nftId: nft.id,
    })
  }

  return (
    <PageContainer>
      <Section>
        <nav
          aria-label="Navegação estrutural"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground lg:mb-8"
        >
          <Link
            to="/"
            className="transition-colors hover:text-primary"
          >
            Início
          </Link>

          <span aria-hidden="true">/</span>

          <span>{nft.collection}</span>

          <span aria-hidden="true">/</span>

          <span className="text-foreground">
            {nft.name}
          </span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:gap-12">
          <section
            aria-label="Galeria do NFT"
            className="min-w-0"
          >
            <div className="relative overflow-hidden border border-border bg-card">
              <img
                src={nft.imageUrl}
                alt={nft.name}
                className="aspect-square w-full object-cover"
              />

              <div className="absolute right-4 top-4">
                <FavoriteButton
                  nftId={nft.id}
                />
              </div>

              {nft.isTrending && (
                <span className="absolute left-4 top-4 border border-primary bg-background/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                  Em alta
                </span>
              )}
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map(
                (thumbnail) => (
                  <button
                    key={thumbnail}
                    type="button"
                    aria-label={`Visualizar imagem ${thumbnail} de ${nft.name}`}
                    className={`overflow-hidden border bg-card ${
                      thumbnail === 1
                        ? 'border-primary'
                        : 'border-border'
                    }`}
                  >
                    <img
                      src={nft.imageUrl}
                      alt=""
                      className="aspect-square w-full object-cover"
                    />
                  </button>
                ),
              )}
            </div>
          </section>

          <section className="min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-primary">
                  {nft.collection}
                </p>

                <h1 className="mt-2 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                  {nft.name}
                </h1>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="text-primary">
                ★★★★★
              </span>

              <span className="text-muted-foreground">
                Coleção verificada
              </span>
            </div>

            <div className="mt-7 border-y border-border py-5">
              <p className="text-sm text-muted-foreground">
                Preço atual
              </p>

              <p className="mt-2 text-3xl font-bold text-primary">
                {nft.priceEth} ETH
              </p>

              {quantity > 1 && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Total para {quantity} unidades:{' '}
                  <span className="font-medium text-foreground">
                    {totalPrice} ETH
                  </span>
                </p>
              )}
            </div>

            <dl className="mt-6 space-y-4">
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
                  Coleção
                </dt>

                <dd className="text-sm font-medium text-foreground">
                  {nft.collection}
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

              <div className="flex items-center justify-between gap-6">
                <dt className="text-sm text-muted-foreground">
                  Identificador
                </dt>

                <dd className="max-w-[60%] break-all text-right text-sm font-medium text-foreground">
                  {nft.id}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-foreground">
                Quantidade
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  aria-label={`Diminuir quantidade de ${nft.name}`}
                  disabled={quantity <= 1}
                  onClick={decreaseQuantity}
                  className="flex h-11 w-11 items-center justify-center border border-border text-lg transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>

                <output
                  aria-label="Quantidade selecionada"
                  className="flex h-11 min-w-14 items-center justify-center border border-border px-4 font-semibold"
                >
                  {quantity}
                </output>

                <button
                  type="button"
                  aria-label={`Aumentar quantidade de ${nft.name}`}
                  disabled={
                    quantity >=
                    nft.availableEditions
                  }
                  onClick={increaseQuantity}
                  className="flex h-11 w-11 items-center justify-center border border-border text-lg transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  +
                </button>

                <span className="text-xs text-muted-foreground">
                  Máximo: {nft.availableEditions}
                </span>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                disabled={
                  addCartItemMutation.isPending
                }
                onClick={handleAddToCart}
                className="h-12 w-full rounded-[6px] px-6 text-base font-bold"
              >
                {addCartItemMutation.isPending
                  ? 'Adicionando...'
                  : 'Comprar NFT'}
              </Button>

              <Button
                type="button"
                disabled={
                  addCartItemMutation.isPending
                }
                onClick={handleAddToCart}
                className="h-12 w-full rounded-[6px] border border-primary bg-transparent px-6 text-base font-bold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Adicionar ao carrinho
              </Button>
            </div>

            {addCartItemMutation.isSuccess && (
              <p
                role="status"
                className="mt-4 text-sm text-primary"
              >
                NFT adicionado ao carrinho.
              </p>
            )}

            {addCartItemMutation.isError && (
              <p
                role="alert"
                className="mt-4 text-sm text-red-500"
              >
                Não foi possível adicionar o NFT ao
                carrinho.
              </p>
            )}
          </section>
        </div>

        <section className="mt-12 border-t border-border pt-8 lg:mt-16">
          <div
            role="tablist"
            aria-label="Informações sobre o NFT"
            className="flex gap-6 border-b border-border"
          >
            <button
              type="button"
              role="tab"
              aria-selected={
                activeTab === 'details'
              }
              onClick={() =>
                setActiveTab('details')
              }
              className={`border-b-2 px-1 pb-4 text-sm font-semibold transition-colors ${
                activeTab === 'details'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Detalhes do NFT
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={
                activeTab === 'reviews'
              }
              onClick={() =>
                setActiveTab('reviews')
              }
              className={`border-b-2 px-1 pb-4 text-sm font-semibold transition-colors ${
                activeTab === 'reviews'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Avaliações
            </button>
          </div>

          {activeTab === 'details' ? (
            <div
              role="tabpanel"
              className="grid gap-8 pt-7 lg:grid-cols-[minmax(0,1fr)_320px]"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  Sobre a obra
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                  Obra digital disponível na Kurio.
                  Consulte as informações da coleção,
                  edição, rede e disponibilidade antes
                  de continuar com a compra.
                </p>
              </div>

              <div className="border border-border bg-card p-5">
                <h3 className="font-semibold">
                  Atributos
                </h3>

                <dl className="mt-4 space-y-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                      Coleção
                    </dt>

                    <dd className="text-right font-medium">
                      {nft.collection}
                    </dd>
                  </div>

                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                      Criador
                    </dt>

                    <dd className="text-right font-medium">
                      {nft.creator}
                    </dd>
                  </div>

                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                      Rede
                    </dt>

                    <dd className="text-right font-medium">
                      {networkLabels[nft.network]}
                    </dd>
                  </div>

                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                      Disponibilidade
                    </dt>

                    <dd className="text-right font-medium">
                      {nft.availableEditions}{' '}
                      edições
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ) : (
            <div
              role="tabpanel"
              className="py-10"
            >
              <h2 className="text-xl font-semibold">
                Avaliações
              </h2>

              <p className="mt-3 text-sm text-muted-foreground">
                Ainda não há avaliações publicadas para
                este NFT.
              </p>
            </div>
          )}
        </section>

        <section className="mt-12 border-t border-border pt-8 lg:mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-primary">
                {nft.collection}
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                Mais desta coleção
              </h2>
            </div>

            <Link
              to="/"
              className="text-sm font-medium text-primary transition-colors hover:text-accent"
            >
              Explorar catálogo
            </Link>
          </div>

          <div className="mt-6 border border-dashed border-border px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              Explore outros NFTs da coleção{' '}
              <span className="font-medium text-foreground">
                {nft.collection}
              </span>
              .
            </p>

            <Link
              to="/"
              className="mt-4 inline-block text-sm font-medium text-primary"
            >
              Ver catálogo
            </Link>
          </div>
        </section>
      </Section>
    </PageContainer>
  )
}