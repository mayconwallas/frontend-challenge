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
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <p>Carregando carrinho...</p>
      </main>
    )
  }

  if (cartQuery.isError) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <p>Não foi possível carregar o carrinho.</p>
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
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            Sua seleção
          </p>

          <h1 className="mt-1 text-3xl font-semibold">
            Carrinho
          </h1>
        </div>

        {items.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {cartQuery.data.totalItems}{' '}
            {cartQuery.data.totalItems === 1
              ? 'item'
              : 'itens'}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <section className="border border-dashed border-border px-6 py-16 text-center">
          <h2 className="text-xl font-semibold">
            Seu carrinho está vazio.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Explore o catálogo e adicione NFTs para
            continuar com a compra.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            Explorar NFTs
          </Link>
        </section>
      ) : (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section className="min-w-0">
            <div className="hidden border-b border-border pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:grid lg:grid-cols-[minmax(280px,1fr)_140px_180px_130px] lg:gap-5">
              <span>Produto</span>
              <span>Preço</span>
              <span>Quantidade</span>
              <span className="text-right">
                Total
              </span>
            </div>

            <div>
              {items.map(({ nft, quantity }) => {
                const itemTotal = (
                  Number(nft.priceEth) * quantity
                ).toFixed(4)

                return (
                  <article
                    key={nft.id}
                    className="grid gap-5 border-b border-border py-6 lg:grid-cols-[minmax(280px,1fr)_140px_180px_130px] lg:items-center"
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
                          className="h-24 w-24 object-cover sm:h-28 sm:w-28"
                        />
                      </Link>

                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wider text-primary">
                          {nft.collection}
                        </p>

                        <Link
                          to="/nft/$nftId"
                          params={{
                            nftId: nft.id,
                          }}
                          className="mt-1 block"
                        >
                          <h2 className="text-base font-semibold sm:text-lg">
                            {nft.name}
                          </h2>
                        </Link>

                        <p className="mt-2 text-xs text-muted-foreground">
                          {nft.availableEditions}{' '}
                          edições disponíveis
                        </p>

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
                          className="mt-3 text-sm text-primary disabled:opacity-50 lg:hidden"
                        >
                          Remover
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-muted-foreground lg:hidden">
                        Preço
                      </span>

                      <p className="mt-1 font-medium text-primary lg:mt-0">
                        {nft.priceEth} ETH
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-muted-foreground lg:hidden">
                        Quantidade
                      </span>

                      <div className="mt-2 flex items-center gap-2 lg:mt-0">
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
                          className="flex h-10 w-10 items-center justify-center border border-border text-lg transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="flex h-10 min-w-12 items-center justify-center border border-border px-3 text-center font-medium">
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
                          className="flex h-10 w-10 items-center justify-center border border-border text-lg transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-end justify-between gap-4 lg:block lg:text-right">
                      <div>
                        <span className="text-xs text-muted-foreground lg:hidden">
                          Total
                        </span>

                        <p className="mt-1 font-semibold lg:mt-0">
                          {itemTotal} ETH
                        </p>
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
                        className="hidden text-sm text-primary disabled:opacity-50 lg:mt-3 lg:inline-block"
                      >
                        Remover
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>

            <Link
              to="/"
              className="mt-6 inline-block text-sm font-medium text-primary"
            >
              Continuar comprando
            </Link>
          </section>

          <aside className="h-fit border border-border bg-card p-5 sm:p-6 xl:sticky xl:top-6">
            <h2 className="text-xl font-semibold">
              Resumo do pedido
            </h2>

            <form
              onSubmit={handleApplyCoupon}
              className="mt-6"
            >
              <label
                htmlFor="coupon"
                className="mb-2 block text-sm font-medium"
              >
                Cupom de desconto
              </label>

              <div className="flex gap-2">
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
                  className="min-w-0 flex-1 border border-border bg-background px-3 py-2 outline-none transition-colors focus:border-primary"
                />

                <button
                  type="submit"
                  className="bg-primary px-4 py-2 font-medium text-primary-foreground"
                >
                  Aplicar
                </button>
              </div>
            </form>

            {appliedCoupon &&
              quoteQuery.isSuccess && (
                <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                  <span className="text-primary">
                    Cupom{' '}
                    {quoteQuery.data.coupon}{' '}
                    aplicado
                  </span>

                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-muted-foreground transition-colors hover:text-primary"
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
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">
                    Subtotal
                  </dt>

                  <dd>
                    {
                      quoteQuery.data
                        .subtotalEth
                    }{' '}
                    ETH
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">
                    Desconto
                  </dt>

                  <dd>
                    −{' '}
                    {
                      quoteQuery.data
                        .discountEth
                    }{' '}
                    ETH
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">
                    Taxa de rede
                  </dt>

                  <dd>
                    {
                      quoteQuery.data
                        .networkFeeEth
                    }{' '}
                    ETH
                  </dd>
                </div>

                <div className="flex justify-between gap-4 border-t border-border pt-5 text-base font-semibold">
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
                  className="mt-6 block w-full bg-primary px-5 py-3 text-center font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Conectar e finalizar
                </Link>

                <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                  A cotação será revalidada antes
                  da confirmação da compra.
                </p>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  )
}