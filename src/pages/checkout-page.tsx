import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Link,
  useNavigate,
} from '@tanstack/react-router'

import type { Session } from '@/features/auth'
import { useSession } from '@/features/auth'
import type { CartResponse } from '@/features/cart'
import { useCart } from '@/features/cart'
import type { OrderNetwork } from '@/features/orders'
import { useCreateOrder } from '@/features/orders'
import type {
  Wallet,
  WalletProvider,
} from '@/features/wallets'
import { useWallets } from '@/features/wallets'

const providerLabels: Record<
  WalletProvider,
  string
> = {
  walletconnect: 'WalletConnect',
  metamask: 'MetaMask',
  coinbase: 'Coinbase Wallet',
}

const networkLabels: Record<
  OrderNetwork,
  string
> = {
  ethereum: 'Ethereum',
  polygon: 'Polygon',
  solana: 'Solana',
}

export function CheckoutPage() {
  const sessionQuery = useSession()
  const cartQuery = useCart()
  const walletsQuery = useWallets()

  if (
    sessionQuery.isPending ||
    cartQuery.isPending ||
    walletsQuery.isPending
  ) {
    return (
      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <p>Carregando pagamento...</p>
      </main>
    )
  }

  if (!sessionQuery.data) {
    return (
      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold">
          Pagamento
        </h1>

        <p className="mt-4">
          Entre na sua conta para continuar a compra.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block text-primary"
        >
          Entrar
        </Link>
      </main>
    )
  }

  if (
    cartQuery.isError ||
    !cartQuery.data ||
    cartQuery.data.items.length === 0
  ) {
    return (
      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold">
          Pagamento
        </h1>

        <p className="mt-4">
          Seu carrinho está vazio.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block text-primary"
        >
          Voltar ao catálogo
        </Link>
      </main>
    )
  }

  if (
    walletsQuery.isError ||
    !walletsQuery.data
  ) {
    return (
      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold">
          Pagamento
        </h1>

        <p className="mt-4">
          Não foi possível carregar suas carteiras.
        </p>
      </main>
    )
  }

  return (
    <CheckoutForm
      session={sessionQuery.data}
      cart={cartQuery.data}
      wallets={walletsQuery.data.wallets}
    />
  )
}

interface CheckoutFormProps {
  session: Session
  cart: CartResponse
  wallets: Wallet[]
}

