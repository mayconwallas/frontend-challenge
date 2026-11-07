import { expect, test } from '@playwright/test'

test.describe('NFT detail', () => {
  test('opens an NFT from the catalog', async ({ page }) => {
    await page.goto('/')

    await page
      .getByRole('link', {
        name: /NFT Emerald Ape #042/i,
      })
      .click()

    await expect(page).toHaveURL(
      /\/nft\/emerald-ape-042$/,
    )

    await expect(
      page.getByRole('heading', {
        name: 'Emerald Ape #042',
        level: 1,
      }),
    ).toBeVisible()

    await expect(
      page.getByText('1.19 ETH', {
        exact: true,
      }),
    ).toBeVisible()
  })

  test('shows NFT information', async ({ page }) => {
    await page.goto('/nft/emerald-ape-042')

    const nftSummary = page
      .locator('dl')
      .first()

    await expect(
      nftSummary.getByText('Kurio', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      nftSummary.getByText('Ethereum', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      nftSummary.getByText('50', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      page.getByRole('button', {
        name: 'Adicionar ao carrinho',
      }),
    ).toBeVisible()

    await expect(
      page.getByRole('button', {
        name: 'Comprar NFT',
      }),
    ).toBeVisible()

    await expect(
      page.getByRole('tab', {
        name: 'Detalhes do NFT',
      }),
    ).toBeVisible()

    await expect(
      page.getByRole('tab', {
        name: 'Avaliações',
      }),
    ).toBeVisible()

    await expect(
      page.getByRole('button', {
        name: 'Diminuir quantidade de Emerald Ape #042',
      }),
    ).toBeDisabled()

    await expect(
      page.getByRole('button', {
        name: 'Aumentar quantidade de Emerald Ape #042',
      }),
    ).toBeEnabled()
  })

  test('shows not found state for an invalid NFT', async ({
    page,
  }) => {
    await page.goto('/nft/nao-existe')

    await expect(
      page.getByRole('heading', {
        name: 'NFT não encontrado',
      }),
    ).toBeVisible()

    await expect(
      page.getByRole('link', {
        name: 'Voltar ao catálogo',
      }),
    ).toBeVisible()
  })
})