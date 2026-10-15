import yuri4n from '@yuri4n/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

// The library in vendor/ is linted in its own repo.
export default withNuxt(yuri4n({ ignores: ['vendor/**'] }), {
  // JSON message strings cannot wrap across source lines.
  files: ['i18n/locales/*.json', 'shared/data/guides.json'],
  rules: { 'style/max-len': 'off' },
})
