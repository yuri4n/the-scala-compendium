import process from 'node:process'

const siteUrl = process.env.NUXT_SITE_URL
  || 'https://the-scala-compendium.vercel.app'

export default defineNuxtConfig({
  // Library layers, by package name (vendor/yuri4n.dev through the pnpm
  // workspace). To use Nuxt Content, add '@yuri4n/nuxt-content' here BEFORE
  // '@yuri4n/nuxt-ui' (so the Nuxt UI prose components win), and to
  // pnpm-workspace.yaml and package.json (see README, Add on first use).
  extends: ['@yuri4n/nuxt-preferences', '@yuri4n/nuxt-ui', '@yuri4n/nuxt-base'],
  modules: ['@nuxt/eslint', '@vercel/analytics/nuxt'],
  css: ['~/assets/css/main.css'],
  components: [
    // An array replaces Nuxt's defaults, so re-declare the global folder.
    { path: '~/components/global', global: true },
    // .ts files next to components are helpers and prop types, not components.
    { path: '~/components', ignore: ['**/*.ts'] },
  ],
  site: { name: 'The Scala Compendium', url: siteUrl },
  i18n: {
    baseUrl: siteUrl,
    locales: [
      { code: 'en', language: 'en', file: 'en.json' },
      { code: 'es', language: 'es', file: 'es.json' },
      { code: 'pt-BR', language: 'pt-BR', file: 'pt-BR.json' },
    ],
  },
  devtools: { enabled: false },
  fonts: {
    providers: {
      google: false,
      googleicons: false,
      bunny: false,
      fontshare: false,
      fontsource: false,
    },
  },
  // Nitro 2.13 writes at most nodejs22.x for Vercel functions. This app pins
  // Node 24 (mise.toml, engines), so its functions run on Node 24 too.
  nitro: { vercel: { functions: { runtime: 'nodejs24.x' } } },
  // Template creation day. Bump it only in a reviewed commit.
  compatibilityDate: '2026-10-09',
  eslint: { config: { standalone: false } },
})
