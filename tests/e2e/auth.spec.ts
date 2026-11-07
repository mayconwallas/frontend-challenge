import { expect, test } from '@playwright/test'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => {
      localStorage.removeItem('kurio-session')
      localStorage.removeItem('kurio-users')
    })

    await page.reload()
  })

  test('logs in with valid credentials and persists the session', async ({
    page,
  }) => {
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

    await expect(
      page.getByRole('button', {
        name: 'Sair',
      }),
    ).toBeVisible()

    await page.reload()

    await expect(
      page.getByRole('button', {
        name: 'Sair',
      }),
    ).toBeVisible()
  })

  test('rejects invalid credentials', async ({
    page,
  }) => {
    await page.goto('/login')

    await page
      .getByLabel('E-mail')
      .fill('invalid@kurio.com')

    await page
      .getByLabel('Senha')
      .fill('senhaerrada')

    await page
      .getByRole('button', {
        name: 'Entrar',
      })
      .click()

    await expect(
      page.getByRole('alert'),
    ).toHaveText('E-mail ou senha inválidos.')
  })

  test('logs out and keeps the session cleared after reload', async ({
    page,
  }) => {
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

    await page
      .getByRole('button', {
        name: 'Sair',
      })
      .click()

    await expect(
      page.getByRole('link', {
        name: 'Entrar',
      }),
    ).toBeVisible()

    await page.reload()

    await expect(
      page.getByRole('link', {
        name: 'Entrar',
      }),
    ).toBeVisible()
  })

  test('registers and logs in again with the created account', async ({
    page,
  }) => {
    await page.goto('/register')

    await page
      .getByLabel('Nome')
      .fill('Wallas Teste')

    await page
      .getByLabel('E-mail')
      .fill('wallas@teste.com')

    await page
      .getByLabel('Senha')
      .fill('Kurio123!')

    await page
      .getByRole('button', {
        name: 'Criar conta',
      })
      .click()

    await expect(page).toHaveURL(/\/$/)

    await expect(
      page.getByRole('button', {
        name: 'Sair',
      }),
    ).toBeVisible()

    await page.reload()

    await expect(
      page.getByRole('button', {
        name: 'Sair',
      }),
    ).toBeVisible()

    await page
      .getByRole('button', {
        name: 'Sair',
      })
      .click()

    await page.goto('/login')

    await page
      .getByLabel('E-mail')
      .fill('wallas@teste.com')

    await page
      .getByLabel('Senha')
      .fill('Kurio123!')

    await page
      .getByRole('button', {
        name: 'Entrar',
      })
      .click()

    await expect(page).toHaveURL(/\/$/)

    await expect(
      page.getByRole('button', {
        name: 'Sair',
      }),
    ).toBeVisible()
  })
})