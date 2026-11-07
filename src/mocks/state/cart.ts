interface CartStateItem {
  nftId: string
  quantity: number
}

const CART_STORAGE_KEY = 'kurio-cart'

function loadCartState(): Map<string, number> {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)

    if (!storedCart) {
      return new Map()
    }

    const items = JSON.parse(storedCart) as CartStateItem[]

    return new Map(
      items.map((item) => [
        item.nftId,
        item.quantity,
      ]),
    )
  } catch {
    return new Map()
  }
}

const cartItems = loadCartState()

function persistCartState() {
  const items = Array.from(cartItems.entries()).map(
    ([nftId, quantity]) => ({
      nftId,
      quantity,
    }),
  )

  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(items),
  )
}

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
  persistCartState()
}

export function updateCartStateItem(
  nftId: string,
  quantity: number,
) {
  if (quantity <= 0) {
    cartItems.delete(nftId)
    persistCartState()

    return
  }

  cartItems.set(nftId, quantity)
  persistCartState()
}

export function removeCartStateItem(nftId: string) {
  cartItems.delete(nftId)
  persistCartState()
}