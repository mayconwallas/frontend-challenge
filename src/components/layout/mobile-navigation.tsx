import { Link } from '@tanstack/react-router'

const mobileNavigationItems = [
  { label: 'Início', to: '/' },
  { label: 'Mercado', to: '/' },
  { label: 'Coleções', to: '/' },
  { label: 'Perfil', to: '/' },
] as const

export function MobileNavigation() {
  return (
    <nav
      aria-label="Navegação móvel"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur lg:hidden"
    >
      <div className="grid h-16 grid-cols-4">
        {mobileNavigationItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="flex items-center justify-center px-2 text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}