import { Link } from '@tanstack/react-router'

const navigationItems = [
  { label: 'Início', to: '/' },
  { label: 'Mercado', to: '/' },
  { label: 'Criadores', to: '/' },
  { label: 'Aprenda', to: '/' },
] as const

export function DesktopNavigation() {
  return (
    <nav
      aria-label="Navegação principal"
      className="hidden items-center gap-8 lg:flex"
    >
      {navigationItems.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="text-sm text-foreground transition-colors hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}