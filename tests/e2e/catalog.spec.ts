import { expect, test } from '@playwright/test'

test.describe('NFT catalog', () => {
  test('sorts NFTs by ascending price', async ({ page }) => {
    await page.goto('/?sort=price-asc')

    const prices = page.locator('article').getByText(/ETH$/)

    await expect(prices.first()).toHaveText('0.99 ETH')
  })

  test('filters trending NFTs by Ethereum network', async ({
    page,
  }) => {
    await page.goto('/?tab=trending&network=ethereum')

    await expect(
      page.getByText('Emerald Ape #042'),
    ).toBeVisible()

    await expect(
      page.getByText('Ivory Baron #088'),
    ).toBeVisible()

    await expect(
      page.getByText('Golden Beat #207'),
    ).not.toBeVisible()
  })

  test('navigates to the second catalog page', async ({
    page,
  }) => {
    await page.goto('/')

    await page
      .getByRole('button', { name: '2', exact: true })
      .click()

    await expect(page).toHaveURL(/\?page=2/)

    await expect(
      page.getByText('Golden Beat #207'),
    ).toBeVisible()

    await expect(
      page.getByText('Emerald Ape #042'),
    ).not.toBeVisible()
  })
})