import { expect, test } from '@playwright/test'

test.describe('Collector profile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => {
      localStorage.removeItem('kurio-session')
      localStorage.removeItem('kurio-profile')
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
  })

  test('opens the collector profile', async ({
    page,
  }) => {
    await page.goto('/profile')

    await expect(
      page.getByRole('heading', {
        name: 'Perfil do colecionador',
      }),
    ).toBeVisible()

    await expect(
      page.getByLabel('Nome de exibição*'),
    ).toHaveValue('Kurio Collector')

    await expect(
      page.getByLabel('E-mail*'),
    ).toHaveValue('collector@kurio.com')
  })

  test('updates and persists profile data', async ({
    page,
  }) => {
    await page.goto('/profile')

    await page
      .getByLabel('Nome de exibição*')
      .fill('Kurio Collector Teste')

    await page
      .getByLabel('Nome de usuário*')
      .fill('kurio.teste')

    await page
      .getByLabel('Nome ENS')
      .fill('kurio.eth')

    await page
      .getByLabel('Apelido da carteira')
      .fill('Carteira Principal')

    await page
      .getByRole('button', {
        name: 'Salvar perfil',
      })
      .click()

    await expect(
      page.getByText(
        'Perfil atualizado com sucesso.',
      ),
    ).toBeVisible()

    await page.reload()

    await expect(
      page.getByLabel('Nome de exibição*'),
    ).toHaveValue('Kurio Collector Teste')

    await expect(
      page.getByLabel('Nome de usuário*'),
    ).toHaveValue('kurio.teste')

    await expect(
      page.getByLabel('Nome ENS'),
    ).toHaveValue('kurio.eth')

    await expect(
      page.getByLabel('Apelido da carteira'),
    ).toHaveValue('Carteira Principal')
  })

  test('keeps the session synchronized with the profile', async ({
    page,
  }) => {
    await page.goto('/profile')

    await page
      .getByLabel('Nome de exibição*')
      .fill('Kurio Collector Teste')

    await page
      .getByRole('button', {
        name: 'Salvar perfil',
      })
      .click()

    await expect(
      page.getByText(
        'Perfil atualizado com sucesso.',
      ),
    ).toBeVisible()

    const sessionAfterUpdate =
      await page.evaluate(() => {
        return JSON.parse(
          localStorage.getItem('kurio-session') ??
            'null',
        )
      })

    expect(
      sessionAfterUpdate?.user?.name,
    ).toBe('Kurio Collector Teste')

    await page.reload()

    const sessionAfterReload =
      await page.evaluate(() => {
        return JSON.parse(
          localStorage.getItem('kurio-session') ??
            'null',
        )
      })

    expect(
      sessionAfterReload?.user?.name,
    ).toBe('Kurio Collector Teste')

    await expect(
      page.getByLabel('Nome de exibição*'),
    ).toHaveValue('Kurio Collector Teste')
  })

  test('changes the collector password', async ({
    page,
  }) => {
    await page.goto('/profile')

    await page
      .getByLabel('Senha atual*')
      .fill('Kurio123!')

    await page
      .getByLabel('Nova senha*', {
        exact: true,
      })
      .fill('NovaKurio123!')

    await page
      .getByLabel('Confirmar nova senha*')
      .fill('NovaKurio123!')

    await page
      .getByRole('button', {
        name: 'Salvar nova senha',
      })
      .click()

    await expect(
      page.getByText(
        'Senha atualizada com sucesso.',
      ),
    ).toBeVisible()
  })
})