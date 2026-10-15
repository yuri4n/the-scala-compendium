<script setup lang="ts">
const appConfig = useAppConfig()
useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
})
useSeoMeta({
  titleTemplate: (title) =>
    title ? `${title} · ${appConfig.title}` : appConfig.title,
})
</script>

<template>
  <UApp>
    <a class="skip" href="#main">Skip to content</a>
    <AppHeader />
    <main id="main">
      <NuxtPage />
    </main>
    <AppFooter />
  </UApp>
</template>
