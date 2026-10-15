import { describe, expect, it } from 'vitest'
import { atlasItems, filterAtlas } from '../../shared/utils/atlas'

describe('ecosystem atlas', () => {
  it('finds bridges from either connected ecosystem', () => {
    expect(
      filterAtlas({ ecosystem: 'zio', bridgesOnly: true }).map(item => item.id),
    ).toEqual([
      'zio-cats',
      'kyo-zio',
      'kyo-compat',
    ])
    expect(
      filterAtlas({ ecosystem: 'kyo', bridgesOnly: true }).map(item => item.id),
    ).toEqual([
      'kyo-zio',
      'kyo-compat',
      'reactive-streams',
    ])
  })
  it('combines normalized search and ecosystem filters', () => {
    expect(
      filterAtlas({ ecosystem: 'typelevel', query: '  CATS  ' }).some(
        item => item.id === 'cats-effect',
      ),
    ).toBe(
      true,
    )
    expect(filterAtlas({ ecosystem: 'zio', query: 'Doobie' })).toEqual([])
  })
  it('keeps proposed guides out of published bridge results', () => {
    expect(
      filterAtlas({ bridgesOnly: true }).every(item => item.kind === 'bridge'),
    ).toBe(
      true,
    )
    expect(
      filterAtlas({ bridgesOnly: true }).some(
        item => item.id === 'mixed-guide',
      ),
    ).toBe(
      false,
    )
    expect(filterAtlas().length).toBe(atlasItems.length)
  })
  it('finds owner projects without claiming planned bridges', () => {
    expect(filterAtlas({ query: 'yuri4n' }).map(item => item.id)).toEqual([
      'h34s',
      'tui4s',
    ])
    expect(filterAtlas({ query: 'kyo-h34s' }).map(item => item.id)).toEqual([
      'h34s',
    ])
    expect(filterAtlas({ query: 'kyo-h34s', bridgesOnly: true })).toEqual([])
    expect(filterAtlas({ ecosystem: 'zio', query: 'tui4s' })).toEqual([])
    expect(filterAtlas({ ecosystem: 'kyo', query: 'h34s' })).toEqual([])
  })
  it('keeps actor ecosystems distinct and finds Future portability', () => {
    expect(filterAtlas({ ecosystem: 'akka' }).map(item => item.id)).toEqual([
      'akka-typed',
      'akka-streams',
    ])
    expect(filterAtlas({ ecosystem: 'pekko' }).map(item => item.id)).toEqual([
      'pekko-typed',
      'pekko-streams',
    ])
    expect(
      filterAtlas({ ecosystem: 'future', bridgesOnly: true }).map(
        item => item.id,
      ),
    ).toEqual([
      'kyo-compat',
    ])
  })
})
