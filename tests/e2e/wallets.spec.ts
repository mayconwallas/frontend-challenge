import { expect, test } from '@playwright/test'

test.describe('Collector wallets', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => {
      localStorage.removeItem('kurio-session')
      localStorage.removeItem('kurio-wallets')
    })

    await page.reload()

    await page.goto('/login')

    await page
      .getByLabel('E-mail')
      .fill('collector@kurio.com')

    await page
      .getByLabel('Senha')
      .fill('Kurio123!')

    await page
      .getByRole('button', {
        name: 'Entrar',
      })
      .click()

    await expect(page).toHaveURL(/\/$/)

    await page.goto('/profile/wallets')
  })

  test('adds the first wallet as primary', async ({
    page,
  }) => {
    await page
      .getByLabel('Apelido da carteira*')
      .fill('Carteira Principal')

    await page
      .getByLabel('Endereço da carteira*')
      .fill('0x1234567890abcdef')

    await page
      .getByLabel('Rede*')
      .selectOption('ethereum')

    await page
      .getByLabel('Tipo de carteira*')
      .selectOption('walletconnect')

    await page
      .getByLabel('Nome ENS')
      .fill('kurio.eth')

    await page
      .getByRole('button', {
        name: 'Adicionar carteira',
      })
      .click()

    await expect(
      page.getByText(
        'Carteira adicionada com sucesso.',
      ),
    ).toBeVisible()

    await expect(
      page.getByText('Carteira Principal', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      page.getByText('Principal', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      page.getByText('kurio.eth', {
        exact: true,
      }),
    ).toBeVisible()
  })

  test('persists wallets after reload', async ({
    page,
  }) => {
    await page
      .getByLabel('Apelido da carteira*')
      .fill('Carteira Principal')

    await page
      .getByLabel('Endereço da carteira*')
      .fill('0x1234567890abcdef')

    await page
      .getByRole('button', {
        name: 'Adicionar carteira',
      })
      .click()

    await page.reload()

    await expect(
      page.getByText('Carteira Principal', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      page.getByText('0x1234567890abcdef'),
    ).toBeVisible()
  })

  test('changes the primary wallet', async ({
    page,
  }) => {
    await page
      .getByLabel('Apelido da carteira*')
      .fill('Ethereum Principal')

    await page
      .getByLabel('Endereço da carteira*')
      .fill('0x1111111111111111')

    await page
      .getByRole('button', {
        name: 'Adicionar carteira',
      })
      .click()

    await page
      .getByLabel('Apelido da carteira*')
      .fill('Polygon Reserva')

    await page
      .getByLabel('Endereço da carteira*')
      .fill('0x2222222222222222')

    await page
      .getByLabel('Rede*')
      .selectOption('polygon')

    await page
      .getByRole('button', {
        name: 'Adicionar carteira',
      })
      .click()

    await page
      .getByRole('button', {
        name: 'Definir como principal',
      })
      .click()

    await page.reload()

    const storedWallets =
      await page.evaluate(() => {
        return JSON.parse(
          localStorage.getItem(
            'kurio-wallets',
          ) ?? '[]',
        )
      })

    const primaryWallet =
      storedWallets.find(
        (wallet: {
          nickname: string
          isPrimary: boolean
        }) => wallet.isPrimary,
      )

    expect(primaryWallet.nickname).toBe(
      'Polygon Reserva',
    )
  })

  test('removes a secondary wallet', async ({
    page,
  }) => {
    await page
      .getByLabel('Apelido da carteira*')
      .fill('Principal')

    await page
      .getByLabel('Endereço da carteira*')
      .fill('0x1111111111111111')

    await page
      .getByRole('button', {
        name: 'Adicionar carteira',
      })
      .click()

    await page
      .getByLabel('Apelido da carteira*')
      .fill('Reserva')

    await page
      .getByLabel('Endereço da carteira*')
      .fill('0x2222222222222222')

    await page
      .getByRole('button', {
        name: 'Adicionar carteira',
      })
      .click()

const reserveCard = page
  .getByRole('article')
  .filter({
    has: page.getByRole('heading', {
      name: 'Reserva',
      exact: true,
    }),
  })

await reserveCard
  .getByRole('button', {
    name: 'Remover carteira',
  })
  .click()

await expect(reserveCard).not.toBeVisible()

await expect(
  page.getByRole('heading', {
    name: 'Principal',
    exact: true,
  }),
).toBeVisible()
  })

  test('uses the primary saved wallet at checkout', async ({
    page,
  }) => {
    await page
      .getByLabel('Apelido da carteira*')
      .fill('Carteira Checkout')

    await page
      .getByLabel('Endereço da carteira*')
      .fill('0x9999999999999999')

    await page
      .getByLabel('Tipo de carteira*')
      .selectOption('metamask')

    await page
      .getByRole('button', {
        name: 'Adicionar carteira',
      })
      .click()

    await page.goto('/nft/emerald-ape-042')

    await page
      .getByRole('button', {
        name: 'Adicionar ao carrinho',
      })
      .click()

    await page.goto('/checkout')

    await expect(
      page.getByLabel('Carteira'),
    ).toHaveValue(
      await page
        .getByLabel('Carteira')
        .inputValue(),
    )

    await expect(
      page.getByText(
        '0x9999999999999999',
      ),
    ).toHaveCount(2)

    await expect(
      page.getByText('MetaMask'),
    ).toBeVisible()

    await expect(
      page.getByRole('button', {
        name: 'Confirmar compra',
      }),
    ).toBeEnabled()
  })
})