# App preferences standard

Use the shared `@yuri4n/nuxt-preferences` layer in the Nuxt starter and its
consuming apps. The layer owns behavior; each app owns its content and skin.

## User behavior

- Languages: English (`en`), Spanish (`es`), Brazilian Portuguese (`pt-BR`).
- The first visit to `/` uses the supported browser language, otherwise English.
- Explicit selection persists in the `app-locale` cookie. Direct localized
  links retain their locale. Navigation uses `useLocalePath()`.
- Appearance defaults to System and follows operating-system changes live.
  Light and Dark are explicit overrides. Selecting System resumes syncing.
- Appearance persists in `app-color-mode` localStorage. Preferences are local
  to each app origin; there is no cross-site account synchronization.
- Native, visibly labeled controls support keyboard and assistive technology.

## Adopt in another app

1. Move the shared library submodule and reusable workflow refs to the same
   validated release tag. This release uses `v0.1.1-rc.1`.
2. Add `vendor/yuri4n.dev/layers/preferences` to `pnpm-workspace.yaml` and
   `@yuri4n/nuxt-preferences: workspace:*` to dependencies.
3. Extend the preferences layer and render `<AppPreferences />` in the header
   or settings. Remove forced light-mode configuration.
4. Supply complete `i18n/locales/en.json`, `es.json`, and `pt-BR.json` files,
   declaring their `code`, `language`, and `file` in the app's i18n
   configuration. Set `language` explicitly to `en`, `es`, or `pt-BR` for
   alternate-language metadata; the consumer override can unset it. Keep
   product names and source URLs intact. Shared labels use `preference.*`.
5. Supply semantic color tokens for both light and `.dark` palettes. Use the
   stable `app-preferences`, `preference-field`, and `preference-select` hooks
   for app-specific layout. Do not duplicate the persistence code.
6. Set the app's canonical base URL, localized metadata, and alternate links.
   The layer sets the HTML language and direction.

The layer is published in the shared library and adopted by this app and the
Nuxt starter branch. Other existing apps require an explicit migration; the
standard does not translate their content automatically.

## Acceptance checks

Verify complete content in all three locales, direct localized URLs, browser
language detection, language switching on a nested page, and persistence on
reload. Verify system changes in both directions, an explicit override across
reload and subsequent system changes, then a return to System. Inspect both
palettes at desktop and mobile widths in a production build. Check HTML
language, canonical and alternate links, hydration, keyboard focus, and
contrast. Keep these checks when changing the shared layer.
