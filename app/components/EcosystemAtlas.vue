<script setup lang="ts">
import type { EcosystemFilter } from '~~/shared/utils/atlas'
import {
  additionalEcosystems,
  diagramEcosystems,
  ecosystemNames,
  filterAtlas,
} from '~~/shared/utils/atlas'
import { Button as ShadButton } from '~/components/ui/button'
import { Input as ShadInput } from '~/components/ui/input'
import { Switch as ShadSwitch } from '~/components/ui/switch'

const ecosystems: { id: EcosystemFilter; name: string }[] = [
  {
    id: 'all',
    name: 'All ecosystems',
  },
  ...[...diagramEcosystems, ...additionalEcosystems].map((id) => ({
    id,
    name: ecosystemNames[id],
  })),
]
const regions = diagramEcosystems.map((id) => ({
  id,
  name: ecosystemNames[id],
}))
const ecosystem = ref<EcosystemFilter>('all')
const query = ref('')
const bridgesOnly = ref(false)
const view = ref<'map' | 'list'>('map')
const selectedId = ref<string | undefined>('zio')
const searchInput = useTemplateRef('search')
const viewport = useTemplateRef('viewport')
const details = useTemplateRef('details')
const canvas = useTemplateRef('canvas')
const matches = computed(() =>
  filterAtlas({
    ecosystem: ecosystem.value,
    query: query.value,
    bridgesOnly: bridgesOnly.value,
  }),
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
      name: ecosystemNames[id],
      items: matches.value.filter(
        (item) => item.x === undefined && item.ecosystems.includes(id),
      ),
    }))
    .filter((group) => group.items.length),
)
const activeRegions = computed(
  () => new Set(matches.value.flatMap((item) => item.ecosystems)),
)

watch(
  matches,
  (items) => {
    if (!items.some((item) => item.id === selectedId.value))
      selectedId.value = items[0]?.id
  },
  { immediate: true },
)

