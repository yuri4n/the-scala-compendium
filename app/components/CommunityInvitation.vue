<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section
    id="community"
    class="community-invitation"
    aria-labelledby="community-title"
  >
    <div class="community-heading">
      <p class="guide-eyebrow">{{ t('community.eyebrow') }}</p>
      <h2 id="community-title">{{ t('community.title') }}</h2>
    </div>
    <div class="community-letter">
      <p>{{ t('community.first') }}</p>
      <p>{{ t('community.second') }}</p>
      <p class="community-closing">{{ t('community.closing') }}</p>
      <div class="community-links">
        <a href="https://www.scala-lang.org/community/">
          {{ t('community.find') }}
          <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
        </a>
        <a href="https://users.scala-lang.org/">
          {{ t('community.questions') }}
          <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
        </a>
        <a
          href="https://github.com/yuri4n/the-scala-compendium/issues/new/choose"
        >
          {{ t('community.contribute') }}
          <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
</template>
