import { expect, test } from '@playwright/test'

const canonicalBase = 'https://the-scala-compendium.vercel.app'

test.beforeEach(async ({ page }) => {
  await page.route('**/_vercel/insights/script.js', route => route.fulfill({
    contentType: 'application/javascript',
    body: '',
  }))
})

const languages = [
  {
    code: 'en',
    prefix: '',
    browser: 'en-US',
    language: 'Language',
    appearance: 'Appearance',
    title: 'Different worlds.',
    bridge: 'Community bridge',
    and: ' and ',
    guide: 'Start a Scala project',
    before: 'Before you start',
    firstStep: 'Learn the shared language',
    back: 'All practical guides',
  },
  {
    code: 'es',
    prefix: '/es',
    browser: 'es-CO',
    language: 'Idioma',
    appearance: 'Apariencia',
    title: 'Mundos distintos.',
    bridge: 'Puente de la comunidad',
    and: ' y ',
    guide: 'Inicia un proyecto en Scala',
    before: 'Antes de empezar',
    firstStep: 'Aprende los fundamentos comunes del lenguaje',
    back: 'Todas las guías prácticas',
  },
  {
    code: 'pt-BR',
    prefix: '/pt-BR',
    browser: 'pt-BR',
    language: 'Idioma',
    appearance: 'Aparência',
    title: 'Mundos diferentes.',
    bridge: 'Ponte da comunidade',
    and: ' e ',
    guide: 'Comece um projeto Scala',
    before: 'Antes de começar',
    firstStep: 'Aprenda a base comum da linguagem',
    back: 'Todos os guias práticos',
  },
]

for (const language of languages) {
  test.describe(`${language.code} content and navigation`, () => {
    test.use({ locale: language.browser })

    test('detect language and navigate from guide to related tool', async ({
      page,
    }) => {
      await page.goto('/')
      await expect(page.locator('html')).toHaveAttribute('lang', language.code)
      await expect(page).toHaveURL(new RegExp(`${language.prefix}/?$`))
      await expect(
        page.getByRole('combobox', { name: language.appearance, exact: true }),
      )
        .toBeEnabled()
      await expect(
        page.getByRole('combobox', { name: language.language, exact: true }),
      ).toHaveValue(
        language.code,
      )
      await expect(page.getByRole('heading', { level: 1 })).toContainText(
        language.title,
      )
      const bridge = page.locator('.map-node[data-item="kyo-zio"]')
      await expect(bridge).toHaveAccessibleName(
        `kyo-zio, ${language.bridge}, ZIO${language.and}Kyo`,
      )
      await bridge.click()
      await expect(page.locator('.detail-kind')).toHaveText(language.bridge)
      await expect(page.locator('.legend-items')).toContainText(language.bridge)

      const guide = page.getByRole(
        'link',
        { name: language.guide, exact: true },
      )
      await expect(guide).toHaveAttribute(
        'href',
        `${language.prefix}/guides/start-scala`,
      )
      await guide.click()
      await expect(page).toHaveURL(
        new RegExp(`${language.prefix}/guides/start-scala$`),
      )
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        language.guide,
      )
      await expect(
        page.getByRole('heading', { name: language.before, exact: true }),
      )
        .toBeVisible()
      await expect(
        page.getByRole('heading', { name: language.firstStep, exact: true }),
      )
        .toBeVisible()
      await expect(page).toHaveTitle(new RegExp(language.guide))
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${canonicalBase}${language.prefix}/guides/start-scala`,
      )
      for (const alternate of languages) {
        await expect(page.locator(
          `link[rel="alternate"][hreflang="${alternate.code}"]`,
        )).toHaveAttribute(
          'href',
          `${canonicalBase}${alternate.prefix}/guides/start-scala`,
        )
      }
      await expect(page.locator('.guide-resources a').first()).toHaveAttribute(
        'href',
        'https://docs.scala-lang.org/scala3/book/introduction.html',
      )
      await page.getByRole('link', { name: language.back, exact: true })
        .first()
        .click()
      await expect(page).toHaveURL(new RegExp(`${language.prefix}/?#paths$`))
      await guide.click()
      await page.locator('.guide-related')
        .getByRole('link', { name: 'Scala CLI', exact: true })
        .click()
      await expect(page.getByRole('searchbox')).toHaveValue('Scala CLI')
      const tool = page.locator('.map-node[data-item="scala-cli"]')
      await expect(tool).toBeVisible()
      await tool.click()
      await expect(page.locator('#selection-content h2')).toHaveText(
        'Scala CLI',
      )
      await expect(page.locator('html')).toHaveAttribute('lang', language.code)
      await expect(page.locator('body')).not.toContainText(
        /(?:atlas|catalogue|guides|preference)\.[\w-]+/,
      )
    })
  })
}

test('persist language and preserve the current guide', async ({
  page,
  context,
}) => {
  await page.goto('/guides/start-scala')
  await expect(page.getByRole('combobox', { name: 'Appearance', exact: true }))
    .toBeEnabled()
  await page.getByRole(
    'combobox',
    { name: 'Language', exact: true },
  ).selectOption(
    'pt-BR',
  )
  await expect(page).toHaveURL(/\/pt-BR\/guides\/start-scala$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Comece um projeto Scala',
  )
  await page.reload()
  await expect(
    page.getByRole('combobox', { name: 'Idioma', exact: true }),
  ).toHaveValue(
    'pt-BR',
  )
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await page.goto('/')
  await expect(page).toHaveURL(/\/pt-BR\/?$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Mundos diferentes.',
  )
  expect(
    (await context.cookies()).find(
      cookie => cookie.name === 'app-locale',
    )?.value,
  ).toBe(
    'pt-BR',
  )

  // A direct localized URL overrides the remembered language.
  await page.goto('/es/guides/start-scala')
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Inicia un proyecto en Scala',
  )
  await expect(page.getByRole('combobox', { name: 'Apariencia', exact: true }))
    .toBeEnabled()
  await page.getByRole(
    'combobox',
    { name: 'Idioma', exact: true },
  ).selectOption(
    'en',
  )
  await expect(page).toHaveURL(/\/guides\/start-scala$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Start a Scala project',
  )
})

test('unknown guides return a real 404', async ({ page }) => {
  const response = await page.goto('/es/guides/missing-guide')
  expect(response?.status()).toBe(404)
})
