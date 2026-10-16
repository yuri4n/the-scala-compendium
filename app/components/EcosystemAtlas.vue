<script setup lang="ts">
import type {
  Ecosystem,
  EcosystemFilter,
  EcosystemMatch,
} from '~~/shared/utils/atlas'
import {
  additionalEcosystems,
  diagramEcosystems,
  filterAtlas,
} from '~~/shared/utils/atlas'
import { Button as ShadButton } from '~/components/ui/button'
import { Input as ShadInput } from '~/components/ui/input'
import { Switch as ShadSwitch } from '~/components/ui/switch'

const { t, ecosystemLabel, localizedItems } = useAtlasContent()
const route = useRoute()
const ecosystems = computed<{ id: EcosystemFilter; name: string }[]>(() => [
  {
    id: 'all',
    name: ecosystemLabel('all'),
  },
  ...[...diagramEcosystems, ...additionalEcosystems].map((id) => ({
    id,
    name: ecosystemLabel(id),
  })),
  { id: 'shared', name: ecosystemLabel('shared') },
])
const regions = computed(() =>
  diagramEcosystems.map((id) => ({
    id,
    name: ecosystemLabel(id),
  })),
)
const selectedEcosystems = ref<Ecosystem[]>([])
const matchMode = ref<EcosystemMatch>('any')
const query = ref(typeof route.query.q === 'string' ? route.query.q : '')
const bridgesOnly = ref(false)
const view = ref<'map' | 'list'>('map')
const selectedId = ref<string>()
const searchInput = useTemplateRef('search')
const viewport = useTemplateRef('viewport')
const matches = computed(() =>
  filterAtlas(
    {
      ecosystems: selectedEcosystems.value,
      match: matchMode.value,
      query: query.value,
      bridgesOnly: bridgesOnly.value,
    },
    localizedItems.value,
  ),
)
const selected = computed(() =>
  matches.value.find((item) => item.id === selectedId.value),
)
const bridgeCount = computed(
  () => matches.value.filter((item) => item.kind === 'bridge').length,
)
const diagramItems = computed(() =>
  matches.value.filter((item) => item.x !== undefined && item.y !== undefined),
)
const additionalGroups = computed(() =>
  additionalEcosystems
    .map((id) => ({
      id,
      name: ecosystemLabel(id),
      items: matches.value.filter(
        (item) =>
          item.x === undefined &&
          item.ecosystems.includes(id) &&
          id ===
            (item.ecosystems.find(
              (value) =>
                additionalEcosystems.includes(value) &&
                selectedEcosystems.value.includes(value),
            ) ?? item.ecosystems[0]),
      ),
    }))
    .filter((group) => group.items.length),
)
const sharedItems = computed(() =>
  matches.value.filter((item) => item.ecosystems.includes('shared')),
)
const sharedGroups = computed(() =>
  [...new Set(sharedItems.value.map((item) => item.category))].map((name) => ({
    name,
    items: sharedItems.value.filter((item) => item.category === name),
  })),
)
const activeRegions = computed(
  () => new Set(matches.value.flatMap((item) => item.ecosystems)),
)

// A changed view or result set dismisses the inspector; filtering never opens one.
watch([matches, view], () => {
  selectedId.value = undefined
})

function selectItem(id: string, open: boolean) {
  if (open) selectedId.value = id
  else if (selectedId.value === id) selectedId.value = undefined
}
watch(
  () => route.query.q,
  (value) => {
    query.value = typeof value === 'string' ? value : ''
  },
)
function isEcosystemSelected(id: EcosystemFilter) {
  return id === 'all'
    ? selectedEcosystems.value.length === 0
    : selectedEcosystems.value.includes(id)
}
function toggleEcosystem(id: EcosystemFilter) {
  if (id === 'all') {
    selectedEcosystems.value = []
    matchMode.value = 'any'
    return
  }
  selectedEcosystems.value = isEcosystemSelected(id)
    ? selectedEcosystems.value.filter((value) => value !== id)
    : [...selectedEcosystems.value, id]
}
function clearFilters() {
  toggleEcosystem('all')
  query.value = ''
  bridgesOnly.value = false
  searchInput.value?.focus()
}
function handleShortcut(event: KeyboardEvent) {
  const target = event.target
  if (
    event.key === '/' &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey &&
    !(
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
    )
  ) {
    event.preventDefault()
    searchInput.value?.focus()
  }
}
onMounted(() => {
  document.addEventListener('keydown', handleShortcut)
  if (viewport.value) {
    viewport.value.scrollLeft =
      (viewport.value.scrollWidth - viewport.value.clientWidth) * 0.32
  }
})
onBeforeUnmount(() => document.removeEventListener('keydown', handleShortcut))
</script>

