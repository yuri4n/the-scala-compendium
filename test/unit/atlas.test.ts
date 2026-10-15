import type { AtlasItem } from '../../shared/utils/atlas'
import { describe, expect, it } from 'vitest'
import portuguese from '../../i18n/locales/pt-BR.json'
import { atlasItems, filterAtlas } from '../../shared/utils/atlas'

const ids = (items: AtlasItem[]) => items.map(item => item.id)

describe('ecosystem atlas filtering', () => {
  it('finds documented bridges through either connected ecosystem', () => {
    for (const ecosystem of ['zio', 'kyo'] as const) {
      expect(ids(filterAtlas({ ecosystem, bridgesOnly: true })))
        .toEqual(expect.arrayContaining(['kyo-zio', 'kyo-compat']))
    }
    for (const ecosystem of ['zio', 'typelevel'] as const) {
      expect(ids(filterAtlas({ ecosystem, bridgesOnly: true })))
        .toContain('zio-cats')
    }
    expect(ids(filterAtlas({ ecosystem: 'future', bridgesOnly: true })))
      .toContain('kyo-compat')
  })

  it('combines normalized search with the selected ecosystem', () => {
    expect(ids(filterAtlas({ ecosystem: 'typelevel', query: '  CATS  ' })))
      .toContain('cats-effect')
    expect(filterAtlas({ ecosystem: 'zio', query: 'Doobie' })).toEqual([])
    expect(filterAtlas({ query: 'not-a-real-scala-library' })).toEqual([])
  })

  it('keeps proposed work out of implemented bridge results', () => {
    const bridges = filterAtlas({ bridgesOnly: true })
    expect(bridges.length).toBeGreaterThan(0)
    expect(bridges.every(item => item.kind === 'bridge')).toBe(true)
    expect(ids(bridges)).not.toContain('mixed-guide')
    expect(filterAtlas({ query: 'kyo-h34s', bridgesOnly: true })).toEqual([])
    expect(filterAtlas()).toEqual(atlasItems)
  })

  it('keeps planned owner integrations distinct from memberships', () => {
    expect(ids(filterAtlas({ query: 'yuri4n' })))
      .toEqual(expect.arrayContaining(['h34s', 'tui4s']))
    expect(ids(filterAtlas({ query: 'kyo-h34s' }))).toContain('h34s')
    expect(filterAtlas({ ecosystem: 'zio', query: 'tui4s' })).toEqual([])
    expect(filterAtlas({ ecosystem: 'kyo', query: 'h34s' })).toEqual([])
    expect(atlasItems.find(item => item.id === 'h34s')?.status)
      .toBe('In development')
    expect(atlasItems.find(item => item.id === 'tui4s')?.status)
      .toBe('Unpublished')
  })

  it('distinguishes actors and preserves Play memberships', () => {
    expect(ids(filterAtlas({ ecosystem: 'akka' })))
      .toEqual(expect.arrayContaining(['akka-typed', 'akka-streams']))
    expect(ids(filterAtlas({ ecosystem: 'akka' }))).not.toContain('pekko-typed')
    expect(ids(filterAtlas({ ecosystem: 'pekko' }))).not.toContain('akka-typed')
    for (const ecosystem of ['pekko', 'future'] as const) {
      const matches = filterAtlas({ ecosystem, query: 'Play Framework' })
      expect(ids(matches)).toEqual(['play'])
    }
    expect(filterAtlas({ ecosystem: 'akka', query: 'Play Framework' }))
      .toEqual([])
  })

  it('finds shared tools without assigning an effect runtime', () => {
    const shared = filterAtlas({ ecosystem: 'shared' })
    expect(ids(shared)).toEqual(expect.arrayContaining([
      'tapir',
      'sttp',
      'upickle',
      'chimney',
      'slick',
      'quill',
      'scala-cli',
      'sbt',
      'mill',
      'metals',
      'scalafmt',
      'scalafix',
      'munit',
      'scalatest',
      'scalacheck',
      'scala-js',
      'scala-native',
      'laminar',
      'spark',
    ]))
    expect(filterAtlas({ ecosystem: 'shared', query: ' SCALA CLI ' })
      .find(item => item.id === 'scala-cli')
      ?.kind)
      .toBe('tool')
    for (const ecosystem of ['zio', 'typelevel', 'kyo'] as const) {
      expect(filterAtlas({ ecosystem, query: 'Scalafmt' })).toEqual([])
    }
    expect(filterAtlas({ ecosystem: 'shared', bridgesOnly: true })).toEqual([])
  })

  it('searches translations without changing identity', () => {
    const catalogue: Record<string, Partial<AtlasItem>> = portuguese.catalogue
    const localized = atlasItems.map(item => ({
      ...item,
      ...catalogue[item.id],
    }))
    const matches = filterAtlas({
      ecosystem: 'shared',
      query: '  REESCRITAS  ',
    }, localized)
    expect(ids(matches)).toContain('scalafix')
    expect(matches.find(item => item.id === 'scalafix')?.url)
      .toBe(atlasItems.find(item => item.id === 'scalafix')?.url)
  })
})
