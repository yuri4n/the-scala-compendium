<script setup lang="ts">
import type { AtlasItem } from '~~/shared/utils/atlas'
import {
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from 'reka-ui'
import { Button as ShadButton } from '~/components/ui/button'

const {
  item,
  selected,
  list = false,
} = defineProps<{ item: AtlasItem; selected: boolean; list?: boolean }>()
const emit = defineEmits<{ select: [id: string, open: boolean] }>()
const { t, ecosystemLabel, maintainerLabel, statusLabel, kindLabel } =
  useAtlasContent()
const ecosystemLabels = computed(() => item.ecosystems.map(ecosystemLabel))
const preferredSide = ref<'right' | 'bottom'>('right')

function changeOpen(open: boolean) {
  if (open) {
    preferredSide.value = window.matchMedia('(max-width: 767px)').matches
      ? 'bottom'
      : 'right'
  }
  emit('select', item.id, open)
}
</script>

<template>
  <PopoverRoot :open="selected" @update:open="changeOpen">
    <PopoverTrigger as-child>
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
          item.maintainer
            ? `${list ? 'list' : 'map'}-${item.id}-byline`
            : undefined
        "
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
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        class="atlas-inspector detail-panel"
        :side="preferredSide"
        align="center"
        :side-offset="12"
        :collision-padding="12"
        :arrow-padding="20"
        sticky="always"
        prioritize-position
      >
        <div class="inspector-header">
          <span>{{ t('atlas.details') }}</span>
          <PopoverClose as-child>
            <ShadButton
              variant="ghost"
              size="icon"
              class="inspector-close"
              :aria-label="t('atlas.closeDetails')"
              :title="t('atlas.closeDetails')"
              ><UIcon name="i-lucide-x"
            /></ShadButton>
          </PopoverClose>
        </div>
        <div class="inspector-body">
          <AtlasDetails :item="item" />
        </div>
        <PopoverArrow class="inspector-arrow" :width="12" :height="6" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
