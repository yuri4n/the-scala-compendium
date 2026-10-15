<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { cn } from '~/utils/cn'

defineOptions({ inheritAttrs: false })
const { disabled = false, class: className } = defineProps<{
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()
const model = defineModel<boolean>({ default: false })
</script>

<template>
  <SwitchRoot
    v-bind="$attrs"
    v-model="model"
    :disabled="disabled"
    data-slot="switch"
    :class="
      cn(
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent shadow-xs focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )
    "
  >
    <SwitchThumb
      data-slot="switch-thumb"
      class="bg-background pointer-events-none block size-4 rounded-full ring-0 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
    />
  </SwitchRoot>
</template>
