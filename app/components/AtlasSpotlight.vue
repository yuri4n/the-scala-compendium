<script setup lang="ts">
import { atlasItems } from '~~/shared/utils/atlas'
import { Button as ShadButton } from '~/components/ui/button'

const { selectedId } = defineProps<{ selectedId: string | undefined }>()
const emit = defineEmits<{ select: [id: string] }>()
const groups = [
  {
    id: 'yuri4n',
    name: 'From yuri4n',
    description: 'Libraries, utilities & experiments',
    items: atlasItems.filter((item) => item.maintainer === 'yuri4n'),
  },
  {
    id: 'kyo',
    name: 'From Kyo',
    description: 'Connections across ecosystems',
    items: atlasItems.filter((item) =>
      ['kyo-zio', 'kyo-compat'].includes(item.id),
    ),
  },
]
</script>

<template>
  <div class="atlas-spotlight" role="group" aria-label="Featured projects">
    <InspiraCardSpotlight
      v-for="group in groups"
      :key="group.name"
      class="featured-frame"
      slot-class="spotlight-group"
    >
      <div class="spotlight-heading">
        <p class="eyebrow">IN FOCUS</p>
        <h2 :id="`featured-${group.id}-heading`">{{ group.name }}</h2>
        <p>{{ group.description }}</p>
      </div>
      <div class="spotlight-projects">
        <ShadButton
          v-for="item in group.items"
          :key="item.id"
          variant="outline"
          size="content"
          class="spotlight-project"
          :aria-label="`Explore ${item.name}`"
          :aria-describedby="`featured-${group.id}-heading featured-${item.id}-details`"
          :aria-pressed="selectedId === item.id"
          aria-controls="selection-content"
          @click="emit('select', item.id)"
        >
          <span
            ><strong>{{ item.name }}</strong
            ><small :id="`featured-${item.id}-details`">{{
              item.status || item.category
            }}</small></span
          >
          <UIcon name="i-lucide-arrow-down-right" />
        </ShadButton>
      </div>
    </InspiraCardSpotlight>
  </div>
</template>
