import type {
  CreateWalletRequest,
  UpdateWalletRequest,
  Wallet,
} from '@/features/wallets/types/wallet.types'

const WALLETS_STORAGE_KEY = 'kurio-wallets'

function loadWallets(): Wallet[] {
  try {
    const storedWallets = localStorage.getItem(
      WALLETS_STORAGE_KEY,
    )

    if (!storedWallets) {
      return []
    }

    return JSON.parse(storedWallets) as Wallet[]
  } catch {
    return []
  }
}

function persistWallets(wallets: Wallet[]) {
  localStorage.setItem(
    WALLETS_STORAGE_KEY,
    JSON.stringify(wallets),
  )
}

export function getWallets() {
  return loadWallets()
}

export function createWallet(
  request: CreateWalletRequest,
) {
  const wallets = loadWallets()

  const shouldBePrimary =
    request.isPrimary ||
    wallets.length === 0

  const normalizedWallets = shouldBePrimary
    ? wallets.map((wallet) => ({
        ...wallet,
        isPrimary: false,
      }))
    : wallets

  const wallet: Wallet = {
    id: crypto.randomUUID(),
    nickname: request.nickname,
    address: request.address,
    network: request.network,
    provider: request.provider,
    ensName:
      request.network === 'ethereum'
        ? request.ensName
        : undefined,
    isPrimary: shouldBePrimary,
  }

  const nextWallets = [
    ...normalizedWallets,
    wallet,
  ]

  persistWallets(nextWallets)

  return wallet
}

export function updateWallet(
  request: UpdateWalletRequest,
) {
  const wallets = loadWallets()

  const nextWallets = wallets.map((wallet) => {
    if (wallet.id === request.id) {
      return {
        ...request,
        ensName:
          request.network === 'ethereum'
            ? request.ensName
            : undefined,
      }
    }

    if (request.isPrimary) {
      return {
        ...wallet,
        isPrimary: false,
      }
    }

    return wallet
  })

  persistWallets(nextWallets)

  return nextWallets.find(
    (wallet) => wallet.id === request.id,
  )
}

export function removeWallet(walletId: string) {
  const wallets = loadWallets()

  const walletToRemove = wallets.find(
    (wallet) => wallet.id === walletId,
  )

  const remainingWallets = wallets.filter(
    (wallet) => wallet.id !== walletId,
  )

  if (
    walletToRemove?.isPrimary &&
    remainingWallets.length > 0
  ) {
    remainingWallets[0] = {
      ...remainingWallets[0],
      isPrimary: true,
    }
  }

  persistWallets(remainingWallets)

  return remainingWallets
}

export function setPrimaryWallet(walletId: string) {
  const wallets = loadWallets()

  const nextWallets = wallets.map(
    (wallet) => ({
      ...wallet,
      isPrimary: wallet.id === walletId,
    }),
  )

  persistWallets(nextWallets)

  return nextWallets
}