<script setup lang="ts">
const { t } = useI18n()
useSeoMeta({
  title: () => t('nav.atlas'),
  description: () => t('site.description'),
})
</script>

<template>
  <div>
    <EcosystemAtlas />
    <EcosystemOrientation />
    <LearningPaths />
    <CommunityInvitation />
    <NewsletterSection />
  </div>
</template>
