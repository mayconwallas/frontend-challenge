import { expect, test } from '@playwright/test'

test('renders the application shell', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      name: /seja dono da cultura digital/i,
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('button', {
      name: /explorar/i,
    }),
  ).toBeVisible()

  await expect(
    page.getByRole('link', {
      name: /kurio - página inicial/i,
    }),
  ).toBeVisible()
})


test('shows the correct navigation for the viewport', async ({
  page,
}, testInfo) => {
  await page.goto('/')

  const mobileNavigation = page.getByRole('navigation', {
    name: 'Navegação móvel',
  })

  const desktopNavigation = page.getByRole('navigation', {
    name: 'Navegação principal',
  })

  if (testInfo.project.name === 'desktop') {
    await expect(desktopNavigation).toBeVisible()
    await expect(mobileNavigation).toBeHidden()
    return
  }

  await expect(mobileNavigation).toBeVisible()
  await expect(desktopNavigation).toBeHidden()
})
