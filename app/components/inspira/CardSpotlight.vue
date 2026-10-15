<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/utils/cn'

// Adapted from Inspira UI CardSpotlight; see docs/ui-sources.md.
defineOptions({ inheritAttrs: false })
const {
  class: className,
  slotClass,

  gradientSize = 260,
  gradientColor = 'var(--ring)',

  gradientOpacity = 0.14,
} = defineProps<{
  class?: HTMLAttributes['class']
  slotClass?: HTMLAttributes['class']
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
}>()
defineSlots<{ default: () => unknown }>()
const mouseX = ref(-gradientSize * 10)
const mouseY = ref(-gradientSize * 10)

function handleMouseMove(event: MouseEvent) {
  if (
    !(event.currentTarget instanceof HTMLElement) ||
    !window.matchMedia(
      '(hover: hover) and (prefers-reduced-motion: no-preference)',
    ).matches
  ) {
    return
  }
  const rect = event.currentTarget.getBoundingClientRect()
  mouseX.value = event.clientX - rect.left
  mouseY.value = event.clientY - rect.top
}
function handleMouseLeave() {
  mouseX.value = -gradientSize * 10
  mouseY.value = -gradientSize * 10
}
const backgroundStyle = computed(
  () =>
    `radial-gradient(${gradientSize}px circle at ${mouseX.value}px ${mouseY.value}px, ${gradientColor} 0%, transparent 70%)`,
)
</script>

<template>
  <div
    v-bind="$attrs"
    :class="
      cn(
        'inspira-spotlight relative w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground',
        className,
      )
    "
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div :class="cn('relative z-10 w-full', slotClass)"><slot /></div>
    <div
      class="spotlight-overlay pointer-events-none absolute inset-0 rounded-[inherit]"
      :style="{ background: backgroundStyle, opacity: gradientOpacity }"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
@media (hover: none), (prefers-reduced-motion: reduce) {
  .spotlight-overlay {
    display: none;
  }
}
</style>
