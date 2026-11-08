import { expect, test } from '@playwright/test'

test.describe('Socket realtime updates', () => {
  test('updates NFT detail from nft.updated', async ({
    page,
  }) => {
    await page.goto('/nft/emerald-ape-042')

    await expect(
      page.getByRole('heading', {
        name: 'Emerald Ape #042',
      }),
    ).toBeVisible()

    await expect(
      page.getByText('1.19 ETH'),
    ).toBeVisible()

    await page.evaluate(async () => {
      const { socketClient } = await import(
        '/src/services/socket/socket-client.ts'
      )

      const listeners =
        socketClient.listeners('nft.updated')

      const event = {
        nft: {
          id: 'emerald-ape-042',
          name: 'Emerald Ape #042',
          creator: 'Kurio',
          collection: 'Emerald Apes',
          network: 'ethereum' as const,
          imageUrl: '/assets/hero.png',
          priceEth: '2.50',
          availableEditions: 50,
          isNew: false,
          isTrending: true,
        },
      }

      listeners.forEach((listener) => {
        listener(event)
      })
    })

    await expect(
      page.getByText('2.50 ETH'),
    ).toBeVisible()
  })

  test('updates an open order from order.updated', async ({
    page,
  }) => {
    await page.goto('/')

    const orderId = await page.evaluate(() => {
      const order = {
        id: 'socket-order-test',
        status: 'pending',
        customer: {
          name: 'Kurio Collector',
          email: 'collector@kurio.com',
        },
        wallet: {
          id: 'wallet-test',
          address: '0x1234567890abcdef',
          network: 'ethereum',
        },
        items: [
          {
            nftId: 'emerald-ape-042',
            name: 'Emerald Ape #042',
            imageUrl: '/assets/hero.png',
            priceEth: '1.19',
            quantity: 1,
          },
        ],
        totals: {
          subtotalEth: '1.1900',
          discountEth: '0.0000',
          networkFeeEth: '0.0025',
          totalEth: '1.1925',
        },
        createdAt: new Date().toISOString(),
        version: 1,
      }

      localStorage.setItem(
        'kurio-orders',
        JSON.stringify([
          {
            order,
            idempotencyKey: 'socket-test-key',
          },
        ]),
      )

      return order.id
    })

    await page.goto(`/order/${orderId}`)

    await expect(
      page.getByText('Pagamento pendente'),
    ).toBeVisible()

    await page.evaluate(async () => {
      const { socketClient } = await import(
        '/src/services/socket/socket-client.ts'
      )

      const stored = JSON.parse(
        localStorage.getItem('kurio-orders') ?? '[]',
      )

      const order = stored[0].order

      const listeners =
        socketClient.listeners('order.updated')

      listeners.forEach((listener) => {
        listener({
          order: {
            ...order,
            status: 'confirmed',
            transactionId:
              'socket-transaction-001',
            version: 2,
          },
        })
      })
    })

    await expect(
      page.getByText('Compra confirmada'),
    ).toBeVisible()

    await expect(
      page.getByText('socket-transaction-001'),
    ).toBeVisible()
  })

  test('does not duplicate socket listeners', async ({
    page,
  }) => {
    await page.goto('/')

    await expect
      .poll(async () => {
        return page.evaluate(async () => {
          const { socketClient } = await import(
            '/src/services/socket/socket-client.ts'
          )

          return socketClient.listeners(
            'nft.updated',
          ).length
        })
      })
      .toBe(1)

    await expect
      .poll(async () => {
        return page.evaluate(async () => {
          const { socketClient } = await import(
            '/src/services/socket/socket-client.ts'
          )

          return socketClient.listeners(
            'order.updated',
          ).length
        })
      })
      .toBe(1)

    await page
      .getByRole('link', {
        name: /itens no carrinho/i,
      })
      .click()

    await expect(page).toHaveURL(/\/cart$/)

    await page
      .getByRole('link', {
        name: /Kurio, página inicial/i,
      })
      .click()

    await expect(page).toHaveURL(/\/$/)

    const listenerCounts =
      await page.evaluate(async () => {
        const { socketClient } = await import(
          '/src/services/socket/socket-client.ts'
        )

        return {
          nft: socketClient.listeners(
            'nft.updated',
          ).length,

          order: socketClient.listeners(
            'order.updated',
          ).length,
        }
      })

    expect(listenerCounts.nft).toBe(1)
    expect(listenerCounts.order).toBe(1)
  })
})