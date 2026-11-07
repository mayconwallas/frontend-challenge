interface CartStateItem {
  nftId: string
  quantity: number
}

const cartItems = new Map<string, number>()

export function getCartState(): CartStateItem[] {
  return Array.from(cartItems.entries()).map(
    ([nftId, quantity]) => ({
      nftId,
      quantity,
    }),
  )
}

export function addCartStateItem(nftId: string) {
  const currentQuantity = cartItems.get(nftId) ?? 0

  cartItems.set(nftId, currentQuantity + 1)
}

export function updateCartStateItem(
  nftId: string,
  quantity: number,
) {
  if (quantity <= 0) {
    cartItems.delete(nftId)

    return
  }

  cartItems.set(nftId, quantity)
}

export function removeCartStateItem(nftId: string) {
  cartItems.delete(nftId)
}