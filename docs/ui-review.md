# Atlas UI verification

The supplied overlapping-region sketch remains the spatial reference. The app
uses the owner's Nuxt starter, shadcn-vue controls, and Inspira UI patterns and
newsletter accent. Both requested skills, `better-ui` and `ui-taste`, were
read completely with supporting paths resolved from their supplied directories.

## Map and content

The diagram uses the full content width within a 1920px page limit and an
820px canvas. Connection details sit below it. Prominent project panels are
removed; maintainer and development labels stay with their catalogue entries.
The 67 entries include 34 nodes in the overlap diagram, 14 entries in other
named ecosystems, and 19 shared libraries/tools in an expandable section.
Four documented bridges and one proposed guide remain distinct.

Nine practical guides, a seven-part ecosystem orientation, and a dedicated
community invitation are complete in English, Spanish, and Brazilian
Portuguese. Review checked source caveats, related item IDs, translated
placeholders, and unchanged official resource URLs. Shared tools and backend
interpreters do not imply that effect runtimes are interchangeable. Play has
Pekko/Future memberships but renders once in the unfiltered map.

## Resolved findings

- Selection now scrolls and focuses the details aside. Back to atlas reveals
  and focuses the selected node, including an entry inside shared tools.
- The newsletter decoration is clipped inside its border, preventing mobile
  overflow during its animation. Reduced motion disables the animation.
- The permanent sidebar and promotional panels no longer constrain the map.
- Locale entries explicitly declare their language codes, preserving
  canonical and alternate-language metadata when app locale files merge.
- Appearance now has a real dark palette and defaults to System. The shared
  layer persists explicit choices and follows system changes when selected.

## Production checks

Screenshots were inspected at desktop and mobile sizes in light and dark.
All three languages passed geometry checks at 1440px, 1963px, 900px, 390px,
360px: no document overflow and no diagram-node collisions. Desktop map
widths measured 1374px and 1854px. Narrow screens scroll the map independently;
list view remains available. All 27 localized guide routes returned 200 and
rendered their steps, related tools, and correct HTML language without page
width overflow.

Fourteen unit/component tests and nine production-browser tests pass. Browser
coverage includes combined filters, recovery, owner status, unique nodes,
keyboard return focus, mobile animation overflow, browser language detection,
localized navigation, nested-page switching, cookie persistence, canonical
and alternate links, a real 404, live system appearance changes, persistent
explicit light/dark overrides, and returning to System.

The root Playwright configuration builds and serves the production app by
default; CI uses the same command. `PLAYWRIGHT_BASE_URL` can reuse an existing
production server. Frozen install, lint, typecheck, and Node/Vercel production
builds are release checks; remote CI and deployment require separate proof.

## Limits

The Analytics test verifies one Nuxt script injection with its Vercel endpoint
stubbed. A standalone local server cannot serve that endpoint; collection
requires Web Analytics enabled on Vercel. Live collection and the public
release are not verified while network access is blocked. Real iOS-device and
Safari rendering are not verified. Newsletter subscriptions remain
unimplemented, and the interface states that status explicitly.

Approve for local UI review. Production publication remains pending.
