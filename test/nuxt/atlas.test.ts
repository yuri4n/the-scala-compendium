import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import EcosystemAtlas from '~/components/EcosystemAtlas.vue'
import { atlasItems } from '../../shared/utils/atlas'

describe('atlas interactions', () => {
  it('renders unique entries and recovers from combined filters', async () => {
    const wrapper = await mountSuspended(EcosystemAtlas, { route: '/' })
    try {
      const mapIds = () => wrapper.findAll('.map-node')
        .map(node => node.attributes('data-item'))
      const initialIds = mapIds()
      expect(new Set(initialIds).size).toBe(initialIds.length)
      expect([...initialIds].sort()).toEqual(
        atlasItems.map(item => item.id).sort(),
      )
      expect(wrapper.findAll('.map-node[data-item="play"]')).toHaveLength(1)

      await wrapper.get('[data-item="kyo-zio"]').trigger('click')
      await expect.poll(
        () => document.querySelector('#selection-content h2')?.textContent,
      ).toBe(
        'kyo-zio',
      )
      const kyoFilter = wrapper.findAll('.filter')
        .find(button => button.text() === 'Kyo')
      if (!kyoFilter)
        throw new Error('The Kyo ecosystem filter is missing')
      await kyoFilter.trigger('click')
      await wrapper.get('[role="switch"]').trigger('click')
      const bridgeIds = mapIds()
      expect(bridgeIds).toEqual(
        expect.arrayContaining(['kyo-zio', 'kyo-compat']),
      )
      expect(bridgeIds).not.toContain('mixed-guide')
      expect(bridgeIds).not.toContain('tui4s')

      await wrapper.get('input[type="search"]').setValue('missing-library')
      expect(wrapper.find('.no-results').exists()).toBe(true)
      await wrapper.get('.clear-button').trigger('click')
      expect(
        wrapper.get<HTMLInputElement>('input[type="search"]').element.value,
      ).toBe('')
      expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe(
        'false',
      )
      expect(wrapper.get<HTMLSelectElement>('select').element.value).toBe('any')
      expect(mapIds().sort()).toEqual(atlasItems.map(item => item.id).sort())
    }
    finally {
      wrapper.unmount()
    }
  })

  it('toggles chips and intersects their memberships', async () => {
    const wrapper = await mountSuspended(EcosystemAtlas, { route: '/' })
    try {
      const filter = (label: string) => {
        const button = wrapper.findAll('.filter')
          .find(candidate => candidate.text() === label)
        if (!button)
          throw new Error(`The ${label} ecosystem filter is missing`)
        return button
      }
      const mapIds = () => wrapper.findAll('.map-node')
        .map(node => node.attributes('data-item'))
        .sort()
      const allIds = atlasItems.map(item => item.id).sort()
      const match = wrapper.get<HTMLSelectElement>('select')
      expect(match.element.value).toBe('any')
      expect(filter('All ecosystems').attributes('aria-pressed')).toBe('true')

      await filter('ZIO').trigger('click')
      const zioIds = mapIds()
      expect(zioIds).toContain('zio')
      expect(zioIds).not.toContain('kyo')
      await filter('All ecosystems').trigger('click')
      await filter('Kyo').trigger('click')
      const kyoIds = mapIds()
      expect(kyoIds).toContain('kyo')
      expect(kyoIds).not.toContain('zio')
      await filter('ZIO').trigger('click')
      expect(filter('ZIO').attributes('aria-pressed')).toBe('true')
      expect(filter('Kyo').attributes('aria-pressed')).toBe('true')
      expect(filter('All ecosystems').attributes('aria-pressed')).toBe('false')
      expect(mapIds()).toEqual([...new Set([...zioIds, ...kyoIds])].sort())

      await filter('Kyo').trigger('click')
      expect(filter('Kyo').attributes('aria-pressed')).toBe('false')
      expect(filter('ZIO').attributes('aria-pressed')).toBe('true')
      expect(mapIds()).toEqual(zioIds)
      await filter('ZIO').trigger('click')
      expect(filter('All ecosystems').attributes('aria-pressed')).toBe('true')
      expect(mapIds()).toEqual(allIds)

      await match.setValue('all')
      expect(mapIds()).toEqual(allIds)
      await filter('ZIO').trigger('click')
      await filter('Kyo').trigger('click')
      expect(mapIds()).toEqual(['kyo-compat', 'kyo-zio', 'mixed-guide'])
      await wrapper.get('[role="switch"]').trigger('click')
      expect(mapIds()).toEqual(['kyo-compat', 'kyo-zio'])
      await wrapper.get('[role="switch"]').trigger('click')
      await filter('Typelevel').trigger('click')
      expect(mapIds()).toEqual(['mixed-guide'])
      await wrapper.get('[role="switch"]').trigger('click')
      expect(mapIds()).toEqual([])
      expect(wrapper.find('.no-results').exists()).toBe(true)

      await wrapper.get('.clear-button').trigger('click')
      expect(match.element.value).toBe('any')
      expect(filter('All ecosystems').attributes('aria-pressed')).toBe('true')
      for (const label of ['ZIO', 'Kyo', 'Typelevel']) {
        expect(filter(label).attributes('aria-pressed')).toBe('false')
      }
      expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe(
        'false',
      )
      expect(mapIds()).toEqual(allIds)
    }
    finally {
      wrapper.unmount()
    }
  })

  it('finds Play once through combined memberships', async () => {
    const wrapper = await mountSuspended(EcosystemAtlas, { route: '/' })
    try {
      const filter = (label: string) => {
        const button = wrapper.findAll('.filter')
          .find(candidate => candidate.text() === label)
        if (!button)
          throw new Error(`The ${label} ecosystem filter is missing`)
        return button
      }
      for (const label of ['Apache Pekko', 'Scala Future']) {
        await filter('All ecosystems').trigger('click')
        await filter(label).trigger('click')
        const play = wrapper.findAll('.map-node[data-item="play"]')
        expect(play, label).toHaveLength(1)
        const node = play[0]
        if (!node)
          throw new Error(`Play is missing from the ${label} map`)
        await node.trigger('click')
        await expect.poll(
          () => document.querySelector('#selection-content h2')?.textContent,
        ).toBe(
          'Play Framework',
        )
      }
      await filter('Apache Pekko').trigger('click')
      expect(filter('Scala Future').attributes('aria-pressed')).toBe('true')
      expect(filter('Apache Pekko').attributes('aria-pressed')).toBe('true')
      const unionIds = wrapper.findAll('.map-node')
        .map(node => node.attributes('data-item'))
      expect(new Set(unionIds).size).toBe(unionIds.length)
      expect(wrapper.findAll('.map-node[data-item="play"]')).toHaveLength(1)
      await wrapper.get('select').setValue('all')
      expect(wrapper.findAll('.map-node')).toHaveLength(1)
      expect(wrapper.findAll('.map-node[data-item="play"]')).toHaveLength(1)
      await wrapper.get('[aria-label="List view"]').trigger('click')
      expect(wrapper.findAll('.list-item')).toHaveLength(1)
      expect(wrapper.findAll('.list-item[data-item="play"]')).toHaveLength(1)
    }
    finally {
      wrapper.unmount()
    }
  })

  it('resets ecosystem choices while retaining other filters', async () => {
    const wrapper = await mountSuspended(EcosystemAtlas, { route: '/' })
    try {
      const filter = (label: string) => {
        const button = wrapper.findAll('.filter')
          .find(candidate => candidate.text() === label)
        if (!button)
          throw new Error(`The ${label} ecosystem filter is missing`)
        return button
      }
      await filter('ZIO').trigger('click')
      await filter('Kyo').trigger('click')
      await wrapper.get('select').setValue('all')
      await wrapper.get('input[type="search"]').setValue('kyo')
      await wrapper.get('[role="switch"]').trigger('click')
      await filter('All ecosystems').trigger('click')
      expect(wrapper.get<HTMLSelectElement>('select').element.value).toBe('any')
      expect(filter('All ecosystems').attributes('aria-pressed')).toBe('true')
      expect(filter('ZIO').attributes('aria-pressed')).toBe('false')
      expect(filter('Kyo').attributes('aria-pressed')).toBe('false')
      expect(
        wrapper.get<HTMLInputElement>('input[type="search"]').element.value,
      )
        .toBe('kyo')
      expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe(
        'true',
      )
      const ids = wrapper.findAll('.map-node')
        .map(node => node.attributes('data-item'))
      expect(ids).toContain('reactive-streams')
      expect(ids).not.toContain('mixed-guide')
    }
    finally {
      wrapper.unmount()
    }
  })
})
