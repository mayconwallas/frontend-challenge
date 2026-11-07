export const orderKeys = {
  all: ['orders'] as const,

  detail: (orderId: string) =>
    [...orderKeys.all, orderId] as const,
}