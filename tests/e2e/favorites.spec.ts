import { expect, test } from '@playwright/test'

test.describe('NFT favorites', () => {
  test('favorites an NFT and keeps the state on detail', async ({
    page,
  }) => {
    await page.goto('/')

    const addFavoriteButton = page
      .getByRole('button', {
        name: 'Adicionar aos favoritos',
      })
      .first()

    await addFavoriteButton.click()

    await expect(
      page
        .getByRole('button', {
          name: 'Remover dos favoritos',
        })
        .first(),
    ).toBeVisible()

    await page
      .getByRole('link', {
        name: /NFT Emerald Ape #042/i,
      })
      .click()

    await expect(page).toHaveURL(
      /\/nft\/emerald-ape-042$/,
    )

    await expect(
      page.getByRole('button', {
        name: 'Remover dos favoritos',
      }),
    ).toBeVisible()
  })

  test('removes an NFT from favorites', async ({ page }) => {
    await page.goto('/nft/emerald-ape-042')

    const favoriteButton = page.getByRole('button', {
      name: /favoritos/i,
    })

    const label = await favoriteButton.getAttribute(
      'aria-label',
    )

    if (label === 'Adicionar aos favoritos') {
      await favoriteButton.click()

      await expect(
        page.getByRole('button', {
          name: 'Remover dos favoritos',
        }),
      ).toBeVisible()
    }

    await page
      .getByRole('button', {
        name: 'Remover dos favoritos',
      })
      .click()

    await expect(
      page.getByRole('button', {
        name: 'Adicionar aos favoritos',
      }),
    ).toBeVisible()
  })
})