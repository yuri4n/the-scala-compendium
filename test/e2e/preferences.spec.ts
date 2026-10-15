import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('**/_vercel/insights/script.js', route => route.fulfill({
    contentType: 'application/javascript',
    body: '',
  }))
})

// DOM classes and computed styles on the production page verify
// that the application's shipped theme stylesheet responds to the shared layer.
test('sync system appearance and persist explicit overrides', async ({
  page,
  context,
}) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  const appearance = page.getByRole(
    'combobox',
    { name: 'Appearance', exact: true },
  )
  const html = page.locator('html')
  await expect(appearance).toBeEnabled()
  await expect(appearance).toHaveValue('system')
  await expect(html).toHaveClass(/\blight\b/)
  const lightBackground = await page.locator('html').evaluate(
    element => getComputedStyle(element).backgroundColor,
  )

  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(html).toHaveClass(/\bdark\b/)
  await expect(html).toHaveCSS('color-scheme', 'dark')
  const darkBackground = await page.locator('html').evaluate(
    element => getComputedStyle(element).backgroundColor,
  )
  expect(darkBackground).not.toBe(lightBackground)

  await appearance.selectOption('light')
  await expect(html).toHaveClass(/\blight\b/)
  await expect(html).toHaveCSS('color-scheme', 'light')
  await expect(page.locator('html')).toHaveCSS(
    'background-color',
    lightBackground,
  )
  expect(
    await page.evaluate(() => localStorage.getItem('app-color-mode')),
  ).toBe(
    'light',
  )
  await page.reload()
  await expect(appearance).toHaveValue('light')
  await expect(html).toHaveClass(/\blight\b/)
  await page.emulateMedia({ colorScheme: 'light' })
  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(html).toHaveClass(/\blight\b/)

  await appearance.selectOption('dark')
  await expect(html).toHaveClass(/\bdark\b/)
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(html).toHaveClass(/\bdark\b/)
  await page.reload()
  await expect(appearance).toHaveValue('dark')
  await expect(html).toHaveClass(/\bdark\b/)
  expect(
    await page.evaluate(() => localStorage.getItem('app-color-mode')),
  ).toBe(
    'dark',
  )

  // A new document in the same origin must use the saved preference too.
  const nextPage = await context.newPage()
  await nextPage.emulateMedia({ colorScheme: 'light' })
  await nextPage.goto('/guides/start-scala')
  await expect(
    nextPage.getByRole('combobox', { name: 'Appearance', exact: true }),
  ).toHaveValue(
    'dark',
  )
  await expect(nextPage.locator('html')).toHaveClass(/\bdark\b/)
  await nextPage.close()

  await appearance.selectOption('system')
  await expect(html).toHaveClass(/\blight\b/)
  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(html).toHaveClass(/\bdark\b/)
  await expect(appearance).toHaveValue('system')
  await page.reload()
  await expect(appearance).toHaveValue('system')
  await expect(html).toHaveClass(/\bdark\b/)
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(html).toHaveClass(/\blight\b/)
})
