<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const isGuide = computed(() => route.path.includes('/guides/'))
</script>

<template>
  <header class="header">
    <NuxtLink class="brand" :to="localePath('/')" :aria-label="t('nav.home')">
      <span class="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span
        >The Scala<br /><strong>Compendium</strong
        ><span class="brand-dot">.</span></span
      >
    </NuxtLink>
    <nav :aria-label="t('nav.main')">
      <NuxtLink
        :class="{ 'nav-active': !isGuide }"
        :to="`${localePath('/')}#ecosystem`"
        :aria-current="!isGuide ? 'page' : undefined"
        >{{ t('nav.atlas') }}</NuxtLink
      >
      <NuxtLink
        :class="{ 'nav-active': isGuide }"
        :to="`${localePath('/')}#paths`"
        :aria-current="isGuide ? 'page' : undefined"
        >{{ t('nav.paths') }}</NuxtLink
      >
      <NuxtLink :to="`${localePath('/')}#community`">{{
        t('nav.community')
      }}</NuxtLink>
    </nav>
    <AppPreferences />
    <a class="contribute" href="https://github.com/yuri4n/the-scala-compendium"
      >{{ t('nav.contribute') }}<UIcon name="i-lucide-arrow-up-right"
    /></a>
  </header>
</template>