<template>
  <section id="ecosystem" class="atlas-section">
    <div class="page-heading">
      <div>
        <p class="eyebrow">{{ t('atlas.eyebrow') }}</p>
        <h1>
          {{ t('atlas.title') }} <span>{{ t('atlas.titleAccent') }}</span>
        </h1>
        <p class="intro">
          {{ t('atlas.intro') }}
        </p>
      </div>
      <a class="map-help" href="#map-legend"
        ><UIcon name="i-lucide-info" />{{ t('atlas.help') }}</a
      >
    </div>
    <div class="atlas-toolbar">
      <div class="ecosystem-selection">
        <div
          class="ecosystem-filters"
          role="group"
          :aria-label="t('atlas.filters')"
        >
          <ShadButton
            v-for="option in ecosystems"
            :key="option.id"
            variant="ghost"
            size="content"
            class="filter"
            :class="[{ active: isEcosystemSelected(option.id) }]"
            :aria-pressed="isEcosystemSelected(option.id)"
            @click="toggleEcosystem(option.id)"
          >
            <span
              v-if="option.id !== 'all'"
              class="dot"
              :class="[`${option.id}-dot`]"
            />{{ option.name }}
          </ShadButton>
        </div>
        <div class="filter-logic">
          <label class="match-control">
            <span>{{ t('atlas.matchLabel') }}</span>
            <select v-model="matchMode" aria-describedby="match-help">
              <option value="any">{{ t('atlas.matchAny') }}</option>
              <option value="all">{{ t('atlas.matchAll') }}</option>
            </select>
          </label>
          <span id="match-help">{{ t('atlas.multiSelectHelp') }}</span>
        </div>
      </div>
      <div class="toolbar-right">
        <label class="search"
          ><UIcon name="i-lucide-search" /><ShadInput
            ref="search"
            v-model="query"
            type="search"
            :placeholder="t('atlas.searchPlaceholder')"
            :aria-label="t('atlas.search')"
          /><kbd>/</kbd></label
        >
        <div class="view-switch" role="group" :aria-label="t('atlas.display')">
          <ShadButton
            variant="ghost"
            size="content"
            :aria-label="t('atlas.mapView')"
            :title="t('atlas.mapView')"
            :aria-pressed="view === 'map'"
            @click="view = 'map'"
          >
            <UIcon name="i-lucide-panels-top-left" />
          </ShadButton>
          <ShadButton
            variant="ghost"
            size="content"
            :aria-label="t('atlas.listView')"
            :title="t('atlas.listView')"
            :aria-pressed="view === 'list'"
            @click="view = 'list'"
          >
            <UIcon name="i-lucide-list" />
          </ShadButton>
        </div>
      </div>
    </div>
    <div class="atlas-layout">
      <div class="canvas-area">
        <div class="canvas-topline">
          <span><span class="dot live-dot" />{{ t('atlas.canvasTitle') }}</span>
          <div class="bridge-toggle">
            <ShadSwitch id="bridges-only" v-model="bridgesOnly" />
            <label for="bridges-only">{{ t('atlas.bridgesOnly') }}</label>
          </div>
        </div>
        <div
          v-show="view === 'map' && diagramItems.length"
          ref="viewport"
          class="map-viewport"
          tabindex="0"
          :aria-label="t('atlas.scrollLabel')"
        >
          <InspiraPatternBackground class="venn-map" variant="dot" size="sm">
            <div
              v-for="option in regions"
              :key="option.id"
              class="region"
              :class="[
                `${option.id}-region`,
                {
                  'region-muted':
                    selectedEcosystems.length > 0 &&
                    !activeRegions.has(option.id),
                },
              ]"
              aria-hidden="true"
            >
              <span class="region-caption">{{ option.name }}</span>
              <span class="region-subtitle">{{
                option.id === 'zio'
                  ? t('atlas.zioSubtitle')
                  : option.id === 'typelevel'
                    ? t('atlas.typelevelSubtitle')
                    : t('atlas.kyoSubtitle')
              }}</span>
            </div>
            <AtlasNode
              v-for="item in diagramItems"
              :key="item.id"
              :item="item"
              :selected="view === 'map' && selectedId === item.id"
              @select="selectItem"
            />
          </InspiraPatternBackground>
        </div>
        <InspiraPatternBackground
          v-if="view === 'map' && additionalGroups.length"
          variant="dot"
          size="sm"
          class="extended-map"
        >
          <div class="extended-map-heading">
            <h2>{{ t('atlas.widerTitle') }}</h2>
            <p>{{ t('atlas.widerIntro') }}</p>
          </div>
          <div class="ecosystem-clusters">
            <section
              v-for="group in additionalGroups"
              :key="group.id"
              class="ecosystem-cluster"
              :aria-label="t('atlas.groupLabel', { name: group.name })"
            >
              <h3>{{ group.name }}</h3>
              <AtlasNode
                v-for="item in group.items"
                :key="item.id"
                :item="item"
                :selected="view === 'map' && selectedId === item.id"
                @select="selectItem"
              />
            </section>
          </div>
        </InspiraPatternBackground>
        <details
          v-if="view === 'map' && sharedItems.length"
          class="shared-toolbox"
          :open="
            selectedEcosystems.includes('shared') || query.trim().length > 0
          "
        >
          <summary>
            <span
              ><strong>{{ t('atlas.sharedTitle') }}</strong
              ><small>{{
                t('atlas.sharedCount', { count: sharedItems.length })
              }}</small></span
            >
            <UIcon name="i-lucide-chevron-down" />
          </summary>
          <p>{{ t('atlas.sharedIntro') }}</p>
          <div class="toolbox-groups">
            <section
              v-for="group in sharedGroups"
              :key="group.name"
              class="ecosystem-cluster"
            >
              <h3>{{ group.name }}</h3>
              <AtlasNode
                v-for="item in group.items"
                :key="item.id"
                :item="item"
                :selected="view === 'map' && selectedId === item.id"
                @select="selectItem"
              />
            </section>
          </div>
        </details>
        <div v-if="view === 'list' && matches.length" class="list-view">
          <AtlasNode
            v-for="item in matches"
            :key="item.id"
            :item="item"
            :selected="selectedId === item.id"
            list
            @select="selectItem"
          />
        </div>
        <div v-if="!matches.length" class="no-results">
          <UIcon name="i-lucide-search" />
          <h3>{{ t('atlas.noResults') }}</h3>
          <p>{{ t('atlas.noResultsHelp') }}</p>
          <ShadButton
            variant="outline"
            size="content"
            class="clear-button"
            @click="clearFilters"
          >
            {{ t('atlas.clear') }}
          </ShadButton>
        </div>
        <div class="canvas-bottomline">
          <span aria-live="polite">{{
            t('atlas.results', { count: matches.length, bridges: bridgeCount })
          }}</span
          ><span class="canvas-hint">
            <template v-if="view === 'map'">
              <span class="desktop-map-hint">{{ t('atlas.hint') }}</span>
              <span class="mobile-map-hint">{{ t('atlas.mobileHint') }}</span>
            </template>
            <span v-else>{{ t('atlas.listHint') }}</span>
            <UIcon name="i-lucide-mouse-pointer-2" />
          </span>
        </div>
      </div>
    </div>
    <p class="sr-only" role="status">
      {{
        selected
          ? t('atlas.selected', { name: selected.name })
          : t('atlas.noneSelected')
      }}
    </p>
    <div id="map-legend" class="map-legend">
      <div class="legend-items">
        <span><i class="legend-region" />{{ t('atlas.legendEcosystem') }}</span
        ><span><i class="legend-library" />{{ t('atlas.legendLibrary') }}</span
        ><span
          ><i class="legend-bridge"><UIcon name="i-lucide-link" /></i
          >{{ t('atlas.bridge') }}</span
        ><span><i class="legend-proposed" />{{ t('atlas.proposal') }}</span>
      </div>
      <p>
        {{ t('atlas.legendNote') }}
      </p>
    </div>
    <div class="atlas-note">
      <UIcon name="i-lucide-info" />
      <p>{{ t('atlas.note') }}</p>
      <a
        href="https://github.com/yuri4n/the-scala-compendium/issues/new?title=Atlas%20suggestion"
        >{{ t('atlas.suggest') }}<UIcon name="i-lucide-arrow-right"
      /></a>
    </div>
  </section>
</template>
