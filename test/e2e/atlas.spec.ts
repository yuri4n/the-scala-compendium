import { expect, test } from '@playwright/test'

// The root Playwright config starts or reuses a production server.
test.beforeEach(async ({ page }) => {
  await page.route('**/_vercel/insights/script.js', route => route.fulfill({
    status: 200,
    contentType: 'application/javascript',
    body: '',
  }))
  await page.goto('/')
  await expect(page.getByRole('combobox', { name: 'Appearance', exact: true }))
    .toBeEnabled()
})

test('explore bridges and recover search and keyboard focus', async ({
  page,
}) => {
  await expect(page.locator('script[data-sdkn="@vercel/analytics/nuxt"]'))
    .toHaveCount(1)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Different worlds.',
  )
  const map = await page.locator('.map-viewport').boundingBox()
  const atlas = await page.locator('.atlas-layout').boundingBox()
  expect(map?.height).toBeGreaterThanOrEqual(780)
  expect((map?.width ?? 0) / (atlas?.width ?? 1)).toBeGreaterThan(0.98)

  const bridge = page.locator('.map-node[data-item="kyo-zio"]')
  await expect(bridge).toHaveAccessibleName(
    'kyo-zio, Community bridge, ZIO and Kyo',
  )
  await expect(bridge).toHaveAccessibleDescription('Kyo project')
  await bridge.click()
  await expect(page.locator('#selection-content h2')).toHaveText('kyo-zio')
  await expect(page.locator('.detail-kind')).toHaveText('Community bridge')
  await expect(
    page.getByRole('complementary', { name: 'Selected item details' }),
  )
    .toBeFocused()
  await page.keyboard.press('Tab')
  const back = page.getByRole('button', { name: 'Back to atlas' })
  await expect(back).toBeFocused()
  await expect(back).toBeInViewport()

  await page.getByRole('button', { name: 'Kyo', exact: true }).click()
  await page.getByRole('switch', { name: 'Bridges only' }).click()
  await expect(page.locator('.map-node[data-item="kyo-zio"]')).toBeVisible()
  const bridgeCount = await page.locator('.map-node').count()
  expect(bridgeCount).toBeGreaterThan(0)
  await expect(page.locator('.map-node:not(.bridge)')).toHaveCount(0)
  await page.getByRole('button', { name: 'List view' }).click()
  await expect(page.locator('.list-item')).toHaveCount(bridgeCount)
  await expect(page.locator('.list-item:not(.bridge)')).toHaveCount(0)

  await page.getByRole('searchbox').fill('not-a-library')
  await expect(page.getByRole('heading', { name: 'No connections found' }))
    .toBeVisible()
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.getByRole('searchbox')).toBeFocused()
  await expect(page.getByRole('searchbox')).toHaveValue('')
  await expect(page.getByRole('switch', { name: 'Bridges only' }))
    .not
    .toBeChecked()
  await expect(
    page.getByRole('button', { name: 'All ecosystems', exact: true }),
  )
    .toHaveAttribute('aria-pressed', 'true')
  const h34s = page.locator('.list-item[data-item="h34s"]')
  await expect(h34s).toHaveAccessibleDescription(/yuri4n.*In development/)
  await h34s.click()
  await expect(page.locator('#selection-content h2')).toHaveText('h34s')
  await expect(page.locator('.detail-byline')).toContainText('yuri4n')
  await expect(page.locator('.project-status')).toHaveText('In development')

  await page.getByRole('searchbox').fill('not-a-library')
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await page.locator('.list-item[data-item="zio-http"]').click()
  await expect(page.locator('.docs-link')).toHaveAttribute(
    'href',
    'https://ziohttp.com',
  )
  await back.click()
  await expect(page.locator('.list-item[data-item="zio-http"]')).toBeFocused()
  await page.locator('.list-item[data-item="kyo-ui"]').click()
  await expect(page.locator('.docs-link')).toHaveAttribute(
    'href',
    'https://github.com/getkyo/kyo/tree/main/kyo-ui',
  )
})

