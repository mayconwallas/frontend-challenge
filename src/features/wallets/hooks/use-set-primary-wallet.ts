import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { setPrimaryWallet } from '@/features/wallets/api/wallets.service'
import { walletKeys } from '@/features/wallets/queries/wallet-keys'

export function useSetPrimaryWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: setPrimaryWallet,

    onSuccess: (response) => {
      queryClient.setQueryData(
        walletKeys.list(),
        response,
      )
    },
  })
}