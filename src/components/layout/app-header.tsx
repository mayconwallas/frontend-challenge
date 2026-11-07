import { Link } from '@tanstack/react-router'

import { DesktopNavigation } from '@/components/layout/desktop-navigation'
import { PageContainer } from '@/components/layout/page-container'
import {
  useLogout,
  useSession,
} from '@/features/auth'
import { useCart } from '@/features/cart'

export function AppHeader() {
  const cartQuery = useCart()
  const sessionQuery = useSession()
  const logoutMutation = useLogout()

  const totalItems = cartQuery.data?.totalItems ?? 0
  const session = sessionQuery.data

  function handleLogout() {
    logoutMutation.mutate()
  }

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

          {session ? (
            <>
              <span className="hidden text-sm text-foreground sm:inline">
                {session.user.name}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="text-sm text-foreground transition-colors hover:text-primary disabled:opacity-50"
              >
                {logoutMutation.isPending
                  ? 'Saindo...'
                  : 'Sair'}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm text-foreground transition-colors hover:text-primary"
            >
              Entrar
            </Link>
          )}
        </div>
      </PageContainer>
    </header>
  )
}