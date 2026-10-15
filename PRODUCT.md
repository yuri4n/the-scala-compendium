# The Scala Compendium

A common starting point for Scala developers choosing libraries, learning effect systems, and connecting tools across ecosystems.

## First release

- An interactive atlas covering ZIO, Typelevel, Kyo, Akka, Apache Pekko,
  standard-library Futures, and smaller approaches such as Ox and Turbolift,
  with library and bridge search, ecosystem filters, and an equivalent list view.
  Ecosystem chips allow multiple selections with explicit OR/AND matching.
- Learning paths that explain prerequisites and link to primary documentation.
- Integration notes that distinguish direct compatibility, adapters, and architectural boundaries.
- A newsletter page with an honest publishing status; subscriptions require a configured provider.
- Contribution guidance so developers can propose corrections and new guides through GitHub.
- Complete English, Spanish, and Brazilian Portuguese content, with persistent
  language selection and System/Light/Dark appearance.
- Nine practical guides for learning Scala, HTTP, data, streams, frontend,
  testing, modernization, command-line tools, and ecosystem integration.
- A dedicated invitation to community unity, with a serious, restrained tone.

## Editorial principles

Use primary sources. Explain tradeoffs without ranking ecosystems as universally better. Treat Cats Effect, ZIO, and experimental approaches as distinct systems. FS2 is based on Cats Effect; ZIO Streams belongs to ZIO. Library interoperability must be documented per integration rather than assumed from similar abstractions.

Include yuri4n’s libraries, utilities, connectors, and bridges alongside
modules from the Kyo project. The initial shortlist is
tui4s and h34s, with kyo-h34s and zio-h34s as candidate future integrations.
Identify their maintainer in the map, list, and details. Keep the diagram
central; do not place featured project panels above it. Keep ownership separate from ecosystem membership.
Show development and source-access status explicitly. Place projects by their
current implementation; planned support does not establish an overlap.

Kyo’s connections start with kyo-zio and kyo-compat. Explain the
difference between effect conversion, library portability, and protocol
adapters. Link directly to each upstream module’s documentation.

The Scala landscape is broader than effect systems. Treat Akka and Apache
Pekko as distinct actor and streaming ecosystems. Give standard-library
Futures a first-class place, and keep expanding coverage of smaller and
emerging libraries. A shared ancestry or programming style does not establish
runtime compatibility. The initial catalogue is a curated starting point,
not a complete inventory. Cover practical ZIO and Kyo modules for HTTP, data,
configuration, and application tooling alongside their effect and streaming
cores. Link each module to its primary documentation.

Give shared tooling its own place: build tools, editors, formatters, testing,
serialization, frontend platforms, HTTP abstractions, and data processing.
Explain the distinction between an effect runtime, an application framework,
a backend interpreter, and a shared tool. An item can have several memberships
without appearing twice in the unfiltered map.

## Follow-up capabilities

Publish original, versioned integration tutorials, connect a newsletter provider, add moderation and community discussion links, and establish a recurring editorial schedule. Accounts and discussion hosting are later decisions; the initial hub can gather contributions through the repository.

## Interface direction

Use shadcn-vue for controls and badges and Inspira UI extensively for focused
visual accents. Keep the Nuxt starter and its semantic tokens. Spectrum UI is
also an owner-requested reference; verify its docs and framework compatibility
before selecting or adapting components.

Use the owner's Venn-style sketch as the spatial model: ZIO above, Typelevel
at lower left, and Kyo to the right. Put real integrations in the pairwise
intersections. The three-way intersection can host a clearly marked proposed
guide, without claiming a three-way adapter. Use a quiet paper surface,
orange/red/violet ecosystem outlines, and the Nuxt template's semantic skin.
Give the diagram the full content width, with connection details below it
and a keyboard-friendly return to the selected node. On narrow screens,
preserve the map as a scrollable canvas; provide list view for direct browsing. Selection, combined
filters, empty-search recovery, keyboard operation, and reduced motion must
work. Verify the production page at desktop and mobile sizes.

Extend the map with separate named regions for additional ecosystems. Show
only verified relationships as overlaps; place wider backend support in an
item’s membership and compatibility notes. All regions share the same search,
filters, details, and list view.
