<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/utils/cn'
import {
  patternBackgroundMaskVariants,
  patternBackgroundVariants,
} from './pattern-variants'

// Static adaptation of Inspira UI PatternBackground, using the app skin.
defineOptions({ inheritAttrs: false })
const {
  class: className,
  variant = 'grid',
  size = 'md',
  mask = 'none',
} = defineProps<{
  class?: HTMLAttributes['class']
  variant?: 'grid' | 'dot' | 'big-dot'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  mask?: 'none' | 'ellipse' | 'ellipse-top'
}>()
defineSlots<{ default: () => unknown }>()
</script>

<template>
  <div
    v-bind="$attrs"
    :class="cn(patternBackgroundVariants({ variant, size }), className)"
  >
    <div
      v-if="mask !== 'none'"
      :class="
        cn(
          'pointer-events-none absolute inset-0',
          patternBackgroundMaskVariants({ mask }),
        )
      "
      aria-hidden="true"
    />
    <slot />
  </div>
</template>
