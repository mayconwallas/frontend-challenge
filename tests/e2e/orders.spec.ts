import { expect, test } from '@playwright/test'

test.describe('Orders flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => {
      localStorage.removeItem('kurio-cart')
      localStorage.removeItem('kurio-orders')
      localStorage.removeItem('kurio-session')
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

    await page.goto('/nft/emerald-ape-042')

    await page
      .getByRole('button', {
        name: 'Adicionar ao carrinho',
      })
      .click()

    await page.goto('/checkout')

    await page
      .getByLabel('Nome')
      .fill('Kurio Collector')

    await page
      .getByLabel('E-mail')
      .fill('collector@kurio.com')

    await page
      .getByLabel('Endereço da carteira')
      .fill('0x1234567890abcdef')

    await page
      .getByLabel('Rede')
      .selectOption('ethereum')
  })

  test('creates a pending order and keeps it after reload', async ({
    page,
  }) => {
    await page
      .getByRole('button', {
        name: 'Finalizar compra',
      })
      .click()

    await expect(page).toHaveURL(
      /\/order\/[^/]+$/,
    )

    await expect(
      page.getByText('Pagamento pendente'),
    ).toBeVisible()

    await expect(
      page.getByText('Emerald Ape #042'),
    ).toBeVisible()

    await page.reload()

    await expect(
      page.getByText('Pagamento pendente'),
    ).toBeVisible()

    await expect(
      page.getByText('Emerald Ape #042'),
    ).toBeVisible()
  })

  test('confirms an order and clears the cart', async ({
    page,
  }) => {
    await page
      .getByRole('button', {
        name: 'Finalizar compra',
      })
      .click()

    await expect(page).toHaveURL(
      /\/order\/[^/]+$/,
    )

    await expect(
      page.getByText('Pagamento pendente'),
    ).toBeVisible()

    await page
      .getByRole('button', {
        name: 'Confirmar pagamento',
      })
      .click()

    await expect(
      page.getByText('Compra confirmada'),
    ).toBeVisible()

    await expect(
      page.getByText('ID da transação'),
    ).toBeVisible()

    await expect(
      page.getByRole('link', {
        name: '0 itens no carrinho',
      }),
    ).toBeVisible()

    await page.reload()

    await expect(
      page.getByText('Compra confirmada'),
    ).toBeVisible()

    await expect(
      page.getByText('ID da transação'),
    ).toBeVisible()

    await page.goto('/cart')

    await expect(
      page.getByText('Seu carrinho está vazio.'),
    ).toBeVisible()
  })

  test('rejects an order and preserves the cart', async ({
    page,
  }) => {
    await page
      .getByRole('button', {
        name: 'Finalizar compra',
      })
      .click()

    await expect(page).toHaveURL(
      /\/order\/[^/]+$/,
    )

    await expect(
      page.getByText('Pagamento pendente'),
    ).toBeVisible()

    await page
      .getByRole('button', {
        name: 'Recusar pagamento',
      })
      .click()

    await expect(
      page.getByText('Pagamento recusado'),
    ).toBeVisible()

    await expect(
      page.getByRole('link', {
        name: '1 itens no carrinho',
      }),
    ).toBeVisible()

    await page.reload()

    await expect(
      page.getByText('Pagamento recusado'),
    ).toBeVisible()

    await page.goto('/cart')

    await expect(
      page.getByRole('heading', {
        name: 'Emerald Ape #042',
      }),
    ).toBeVisible()
  })
})