test('show Play once and find it through either membership', async ({
  page,
}) => {
  const play = page.locator('.map-node[data-item="play"]')
  await expect(play).toHaveCount(1)
  await expect(play).toHaveAccessibleName(
    /Play Framework.*Apache Pekko.*Scala Future/,
  )
  const ids = await page.locator('.map-node').evaluateAll(nodes =>
    nodes.map(node => node.getAttribute('data-item')),
  )
  expect(new Set(ids).size).toBe(ids.length)

  for (const ecosystem of ['Apache Pekko', 'Scala Future']) {
    await page.getByRole('button', { name: ecosystem, exact: true }).click()
    await expect(play).toHaveCount(1)
    await play.click()
    await expect(page.locator('#selection-content h2')).toHaveText(
      'Play Framework',
    )
    await expect(page.locator('.membership')).toContainText('Apache Pekko')
    await expect(page.locator('.membership')).toContainText('Scala Future')
    await page.getByRole('button', { name: 'Back to atlas' }).click()
    await expect(play).toBeFocused()
  }
  await page.getByRole('button', { name: 'List view' }).click()
  await expect(page.locator('.list-item[data-item="play"]')).toHaveCount(1)
})

test('keep the mobile map and list usable without page overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 844 })
  for (const progress of [0.25, 0.5, 0.75, 1]) {
    await page.locator('.inspira-border-beam').evaluate((element, fraction) => {
      for (const animation of element.getAnimations({ subtree: true })) {
        animation.pause()
        const duration = animation.effect?.getTiming().duration
        if (typeof duration === 'number')
          animation.currentTime = duration * fraction
      }
    }, progress)
    expect(await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    )).toBe(true)
  }
  await page.getByRole('searchbox').fill('tui4s')
  const tui4s = page.locator('.map-node[data-item="tui4s"]')
  await expect(tui4s).toHaveAccessibleDescription(/yuri4n.*Unpublished/)
  await tui4s.click()
  await expect(page.locator('#selection-content h2')).toBeInViewport()
  await expect(page.locator('#selection-content h2')).toHaveText('tui4s')
  await expect(page.locator('.project-status')).toHaveText('Unpublished')
  await expect(page.locator('.docs-link')).toHaveAttribute(
    'href',
    'https://github.com/yuri4n/tui4s',
  )
  expect(await page.locator('.map-viewport').evaluate(
    element => element.scrollWidth > element.clientWidth,
  )).toBe(true)
  await page.getByRole('button', { name: 'Back to atlas' }).click()
  await expect(tui4s).toBeFocused()

  await page.getByRole('searchbox').fill('')
  await page.getByRole('button', { name: 'List view' }).click()
  await page.locator('.list-item[data-item="kyo-zio"]').click()
  await expect(page.locator('#selection-content h2')).toHaveText('kyo-zio')
  await expect(page.locator('.docs-link')).toHaveAttribute(
    'href',
    'https://github.com/getkyo/kyo/tree/main/kyo-zio',
  )
  await page.getByRole('button', { name: 'Apache Pekko', exact: true }).click()
  await page.locator('.list-item[data-item="pekko-streams"]').click()
  await expect(page.locator('.docs-link')).toHaveAttribute(
    'href',
    'https://pekko.apache.org/docs/pekko/current/stream/index.html',
  )
  await page.getByRole('button', { name: 'Scala Future', exact: true }).click()
  await expect(page.locator('.list-item[data-item="scala-future"]'))
    .toBeVisible()
  await page.getByRole('switch', { name: 'Bridges only' }).click()
  await expect(page.locator('.list-item[data-item="kyo-compat"]')).toBeVisible()
  await expect(page.locator('.list-item:not(.bridge)')).toHaveCount(0)
})
