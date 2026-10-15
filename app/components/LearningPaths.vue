<script setup lang="ts">
import guides from '#shared/data/guides.json'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section id="paths" class="guide-section" aria-labelledby="paths-title">
    <div class="guide-section-heading">
      <div>
        <p class="guide-eyebrow">{{ t('paths.eyebrow') }}</p>
        <h2 id="paths-title">{{ t('paths.title') }}</h2>
      </div>
      <p class="guide-section-intro">{{ t('paths.intro') }}</p>
    </div>
    <ul class="guide-card-grid">
      <li v-for="(guide, index) in guides" :key="guide.id">
        <NuxtLink
          :to="localePath(`/guides/${guide.id}`)"
          class="guide-card"
          :aria-labelledby="`path-${guide.id}`"
        >
          <span class="guide-card-number" aria-hidden="true">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <h3 :id="`path-${guide.id}`">
            {{ t(`guides.${guide.id}.title`) }}
          </h3>
          <p>{{ t(`guides.${guide.id}.summary`) }}</p>
          <span class="guide-card-link">
            {{ t('paths.read') }}
            <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
