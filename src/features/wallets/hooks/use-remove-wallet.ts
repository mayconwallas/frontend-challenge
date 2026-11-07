import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { deleteWallet } from '@/features/wallets/api/wallets.service'
import { walletKeys } from '@/features/wallets/queries/wallet-keys'

export function useRemoveWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteWallet,

    onSuccess: (response) => {
      queryClient.setQueryData(
        walletKeys.list(),
        response,
      )
    },
  })
}