async function selectItem(id: string) {
  selectedId.value = id
  await nextTick()
  const heading = details.value?.querySelector('h2')
  const bounds = heading?.getBoundingClientRect()
  if (bounds && (bounds.top < 0 || bounds.bottom > window.innerHeight)) {
    details.value?.scrollIntoView({
      behavior: 'instant',
      block: 'start',
    })
  }
  details.value?.focus({ preventScroll: true })
}
function returnToAtlas() {
  const node = canvas.value?.querySelector(
    `${view.value === 'map' ? '.map-node' : '.list-item'}[aria-pressed="true"]`,
  )
  if (node instanceof HTMLElement) {
    node.focus({ preventScroll: true })
    node.scrollIntoView({
      behavior: 'instant',
      block: 'center',
      inline: 'center',
    })
  }
}
function clearFilters() {
  ecosystem.value = 'all'
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
        <p class="eyebrow">THE SCALA ECOSYSTEM, IN PERSPECTIVE</p>
        <h1>Different worlds. <span>Common ground.</span></h1>
        <p class="intro">
          Find your libraries, explore the overlaps, and discover how the pieces
          connect.
        </p>
      </div>
      <a class="map-help" href="#map-legend"
        ><UIcon name="i-lucide-info" />How to read this map</a
      >
    </div>
    <div class="atlas-toolbar">
      <div
        class="ecosystem-filters"
        role="group"
        aria-label="Filter by ecosystem"
      >
        <ShadButton
          v-for="option in ecosystems"
          :key="option.id"
          variant="ghost"
          size="content"
          class="filter"
          :class="[{ active: ecosystem === option.id }]"
          :aria-pressed="ecosystem === option.id"
          @click="ecosystem = option.id"
        >
          <span
            v-if="option.id !== 'all'"
            class="dot"
            :class="[`${option.id}-dot`]"
          />{{ option.name }}
        </ShadButton>
      </div>
      <div class="toolbar-right">
        <label class="search"
          ><UIcon name="i-lucide-search" /><ShadInput
            ref="search"
            v-model="query"
            type="search"
            placeholder="Find a library or bridge…"
            aria-label="Search libraries and bridges"
          /><kbd>/</kbd></label
        >
        <div class="view-switch" role="group" aria-label="Display mode">
          <ShadButton
            variant="ghost"
            size="content"
            aria-label="Map view"
            title="Map view"
            :aria-pressed="view === 'map'"
            @click="view = 'map'"
          >
            <UIcon name="i-lucide-panels-top-left" />
          </ShadButton>
          <ShadButton
            variant="ghost"
            size="content"
            aria-label="List view"
            title="List view"
            :aria-pressed="view === 'list'"
            @click="view = 'list'"
          >
            <UIcon name="i-lucide-list" />
          </ShadButton>
        </div>
      </div>
    </div>
    <div class="atlas-layout">
      <div ref="canvas" class="canvas-area">
        <div class="canvas-topline">
          <span><span class="dot live-dot" />THE ECOSYSTEM ATLAS</span>
          <div class="bridge-toggle">
            <ShadSwitch id="bridges-only" v-model="bridgesOnly" />
            <label for="bridges-only">Bridges only</label>
          </div>
        </div>
        <div
          v-show="view === 'map' && diagramItems.length"
          ref="viewport"
          class="map-viewport"
          tabindex="0"
          aria-label="Scrollable ecosystem map. Use Tab to select libraries and bridges."
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
                    ecosystem !== 'all' && !activeRegions.has(option.id),
                },
              ]"
              aria-hidden="true"
            >
              <span class="region-caption">{{ option.name }}</span>
              <span class="region-subtitle">{{
                option.id === 'zio'
                  ? 'Typed effects. A complete toolkit.'
                  : option.id === 'typelevel'
                    ? 'Small pieces. Powerful composition.'
                    : 'Algebraic effects. Open possibilities.'
              }}</span>
            </div>
            <AtlasNode
              v-for="item in diagramItems"
              :key="item.id"
              :item="item"
              :selected="selectedId === item.id"
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
            <h2>More of the Scala landscape</h2>
            <p>Actors, streams, Futures, and emerging approaches.</p>
          </div>
          <div class="ecosystem-clusters">
            <section
              v-for="group in additionalGroups"
              :key="group.id"
              class="ecosystem-cluster"
              :aria-label="`${group.name} ecosystem`"
            >
              <h3>{{ group.name }}</h3>
              <AtlasNode
                v-for="item in group.items"
                :key="item.id"
                :item="item"
                :selected="selectedId === item.id"
                @select="selectItem"
              />
            </section>
          </div>
        </InspiraPatternBackground>
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
          <h3>No connections found</h3>
          <p>Try a library name, another ecosystem, or a broader search.</p>
          <ShadButton
            variant="outline"
            size="content"
            class="clear-button"
            @click="clearFilters"
          >
            Clear filters
          </ShadButton>
        </div>
        <div class="canvas-bottomline">
          <span aria-live="polite"
            >{{ matches.length }}
            {{ matches.length === 1 ? 'item' : 'items' }} ·
            {{ bridgeCount }} community bridges</span
          ><span class="canvas-hint">
            <template v-if="view === 'map'">
              <span class="desktop-map-hint"
                >Select a library or bridge to explore</span
              >
              <span class="mobile-map-hint"
                >Scroll sideways to explore the map</span
              >
            </template>
            <span v-else>The same connections, in a list</span>
            <UIcon name="i-lucide-mouse-pointer-2" />
          </span>
        </div>
      </div>
      <aside
        ref="details"
        class="detail-panel"
        tabindex="-1"
        aria-label="Selected item details"
      >
        <div class="detail-label">
          CONNECTION DETAILS
          <ShadButton
            v-if="selected"
            variant="ghost"
            size="content"
            class="return-to-atlas"
            @click="returnToAtlas"
            ><UIcon name="i-lucide-arrow-up" />Back to atlas</ShadButton
          >
        </div>
        <AtlasDetails :item="selected" />
      </aside>
    </div>
    <p class="sr-only" role="status">
      {{
        selected
          ? `Selected: ${selected.name}. Details updated.`
          : 'No item selected.'
      }}
    </p>
    <div id="map-legend" class="map-legend">
      <div class="legend-items">
        <span><i class="legend-region" />Ecosystem</span
        ><span><i class="legend-library" />Library</span
        ><span
          ><i class="legend-bridge"><UIcon name="i-lucide-link" /></i>Community
          bridge</span
        ><span><i class="legend-proposed" />Proposed guide</span>
      </div>
      <p>
        Overlaps show integration opportunities, not automatic compatibility.
      </p>
    </div>
    <div class="atlas-note">
      <UIcon name="i-lucide-info" />
      <p>
        A living map, never the whole territory. From actors and Futures to
        effect systems and emerging libraries—help us chart what’s missing.
      </p>
      <a
        href="https://github.com/yuri4n/the-scala-compendium/issues/new?title=Atlas%20suggestion"
        >Suggest a connection<UIcon name="i-lucide-arrow-right"
      /></a>
    </div>
  </section>
</template>
