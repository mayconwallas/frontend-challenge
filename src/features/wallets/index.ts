export { useCreateWallet } from '@/features/wallets/hooks/use-create-wallet'
export { useRemoveWallet } from '@/features/wallets/hooks/use-remove-wallet'
export { useSetPrimaryWallet } from '@/features/wallets/hooks/use-set-primary-wallet'
export { useUpdateWallet } from '@/features/wallets/hooks/use-update-wallet'
export { useWallets } from '@/features/wallets/hooks/use-wallets'

export type {
  CreateWalletRequest,
  UpdateWalletRequest,
  Wallet,
  WalletNetwork,
  WalletProvider,
  WalletsResponse,
} from '@/features/wallets/types/wallet.types'