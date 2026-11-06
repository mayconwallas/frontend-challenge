export function CatalogToolbar() {
  return (
    <div className="mb-8 hidden items-center justify-between lg:flex">
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="border-b-2 border-primary pb-2 text-[15px] font-medium text-accent"
        >
          Todos os NFTs
        </button>

        <button
          type="button"
          className="pb-2 text-[15px] font-medium text-foreground"
        >
          Novos lançamentos
        </button>

        <button
          type="button"
          className="pb-2 text-[15px] font-medium text-foreground"
        >
          Em alta
        </button>
      </div>

      <button
        type="button"
        className="text-[15px] text-foreground"
      >
        Ordenar por: Listados recentemente ↓
      </button>
    </div>
  )
}