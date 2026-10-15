<script setup lang="ts">
import type { AtlasItem } from '~~/shared/utils/atlas'
import { ecosystemNames, maintainerNames } from '~~/shared/utils/atlas'
import { Badge as ShadBadge } from '~/components/ui/badge'
import { Button as ShadButton } from '~/components/ui/button'

const { item } = defineProps<{ item: AtlasItem | undefined }>()
</script>

<template>
  <div id="selection-content">
    <template v-if="item">
      <div class="detail-overview">
        <div class="detail-symbol" :class="[item.kind, item.ecosystems[0]]">
          <UIcon
            :name="
              item.kind === 'library' ? 'i-lucide-book-open' : 'i-lucide-link'
            "
          />
        </div>
        <span class="detail-kind">{{
          item.kind === 'bridge'
            ? 'Community bridge'
            : item.kind === 'proposal'
              ? 'Proposed guide'
              : item.category
        }}</span>
        <h2>{{ item.name }}</h2>
        <p v-if="item.maintainer" class="detail-byline">
          By {{ maintainerNames[item.maintainer] }}
          <ShadBadge
            v-if="item.status"
            variant="outline"
            class="project-status"
            >{{ item.status }}</ShadBadge
          >
        </p>
        <div class="membership">
          <template
            v-for="(ecosystem, index) in item.ecosystems"
            :key="ecosystem"
          >
            <span v-if="index" class="membership-plus" aria-hidden="true"
              >+</span
            >
            <ShadBadge variant="outline" :class="`${ecosystem}-text`"
              ><i class="dot" :class="[`${ecosystem}-dot`]" />{{
                ecosystemNames[ecosystem]
              }}</ShadBadge
            >
          </template>
        </div>
        <p class="detail-description">{{ item.description }}</p>
      </div>
      <div class="detail-integration">
        <h3>Before you connect</h3>
        <p class="compatibility">{{ item.compatibility }}</p>
        <div v-if="item.note" class="detail-note">
          <UIcon name="i-lucide-info" />
          <p>{{ item.note }}</p>
        </div>
      </div>
      <div class="detail-sources">
        <ShadButton
          as="a"
          variant="outline"
          size="content"
          class="docs-link"
          :href="item.url"
          >{{
            item.kind === 'proposal'
              ? 'Contribute a guide'
              : item.accessNote
                ? 'Open repository'
                : 'Read the documentation'
          }}<UIcon name="i-lucide-arrow-up-right"
        /></ShadButton>
        <p v-if="item.accessNote" class="repository-access">
          <UIcon name="i-lucide-lock-keyhole" />{{ item.accessNote }}
        </p>
        <a
          v-if="item.secondaryUrl"
          class="secondary-docs"
          :href="item.secondaryUrl"
          >{{ item.secondarySource }}<UIcon name="i-lucide-arrow-up-right"
        /></a>
        <p class="source-label">SOURCE / {{ item.source }}</p>
      </div>
    </template>
    <div v-else class="panel-empty">
      <h2>Explore a connection</h2>
      <p>
        Select a library or bridge from the map or list to see its documentation
        and compatibility notes.
      </p>
    </div>
  </div>
</template>
