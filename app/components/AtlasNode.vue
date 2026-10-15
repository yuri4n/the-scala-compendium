<script setup lang="ts">
import type { AtlasItem } from '~~/shared/utils/atlas'
import { Button as ShadButton } from '~/components/ui/button'

const {
  item,
  selected,
  list = false,
} = defineProps<{ item: AtlasItem; selected: boolean; list?: boolean }>()
const emit = defineEmits<{ select: [id: string] }>()
const { t, ecosystemLabel, maintainerLabel, statusLabel, kindLabel } =
  useAtlasContent()
const ecosystemLabels = computed(() => item.ecosystems.map(ecosystemLabel))
</script>

<template>
  <ShadButton
    variant="ghost"
    size="content"
    :class="[
      list ? 'list-item' : 'map-node',
      item.kind,
      { 'own-project': item.maintainer === 'yuri4n' },
      item.ecosystems.length === 1 ? item.ecosystems[0] : 'mixed',
    ]"
    :style="
      list || item.x === undefined || item.y === undefined
        ? undefined
        : { left: `${item.x / 10}%`, top: `${item.y}px` }
    "
    :data-item="item.id"
    :aria-pressed="selected"
    :aria-label="
      t('atlas.nodeLabel', {
        name: item.name,
        kind: kindLabel(item.kind),
        ecosystems: ecosystemLabels.join(t('atlas.and')),
      })
    "
    :aria-describedby="
      item.maintainer ? `${list ? 'list' : 'map'}-${item.id}-byline` : undefined
    "
    aria-controls="selection-content"
    @click="emit('select', item.id)"
  >
    <UIcon v-if="item.kind === 'bridge'" name="i-lucide-link" />
    <span
      v-else-if="item.kind === 'proposal'"
      class="proposal-plus"
      aria-hidden="true"
      >+</span
    >
    <span v-else class="node-dot" aria-hidden="true" />
    <span class="node-label">
      <span class="node-name">{{ item.name }}</span>
      <span
        v-if="item.maintainer"
        :id="`${list ? 'list' : 'map'}-${item.id}-byline`"
        class="node-byline"
      >
        {{ maintainerLabel(item.maintainer)
        }}<template v-if="item.status">
          · {{ statusLabel(item.status) }}</template
        >
      </span>
    </span>
    <template v-if="list">
      <span class="list-membership">{{ ecosystemLabels.join(' + ') }}</span>
      <span class="list-kind">{{
        item.kind === 'proposal'
          ? t('atlas.proposal')
          : item.kind === 'bridge'
            ? t('atlas.bridge')
            : item.category
      }}</span>
    </template>
  </ShadButton>
</template>
