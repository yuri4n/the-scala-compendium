# The Scala Compendium

A common starting point for Scala developers, built from
[yuri4n/nuxt-template](https://github.com/yuri4n/nuxt-template).

The main interface is an interactive Venn-style atlas. ZIO, Typelevel, and Kyo
occupy overlapping regions; libraries sit inside their ecosystem and bridges
sit in the intersections. Search, ecosystem filters, a bridges-only filter,
and a list view expose the same typed catalogue. Selection opens documentation
and compatibility notes. Proposed guides are distinct from published bridges.

Featured groups highlight yuri4n’s tui4s and h34s and Kyo’s integration modules,
with maintainer and development labels. Additional regions cover Akka, Apache
Pekko, Scala Futures, Ox, and Turbolift. They use the same catalogue and filters.
Candidate h34s integrations remain clearly marked in its notes.

## Requirements and setup

- Node 24.15+ on the Node 24 line (`mise.toml` pins major 24).
- pnpm 10.34.6, pinned in `package.json`.
- Initialize the shared library before installing dependencies:

```sh
git submodule update --init --recursive
pnpm install --frozen-lockfile
```

`vendor/yuri4n.dev` is the starter's shared library, at its pinned release
commit. The supplied `yuri4n/yuri4nized-nuxt` repository has the same library
commit. Run pnpm from this repository root, never from `vendor/`.

## Development and validation

```sh
unset PORT
NUXT_TELEMETRY_DISABLED=1 pnpm dev --port 3000

pnpm lint
pnpm typecheck
pnpm test
pnpm build
node .output/server/index.mjs
```

The unit suite checks cross-ecosystem filtering; the Nuxt suite checks
selection, combined filters, and empty-search recovery.

```sh
pnpm exec playwright install chromium
pnpm test:e2e
```

On a cloud machine with Chromium already installed, set
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` instead of downloading
another browser. Cloud setup uses writable cache directories under `/workspace`;
the saved environment install script contains the exact commands.

## Structure

- `app/components/EcosystemAtlas.vue`: reactive search, filtering, and display mode.
- `app/components/AtlasNode.vue`: keyboard-accessible map and list buttons.
- `app/components/AtlasDetails.vue`: documentation and compatibility notes.
- `shared/utils/atlas.ts`: typed catalogue and pure filtering.
- `app/assets/css/main.css`: app skin and semantic token values.
- `app/assets/css/atlas.css`: diagram layout and responsive rules.
- `vendor/yuri4n.dev`: unmodified Nuxt UI, base, and ESLint layers.

The map scrolls horizontally on narrow screens, while the detail panel stacks
below it. List view provides a compact alternative. All Lucide icons are
bundled locally. Font families follow the template with system fallbacks;
remote font providers are disabled so rendering does not require font-service
access.

## Newsletter and contributions

The newsletter section links to GitHub for first-issue suggestions. Email
subscriptions and delivery are not connected. There is no fake signup form.

Prefer primary sources when suggesting a connection. Explain dependency,
platform, cancellation, and resource boundaries; an overlap is not a claim of
automatic compatibility. See `PRODUCT.md` for the editorial scope.

The owner will import the repository through the Vercel dashboard. See
[Vercel setup](docs/vercel.md) for production, branch previews, and enabling
Web Analytics. The official Analytics Nuxt module is installed; collection
requires the deployed Vercel service. A live deployment has not yet been
verified.

The interface uses adapted shadcn-vue controls and Inspira UI accents. See
[component sources](docs/ui-sources.md) for provenance, licenses, and the
pending Spectrum documentation review.
