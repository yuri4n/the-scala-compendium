<script setup lang="ts">
import guides from '#shared/data/guides.json'
import { atlasItems } from '#shared/utils/atlas'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const guide = computed(() => {
  const match = guides.find((item) => item.id === route.params.slug)
  if (!match) {
    throw createError({ statusCode: 404, statusMessage: t('paths.notFound') })
  }
  return match
})
const relatedItems = computed(() =>
  guide.value.related.flatMap((id) => {
    const item = atlasItems.find((entry) => entry.id === id)
    return item ? [item] : []
  }),
)

useSeoMeta({
  title: () => t(`guides.${guide.value.id}.title`),
  description: () => t(`guides.${guide.value.id}.summary`),
  ogTitle: () => t(`guides.${guide.value.id}.title`),
  ogDescription: () => t(`guides.${guide.value.id}.summary`),
})
</script>

<template>
  <article class="guide-article">
    <NuxtLink :to="`${localePath('/')}#paths`" class="guide-back">
      <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
      {{ t('paths.back') }}
    </NuxtLink>

    <header class="guide-article-header">
      <p class="guide-eyebrow">{{ t('nav.paths') }}</p>
      <h1>{{ t(`guides.${guide.id}.title`) }}</h1>
      <p class="guide-article-summary">
        {{ t(`guides.${guide.id}.summary`) }}
      </p>
      <p class="guide-audience">
        <span>{{ t('paths.for') }}</span>
        {{ t(`guides.${guide.id}.audience`) }}
      </p>
    </header>

    <section class="guide-prerequisites" aria-labelledby="guide-before-title">
      <h2 id="guide-before-title">{{ t('paths.before') }}</h2>
      <ul>
        <li v-for="(_, index) in guide.prerequisites" :key="index">
          {{ t(`guides.${guide.id}.prerequisites.${index}`) }}
        </li>
      </ul>
    </section>

    <section class="guide-steps-section" aria-labelledby="guide-steps-title">
      <h2 id="guide-steps-title">{{ t('paths.steps') }}</h2>
      <ol class="guide-step-list">
        <li v-for="(_, index) in guide.steps" :key="index" class="guide-step">
          <span class="guide-step-number" aria-hidden="true">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <div>
            <h3>
              {{ t(`guides.${guide.id}.steps.${index}.title`) }}
            </h3>
            <p>{{ t(`guides.${guide.id}.steps.${index}.body`) }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="guide-decisions" aria-labelledby="guide-decisions-title">
      <h2 id="guide-decisions-title">{{ t('paths.decisions') }}</h2>
      <ul>
        <li v-for="(_, index) in guide.decisions" :key="index">
          {{ t(`guides.${guide.id}.decisions.${index}`) }}
        </li>
      </ul>
    </section>

    <section class="guide-outcome" aria-labelledby="guide-outcome-title">
      <h2 id="guide-outcome-title">{{ t('paths.outcome') }}</h2>
      <p>{{ t(`guides.${guide.id}.outcome`) }}</p>
    </section>

    <section class="guide-resources" aria-labelledby="guide-resources-title">
      <h2 id="guide-resources-title">{{ t('paths.resources') }}</h2>
      <ul>
        <li v-for="(resource, index) in guide.resources" :key="resource.url">
          <a :href="resource.url">
            {{ t(`guides.${guide.id}.resources.${index}.label`) }}
            <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </section>

    <section
      v-if="relatedItems.length"
      class="guide-related"
      aria-labelledby="guide-related-title"
    >
      <h2 id="guide-related-title">{{ t('paths.related') }}</h2>
      <ul>
        <li v-for="item in relatedItems" :key="item.id">
          <NuxtLink
            :to="`${localePath('/')}?q=${encodeURIComponent(
              item.name,
            )}#ecosystem`"
          >
            {{ item.name }}
            <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
          </NuxtLink>
        </li>
      </ul>
    </section>

    <footer class="guide-article-footer">
      <p>{{ t('paths.updated') }}</p>
      <NuxtLink :to="`${localePath('/')}#paths`" class="guide-back">
        <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
        {{ t('paths.back') }}
      </NuxtLink>
    </footer>
  </article>
</template>
