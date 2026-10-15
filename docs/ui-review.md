# Atlas UI verification

The supplied overlapping-region sketch is the spatial reference. The interface
uses the owner's Nuxt template and its pinned shared layers. Both requested
skills were fetched and read completely: `better-ui` and `ui-taste`, with their
relative references resolved from the provided supporting directories.

## Findings resolved in the expanded atlas

| Severity         | Location                                                              | Finding                                                                 | Resolution                                                                                            |
| ---------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Medium, resolved | shared/utils/atlas.ts:261                                             | The Kyo bridge labels touched after adding maintainer bylines.          | Increased vertical separation; measured no node collisions at four viewport widths.                   |
| Medium, resolved | app/components/AtlasNode.vue:32; app/components/AtlasSpotlight.vue:38 | Accessible labels omitted visible maintainer and maturity information.  | Linked bylines and status text with `aria-describedby`; verified accessible descriptions in Chromium. |
| Low, resolved    | app/assets/css/atlas.css:487                                          | A selected cluster node’s marker was positioned relative to the canvas. | Made the node its own positioning context.                                                            |

Nested cluster corners use an outer radius equal to the inner node radius
plus padding and border. Surfaces and selection states use semantic tokens.

## Craft and accessibility

Search, ecosystem filters, bridges-only filtering, selection, the map/list
switch, empty-search recovery, external documentation links, and the `/`
search shortcut were exercised in Chromium on the production build. The
catalogue now contains 22 entries across eight ecosystem memberships. All 15
node centers in the overlap diagram were checked against the three depicted
regions. Seven additional entries appear in separate named regions.

Rendered screenshots were inspected at 1440px and 1963px desktop widths and
390px mobile width, including featured projects, the expanded regions, and
selected-item states. Layout measurements also passed at 360px. The
map scrolls independently on mobile; the list view has no page-wide overflow.
Normal, hover, selected, focus, and pressed states were inspected in the
initial review. Press scale was verified as 0.96 at 10% browser animation
playback speed; reduced motion disabled movement. The new featured controls
remain stationary, and their hover styling is gated by hover capability.
Keyboard activation with reduced motion enabled was checked again.

Featured selection clears conflicting filters and scrolls offscreen details
into view. Akka and Pekko remain separate; Future filtering includes the
documented kyo-compat backend. The desktop and mobile Playwright scenarios
pass, along with six unit/component tests, lint, typecheck, and the production
build. No browser runtime errors were observed.

The final skin darkens small ecosystem text and input borders for contrast.
Icons are local Lucide assets. Proposed guides use a dashed boundary and an
explicit label, rather than relying on color to imply publication status.

## shadcn-vue and Inspira follow-up

The updated production build was inspected at 1440px and 390px, with layout
measurements at 1963px and 360px as well. No page overflow, diagram-node
collisions, or browser runtime errors were observed. Search focus through the
wrapped Input, the Reka-backed bridge switch, feature selection, and mobile
detail scrolling work. Inspira patterns remain present in production CSS.
Reduced motion hides the spotlight effect and disables the beam animation.

The browser test verifies one Analytics Nuxt script injection, with the
remote collection script stubbed. This does not verify live Vercel collection;
the project must enable Web Analytics after import.

No actionable UI-polish findings remain in the inspected scope. There are no
loading or backend error states in the local-data atlas. Real iOS-device and
Safari rendering are **Not verified**. Email subscriptions are not implemented.

Approve
