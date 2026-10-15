<script setup lang="ts">
const appConfig = useAppConfig()
const { t } = useI18n()
const localeHead = useLocaleHead({ seo: true })
useHead(() => ({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ...localeHead.value.link,
  ],
  meta: localeHead.value.meta,
}))
useSeoMeta({
  titleTemplate: (title) =>
    title ? `${title} · ${appConfig.title}` : appConfig.title,
})
</script>

<template>
  <UApp>
    <a class="skip" href="#main">{{ t('nav.skip') }}</a>
    <AppHeader />
    <main id="main">
      <NuxtPage />
    </main>
    <AppFooter />
  </UApp>
</template>
