import { expect, test } from '@playwright/test'

test.describe('Checkout quote', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => {
      localStorage.removeItem('kurio-cart')
    })

    await page.goto('/nft/emerald-ape-042')

    await page
      .getByRole('button', {
        name: 'Adicionar ao carrinho',
      })
      .click()

    await page.goto('/cart')
  })

  test('shows the cart quote summary', async ({ page }) => {
    await expect(
      page.getByText('Subtotal', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      page.getByText('Desconto', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      page.getByText('Taxa de rede', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      page.getByText('Total', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      page.getByText('1.1900 ETH'),
    ).toBeVisible()

    await expect(
      page.getByText('1.1925 ETH'),
    ).toBeVisible()
  })

  test('applies a valid coupon', async ({ page }) => {
    await page
      .getByLabel('Cupom')
      .fill('KURIO10')

    await page
      .getByRole('button', {
        name: 'Aplicar',
      })
      .click()

    await expect(
      page.getByText('Cupom KURIO10 aplicado'),
    ).toBeVisible()

    await expect(
      page.getByText('0.1190 ETH'),
    ).toBeVisible()

    await expect(
      page.getByText('1.0735 ETH'),
    ).toBeVisible()
  })

  test('rejects an expired coupon', async ({ page }) => {
    await page
      .getByLabel('Cupom')
      .fill('KURIOEXPIRED')

    await page
      .getByRole('button', {
        name: 'Aplicar',
      })
      .click()

    await expect(
      page.getByText('Cupom inválido ou expirado.'),
    ).toBeVisible()
  })

  test('rejects an invalid coupon', async ({ page }) => {
    await page
      .getByLabel('Cupom')
      .fill('TESTE123')

    await page
      .getByRole('button', {
        name: 'Aplicar',
      })
      .click()

    await expect(
      page.getByText('Cupom inválido ou expirado.'),
    ).toBeVisible()
  })
})