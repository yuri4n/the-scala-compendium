import type { Locator, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

async function expectFloatingPanel(page: Page, anchor: Locator) {
  const dialog = page.getByRole('dialog')
  await expect(dialog).toHaveCount(1)
  await expect(dialog).toBeVisible()
  await expect.poll(async () => {
    const panel = await dialog.boundingBox()
    const node = await anchor.boundingBox()
    const viewport = page.viewportSize()
    if (!panel || !node || !viewport)
      return false
    const horizontalGap = Math.max(
      panel.x - node.x - node.width,
      node.x - panel.x - panel.width,
      0,
    )
    const verticalGap = Math.max(
      panel.y - node.y - node.height,
      node.y - panel.y - panel.height,
      0,
    )
    return (
      panel.x >= 10
      && panel.y >= 10
      && panel.x + panel.width <= viewport.width - 10
      && panel.y + panel.height <= viewport.height - 10
      && Math.hypot(horizontalGap, verticalGap) <= 28
    )
  }).toBe(true)
}

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
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await bridge.scrollIntoViewIfNeeded()
  const scrollBefore = await page.evaluate(() => window.scrollY)
  const mapScrollBefore = await page.locator('.map-viewport').evaluate(
    element => element.scrollLeft,
  )
  await bridge.click()
  await expect(page.locator('#selection-content h2')).toHaveText('kyo-zio')
  await expect(page.locator('.detail-kind')).toHaveText('Community bridge')
  await expect(
    page.getByRole(
      'dialog',
      { name: 'kyo-zio, Community bridge, ZIO and Kyo', exact: true },
    ),
  )
    .toBeVisible()
  const close = page.getByRole('button', { name: 'Close details' })
  await expect(close).toBeFocused()
  await expect(close).toBeInViewport()
  await expectFloatingPanel(page, bridge)
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore)
  expect(await page.locator('.map-viewport').evaluate(
    element => element.scrollLeft,
  )).toBe(mapScrollBefore)

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
  await close.click()
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
    await page.getByRole(
      'button',
      { name: 'All ecosystems', exact: true },
    ).click()
    await page.getByRole('button', { name: ecosystem, exact: true }).click()
    await expect(play).toHaveCount(1)
    await play.click()
    await expect(page.locator('#selection-content h2')).toHaveText(
      'Play Framework',
    )
    await expect(page.locator('.membership')).toContainText('Apache Pekko')
    await expect(page.locator('.membership')).toContainText('Scala Future')
    await page.getByRole('button', { name: 'Close details' }).click()
    await expect(play).toBeFocused()
  }
  // Both filters include Play, but it must still have one map node.
  await page.getByRole('button', { name: 'Apache Pekko', exact: true }).click()
  await expect(play).toHaveCount(1)
  await page.getByRole(
    'combobox',
    { name: 'Match ecosystems', exact: true },
  ).selectOption('all')
  await expect(play).toHaveCount(1)
  await expect(page.locator('.map-node')).toHaveCount(1)
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
  await expectFloatingPanel(page, tui4s)
  expect(await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  )).toBe(true)
  await expect(page.locator('.docs-link')).toHaveAttribute(
    'href',
    'https://github.com/yuri4n/tui4s',
  )
  expect(await page.locator('.map-viewport').evaluate(
    element => element.scrollWidth > element.clientWidth,
  )).toBe(true)
  await page.getByRole('button', { name: 'Close details' }).click()
  await expect(tui4s).toBeFocused()

  await page.getByRole('searchbox').fill('')
  await page.getByRole('button', { name: 'List view' }).click()
  const listBridge = page.locator('.list-item[data-item="kyo-zio"]')
  await listBridge.click()
  await expectFloatingPanel(page, listBridge)
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
  await page.getByRole(
    'button',
    { name: 'All ecosystems', exact: true },
  ).click()
  await page.getByRole('button', { name: 'Scala Future', exact: true }).click()
  await expect(page.locator('.list-item[data-item="scala-future"]'))
    .toBeVisible()
  await page.getByRole('switch', { name: 'Bridges only' }).click()
  await expect(page.locator('.list-item[data-item="kyo-compat"]')).toBeVisible()
  await expect(page.locator('.list-item:not(.bridge)')).toHaveCount(0)
})

