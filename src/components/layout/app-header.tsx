import { Link } from '@tanstack/react-router'

import { DesktopNavigation } from '@/components/layout/desktop-navigation'
import { PageContainer } from '@/components/layout/page-container'
import { useCart } from '@/features/cart'

export function AppHeader() {
  const cartQuery = useCart()

  const totalItems = cartQuery.data?.totalItems ?? 0

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

        <div className="flex items-center gap-4">
          <Link
  to="/cart"
  aria-label={`${totalItems} itens no carrinho`}
  className="text-sm text-foreground transition-colors hover:text-primary"
>
  Carrinho ({totalItems})
</Link>

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