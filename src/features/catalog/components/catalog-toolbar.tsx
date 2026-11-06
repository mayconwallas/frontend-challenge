import type {
  NftSort,
  NftTab,
} from '@/features/catalog/types/nft.types'

interface CatalogToolbarProps {
  tab: NftTab
  sort: NftSort
  onTabChange: (tab: NftTab) => void
  onSortChange: (sort: NftSort) => void
}

const tabs: Array<{
  label: string
  value: NftTab
}> = [
  {
    label: 'Todos os NFTs',
    value: 'all',
  },
  {
    label: 'Novos lançamentos',
    value: 'new',
  },
  {
    label: 'Em alta',
    value: 'trending',
  },
]

export function CatalogToolbar({
  tab,
  sort,
  onTabChange,
  onSortChange,
}: CatalogToolbarProps) {
  return (
    <div className="mb-8 hidden items-center justify-between gap-6 lg:flex">
      <div
        role="tablist"
        aria-label="Categorias do catálogo"
        className="flex items-center gap-5"
      >
        {tabs.map((item) => {
          const isActive = tab === item.value

          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(item.value)}
              className={
                isActive
                  ? 'border-b-2 border-primary pb-2 text-[15px] font-medium text-accent'
                  : 'border-b-2 border-transparent pb-2 text-[15px] font-medium text-foreground'
              }
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <label className="flex items-center gap-1 text-[15px] text-foreground">
        <span>Ordenar por:</span>

        <select
          aria-label="Ordenar NFTs"
          value={sort}
          onChange={(event) =>
            onSortChange(event.target.value as NftSort)
          }
          className="bg-transparent text-[15px] text-foreground outline-none"
        >
          <option value="recent">
            Listados recentemente
          </option>

          <option value="price-asc">
            Menor preço
          </option>

          <option value="price-desc">
            Maior preço
          </option>
        </select>
      </label>
    </div>
  )
}