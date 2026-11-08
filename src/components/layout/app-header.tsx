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

  const totalItems =
    cartQuery.data?.totalItems ?? 0

  const session = sessionQuery.data

  function handleLogout() {
    logoutMutation.mutate()
  }

  return (
    <header className="border-b border-border/70 bg-background">
      <PageContainer className="flex h-14 items-center justify-between lg:h-[72px]">
        <Link
          to="/"
          aria-label="Kurio, página inicial"
          className="shrink-0 text-sm font-bold tracking-[0.32em] text-foreground"
        >
          KURIO
        </Link>

        <DesktopNavigation />

        <div className="flex items-center gap-2 lg:gap-4">
          <button
            type="button"
            aria-label="Pesquisar"
            className="flex size-9 items-center justify-center text-foreground transition-colors hover:text-primary"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="size-[18px]"
            >
              <circle
                cx="11"
                cy="11"
                r="6"
                stroke="currentColor"
                strokeWidth="1.6"
              />

              <path
                d="m16 16 4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Link
            to="/cart"
            aria-label={`${totalItems} itens no carrinho`}
            className="relative flex size-9 items-center justify-center text-foreground transition-colors hover:text-primary"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="size-5"
            >
              <path
                d="M4 5h2l1.5 9h9.8l1.7-6H7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="10"
                cy="18"
                r="1"
                fill="currentColor"
              />

              <circle
                cx="17"
                cy="18"
                r="1"
                fill="currentColor"
              />
            </svg>

            {totalItems > 0 && (
              <span className="absolute right-0 top-0 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-4 text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          {session ? (
            <>
              <button
                type="button"
                aria-label="Sair"
                title="Sair"
                onClick={handleLogout}
                disabled={
                  logoutMutation.isPending
                }
                className="flex size-8 items-center justify-center rounded-full border border-border text-xs font-bold text-primary transition-colors hover:border-primary disabled:opacity-50 lg:hidden"
              >
                {logoutMutation.isPending
                  ? '…'
                  : session.user.name
                      .trim()
                      .charAt(0)
                      .toUpperCase()}
              </button>

              <Link
                to="/profile"
                className="hidden max-w-28 truncate text-xs text-foreground transition-colors hover:text-primary lg:block"
              >
                {session.user.name}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                disabled={
                  logoutMutation.isPending
                }
                className="hidden text-xs text-muted-foreground transition-colors hover:text-primary disabled:opacity-50 lg:block"
              >
                {logoutMutation.isPending
                  ? 'Saindo...'
                  : 'Sair'}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex h-8 items-center rounded-[4px] bg-primary px-3 text-[11px] font-bold text-primary-foreground transition-colors hover:bg-accent sm:px-4 sm:text-xs"
            >
              Entrar
            </Link>
          )}
        </div>
      </PageContainer>
    </header>
  )
}