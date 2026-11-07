import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { updateWallet } from '@/features/wallets/api/wallets.service'
import { walletKeys } from '@/features/wallets/queries/wallet-keys'

export function useUpdateWallet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateWallet,

    onSuccess: (response) => {
      queryClient.setQueryData(
        walletKeys.list(),
        response,
      )
    },
  })
}