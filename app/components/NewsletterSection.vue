<script setup lang="ts">
import { Badge as ShadBadge } from '~/components/ui/badge'
import { Button as ShadButton } from '~/components/ui/button'
</script>

<template>
  <section id="newsletter" class="newsletter">
    <InspiraBorderBeam :duration="14" />
    <div class="newsletter-symbol" aria-hidden="true">
      <i></i><i></i><i></i>
    </div>
    <div>
      <p class="eyebrow">
        THE COMPENDIUM LETTER
        <ShadBadge variant="outline" class="soon-tag">COMING SOON</ShadBadge>
      </p>
      <h2>Keep the connections coming.</h2>
      <p>
        Ecosystem discoveries, useful bridges, and guides worth opening.<br />A
        thoughtful Scala read, in the making.
      </p>
    </div>
    <div class="newsletter-action">
      <ShadButton
        as="a"
        size="content"
        class="button"
        href="https://github.com/yuri4n/the-scala-compendium/issues/new?title=Newsletter%20topic%20suggestion"
        >Shape the first issue <UIcon name="i-lucide-arrow-right" /></ShadButton
      ><small>Email subscriptions are not open yet.</small>
    </div>
  </section>
</template>
