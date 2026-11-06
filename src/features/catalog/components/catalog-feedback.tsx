interface CatalogFeedbackProps {
  type: 'loading' | 'empty' | 'error'
}

const messages = {
  loading: 'Carregando NFTs...',
  empty: 'Nenhum NFT encontrado.',
  error: 'Não foi possível carregar os NFTs.',
} as const

export function CatalogFeedback({
  type,
}: CatalogFeedbackProps) {
  const isError = type === 'error'

  return (
    <div
      role={isError ? 'alert' : 'status'}
      className="flex min-h-40 items-center justify-center border border-border px-4 text-center"
    >
      <p
        className={
          isError
            ? 'text-sm text-destructive'
            : 'text-sm text-muted-foreground'
        }
      >
        {messages[type]}
      </p>
    </div>
  )
}