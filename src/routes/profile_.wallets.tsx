import { createFileRoute } from '@tanstack/react-router'

import { WalletsPage } from '@/pages/wallets-page'

export const Route =
  createFileRoute('/profile_/wallets')({
    component: WalletsPage,
  })