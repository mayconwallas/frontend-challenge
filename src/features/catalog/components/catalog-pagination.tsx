interface CatalogPaginationProps {
  page: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}

export function CatalogPagination({
  page,
  total,
  pageSize,
  onPageChange,
}: CatalogPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav
      aria-label="Paginação do catálogo"
      className="mt-[88px] flex justify-center"
    >
      <div className="flex items-center gap-2">
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1,
        ).map((pageNumber) => {
          const isActive = page === pageNumber

          return (
            <button
              key={pageNumber}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onPageChange(pageNumber)}
              className={
                isActive
                  ? 'flex h-[35px] w-[35px] items-center justify-center rounded-[4px] bg-primary text-[18px] font-bold text-primary-foreground'
                  : 'flex h-[35px] w-[35px] items-center justify-center rounded-[4px] border border-border text-[18px] text-foreground'
              }
            >
              {pageNumber}
            </button>
          )
        })}

        {page < totalPages && (
          <button
            type="button"
            aria-label="Próxima página"
            onClick={() => onPageChange(page + 1)}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-[4px] border border-border text-[18px] text-foreground"
          >
            →
          </button>
        )}
      </div>
    </nav>
  )
}