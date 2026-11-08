import { Link } from '@tanstack/react-router'

const navigationItems = [
  {
    label: 'Início',
    to: '/',
    icon: 'home',
  },
  {
    label: 'Mercado',
    to: '/',
    hash: 'marketplace',
    icon: 'market',
  },
  {
    label: 'Coleções',
    to: '/',
    hash: 'marketplace',
    icon: 'collection',
  },
  {
    label: 'Perfil',
    to: '/profile',
    icon: 'profile',
  },
] as const

export function MobileNavigation() {
  return (
    <nav
      aria-label="Navegação móvel"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-[#140d0a]/95 backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto grid h-[68px] max-w-md grid-cols-4 px-2">
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
              exact:
                item.label === 'Início',
            }}
            className="group relative flex min-w-0 flex-col items-center justify-center gap-1 px-1 text-[10px] font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary"
          >
            <MobileIcon
              name={item.icon}
            />

            <span className="truncate">
              {item.label}
            </span>

            {item.label === 'Início' && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 h-[2px] w-8 rounded-full bg-primary"
              />
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}

interface MobileIconProps {
  name:
    | 'home'
    | 'market'
    | 'collection'
    | 'profile'
}

function MobileIcon({
  name,
}: MobileIconProps) {
  const commonClass =
    'size-[19px] stroke-current'

  if (name === 'home') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className={commonClass}
      >
        <path
          d="M3.5 10.5 12 3l8.5 7.5"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M5.5 9.5V21h13V9.5"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <path
          d="M9.5 21v-6h5v6"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'market') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className={commonClass}
      >
        <path
          d="M4 5h16l-1.5 5H5.5L4 5Z"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <path
          d="M6 10v9h12v-9"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <path
          d="M9 19v-5h6v5"
          strokeWidth="1.6"
        />
      </svg>
    )
  }

  if (name === 'collection') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className={commonClass}
      >
        <rect
          x="4"
          y="4"
          width="7"
          height="7"
          rx="1"
          strokeWidth="1.6"
        />

        <rect
          x="13"
          y="4"
          width="7"
          height="7"
          rx="1"
          strokeWidth="1.6"
        />

        <rect
          x="4"
          y="13"
          width="7"
          height="7"
          rx="1"
          strokeWidth="1.6"
        />

        <rect
          x="13"
          y="13"
          width="7"
          height="7"
          rx="1"
          strokeWidth="1.6"
        />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={commonClass}
    >
      <circle
        cx="12"
        cy="8"
        r="4"
        strokeWidth="1.6"
      />

      <path
        d="M4.5 21c.8-4 3.2-6 7.5-6s6.7 2 7.5 6"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}