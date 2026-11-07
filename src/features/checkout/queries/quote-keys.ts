export const quoteKeys = {
  all: ['quote'] as const,

  detail: (coupon?: string) =>
    [...quoteKeys.all, coupon ?? 'no-coupon'] as const,
}