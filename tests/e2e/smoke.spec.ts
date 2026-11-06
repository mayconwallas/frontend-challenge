import { expect, test } from '@playwright/test'

test('renders the application shell', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      name: 'Frontend Challenge',
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('button', {
      name: 'Explore NFTs',
    }),
  ).toBeVisible()
})