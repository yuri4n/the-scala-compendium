<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '~/utils/cn'
import { buttonVariants } from '.'

defineOptions({ inheritAttrs: false })
const {
  as = 'button',
  asChild = false,
  variant = 'default',
  size = 'default',

  class: className,
} = defineProps<{
  as?: 'button' | 'a'
  asChild?: boolean
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'content'
  class?: HTMLAttributes['class']
}>()
defineSlots<{ default: () => unknown }>()
</script>

<template>
  <Primitive
    v-bind="$attrs"
    :as="as"
    :as-child="asChild"
    :type="as === 'button' && !asChild ? 'button' : undefined"
    data-slot="button"
    :class="cn(buttonVariants({ variant, size }), className)"
  >
    <slot />
  </Primitive>
</template>
