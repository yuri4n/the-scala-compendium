<script setup lang="ts">
import { Badge as ShadBadge } from '~/components/ui/badge'
import { Button as ShadButton } from '~/components/ui/button'

const { t } = useI18n()
</script>

<template>
  <section id="newsletter" class="newsletter">
    <InspiraBorderBeam :duration="14" />
    <div class="newsletter-symbol" aria-hidden="true">
      <i></i><i></i><i></i>
    </div>
    <div>
      <p class="eyebrow">
        {{ t('newsletter.eyebrow') }}
        <ShadBadge variant="outline" class="soon-tag">{{
          t('newsletter.soon')
        }}</ShadBadge>
      </p>
      <h2>{{ t('newsletter.title') }}</h2>
      <p>
        {{ t('newsletter.body') }}
      </p>
    </div>
    <div class="newsletter-action">
      <ShadButton
        as="a"
        size="content"
        class="button"
        href="https://github.com/yuri4n/the-scala-compendium/issues/new?title=Newsletter%20topic%20suggestion"
        >{{ t('newsletter.action') }}
        <UIcon name="i-lucide-arrow-right" /></ShadButton
      ><small>{{ t('newsletter.status') }}</small>
    </div>
  </section>
</template>
