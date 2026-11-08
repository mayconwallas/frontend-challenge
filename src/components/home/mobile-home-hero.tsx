interface MobileHomeHeroProps {
  onExplore: () => void
}

export function MobileHomeHero({
  onExplore,
}: MobileHomeHeroProps) {
  return (
    <section className="pt-5 lg:hidden">
      <div className="flex gap-3">
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-[8px] bg-card px-4">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="size-[18px] shrink-0 text-primary"
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

          <span className="sr-only">
            Explorar coleções
          </span>

          <input
            type="search"
            placeholder="Explorar coleções"
            className="h-11 min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>

        <button
          type="button"
          aria-label="Abrir filtros"
          onClick={onExplore}
          className="flex size-11 shrink-0 items-center justify-center rounded-[8px] bg-primary text-primary-foreground"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="size-[18px]"
          >
            <path
              d="M5 7h14M5 17h14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            <circle
              cx="9"
              cy="7"
              r="2"
              fill="var(--primary)"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <circle
              cx="15"
              cy="17"
              r="2"
              fill="var(--primary)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      <div className="relative mt-3 min-h-[188px] overflow-hidden rounded-[10px] bg-card">
        <div className="relative z-10 flex min-h-[188px] max-w-[62%] flex-col justify-center px-4 py-5">
          <p className="text-[10px] leading-4 text-foreground">
            Bem-vindo à Kurio
          </p>

          <h1 className="mt-2 text-[22px] font-bold uppercase leading-[1.3] text-foreground">
            Seja dono da
            <br />
            cultura digital
          </h1>

          <p className="mt-2 max-w-[190px] text-[10px] leading-4 text-muted-foreground">
            Descubra NFTs selecionados de criadores
            do mundo todo.
          </p>

          <button
            type="button"
            onClick={onExplore}
            className="mt-3 w-fit text-[10px] font-bold uppercase text-primary"
          >
            Explorar →
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 w-[48%]">
          <div className="absolute inset-3 overflow-hidden rounded-[12px] bg-[#e8e7c8]">
            <img
              src="/images/nfts/emerald-ape-042.png"
              alt="NFT Emerald Ape em destaque"
              width={360}
              height={360}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-card to-transparent" />
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5"
        >
          <span className="size-1.5 rounded-full bg-primary" />
          <span className="size-1.5 rounded-full bg-primary/50" />
          <span className="size-1.5 rounded-full bg-primary/50" />
          <span className="size-1.5 rounded-full bg-primary/50" />
        </div>
      </div>
    </section>
  )
}