<script setup lang="ts">
const { t } = useI18n()
const layers = [
  'typelevel',
  'zio',
  'kyo',
  'actors',
  'future',
  'direct',
  'shared',
] as const
</script>

<template>
  <section
    id="understand"
    class="guide-section orientation-section"
    aria-labelledby="orientation-title"
  >
    <div class="guide-section-heading">
      <div>
        <p class="guide-eyebrow">{{ t('orientation.eyebrow') }}</p>
        <h2 id="orientation-title">{{ t('orientation.title') }}</h2>
      </div>
      <p class="guide-section-intro">{{ t('orientation.intro') }}</p>
    </div>
    <div class="orientation-list">
      <details v-for="layer in layers" :key="layer" class="orientation-row">
        <summary>
          <span class="orientation-name">
            {{ t(`orientation.items.${layer}.title`) }}
          </span>
          <span class="orientation-model">
            {{ t(`orientation.items.${layer}.model`) }}
          </span>
          <UIcon name="i-lucide-chevron-down" aria-hidden="true" />
        </summary>
        <div class="orientation-body">
          <p>{{ t(`orientation.items.${layer}.body`) }}</p>
          <div class="orientation-check">
            <h3>{{ t('orientation.next') }}</h3>
            <p>{{ t(`orientation.items.${layer}.check`) }}</p>
          </div>
        </div>
      </details>
    </div>
    <p class="orientation-closing">{{ t('orientation.closing') }}</p>
  </section>
</template>
