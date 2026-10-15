<script setup lang="ts">
import { cn } from '~/utils/cn'

// Adapted from Inspira UI BorderBeam; duration is in seconds.
defineOptions({ inheritAttrs: false })
const {
  class: className,
  size = 200,
  duration = 14,

  borderWidth = 1.5,
  anchor = 90,
  colorFrom = 'var(--ecosystem-zio)',
  colorTo = 'var(--primary)',

  delay = 0,
} = defineProps<{
  class?: string
  size?: number
  duration?: number
  borderWidth?: number
  anchor?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}>()
const durationInSeconds = computed(() => `${duration}s`)
const delayInSeconds = computed(() => `${delay}s`)
</script>

<template>
  <div
    v-bind="$attrs"
    :class="
      cn(
        'inspira-border-beam pointer-events-none absolute inset-0 rounded-[inherit]',
        className,
      )
    "
    aria-hidden="true"
  />
</template>

<style scoped>
.inspira-border-beam {
  overflow: hidden;
  --size: v-bind(size);
  --duration: v-bind(durationInSeconds);
  --anchor: v-bind(anchor);
  --border-width: v-bind(borderWidth);
  --color-from: v-bind(colorFrom);
  --color-to: v-bind(colorTo);
  --delay: v-bind(delayInSeconds);
  border: calc(var(--border-width) * 1px) solid transparent;
  mask:
    linear-gradient(transparent, transparent), linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
}
.inspira-border-beam::after {
  content: '';
  position: absolute;
  aspect-ratio: 1;
  width: calc(var(--size) * 1px);
  background: linear-gradient(
    to left,
    var(--color-from),
    var(--color-to),
    transparent
  );
  offset-anchor: calc(var(--anchor) * 1%) 50%;
  offset-path: rect(0 auto auto 0 round calc(var(--size) * 1px));
  animation: border-beam var(--duration) infinite linear;
  animation-delay: var(--delay);
}
@keyframes border-beam {
  to {
    offset-distance: 100%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .inspira-border-beam::after {
    animation: none;
  }
}
</style>