test('combine ecosystems with OR and AND and reset empty matches', async ({
  page,
}) => {
  const all = page.getByRole(
    'button',
    { name: 'All ecosystems', exact: true },
  )
  const zio = page.getByRole('button', { name: 'ZIO', exact: true })
  const kyo = page.getByRole('button', { name: 'Kyo', exact: true })
  const typelevel = page.getByRole(
    'button',
    { name: 'Typelevel', exact: true },
  )
  const match = page.getByRole(
    'combobox',
    { name: 'Match ecosystems', exact: true },
  )
  const bridgeSwitch = page.getByRole('switch', { name: 'Bridges only' })
  const rows = page.locator('.list-item')
  const readIds = () => rows.evaluateAll(nodes =>
    nodes.map(node => node.getAttribute('data-item')).sort(),
  )

  await expect(all).toHaveAttribute('aria-pressed', 'true')
  await expect(match).toHaveValue('any')
  await expect(match.locator('option[value="any"]'))
    .toHaveText('Match any (OR)')
  await expect(match.locator('option[value="all"]'))
    .toHaveText('Match all (AND)')
  await page.getByRole('button', { name: 'List view' }).click()

  // Derive the union from independently observed single-ecosystem results.
  // This checks the interaction without duplicating the filtering function.
  await zio.click()
  await expect(zio).toHaveAttribute('aria-pressed', 'true')
  await expect(all).toHaveAttribute('aria-pressed', 'false')
  await expect(page.locator('.list-item[data-item="zio"]')).toBeVisible()
  await expect(page.locator('.list-item[data-item="kyo"]')).toHaveCount(0)
  const zioIds = await readIds()
  await all.click()
  await expect(zio).toHaveAttribute('aria-pressed', 'false')
  await kyo.click()
  await expect(page.locator('.list-item[data-item="kyo"]')).toBeVisible()
  await expect(page.locator('.list-item[data-item="zio"]')).toHaveCount(0)
  const kyoIds = await readIds()

  await zio.click()
  await expect(zio).toHaveAttribute('aria-pressed', 'true')
  await expect(kyo).toHaveAttribute('aria-pressed', 'true')
  const unionIds = [...new Set([...zioIds, ...kyoIds])].sort()
  await expect.poll(readIds).toEqual(unionIds)
  await expect(page.locator('.list-item[data-item="cats-effect"]'))
    .toHaveCount(0)

  // Selecting an active chip removes only that ecosystem.
  await kyo.click()
  await expect(kyo).toHaveAttribute('aria-pressed', 'false')
  await expect(zio).toHaveAttribute('aria-pressed', 'true')
  await expect.poll(readIds).toEqual(zioIds)
  await kyo.click()
  await expect.poll(readIds).toEqual(unionIds)

  await match.selectOption('all')
  await expect.poll(readIds).toEqual([
    'kyo-compat',
    'kyo-zio',
    'mixed-guide',
  ])
  await expect(page.locator('.list-item[data-item="mixed-guide"]'))
    .toHaveAccessibleName(/Proposed guide/)
  await bridgeSwitch.click()
  await expect.poll(readIds).toEqual(['kyo-compat', 'kyo-zio'])
  await expect(rows.locator('.list-kind')).toHaveText([
    'Community bridge',
    'Community bridge',
  ])

  await bridgeSwitch.click()
  await typelevel.click()
  await expect(typelevel).toHaveAttribute('aria-pressed', 'true')
  await expect.poll(readIds).toEqual(['mixed-guide'])
  await bridgeSwitch.click()
  await expect(rows).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'No connections found' }))
    .toBeVisible()

  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(all).toHaveAttribute('aria-pressed', 'true')
  for (const chip of [zio, kyo, typelevel])
    await expect(chip).toHaveAttribute('aria-pressed', 'false')
  await expect(match).toHaveValue('any')
  await expect(bridgeSwitch).not.toBeChecked()
  await expect(page.getByRole('searchbox')).toHaveValue('')
  await expect(page.getByRole('searchbox')).toBeFocused()
  await expect(page.locator('.list-item[data-item="zio"]')).toBeVisible()
  await expect(page.locator('.list-item[data-item="kyo"]')).toBeVisible()
  await expect(page.locator('.list-item[data-item="cats-effect"]'))
    .toBeVisible()
})

