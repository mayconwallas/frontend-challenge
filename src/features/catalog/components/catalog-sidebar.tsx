interface CatalogSidebarProps {
  collection?: string
  network?: string
  onCollectionChange: (
    collection?: string,
  ) => void
  onNetworkChange: (
    network?: string,
  ) => void
}

const collections = [
  {
    label: 'Digital Art',
    value: 'digital-art',
    count: 33,
  },
  {
    label: 'Photography',
    value: 'photography',
    count: 12,
  },
  {
    label: 'Music',
    value: 'music',
    count: 65,
  },
  {
    label: '3D Art',
    value: '3d-art',
    count: 39,
  },
  {
    label: 'Collectibles',
    value: 'collectibles',
    count: 23,
  },
  {
    label: 'Generative',
    value: 'generative',
    count: 17,
  },
  {
    label: 'Gaming',
    value: 'gaming',
    count: 19,
  },
  {
    label: 'Memberships',
    value: 'memberships',
    count: 13,
  },
] as const

const networks = [
  {
    label: 'Ethereum',
    value: 'ethereum',
    count: 119,
  },
  {
    label: 'Polygon',
    value: 'polygon',
    count: 78,
  },
  {
    label: 'Solana',
    value: 'solana',
    count: 86,
  },
] as const

export function CatalogSidebar({
  collection,
  network,
  onCollectionChange,
  onNetworkChange,
}: CatalogSidebarProps) {
  return (
    <aside
      aria-label="Filtros do catálogo"
      className="hidden w-[250px] shrink-0 lg:block"
    >
      <div className="bg-card px-5 py-6">
        <div className="space-y-9">
          <section>
            <h2 className="text-base font-bold leading-5 text-foreground">
              Coleções
            </h2>

            <ul className="mt-3">
              {collections.map((item) => {
                const isActive =
                  collection === item.value

                return (
                  <li
                    key={item.value}
                    className="flex min-h-9 items-center justify-between gap-3"
                  >
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() =>
                        onCollectionChange(
                          isActive
                            ? undefined
                            : item.value,
                        )
                      }
                      className={
                        isActive
                          ? 'text-left text-sm text-accent'
                          : 'text-left text-sm text-muted-foreground transition-colors hover:text-foreground'
                      }
                    >
                      {item.label}
                    </button>

                    <span
                      className={
                        isActive
                          ? 'text-sm font-bold text-accent'
                          : 'text-sm text-muted-foreground'
                      }
                    >
                      ({item.count})
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold leading-5 text-foreground">
              Faixa de preço
            </h2>

            <div className="mt-5">
              <div className="relative h-1 w-full bg-primary">
                <span className="absolute -top-1.5 left-0 size-4 rounded-full border-2 border-card bg-primary" />
                <span className="absolute -top-1.5 right-[22%] size-4 rounded-full border-2 border-card bg-primary" />
              </div>

              <p className="mt-4 text-xs leading-5 text-foreground">
                Preço: 0,02 - 12,30 ETH
              </p>

              <button
                type="button"
                className="mt-3 h-9 rounded-[4px] bg-primary px-4 text-sm font-bold text-primary-foreground"
              >
                Aplicar
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold leading-5 text-foreground">
              Rede
            </h2>

            <ul className="mt-3">
              {networks.map((item) => {
                const isActive =
                  network === item.value

                return (
                  <li
                    key={item.value}
                    className="flex min-h-9 items-center justify-between gap-3"
                  >
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() =>
                        onNetworkChange(
                          isActive
                            ? undefined
                            : item.value,
                        )
                      }
                      className={
                        isActive
                          ? 'text-sm text-accent'
                          : 'text-sm text-muted-foreground transition-colors hover:text-foreground'
                      }
                    >
                      {item.label}
                    </button>

                    <span
                      className={
                        isActive
                          ? 'text-sm font-bold text-accent'
                          : 'text-sm text-muted-foreground'
                      }
                    >
                      ({item.count})
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </div>
    </aside>
  )
}