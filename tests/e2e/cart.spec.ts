import { expect, test } from '@playwright/test'

test.describe('NFT cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => {
      localStorage.removeItem('kurio-cart')
    })

    await page.reload()
  })

  test('adds an NFT to the cart and opens the cart page', async ({
    page,
  }) => {
    await page.goto('/nft/emerald-ape-042')

    await page
      .getByRole('button', {
        name: 'Adicionar ao carrinho',
      })
      .click()

    await expect(
      page.getByRole('link', {
        name: '1 itens no carrinho',
      }),
    ).toBeVisible()

    await page
      .getByRole('link', {
        name: '1 itens no carrinho',
      })
      .click()

    await expect(page).toHaveURL(/\/cart$/)

    await expect(
      page.getByRole('heading', {
        name: 'Carrinho',
      }),
    ).toBeVisible()

    await expect(
      page.getByRole('heading', {
        name: 'Emerald Ape #042',
      }),
    ).toBeVisible()
  })

  test('updates the NFT quantity', async ({ page }) => {
    await page.goto('/nft/emerald-ape-042')

    await page
      .getByRole('button', {
        name: 'Adicionar ao carrinho',
      })
      .click()

    await page.goto('/cart')

    await page
      .getByRole('button', {
        name: 'Aumentar quantidade de Emerald Ape #042',
      })
      .click()

    await expect(
      page.getByRole('link', {
        name: '2 itens no carrinho',
      }),
    ).toBeVisible()

    await page
      .getByRole('button', {
        name: 'Diminuir quantidade de Emerald Ape #042',
      })
      .click()

    await expect(
      page.getByRole('link', {
        name: '1 itens no carrinho',
      }),
    ).toBeVisible()
  })

  test('keeps the cart after page reload', async ({ page }) => {
    await page.goto('/nft/emerald-ape-042')

    await page
      .getByRole('button', {
        name: 'Adicionar ao carrinho',
      })
      .click()

    await page.goto('/cart')

    await page.reload()

    await expect(
      page.getByRole('heading', {
        name: 'Emerald Ape #042',
      }),
    ).toBeVisible()

    await expect(
      page.getByRole('link', {
        name: '1 itens no carrinho',
      }),
    ).toBeVisible()
  })

  test('removes an NFT from the cart', async ({ page }) => {
    await page.goto('/nft/emerald-ape-042')

    await page
      .getByRole('button', {
        name: 'Adicionar ao carrinho',
      })
      .click()

    await page.goto('/cart')

    await page
      .getByRole('button', {
        name: 'Remover',
      })
      .click()

    await expect(
      page.getByText('Seu carrinho está vazio.'),
    ).toBeVisible()

    await expect(
      page.getByRole('link', {
        name: '0 itens no carrinho',
      }),
    ).toBeVisible()
  })
})