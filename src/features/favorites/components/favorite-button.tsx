import {
  useFavorites,
  useToggleFavorite,
} from '@/features/favorites'

interface FavoriteButtonProps {
  nftId: string
  className?: string
}

export function FavoriteButton({
  nftId,
  className = '',
}: FavoriteButtonProps) {
  const favoritesQuery = useFavorites()
  const toggleFavoriteMutation = useToggleFavorite()

  const isFavorite =
    favoritesQuery.data?.nftIds.includes(nftId) ?? false

  function handleToggleFavorite() {
    toggleFavoriteMutation.mutate({
      nftId,
    })
  }

  return (
    <button
      type="button"
      aria-label={
        isFavorite
          ? 'Remover dos favoritos'
          : 'Adicionar aos favoritos'
      }
      aria-pressed={isFavorite}
      onClick={handleToggleFavorite}
      disabled={
        favoritesQuery.isPending ||
        toggleFavoriteMutation.isPending
      }
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-lg transition-colors hover:border-primary hover:text-accent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span aria-hidden="true">
        {isFavorite ? '♥' : '♡'}
      </span>
    </button>
  )
}