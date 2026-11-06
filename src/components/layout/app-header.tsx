import { Link } from '@tanstack/react-router'

import { DesktopNavigation } from '@/components/layout/desktop-navigation'
import { PageContainer } from '@/components/layout/page-container'

export function AppHeader() {
  return (
    <header className="border-b border-border">
      <PageContainer className="flex h-16 items-center justify-between">
        <Link
          to="/"
          aria-label="Kurio - página inicial"
          className="text-xl font-semibold tracking-[0.35em] text-primary"
        >
          KURIO
        </Link>

        <DesktopNavigation />

        <div className="hidden items-center gap-6 lg:flex">
          <span
            aria-label="6 itens no carrinho"
            className="text-sm text-foreground"
          >
            6
          </span>

          <Link
            to="/"
            className="text-sm text-foreground transition-colors hover:text-primary"
          >
            Entrar
          </Link>
        </div>
      </PageContainer>
    </header>
  )
}