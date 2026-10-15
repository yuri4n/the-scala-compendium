# Nuxt ecosystem atlas

## Context

The Scala Compendium needs a browsable map of effect ecosystems and their integrations. The owner supplied an overlapping-region sketch and asked to use the Nuxt starter.

## Options

Keep the initial Vite prototype, or use `yuri4n/nuxt-template` with the shared layers from `yuri4n/yuri4nized-nuxt`.

## Decision

Use the Nuxt template and its pinned shared-library submodule. Implement the atlas with Vue components, typed local data, semantic skin tokens, and locally bundled Lucide icons. Keep ecosystem filters, search, a bridge filter, and an equivalent list view.

## Reason

This follows the owner's application conventions. Overlapping rounded regions preserve the sketch's meaning. Published community bridges and proposed editorial guides stay distinct. Newsletter subscriptions remain unavailable until a provider is configured.
