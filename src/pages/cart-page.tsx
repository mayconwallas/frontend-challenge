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
  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<
    string | undefined
  >()

  const cartQuery = useCart()
  const quoteQuery = useQuote(appliedCoupon)
  const updateCartItem = useUpdateCartItem()
  const removeCartItem = useRemoveCartItem()

  if (cartQuery.isPending) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <p>Carregando carrinho...</p>
      </main>
    )
  }

  if (cartQuery.isError) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-12">
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
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="mb-10 text-3xl font-semibold">
        Carrinho
      </h1>

      {items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <section className="space-y-6">
            {items.map(({ nft, quantity }) => (
              <article
                key={nft.id}
                className="flex flex-col gap-6 border-b border-border pb-6 sm:flex-row sm:items-center"
              >
                <img
                  src={nft.imageUrl}
                  alt={nft.name}
                  className="h-32 w-32 rounded-md object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold">
                    {nft.name}
                  </h2>

                  <p className="mt-2 text-primary">
                    {nft.priceEth} ETH
                  </p>
                </div>

                <div className="flex items-center gap-3">
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
                        quantity: quantity - 1,
                      })
                    }
                    className="h-9 w-9 border border-border disabled:opacity-50"
                  >
                    −
                  </button>

                  <span className="min-w-8 text-center">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    aria-label={`Aumentar quantidade de ${nft.name}`}
                    disabled={
                      quantity >= nft.availableEditions ||
                      updateCartItem.isPending
                    }
                    onClick={() =>
                      updateCartItem.mutate({
                        nftId: nft.id,
                        quantity: quantity + 1,
                      })
                    }
                    className="h-9 w-9 border border-border disabled:opacity-50"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      removeCartItem.mutate(nft.id)
                    }
                    disabled={removeCartItem.isPending}
                    className="ml-3 text-sm text-primary disabled:opacity-50"
                  >
                    Remover
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit border border-border p-6">
            <h2 className="text-xl font-semibold">
              Resumo
            </h2>

            <form
              onSubmit={handleApplyCoupon}
              className="mt-6 space-y-3"
            >
              <label
                htmlFor="coupon"
                className="block text-sm font-medium"
              >
                Cupom
              </label>

              <div className="flex gap-2">
                <input
                  id="coupon"
                  type="text"
                  value={couponInput}
                  onChange={(event) =>
                    setCouponInput(event.target.value)
                  }
                  placeholder="Código do cupom"
                  className="min-w-0 flex-1 border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                />

                <button
                  type="submit"
                  className="bg-primary px-4 py-2 text-primary-foreground"
                >
                  Aplicar
                </button>
              </div>
            </form>

            {appliedCoupon && quoteQuery.isSuccess && (
              <div className="mt-3 flex items-center justify-between text-sm">
                <span>
                  Cupom {quoteQuery.data.coupon} aplicado
                </span>

                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-primary"
                >
                  Remover
                </button>
              </div>
            )}

            {appliedCoupon && quoteQuery.isError && (
              <p className="mt-3 text-sm text-red-500">
                Cupom inválido ou expirado.
              </p>
            )}

            {quoteQuery.isPending ? (
              <p className="mt-8 text-sm">
                Calculando valores...
              </p>
            ) : quoteQuery.isSuccess ? (
              <dl className="mt-8 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt>Subtotal</dt>

                  <dd>
                    {quoteQuery.data.subtotalEth} ETH
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt>Desconto</dt>

                  <dd>
                    − {quoteQuery.data.discountEth} ETH
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt>Taxa de rede</dt>

                  <dd>
                    {quoteQuery.data.networkFeeEth} ETH
                  </dd>
                </div>

                <div className="flex justify-between gap-4 border-t border-border pt-4 text-base font-semibold">
                  <dt>Total</dt>

                  <dd>
                    {quoteQuery.data.totalEth} ETH
                  </dd>
                </div>
              </dl>
            ) : null}

            {quoteQuery.isSuccess && (
              <Link
                to="/checkout"
                className="mt-6 block w-full bg-primary px-5 py-3 text-center font-medium text-primary-foreground"
              >
                Continuar para pagamento
              </Link>
            )}
          </aside>
        </div>
      )}
    </main>
  )
}