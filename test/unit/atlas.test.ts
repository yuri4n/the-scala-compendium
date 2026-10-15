import type { AtlasItem } from '../../shared/utils/atlas'
import { describe, expect, it } from 'vitest'
import portuguese from '../../i18n/locales/pt-BR.json'
import { atlasItems, filterAtlas } from '../../shared/utils/atlas'

const ids = (items: AtlasItem[]) => items.map(item => item.id)

describe('ecosystem atlas filtering', () => {
  it('finds documented bridges through either connected ecosystem', () => {
    for (const ecosystem of ['zio', 'kyo'] as const) {
      expect(ids(filterAtlas({ ecosystems: [ecosystem], bridgesOnly: true })))
        .toEqual(expect.arrayContaining(['kyo-zio', 'kyo-compat']))
    }
    for (const ecosystem of ['zio', 'typelevel'] as const) {
      expect(ids(filterAtlas({ ecosystems: [ecosystem], bridgesOnly: true })))
        .toContain('zio-cats')
    }
    expect(ids(filterAtlas({ ecosystems: ['future'], bridgesOnly: true })))
      .toContain('kyo-compat')
  })

  it('combines normalized search with the selected ecosystem', () => {
    expect(ids(filterAtlas({ ecosystems: ['typelevel'], query: '  CATS  ' })))
      .toContain('cats-effect')
    expect(filterAtlas({ ecosystems: ['zio'], query: 'Doobie' })).toEqual([])
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
    expect(filterAtlas({ ecosystems: ['zio'], query: 'tui4s' })).toEqual([])
    expect(filterAtlas({ ecosystems: ['kyo'], query: 'h34s' })).toEqual([])
    expect(atlasItems.find(item => item.id === 'h34s')?.status)
      .toBe('In development')
    expect(atlasItems.find(item => item.id === 'tui4s')?.status)
      .toBe('Unpublished')
  })

  it('distinguishes actors and preserves Play memberships', () => {
    expect(ids(filterAtlas({ ecosystems: ['akka'] })))
      .toEqual(expect.arrayContaining(['akka-typed', 'akka-streams']))
    expect(ids(filterAtlas({ ecosystems: ['akka'] }))).not.toContain(
      'pekko-typed',
    )
    expect(ids(filterAtlas({ ecosystems: ['pekko'] }))).not.toContain(
      'akka-typed',
    )
    for (const ecosystem of ['pekko', 'future'] as const) {
      const matches = filterAtlas({
        ecosystems: [ecosystem],
        query: 'Play Framework',
      })
      expect(ids(matches)).toEqual(['play'])
    }
    expect(filterAtlas({ ecosystems: ['akka'], query: 'Play Framework' }))
      .toEqual([])
  })

  it('finds shared tools without assigning an effect runtime', () => {
    const shared = filterAtlas({ ecosystems: ['shared'] })
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
    expect(filterAtlas({ ecosystems: ['shared'], query: ' SCALA CLI ' })
      .find(item => item.id === 'scala-cli')
      ?.kind)
      .toBe('tool')
    for (const ecosystem of ['zio', 'typelevel', 'kyo'] as const) {
      expect(filterAtlas({ ecosystems: [ecosystem], query: 'Scalafmt' }))
        .toEqual([])
    }
    expect(filterAtlas({ ecosystems: ['shared'], bridgesOnly: true }))
      .toEqual([])
  })

  it('searches translations without changing identity', () => {
    const catalogue: Record<string, Partial<AtlasItem>> = portuguese.catalogue
    const localized = atlasItems.map(item => ({
      ...item,
      ...catalogue[item.id],
    }))
    const matches = filterAtlas({
      ecosystems: ['shared'],
      query: '  REESCRITAS  ',
    }, localized)
    expect(ids(matches)).toContain('scalafix')
    expect(matches.find(item => item.id === 'scalafix')?.url)
      .toBe(atlasItems.find(item => item.id === 'scalafix')?.url)
  })

  it('treats an empty selection as all ecosystems in either match mode', () => {
    for (const match of ['any', 'all'] as const) {
      expect(filterAtlas({ ecosystems: [], match })).toEqual(atlasItems)
      expect(filterAtlas({ match })).toEqual(atlasItems)
      expect(filterAtlas({ ecosystems: [], match, bridgesOnly: true }))
        .toEqual(filterAtlas({ bridgesOnly: true }))
      expect(filterAtlas({ ecosystems: [], match, query: '  SCALA CLI  ' }))
        .toEqual(filterAtlas({ query: '  SCALA CLI  ' }))
    }
  })

  it('unites selected ecosystems by default without duplicate bridges', () => {
    const individualIds = [
      ...ids(filterAtlas({ ecosystems: ['zio'] })),
      ...ids(filterAtlas({ ecosystems: ['kyo'] })),
    ]
    const expectedIds = [...new Set(individualIds)].sort()
    for (const match of [undefined, 'any'] as const) {
      const combined = ids(filterAtlas({ ecosystems: ['zio', 'kyo'], match }))
      expect([...combined].sort()).toEqual(expectedIds)
      expect(new Set(combined).size).toBe(combined.length)
      expect(combined).toEqual(expect.arrayContaining([
        'zio',
        'kyo',
        'h34s',
        'tui4s',
        'kyo-zio',
        'kyo-compat',
      ]))
      expect(combined).not.toContain('cats-effect')
      expect(combined).not.toContain('scala-cli')
    }
  })

  it('combines intersections with bridge and search filters', () => {
    const selected = ['zio', 'kyo'] as const
    expect(ids(filterAtlas({ ecosystems: [...selected], match: 'all' })).sort())
      .toEqual(['kyo-compat', 'kyo-zio', 'mixed-guide'])
    expect(
      ids(filterAtlas({ ecosystems: ['kyo', 'zio'], match: 'all' })).sort(),
    )
      .toEqual(['kyo-compat', 'kyo-zio', 'mixed-guide'])
    expect(ids(filterAtlas({
      ecosystems: [...selected],
      match: 'all',
      bridgesOnly: true,
    })).sort()).toEqual(['kyo-compat', 'kyo-zio'])
    expect(ids(filterAtlas({
      ecosystems: [...selected],
      match: 'all',
      query: '  KYO-ZIO  ',
    }))).toEqual(['kyo-zio'])
    expect(filterAtlas({
      ecosystems: [...selected],
      match: 'all',
      query: 'tui4s',
    })).toEqual([])
    expect(ids(filterAtlas({
      ecosystems: ['zio', 'kyo', 'typelevel'],
      match: 'all',
    }))).toEqual(['mixed-guide'])
    expect(filterAtlas({
      ecosystems: ['zio', 'kyo', 'typelevel'],
      match: 'all',
      bridgesOnly: true,
    })).toEqual([])
  })

  it('keeps shared tools runtime-independent under combined filters', () => {
    expect(ids(filterAtlas({ ecosystems: ['shared', 'kyo'], match: 'any' })))
      .toEqual(expect.arrayContaining(['scala-cli', 'kyo', 'kyo-zio']))
    expect(filterAtlas({ ecosystems: ['shared', 'kyo'], match: 'all' }))
      .toEqual([])
  })

  it('returns Play once across its memberships in either match mode', () => {
    for (const match of ['any', 'all'] as const) {
      const matches = filterAtlas({ ecosystems: ['pekko', 'future'], match })
      expect(matches.filter(item => item.id === 'play')).toHaveLength(1)
      expect(new Set(ids(matches)).size).toBe(matches.length)
    }
    expect(ids(filterAtlas({
      ecosystems: ['pekko', 'future'],
      match: 'all',
    }))).toEqual(['play'])
  })
})
