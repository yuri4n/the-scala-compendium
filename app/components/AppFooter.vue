<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="site-footer">
    <NuxtLink class="footer-brand" :to="localePath('/')"
      >The Scala Compendium.</NuxtLink
    >
    <p>{{ t('site.footer') }}</p>
    <a href="https://github.com/yuri4n/the-scala-compendium"
      >{{ t('site.open') }}<UIcon name="i-lucide-arrow-up-right"
    /></a>
  </footer>
</template>
