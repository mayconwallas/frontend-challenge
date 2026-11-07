import { useQuery } from '@tanstack/react-query'

import { getWallets } from '@/features/wallets/api/wallets.service'
import { walletKeys } from '@/features/wallets/queries/wallet-keys'

export function useWallets() {
  return useQuery({
    queryKey: walletKeys.list(),
    queryFn: getWallets,
  })
}