test('open details by keyboard and dismiss without losing the map', async ({
  page,
}) => {
  const bridge = page.locator('.map-node[data-item="kyo-zio"]')
  const dialog = page.getByRole('dialog')
  const close = page.getByRole('button', { name: 'Close details' })
  await bridge.scrollIntoViewIfNeeded()
  await bridge.focus()
  await page.keyboard.press('Enter')
  await expect(dialog).toHaveAccessibleName(
    'kyo-zio, Community bridge, ZIO and Kyo',
  )
  await expect(bridge).toHaveAttribute('aria-expanded', 'true')
  await expect(close).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(bridge).toBeFocused()
  await expect(bridge).toHaveAttribute('aria-expanded', 'false')

  await page.keyboard.press('Space')
  await expect(dialog).toBeVisible()
  await close.click()
  await expect(dialog).toHaveCount(0)
  await expect(bridge).toBeFocused()

  await bridge.click()
  await expect(dialog).toBeVisible()
  await page.getByRole('searchbox').click()
  await expect(dialog).toHaveCount(0)
  await expect(page.getByRole('searchbox')).toBeFocused()

  // A second node replaces the inspector, with only one dialog mounted.
  await bridge.click()
  const zio = page.locator('.map-node[data-item="zio"]')
  await zio.click()
  await expect(dialog).toHaveCount(1)
  await expect(dialog).toHaveAccessibleName('ZIO, Library, ZIO')
  await expect(bridge).toHaveAttribute('aria-expanded', 'false')
  await expect(zio).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('/')
  await expect(page.getByRole('searchbox')).toBeFocused()
  await expect(dialog).toHaveCount(0)
})

for (const width of [1280, 390]) {
  test(`scroll the page over the diagram at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const map = page.locator('.map-viewport')
    await map.evaluate((element) => {
      window.scrollTo({
        top: window.scrollY + element.getBoundingClientRect().top - 80,
        behavior: 'instant',
      })
    })

    // Use real wheel input: computed CSS alone cannot prove scroll chaining.
    for (const target of ['background', 'node']) {
      if (target === 'background')
        await map.hover({ position: { x: 20, y: 250 } })
      else
        await page.locator('.map-node[data-item="zio"]').hover()
      const before = await page.evaluate(() => window.scrollY)
      await page.mouse.wheel(0, 160)
      await expect.poll(() => page.evaluate(() => window.scrollY))
        .toBeGreaterThan(before + 100)
      const after = await page.evaluate(() => window.scrollY)
      await page.mouse.wheel(0, -160)
      await expect.poll(() => page.evaluate(() => window.scrollY))
        .toBeLessThan(after - 100)
      expect(await map.evaluate(element => element.scrollTop)).toBe(0)
    }

    if (width < 1100) {
      await map.hover({ position: { x: 20, y: 250 } })
      const before = await map.evaluate(element => element.scrollLeft)
      const pageTop = await page.evaluate(() => window.scrollY)
      await page.mouse.wheel(160, 0)
      await expect.poll(() => map.evaluate(element => element.scrollLeft))
        .toBeGreaterThan(before + 100)
      expect(await page.evaluate(() => window.scrollY)).toBe(pageTop)
      expect(await page.evaluate(() => window.scrollX)).toBe(0)
    }
  })
}
