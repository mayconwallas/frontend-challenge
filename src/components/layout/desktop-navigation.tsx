import { Link } from '@tanstack/react-router'

const navigationItems = [
  {
    label: 'Início',
    to: '/',
  },
  {
    label: 'Mercado',
    to: '/',
    hash: 'marketplace',
  },
  {
    label: 'Criadores',
    to: '/',
  },
  {
    label: 'Aprenda',
    to: '/',
  },
] as const

export function DesktopNavigation() {
  return (
    <nav
      aria-label="Navegação principal"
      className="hidden h-full items-center gap-9 lg:flex"
    >
      {navigationItems.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          hash={
            'hash' in item
              ? item.hash
              : undefined
          }
          activeOptions={{
            exact: item.label === 'Início',
          }}
          className="relative flex h-full items-center text-xs text-muted-foreground transition-colors hover:text-foreground [&.active]:text-primary"
        >
          {item.label}

          {item.label === 'Início' && (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px bg-primary"
            />
          )}
        </Link>
      ))}
    </nav>
  )
}