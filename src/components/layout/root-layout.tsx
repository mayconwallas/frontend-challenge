import { Outlet } from '@tanstack/react-router'

import { AppHeader } from '@/components/layout/app-header'
import { MobileNavigation } from '@/components/layout/mobile-navigation'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />

      <main className="pb-16 lg:pb-0">
        <Outlet />
      </main>

      <MobileNavigation />
    </div>
  )
}