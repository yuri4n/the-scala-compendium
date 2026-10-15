<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/utils/cn'

defineOptions({ inheritAttrs: false })
const { class: className } = defineProps<{ class?: HTMLAttributes['class'] }>()
const model = defineModel<string>({ default: '' })
const input = useTemplateRef('input')
defineExpose({ focus: () => input.value?.focus() })
</script>

<template>
  <input
    ref="input"
    v-bind="$attrs"
    v-model="model"
    data-slot="input"
    :class="
      cn(
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 aria-invalid:border-destructive md:text-sm',
        className,
      )
    "
  />
</template>
