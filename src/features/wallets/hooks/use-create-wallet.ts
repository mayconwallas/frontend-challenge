import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { createWallet } from '@/features/wallets/api/wallets.service'
import { walletKeys } from '@/features/wallets/queries/wallet-keys'

export function useCreateWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createWallet,

    onSuccess: (response) => {
      queryClient.setQueryData(
        walletKeys.list(),
        response,
      )
    },
  })
}
