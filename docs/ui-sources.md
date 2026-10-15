# Component sources

The app keeps the owner's Nuxt starter, shared layers, semantic skin, and
Venn layout. Components are copied and adapted from the official registries,
with explicit imports for shadcn-vue and Nuxt component discovery for Inspira.

## shadcn-vue

Source: https://github.com/unovue/shadcn-vue at
`0bfec13a0463003663857ee316f3e24792969a4d`,
`apps/v4/registry/new-york-v4/ui/`.

Button, Input, Badge, and Switch are in `app/components/ui/`. They power atlas
nodes, ecosystem filters, view controls, search, the bridge toggle, project
status and membership badges, featured selections, and documentation actions.

Local adaptations use the starter's `cn` helper, literal prop unions,
destructured props, typed slots, explicit attribute forwarding, and a
string-only search model with an exposed focus method. High-frequency controls
stay stationary. `components.json` records the registry and existing skin.
Reka is shared with Nuxt UI; no React runtime is added.

License: [shadcn-vue MIT license](licenses/shadcn-vue.txt).

## Inspira UI

Source: https://github.com/unovue/inspira-ui at
`04c57ab62b9713872ebbf68988dff1836ed3d764`,
`app/components/inspira/ui/`.

- CardSpotlight highlights both featured project groups.
- PatternBackground supplies the dotted overlap diagram and wider map.
- BorderBeam accents the newsletter panel.

Local adaptations use semantic colors and the shared `cn` helper. Pattern
backgrounds are static. Spotlight movement is limited to hover-capable devices
without reduced motion; the beam also stops for reduced motion. Decorative
overlays are hidden from assistive technology and do not intercept input.
BorderBeam's duration is explicitly in seconds.

License: [Inspira UI MIT license](licenses/inspira-ui.txt).

## Spectrum

The owner also requested https://ui.spectrumhq.in/docs. Access is currently
blocked by the cloud egress policy. The domain was added to the saved settings
for review, but no Spectrum source or framework compatibility is yet verified.
Do not describe the current app as using Spectrum components.
