export type WalletNetwork =
  | 'ethereum'
  | 'polygon'
  | 'solana'

export type WalletProvider =
  | 'walletconnect'
  | 'metamask'
  | 'coinbase'

export interface Wallet {
  id: string
  nickname: string
  address: string
  network: WalletNetwork
  provider: WalletProvider
  ensName?: string
  isPrimary: boolean
}

export interface CreateWalletRequest {
  nickname: string
  address: string
  network: WalletNetwork
  provider: WalletProvider
  ensName?: string
  isPrimary?: boolean
}

export interface UpdateWalletRequest {
  id: string
  nickname: string
  address: string
  network: WalletNetwork
  provider: WalletProvider
  ensName?: string
  isPrimary: boolean
}

export interface WalletsResponse {
  wallets: Wallet[]
}