function CheckoutForm({
  session,
  cart,
  wallets,
}: CheckoutFormProps) {
  const navigate = useNavigate()
  const createOrderMutation = useCreateOrder()

  const primaryWallet = wallets.find(
    (wallet) => wallet.isPrimary,
  )

  const [name, setName] = useState(
    session.user.name,
  )

  const [email, setEmail] = useState(
    session.user.email,
  )

  const [selectedWalletId, setSelectedWalletId] =
    useState(
      primaryWallet?.id ??
        wallets[0]?.id ??
        'manual',
    )

  const [walletAddress, setWalletAddress] =
    useState('')

  const [network, setNetwork] =
    useState<OrderNetwork>('ethereum')

  const selectedWallet = wallets.find(
    (wallet) =>
      wallet.id === selectedWalletId,
  )

  const effectiveAddress =
    selectedWallet?.address ?? walletAddress

  const effectiveNetwork =
    selectedWallet?.network ?? network

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const response =
      await createOrderMutation.mutateAsync({
        customer: {
          name,
          email,
        },
        wallet: {
          id:
            selectedWallet?.id ??
            crypto.randomUUID(),
          address: effectiveAddress,
          network: effectiveNetwork,
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

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
      <h1 className="text-3xl font-semibold">
        Pagamento
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Revise os dados, selecione uma carteira e
        confirme sua compra.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]"
      >
        <div className="space-y-10">
          <section className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold">
                Perfil do colecionador
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Confirme os dados associados ao pedido.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
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
                  className="w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
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
                  className="w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Pagamento com carteira
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Escolha uma carteira cadastrada ou
                  informe outra manualmente.
                </p>
              </div>

              <Link
                to="/profile/wallets"
                className="text-sm text-primary"
              >
                Gerenciar carteiras
              </Link>
            </div>

            {wallets.length > 0 && (
              <div>
                <label
                  htmlFor="saved-wallet"
                  className="mb-2 block text-sm font-medium"
                >
                  Carteira
                </label>

                <select
                  id="saved-wallet"
                  value={selectedWalletId}
                  onChange={(event) =>
                    setSelectedWalletId(
                      event.target.value,
                    )
                  }
                  className="w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                >
                  {wallets.map((wallet) => (
                    <option
                      key={wallet.id}
                      value={wallet.id}
                    >
                      {wallet.nickname}
                      {wallet.isPrimary
                        ? ' (Principal)'
                        : ''}
                    </option>
                  ))}

                  <option value="manual">
                    Usar outra carteira
                  </option>
                </select>
              </div>
            )}

            {selectedWallet ? (
              <div className="border border-border bg-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      {selectedWallet.nickname}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {
                        providerLabels[
                          selectedWallet.provider
                        ]
                      }
                    </p>
                  </div>

                  {selectedWallet.isPrimary && (
                    <span className="border border-primary px-2 py-1 text-xs text-primary">
                      Principal
                    </span>
                  )}
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">
                      Rede
                    </dt>

                    <dd className="mt-1">
                      {
                        networkLabels[
                          selectedWallet.network
                        ]
                      }
                    </dd>
                  </div>

                  <div>
                    <dt className="text-muted-foreground">
                      Endereço
                    </dt>

                    <dd className="mt-1 break-all">
                      {selectedWallet.address}
                    </dd>
                  </div>

                  {selectedWallet.ensName && (
                    <div>
                      <dt className="text-muted-foreground">
                        ENS
                      </dt>

                      <dd className="mt-1">
                        {selectedWallet.ensName}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
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
                      setWalletAddress(
                        event.target.value,
                      )
                    }
                    placeholder="0x..."
                    className="w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
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
                        event.target
                          .value as OrderNetwork,
                      )
                    }
                    className="w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
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
              </div>
            )}
          </section>
        </div>

        <aside className="h-fit border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">
            Itens do pedido
          </h2>

          <div className="mt-5 space-y-4">
            {cart.items.map(
              ({ nft, quantity }) => (
                <div
                  key={nft.id}
                  className="flex items-start justify-between gap-4 border-b border-border pb-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium">
                      {nft.name}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Quantidade: {quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm">
                    {nft.priceEth} ETH
                  </p>
                </div>
              ),
            )}
          </div>

          <div className="mt-6 border-t border-border pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <span>Itens no carrinho</span>

              <span>{cart.totalItems}</span>
            </div>

            <div className="mt-3 flex justify-between gap-4 font-semibold">
              <span>Subtotal</span>

              <span>
  {cart.items
    .reduce(
      (total, { nft, quantity }) =>
        total +
        Number(nft.priceEth) * quantity,
      0,
    )
    .toFixed(4)}{' '}
  ETH
</span>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="text-sm text-muted-foreground">
              Carteira selecionada
            </p>

            <p className="mt-1 break-all text-sm">
              {effectiveAddress ||
                'Informe uma carteira'}
            </p>

            <p className="mt-1 text-sm text-primary">
              {networkLabels[effectiveNetwork]}
            </p>
          </div>

          {createOrderMutation.isError && (
            <p
              role="alert"
              className="mt-5 text-sm text-red-500"
            >
              Não foi possível criar o pedido.
            </p>
          )}

          <button
            type="submit"
            disabled={
              createOrderMutation.isPending ||
              !effectiveAddress
            }
            className="mt-6 w-full bg-primary px-5 py-3 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createOrderMutation.isPending
              ? 'Processando...'
              : 'Confirmar compra'}
          </button>
        </aside>
      </form>
    </main>
  )
}