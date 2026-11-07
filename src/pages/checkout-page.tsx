import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { useSession } from '@/features/auth'
import { useCart } from '@/features/cart'
import {
  useCreateOrder,
} from '@/features/orders'
import type {
  OrderNetwork,
} from '@/features/orders'

export function CheckoutPage() {
  const navigate = useNavigate()

  const sessionQuery = useSession()
  const cartQuery = useCart()
  const createOrderMutation = useCreateOrder()

  const [name, setName] = useState(
    sessionQuery.data?.user.name ?? '',
  )

  const [email, setEmail] = useState(
    sessionQuery.data?.user.email ?? '',
  )

  const [walletAddress, setWalletAddress] =
    useState('')

  const [network, setNetwork] =
    useState<OrderNetwork>('ethereum')

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (!sessionQuery.data) {
      await navigate({
        to: '/login',
      })

      return
    }

    const response =
      await createOrderMutation.mutateAsync({
        customer: {
          name,
          email,
        },
        wallet: {
          id: crypto.randomUUID(),
          address: walletAddress,
          network,
        },
        idempotencyKey: crypto.randomUUID(),
      })

    await navigate({
  to: '/order/$orderId',
  params: {
    orderId: response.order.id,
  },
})
  }

  if (sessionQuery.isPending || cartQuery.isPending) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <p>Carregando pagamento...</p>
      </main>
    )
  }

  if (!sessionQuery.data) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold">
          Pagamento
        </h1>

        <p className="mt-4">
          Entre na sua conta para continuar a compra.
        </p>
      </main>
    )
  }

  if (
    cartQuery.isError ||
    !cartQuery.data ||
    cartQuery.data.items.length === 0
  ) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold">
          Pagamento
        </h1>

        <p className="mt-4">
          Seu carrinho está vazio.
        </p>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">
        Pagamento
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Revise os dados antes de finalizar sua compra.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-8"
      >
        <section className="space-y-5">
          <h2 className="text-xl font-semibold">
            Dados do colecionador
          </h2>

          <div>
            <label
              htmlFor="checkout-name"
              className="mb-2 block text-sm font-medium"
            >
              Nome
            </label>

            <input
              id="checkout-name"
              required
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="checkout-email"
              className="mb-2 block text-sm font-medium"
            >
              E-mail
            </label>

            <input
              id="checkout-email"
              type="email"
              required
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary"
            />
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl font-semibold">
            Carteira
          </h2>

          <div>
            <label
              htmlFor="wallet-address"
              className="mb-2 block text-sm font-medium"
            >
              Endereço da carteira
            </label>

            <input
              id="wallet-address"
              required
              value={walletAddress}
              onChange={(event) =>
                setWalletAddress(event.target.value)
              }
              placeholder="0x..."
              className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="network"
              className="mb-2 block text-sm font-medium"
            >
              Rede
            </label>

            <select
              id="network"
              value={network}
              onChange={(event) =>
                setNetwork(
                  event.target.value as OrderNetwork,
                )
              }
              className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary"
            >
              <option value="ethereum">
                Ethereum
              </option>

              <option value="polygon">
                Polygon
              </option>

              <option value="solana">
                Solana
              </option>
            </select>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            Itens do pedido
          </h2>

          <div className="mt-5 space-y-4">
            {cartQuery.data.items.map(
              ({ nft, quantity }) => (
                <div
                  key={nft.id}
                  className="flex items-center justify-between gap-4 border-b border-border pb-4"
                >
                  <div>
                    <p className="font-medium">
                      {nft.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Quantidade: {quantity}
                    </p>
                  </div>

                  <p className="text-sm">
                    {nft.priceEth} ETH
                  </p>
                </div>
              ),
            )}
          </div>
        </section>

        {createOrderMutation.isError && (
          <p
            role="alert"
            className="text-sm text-red-500"
          >
            Não foi possível criar o pedido.
          </p>
        )}

        <button
          type="submit"
          disabled={createOrderMutation.isPending}
          className="w-full bg-primary px-5 py-3 font-medium text-primary-foreground disabled:opacity-50"
        >
          {createOrderMutation.isPending
            ? 'Processando...'
            : 'Finalizar compra'}
        </button>
      </form>
    </main>
  )
}