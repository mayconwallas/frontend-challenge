import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '@/pages/home-page'

export type CatalogTab = 'all' | 'new' | 'trending'
export type CatalogSort = 'recent' | 'price-asc' | 'price-desc'

export interface CatalogSearch {
  tab?: CatalogTab
  collection?: string
  network?: string
  sort?: CatalogSort
  page?: number
}

export const Route = createFileRoute('/')({
  validateSearch: (
    search: Record<string, unknown>,
  ): CatalogSearch => {
    const parsedPage = Number(search.page)

    return {
      tab:
        search.tab === 'new' || search.tab === 'trending'
          ? search.tab
          : undefined,

      collection:
        typeof search.collection === 'string'
          ? search.collection
          : undefined,

      network:
        typeof search.network === 'string'
          ? search.network
          : undefined,

      sort:
        search.sort === 'price-asc' ||
        search.sort === 'price-desc'
          ? search.sort
          : undefined,

      page:
        Number.isInteger(parsedPage) && parsedPage > 1
          ? parsedPage
          : undefined,
    }
  },

  component: HomePage,
})