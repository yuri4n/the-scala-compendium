<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '~/utils/cn'
import { badgeVariants } from '.'

defineOptions({ inheritAttrs: false })
const { variant = 'default', class: className } = defineProps<{
  variant?: 'default' | 'secondary' | 'outline'
  class?: HTMLAttributes['class']
}>()
defineSlots<{ default: () => unknown }>()
</script>

<template>
  <Primitive
    v-bind="$attrs"
    as="span"
    data-slot="badge"
    :class="cn(badgeVariants({ variant }), className)"
    ><slot
  /></Primitive>
</template>
