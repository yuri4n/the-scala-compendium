# Multilingual community hub

## Context

The owner approved the larger map and requested a public release, broader
Scala guidance, a restrained invitation to community unity, and English,
Spanish, and Brazilian Portuguese with system-synced themes across apps.

## Options

Keep preferences local, or put shared behavior in the library and adopt it in
the compendium and Nuxt starter. Translate only controls, or translate all
editorial content.

## Decision

Use `@yuri4n/nuxt-preferences` from the shared library candidate
`v0.1.1-rc.1`. Supply complete app-owned messages in three locales and both
semantic palettes. Expand to 67 catalogue entries and nine practical guides,
add ecosystem orientation and a dedicated community invitation. Preserve
source and compatibility caveats and the map-first layout.

Production still follows a pull request and the Vercel Git integration.
The owner has authorized release. GitHub API and live Vercel access remain
blocked by the environment network policy while local validation proceeds.

## Reason

Shared routing and persistence establish a reusable standard. App-owned
translations and skins keep content accurate and adaptable. Task-based guides
and explicit ecosystem boundaries make the catalogue useful to a broader
range of Scala developers.
