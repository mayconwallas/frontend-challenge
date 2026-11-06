const collections = [
  ['Digital Art', 33],
  ['Photography', 12],
  ['Music', 65],
  ['3D Art', 39],
  ['Collectibles', 23],
  ['Generative', 17],
  ['Gaming', 19],
  ['Memberships', 13],
] as const

const networks = [
  ['Ethereum', 119],
  ['Polygon', 78],
  ['Solana', 86],
] as const

export function CatalogSidebar() {
  return (
    <aside
      aria-label="Filtros do catálogo"
      className="hidden w-[310px] shrink-0 lg:block"
    >
      <div className="bg-card p-5">
        <div className="space-y-10">
          <section>
            <h2 className="text-[18px] font-bold leading-[16px] text-foreground">
              Coleções
            </h2>

            <ul className="mt-3 px-3">
              {collections.map(([name, count], index) => (
                <li
                  key={name}
                  className="flex h-10 items-center justify-between"
                >
                  <button
                    type="button"
                    className={`text-[15px] leading-10 ${
                      index === 0
                        ? 'text-accent'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {name}
                  </button>

                  <span
                    className={`text-[15px] leading-10 ${
                      index === 0
                        ? 'font-bold text-accent'
                        : 'text-muted-foreground'
                    }`}
                  >
                    ({count})
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold leading-[16px] text-foreground">
              Faixa de preço
            </h2>

            <div className="mt-5 px-3">
              <div className="h-1 w-full bg-primary" />

              <p className="mt-3 text-[15px] leading-5 text-foreground">
                Preço: 0,02 - 12,30 ETH
              </p>

              <button
                type="button"
                className="mt-3 h-9 rounded-[6px] bg-primary px-3 text-[16px] font-bold text-primary-foreground"
              >
                Aplicar
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-[18px] font-bold leading-[16px] text-foreground">
              Rede
            </h2>

            <ul className="mt-3 pl-3">
              {networks.map(([name, count]) => (
                <li
                  key={name}
                  className="flex h-10 items-center justify-between"
                >
                  <span className="text-[15px] text-muted-foreground">
                    {name}
                  </span>

                  <span className="text-[15px] text-muted-foreground">
                    ({count})
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </aside>
  )
}