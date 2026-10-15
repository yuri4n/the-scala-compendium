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
      expect(wrapper.get('#selection-content h2').text()).toBe('kyo-zio')
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
      ).toBe(
        '',
      )
      expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe(
        'false',
      )
      expect(mapIds().sort()).toEqual(atlasItems.map(item => item.id).sort())
    }
    finally {
      wrapper.unmount()
    }
  })

  it('finds Play through both memberships without duplicates', async () => {
    const wrapper = await mountSuspended(EcosystemAtlas, { route: '/' })
    try {
      for (const label of ['Apache Pekko', 'Scala Future']) {
        const filter = wrapper.findAll('.filter')
          .find(button => button.text() === label)
        if (!filter)
          throw new Error(`The ${label} ecosystem filter is missing`)
        await filter.trigger('click')
        const play = wrapper.findAll('.map-node[data-item="play"]')
        expect(play, label).toHaveLength(1)
        const node = play[0]
        if (!node)
          throw new Error(`Play is missing from the ${label} map`)
        await node.trigger('click')
        expect(wrapper.get('#selection-content h2').text()).toBe(
          'Play Framework',
        )
      }
    }
    finally {
      wrapper.unmount()
    }
  })
})
