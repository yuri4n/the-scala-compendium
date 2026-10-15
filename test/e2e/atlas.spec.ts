import { expect, test } from '@nuxt/test-utils/playwright'

test('explore ecosystem intersections and recover from empty search', async ({
  page,
  goto,
}) => {
  await page.route('**/_vercel/insights/script.js', route => route.fulfill({
    status: 200,
    contentType: 'application/javascript',
    body: '',
  }))
  await goto('/', { waitUntil: 'hydration' })
  await expect(page.locator('script[data-sdkn="@vercel/analytics/nuxt"]'))
    .toHaveCount(1)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Different worlds.',
  )
  await page.getByRole(
    'button',
    { name: 'kyo-zio, bridge, ZIO and Kyo', exact: true },
  )
    .click()
  await expect(page.locator('#selection-content h2')).toHaveText('kyo-zio')
  await page.getByRole('button', { name: 'Kyo', exact: true }).click()
  await page.getByRole('switch', { name: 'Bridges only' }).click()
  await expect(page.locator('.map-node')).toHaveCount(3)
  await page.getByRole('button', { name: 'List view' }).click()
  await expect(page.locator('.list-item')).toHaveCount(3)
  await page.getByRole('searchbox').fill('not-a-library')
  await expect(page.getByText('No connections found')).toBeVisible()
  await page.getByRole('button', { name: 'Explore h34s', exact: true }).click()
  await expect(page.locator('#selection-content h2')).toHaveText('h34s')
  await expect(page.locator('.detail-byline')).toContainText('yuri4n')
  await expect(page.locator('.project-status')).toHaveText('In development')
  await expect(page.getByRole('searchbox')).toHaveValue('')
  const bridgeSwitch = page.getByRole('switch', { name: 'Bridges only' })
  await expect(bridgeSwitch).not.toBeChecked()
  await expect(page.locator('.list-item')).toHaveCount(22)
  await page.getByRole('searchbox').fill('not-a-library')
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.locator('.list-item')).toHaveCount(22)
})

test('mobile supports diagram scrolling and list selection', async ({
  page,
  goto,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await goto('/', { waitUntil: 'hydration' })
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(
    true,
  )
  await page.getByRole('button', { name: 'Explore tui4s', exact: true }).click()
  await expect(page.locator('#selection-content h2')).toBeInViewport()
  await expect(page.locator('#selection-content h2')).toHaveText('tui4s')
  await expect(page.locator('.project-status')).toHaveText('Unpublished')
  await expect(page.locator('.docs-link')).toHaveAttribute(
    'href',
    'https://github.com/yuri4n/tui4s',
  )
  expect(
    await page.locator('.map-viewport').evaluate(
      element => element.scrollWidth > element.clientWidth,
    ),
  ).toBe(
    true,
  )
  await page.getByRole('button', { name: 'List view' }).click()
  await page.getByRole(
    'button',
    { name: 'kyo-zio, bridge, ZIO and Kyo', exact: true },
  )
    .click()
  await expect(page.locator('#selection-content h2')).toHaveText('kyo-zio')
  await expect(page.locator('.docs-link')).toHaveAttribute(
    'href',
    'https://github.com/getkyo/kyo/tree/main/kyo-zio',
  )
  await page.getByRole('button', { name: 'Apache Pekko', exact: true }).click()
  await expect(page.locator('.list-item')).toHaveCount(2)
  await page.getByRole(
    'button',
    { name: 'Pekko Streams, library, Apache Pekko', exact: true },
  )
    .click()
  await expect(page.locator('.docs-link')).toHaveAttribute(
    'href',
    'https://pekko.apache.org/docs/pekko/current/stream/index.html',
  )
  await page.getByRole('button', { name: 'Scala Future', exact: true }).click()
  await expect(page.locator('.list-item')).toHaveCount(2)
  await expect(
    page.getByRole(
      'button',
      { name: 'Future & Promise, library, Scala Future', exact: true },
    ),
  )
    .toBeVisible()
  await page.getByRole('switch', { name: 'Bridges only' }).click()
  await expect(page.locator('.list-item')).toHaveCount(1)
  await expect(page.locator('.list-item')).toContainText('kyo-compat')
})
