import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import EcosystemAtlas from '~/components/EcosystemAtlas.vue'

describe('atlas interactions', () => {
  it('filters connections and recovers from empty search', async () => {
    const wrapper = await mountSuspended(EcosystemAtlas)
    expect(wrapper.find('#selection-content h2').text()).toBe(
      'h34s',
    )
    await wrapper.find('[data-item="kyo-zio"]').trigger('click')
    expect(wrapper.find('#selection-content h2').text()).toBe('kyo-zio')
    await wrapper.findAll('.filter').find(
      button => button.text() === 'Kyo',
    )?.trigger(
      'click',
    )
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.findAll('.map-node')).toHaveLength(3)
    await wrapper.find('input[type="search"]').setValue('missing-library')
    expect(wrapper.find('.no-results').exists()).toBe(true)
    await wrapper.find('.clear-button').trigger('click')
    expect(wrapper.findAll('.map-node')).toHaveLength(22)
    wrapper.unmount()
  })
})
