import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from '@tanstack/react-router'

import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from '@/features/cart'
import { useQuote } from '@/features/checkout'

export function CartPage() {
  const [couponInput, setCouponInput] =
    useState('')

  const [appliedCoupon, setAppliedCoupon] =
    useState<string | undefined>()

  const cartQuery = useCart()
  const quoteQuery = useQuote(appliedCoupon)
  const updateCartItem = useUpdateCartItem()
  const removeCartItem = useRemoveCartItem()

  if (cartQuery.isPending) {
    return (
      <main className="mx-auto flex min-h-[420px] w-full max-w-[1200px] items-center justify-center px-4">
        <p
          role="status"
          className="text-sm text-muted-foreground"
        >
          Carregando carrinho...
        </p>
      </main>
    )
  }

  if (cartQuery.isError) {
    return (
      <main className="mx-auto flex min-h-[420px] w-full max-w-[1200px] items-center justify-center px-4">
        <p
          role="alert"
          className="text-sm text-red-500"
        >
          Não foi possível carregar o carrinho.
        </p>
      </main>
    )
  }

  const items = cartQuery.data.items

  function handleApplyCoupon(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const coupon = couponInput.trim()

    if (!coupon) {
      return
    }

    setAppliedCoupon(coupon)
  }

  function handleRemoveCoupon() {
    setCouponInput('')
    setAppliedCoupon(undefined)
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-7 sm:px-6 lg:pb-16 lg:pt-12">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          aria-label="Voltar ao catálogo"
          className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
        >
          ←
        </Link>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            Sua seleção
          </p>

          <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
            Carrinho
          </h1>
        </div>

        {items.length > 0 && (
          <p className="ml-auto text-xs text-muted-foreground">
            {cartQuery.data.totalItems}{' '}
            {cartQuery.data.totalItems === 1
              ? 'item'
              : 'itens'}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <section className="mt-8 rounded-[12px] border border-dashed border-border bg-card px-6 py-16 text-center">
          <h2 className="text-xl font-bold text-foreground">
            Seu carrinho está vazio.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Explore o catálogo e adicione NFTs para
            continuar com a compra.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex rounded-[5px] bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Explorar NFTs
          </Link>
        </section>
      ) : (
        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="min-w-0">
            <div className="hidden border-b border-border pb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground lg:grid lg:grid-cols-[minmax(280px,1fr)_130px_170px_120px] lg:gap-5">
              <span>NFT</span>
              <span>Preço</span>
              <span>Edições</span>
              <span className="text-right">
                Total
              </span>
            </div>

            <div className="space-y-4 lg:space-y-0">
              {items.map(({ nft, quantity }) => {
                const itemTotal = (
                  Number(nft.priceEth) * quantity
                ).toFixed(4)

                return (
                  <article
                    key={nft.id}
                    className="rounded-[12px] bg-card p-4 lg:grid lg:grid-cols-[minmax(280px,1fr)_130px_170px_120px] lg:items-center lg:gap-5 lg:rounded-none lg:border-b lg:border-border lg:bg-transparent lg:px-0 lg:py-6"
                  >
                    <div className="flex min-w-0 gap-4">
                      <Link
                        to="/nft/$nftId"
                        params={{
                          nftId: nft.id,
                        }}
                        className="shrink-0"
                      >
                        <img
                          src={nft.imageUrl}
                          alt={nft.name}
                          width={112}
                          height={112}
                          className="size-24 rounded-[10px] object-cover sm:size-28"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          {nft.collection}
                        </p>

                        <Link
                          to="/nft/$nftId"
                          params={{
                            nftId: nft.id,
                          }}
                          className="mt-2 block"
                        >
                          <h2 className="text-sm font-bold text-foreground sm:text-base">
                            {nft.name}
                          </h2>
                        </Link>

                        <p className="mt-2 text-xs text-muted-foreground">
                          {nft.availableEditions}{' '}
                          edições disponíveis
                        </p>

                        <p className="mt-3 text-sm font-bold text-primary lg:hidden">
                          {nft.priceEth} ETH
                        </p>
                      </div>
                    </div>

                    <p className="hidden text-sm font-bold text-primary lg:block">
                      {nft.priceEth} ETH
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-4 lg:mt-0 lg:block">
                      <div className="flex items-center">
                        <button
                          type="button"
                          aria-label={`Diminuir quantidade de ${nft.name}`}
                          disabled={
                            quantity <= 1 ||
                            updateCartItem.isPending
                          }
                          onClick={() =>
                            updateCartItem.mutate({
                              nftId: nft.id,
                              quantity:
                                quantity - 1,
                            })
                          }
                          className="flex size-9 items-center justify-center rounded-l-[5px] border border-border text-base hover:border-primary hover:text-primary disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="flex h-9 min-w-10 items-center justify-center border-y border-border px-2 text-sm font-bold">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Aumentar quantidade de ${nft.name}`}
                          disabled={
                            quantity >=
                              nft.availableEditions ||
                            updateCartItem.isPending
                          }
                          onClick={() =>
                            updateCartItem.mutate({
                              nftId: nft.id,
                              quantity:
                                quantity + 1,
                            })
                          }
                          className="flex size-9 items-center justify-center rounded-r-[5px] border border-border text-base hover:border-primary hover:text-primary disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeCartItem.mutate(
                            nft.id,
                          )
                        }
                        disabled={
                          removeCartItem.isPending
                        }
                        className="text-xs text-primary disabled:opacity-50 lg:mt-3"
                      >
                        Remover
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4 lg:mt-0 lg:block lg:border-0 lg:pt-0 lg:text-right">
                      <span className="text-xs text-muted-foreground lg:hidden">
                        Total
                      </span>

                      <p className="text-sm font-bold text-foreground">
                        {itemTotal} ETH
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>

            <Link
              to="/"
              className="mt-6 inline-flex text-xs font-bold text-primary"
            >
              ← Continuar comprando
            </Link>
          </section>

          <aside className="h-fit rounded-[12px] border border-border bg-card p-5 sm:p-6 xl:sticky xl:top-6">
            <h2 className="text-lg font-bold text-foreground">
              Resumo do pedido
            </h2>

            <form
              onSubmit={handleApplyCoupon}
              className="mt-6"
            >
              <label
                htmlFor="coupon"
                className="mb-2 block text-xs font-bold"
              >
                Cupom de desconto
              </label>

              <div className="flex">
                <input
                  id="coupon"
                  type="text"
                  value={couponInput}
                  onChange={(event) =>
                    setCouponInput(
                      event.target.value,
                    )
                  }
                  placeholder="Código do cupom"
                  className="min-w-0 flex-1 rounded-l-[5px] border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />

                <button
                  type="submit"
                  className="rounded-r-[5px] bg-primary px-4 text-xs font-bold text-primary-foreground"
                >
                  Aplicar
                </button>
              </div>
            </form>

            {appliedCoupon &&
              quoteQuery.isSuccess && (
                <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                  <span className="text-primary">
                    Cupom{' '}
                    {quoteQuery.data.coupon}{' '}
                    aplicado
                  </span>

                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-muted-foreground hover:text-primary"
                  >
                    Remover
                  </button>
                </div>
              )}

            {appliedCoupon &&
              quoteQuery.isError && (
                <p
                  role="alert"
                  className="mt-3 text-sm text-red-500"
                >
                  Cupom inválido ou expirado.
                </p>
              )}

            {quoteQuery.isPending ? (
              <p
                role="status"
                className="mt-8 text-sm text-muted-foreground"
              >
                Calculando valores...
              </p>
            ) : quoteQuery.isSuccess ? (
              <dl className="mt-8 space-y-4 text-sm">
                <SummaryRow
                  label="Subtotal"
                  value={`${quoteQuery.data.subtotalEth} ETH`}
                />

                <SummaryRow
                  label="Desconto"
                  value={`− ${quoteQuery.data.discountEth} ETH`}
                />

                <SummaryRow
                  label="Taxa de rede"
                  value={`${quoteQuery.data.networkFeeEth} ETH`}
                />

                <div className="flex justify-between gap-4 border-t border-border pt-5 text-base font-bold">
                  <dt>Total</dt>

                  <dd className="text-primary">
                    {quoteQuery.data.totalEth}{' '}
                    ETH
                  </dd>
                </div>
              </dl>
            ) : null}

            {quoteQuery.isSuccess && (
              <>
                <Link
                  to="/checkout"
                  className="mt-6 block w-full rounded-[5px] bg-primary px-5 py-3 text-center text-sm font-bold text-primary-foreground"
                >
                  Conectar e finalizar
                </Link>

                <p className="mt-3 text-center text-[10px] leading-4 text-muted-foreground">
                  A cotação será revalidada antes da
                  confirmação da compra.
                </p>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  )
}

interface SummaryRowProps {
  label: string
  value: string
}

function SummaryRow({
  label,
  value,
}: SummaryRowProps) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">
        {label}
      </dt>

      <dd>{value}</dd>
    </div>
  )
}