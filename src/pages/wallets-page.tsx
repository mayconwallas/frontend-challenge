import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from '@tanstack/react-router'

import {
  useCreateWallet,
  useRemoveWallet,
  useSetPrimaryWallet,
  useWallets,
} from '@/features/wallets'
import type {
  WalletNetwork,
  WalletProvider,
} from '@/features/wallets'

const networkLabels: Record<
  WalletNetwork,
  string
> = {
  ethereum: 'Ethereum',
  polygon: 'Polygon',
  solana: 'Solana',
}

const providerLabels: Record<
  WalletProvider,
  string
> = {
  walletconnect: 'WalletConnect',
  metamask: 'MetaMask',
  coinbase: 'Coinbase Wallet',
}

export function WalletsPage() {
  const walletsQuery = useWallets()
  const createWalletMutation =
    useCreateWallet()
  const removeWalletMutation =
    useRemoveWallet()
  const setPrimaryWalletMutation =
    useSetPrimaryWallet()

  const [nickname, setNickname] =
    useState('')
  const [address, setAddress] =
    useState('')
  const [network, setNetwork] =
    useState<WalletNetwork>('ethereum')
  const [provider, setProvider] =
    useState<WalletProvider>('walletconnect')
  const [ensName, setEnsName] =
    useState('')
  const [isPrimary, setIsPrimary] =
    useState(false)
  const [walletCreated, setWalletCreated] =
    useState(false)

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setWalletCreated(false)

    await createWalletMutation.mutateAsync({
      nickname,
      address,
      network,
      provider,
      ensName:
        network === 'ethereum' && ensName
          ? ensName
          : undefined,
      isPrimary,
    })

    setNickname('')
    setAddress('')
    setNetwork('ethereum')
    setProvider('walletconnect')
    setEnsName('')
    setIsPrimary(false)
    setWalletCreated(true)
  }

  if (walletsQuery.isPending) {
    return (
      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <p>Carregando carteiras...</p>
      </main>
    )
  }

  if (
    walletsQuery.isError ||
    !walletsQuery.data
  ) {
    return (
      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <h1 className="text-2xl font-semibold">
          Carteiras indisponíveis
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Não foi possível carregar suas carteiras.
        </p>
      </main>
    )
  }

  const wallets = walletsQuery.data.wallets

  const primaryWallet = wallets.find(
    (wallet) => wallet.isPrimary,
  )

  const secondaryWallets = wallets.filter(
    (wallet) => !wallet.isPrimary,
  )

  const isMutating =
    createWalletMutation.isPending ||
    removeWalletMutation.isPending ||
    setPrimaryWalletMutation.isPending

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="h-fit border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h1 className="font-semibold">
              Meu perfil
            </h1>
          </div>

          <nav
            aria-label="Navegação do perfil"
            className="flex overflow-x-auto lg:block"
          >
            <Link
              to="/profile"
              className="block shrink-0 px-5 py-3 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Dados do perfil
            </Link>

            <Link
              to="/profile/wallets"
              className="block shrink-0 border-b-2 border-primary px-5 py-3 text-sm text-primary lg:border-b-0 lg:border-l-2"
            >
              Carteiras
            </Link>

            <span className="block shrink-0 px-5 py-3 text-sm text-muted-foreground">
              Atividade
            </span>

            <span className="block shrink-0 px-5 py-3 text-sm text-muted-foreground">
              Lista de interesse
            </span>

            <span className="block shrink-0 px-5 py-3 text-sm text-muted-foreground">
              Ofertas
            </span>

            <span className="block shrink-0 px-5 py-3 text-sm text-muted-foreground">
              Arquivos baixados
            </span>

            <span className="block shrink-0 px-5 py-3 text-sm text-muted-foreground">
              Suporte
            </span>
          </nav>
        </aside>

        <div className="min-w-0 space-y-12">
          <section>
            <div>
              <h2 className="text-xl font-semibold">
                Minhas carteiras
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Gerencie as carteiras usadas em suas
                compras e defina uma carteira principal.
              </p>
            </div>

            {wallets.length === 0 ? (
              <div className="mt-6 border border-dashed border-border px-6 py-10 text-center">
                <h3 className="font-semibold">
                  Nenhuma carteira cadastrada
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Cadastre sua primeira carteira no
                  formulário abaixo.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-8">
                {primaryWallet && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Carteira principal
                    </h3>

                    <div className="mt-3">
                      <WalletCard
                        wallet={primaryWallet}
                        isMutating={isMutating}
                        onRemove={() =>
                          removeWalletMutation.mutate(
                            primaryWallet.id,
                          )
                        }
                        onSetPrimary={() => undefined}
                      />
                    </div>
                  </div>
                )}

                {secondaryWallets.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Carteiras secundárias
                    </h3>

                    <div className="mt-3 grid gap-4 xl:grid-cols-2">
                      {secondaryWallets.map(
                        (wallet) => (
                          <WalletCard
                            key={wallet.id}
                            wallet={wallet}
                            isMutating={isMutating}
                            onSetPrimary={() =>
                              setPrimaryWalletMutation.mutate(
                                wallet.id,
                              )
                            }
                            onRemove={() =>
                              removeWalletMutation.mutate(
                                wallet.id,
                              )
                            }
                          />
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {(removeWalletMutation.isError ||
              setPrimaryWalletMutation.isError) && (
              <p
                role="alert"
                className="mt-4 text-sm text-red-500"
              >
                Não foi possível atualizar as carteiras.
              </p>
            )}
          </section>

          <section className="border-t border-border pt-8">
            <h2 className="text-xl font-semibold">
              Adicionar carteira
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Cadastre uma carteira para utilizá-la
              durante o pagamento.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6"
            >
              <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
                <WalletField
                  id="wallet-nickname"
                  label="Apelido da carteira"
                  value={nickname}
                  required
                  placeholder="Carteira principal"
                  onChange={setNickname}
                />

                <WalletField
                  id="wallet-address"
                  label="Endereço da carteira"
                  value={address}
                  required
                  placeholder="0x..."
                  onChange={setAddress}
                />

                <div>
                  <label
                    htmlFor="wallet-network"
                    className="mb-2 block text-sm font-medium"
                  >
                    Rede
                    <span className="text-primary">
                      *
                    </span>
                  </label>

                  <select
                    id="wallet-network"
                    value={network}
                    onChange={(event) => {
                      const nextNetwork =
                        event.target
                          .value as WalletNetwork

                      setNetwork(nextNetwork)

                      if (
                        nextNetwork !== 'ethereum'
                      ) {
                        setEnsName('')
                      }
                    }}
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

                <div>
                  <label
                    htmlFor="wallet-provider"
                    className="mb-2 block text-sm font-medium"
                  >
                    Tipo de carteira
                    <span className="text-primary">
                      *
                    </span>
                  </label>

                  <select
                    id="wallet-provider"
                    value={provider}
                    onChange={(event) =>
                      setProvider(
                        event.target
                          .value as WalletProvider,
                      )
                    }
                    className="w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                  >
                    <option value="walletconnect">
                      WalletConnect
                    </option>

                    <option value="metamask">
                      MetaMask
                    </option>

                    <option value="coinbase">
                      Coinbase Wallet
                    </option>
                  </select>
                </div>

                {network === 'ethereum' && (
                  <WalletField
                    id="wallet-ens"
                    label="Nome ENS"
                    value={ensName}
                    placeholder="nome.eth"
                    onChange={setEnsName}
                  />
                )}

                <label className="flex items-center gap-3 self-end border border-border px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isPrimary}
                    onChange={(event) =>
                      setIsPrimary(
                        event.target.checked,
                      )
                    }
                    className="h-4 w-4 accent-current"
                  />

                  <span className="text-sm">
                    Definir como carteira principal
                  </span>
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {walletCreated && (
                    <p
                      role="status"
                      className="text-sm text-primary"
                    >
                      Carteira adicionada com sucesso.
                    </p>
                  )}

                  {createWalletMutation.isError && (
                    <p
                      role="alert"
                      className="text-sm text-red-500"
                    >
                      Não foi possível adicionar a
                      carteira.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    createWalletMutation.isPending
                  }
                  className="bg-primary px-6 py-3 font-medium text-primary-foreground disabled:opacity-50"
                >
                  {createWalletMutation.isPending
                    ? 'Adicionando...'
                    : 'Adicionar carteira'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}

interface WalletCardProps {
  wallet: {
    id: string
    nickname: string
    address: string
    network: WalletNetwork
    provider: WalletProvider
    ensName?: string
    isPrimary: boolean
  }
  isMutating: boolean
  onSetPrimary: () => void
  onRemove: () => void
}

function WalletCard({
  wallet,
  isMutating,
  onSetPrimary,
  onRemove,
}: WalletCardProps) {
  return (
    <article className="border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-semibold">
              {wallet.nickname}
            </h4>

            {wallet.isPrimary && (
              <span className="border border-primary px-2 py-1 text-xs text-primary">
                Principal
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {providerLabels[wallet.provider]}
          </p>
        </div>

        <span className="text-sm text-primary">
          {networkLabels[wallet.network]}
        </span>
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <div>
          <dt className="text-muted-foreground">
            Endereço
          </dt>

          <dd className="mt-1 break-all">
            {wallet.address}
          </dd>
        </div>

        {wallet.ensName && (
          <div>
            <dt className="text-muted-foreground">
              ENS
            </dt>

            <dd className="mt-1">
              {wallet.ensName}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-4">
        {!wallet.isPrimary && (
          <button
            type="button"
            disabled={isMutating}
            onClick={onSetPrimary}
            className="text-sm text-primary disabled:opacity-50"
          >
            Definir como principal
          </button>
        )}

        <button
          type="button"
          disabled={isMutating}
          onClick={onRemove}
          className="text-sm text-red-500 disabled:opacity-50"
        >
          Remover carteira
        </button>
      </div>
    </article>
  )
}

interface WalletFieldProps {
  id: string
  label: string
  value: string
  placeholder?: string
  required?: boolean
  onChange: (value: string) => void
}

function WalletField({
  id,
  label,
  value,
  placeholder,
  required = false,
  onChange,
}: WalletFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium"
      >
        {label}

        {required && (
          <span className="text-primary">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
      />
    </div>
  )
}