export type Ecosystem
  = | 'zio' | 'typelevel' | 'kyo'
    | 'akka' | 'pekko' | 'future' | 'ox' | 'turbolift'
export type EcosystemFilter = Ecosystem | 'all'
export type Maintainer = 'yuri4n' | 'kyo'
export const maintainerNames: Record<Maintainer, string> = {
  yuri4n: 'yuri4n',
  kyo: 'Kyo project',
}
export interface AtlasItem {
  id: string
  name: string
  kind: 'library' | 'bridge' | 'proposal'
  category: string
  ecosystems: Ecosystem[]
  x?: number
  y?: number
  description: string
  compatibility: string
  url: string
  source: string
  note?: string
  secondaryUrl?: string
  secondarySource?: string
  maintainer?: Maintainer
  status?: 'Unpublished' | 'In development'
  accessNote?: string
}

export const ecosystemNames: Record<Ecosystem, string> = {
  zio: 'ZIO',
  typelevel: 'Typelevel',
  kyo: 'Kyo',
  akka: 'Akka',
  pekko: 'Apache Pekko',
  future: 'Scala Future',
  ox: 'Ox',
  turbolift: 'Turbolift',
}
export const diagramEcosystems: Ecosystem[] = ['zio', 'typelevel', 'kyo']
export const additionalEcosystems: Ecosystem[] = [
  'akka',
  'pekko',
  'future',
  'ox',
  'turbolift',
]
export const atlasItems: AtlasItem[] = [
  {
    id: 'zio',
    name: 'ZIO',
    kind: 'library',
    category: 'Effect system',
    ecosystems: ['zio'],
    x: 310,
    y: 109,
    description:
      'Typed errors, environments, and structured concurrency in a'
      + ' single effect system.',
    compatibility:
      'Choose compatible ZIO modules for your Scala version. ZIO'
      + ' applications own their runtime and resource scopes.',
    url: 'https://zio.dev/',
    source: 'ZIO documentation',
  },
  {
    id: 'zio-streams',
    name: 'ZIO Streams',
    kind: 'library',
    category: 'Streaming',
    ecosystems: ['zio'],
    x: 310,
    y: 160,
    description: 'Composable, backpressured streaming in the ZIO ecosystem.',
    compatibility:
      'Built on ZIO. Crossing into another streaming system'
      + ' requires an explicit bridge.',
    url: 'https://zio.dev/reference/stream/',
    source: 'ZIO documentation',
  },
  {
    id: 'h34s',
    name: 'h34s',
    kind: 'library',
    category: 'Scala.js · Nuxt / Nitro',
    ecosystems: ['zio'],
    maintainer: 'yuri4n',
    status: 'In development',
    x: 310,
    y: 221,
    description:
      'A Scala.js toolbox for Nuxt and Nitro server handlers.'
      + ' The current repository contains a ZIO-based playground baseline.',
    compatibility:
      'The recovered baseline is not yet a verified MVP or published library.'
      + ' A Kyo core with optional ZIO integration is a planned direction.'
      + ' Map placement reflects the current ZIO implementation.',
    url: 'https://github.com/yuri4n/h34s',
    source: 'h34s README and baseline notes',
    secondaryUrl: 'https://github.com/yuri4n/h34s/blob/main/docs/baseline.md',
    secondarySource: 'Read the baseline notes',
    note:
      'On the horizon: kyo-h34s and zio-h34s. These are candidate'
      + ' integration names; standalone implementations are not yet verified.',
    accessNote: 'Private repository. Source access requires permission.',
  },
  {
    id: 'cats-effect',
    name: 'Cats Effect',
    kind: 'library',
    category: 'Effect system',
    ecosystems: ['typelevel'],
    x: 137,
    y: 375,
    description:
      'Pure asynchronous programs, structured concurrency, and safe'
      + ' resource management.',
    compatibility:
      'A foundation for FS2 and http4s. Use Cats Effect-compatible'
      + ' versions of the libraries in your application.',
    url: 'https://typelevel.org/cats-effect/',
    source: 'Cats Effect documentation',
  },
  {
    id: 'fs2',
    name: 'FS2',
    kind: 'library',
    category: 'Streaming',
    ecosystems: ['typelevel'],
    x: 333,
    y: 375,
    description: 'Composable, resource-safe streams built on Cats Effect.',
    compatibility:
      'The Stream effect parameter works with Cats Effect'
      + ' abstractions. Reactive Streams interop is a separate'
      + ' integration.',
    url: 'https://fs2.io/',
    source: 'FS2 documentation',
  },
  {
    id: 'http4s',
    name: 'http4s',
    kind: 'library',
    category: 'HTTP',
    ecosystems: ['typelevel'],
    x: 137,
    y: 452,
    description:
      'Functional HTTP clients and servers built on Cats Effect and'
      + ' FS2.',
    compatibility:
      'Manage clients and servers with Resource. Match your http4s,'
      + ' FS2, and Cats Effect versions.',
    url: 'https://http4s.org/',
    source: 'http4s documentation',
  },
  {
    id: 'doobie',
    name: 'Doobie',
    kind: 'library',
    category: 'Database',
    ecosystems: ['typelevel'],
    x: 333,
    y: 452,
    description:
      'Functional JDBC access. Compose database programs and'
      + ' transact them into an effect.',
    compatibility:
      'Uses JDBC drivers and a Cats Effect-based transactor.'
      + ' Drivers and databases have their own runtime requirements.',
    url: 'https://typelevel.org/doobie/',
    source: 'Doobie documentation',
  },
  {
    id: 'kyo',
    name: 'Kyo',
    kind: 'library',
    category: 'Effect system',
    ecosystems: ['kyo'],
    maintainer: 'kyo',
    x: 794,
    y: 245,
    description:
      'An algebraic effect toolkit with an open set of pending'
      + ' effects and composable handlers.',
    compatibility:
      'Use the current Kyo documentation for module and platform'
      + ' support. Effect handling differs from Cats Effect and ZIO.',
    url: 'https://github.com/getkyo/kyo',
    source: 'Kyo repository',
  },
  {
    id: 'kyo-stream',
    name: 'Kyo Stream',
    kind: 'library',
    category: 'Streaming',
    ecosystems: ['kyo'],
    maintainer: 'kyo',
    x: 794,
    y: 315,
    description:
      'Streaming computations in Kyo, with composable processing'
      + ' and explicit effects.',
    compatibility:
      'Kyo streams use Kyo effects. Use a documented adapter when'
      + ' crossing into ZIO Streams or Reactive Streams.',
    url: 'https://github.com/getkyo/kyo/blob/main/'
      + 'kyo-prelude/README.md#streaming',
    source: 'Kyo Prelude streaming documentation',
  },
  {
    id: 'tui4s',
    name: 'tui4s',
    kind: 'library',
    category: 'Terminal UI',
    ecosystems: ['kyo'],
    maintainer: 'yuri4n',
    status: 'Unpublished',
    x: 794,
    y: 397,
    description:
      'A terminal runner for kyo-ui. Build terminal interfaces with Kyo'
      + ' and render cells through jatatui.',
    compatibility:
      'An early, unpublished version requiring Scala 3.9+ and JDK 25.'
      + ' The current runner uses Kyo. ZIO and Cats Effect integrations'
      + ' are planned.',
    url: 'https://github.com/yuri4n/tui4s',
    source: 'tui4s README',
    accessNote: 'Repository access may require permission.',
  },
  {
    id: 'zio-cats',
    name: 'zio-interop-cats',
    kind: 'bridge',
    category: 'Effect interoperability',
    ecosystems: ['zio', 'typelevel'],
    x: 329,
    y: 280,
    description:
      'Bring Cats and Cats Effect abstractions into ZIO'
      + ' applications. A bridge between two established ecosystems.',
    compatibility:
      'Check the interop project’s compatibility matrix for ZIO and'
      + ' Cats Effect versions. Keep cancellation, resource lifetimes,'
      + ' and runtime ownership explicit at the boundary.',
    url: 'https://zio.dev/zio-interop-cats/',
    source: 'ZIO interop documentation',
    note:
      'An adapter connects APIs; it does not make their semantics'
      + ' identical.',
  },
  {
    id: 'kyo-zio',
    name: 'kyo-zio',
    kind: 'bridge',
    category: 'Effects, streams & layers',
    ecosystems: ['zio', 'kyo'],
    maintainer: 'kyo',
    x: 549,
    y: 149,
    description:
      'Bidirectional integration between Kyo and ZIO, including'
      + ' effects, streams, and layers.',
    compatibility:
      'Follow the current module guide. The documented effect'
      + ' bridge accepts ZIO values with their environment already'
      + ' provided. Review failure and interruption behavior before'
      + ' composing runtimes.',
    url: 'https://github.com/getkyo/kyo/tree/main/kyo-zio',
    source: 'Kyo module documentation',
    note: 'Provide ZIO dependencies before lifting an effect into Kyo.',
  },
  {
    id: 'kyo-compat',
    name: 'kyo-compat',
    kind: 'bridge',
    category: 'Library portability',
    ecosystems: ['zio', 'kyo', 'future', 'ox'],
    maintainer: 'kyo',
    x: 549,
    y: 219,
    description:
      'Write a library against a shared API and provide bindings for Kyo,'
      + ' ZIO, Scala Future, Twitter Future, and Ox.',
    compatibility:
      'A portability API for library authors, not a converter for arbitrary'
      + ' effects. Portable failures use Throwable. Choose the backend'
      + ' artifact for your runtime; Cats Effect is not a documented backend.',
    url: 'https://github.com/getkyo/kyo/tree/main/kyo-compat',
    source: 'Kyo compatibility module documentation',
    note:
      'Shown at the Kyo/ZIO intersection. Also provides Scala Future,'
      + ' Twitter Future, and Ox bindings.',
  },
  {
    id: 'reactive-streams',
    name: 'kyo-reactive-streams',
    kind: 'bridge',
    category: 'Protocol-based integration',
    ecosystems: ['typelevel', 'kyo'],
    maintainer: 'kyo',
    x: 549,
    y: 392,
    description:
      'Kyo’s adapter for connecting its streams with other'
      + ' streaming libraries, including FS2 through its own adapter.',
    compatibility:
      'This is an indirect route, not a direct Kyo–Cats Effect'
      + ' adapter. Both sides need compatible Publisher/Subscriber'
      + ' APIs. Review platform support, buffering, cancellation, and'
      + ' error mapping.',
    url: 'https://github.com/getkyo/kyo/tree/main/kyo-reactive-streams',
    source: 'Kyo Reactive Streams documentation',
    secondaryUrl: 'https://fs2.io/#/interop',
    secondarySource: 'FS2 interoperability',
    note: 'Connect through a shared protocol and review each side’s adapter.',
  },
  {
    id: 'akka-typed',
    name: 'Akka Typed',
    kind: 'library',
    category: 'Actors',
    ecosystems: ['akka'],
    description:
      'Typed actors for concurrent and distributed systems, with message'
      + ' protocols and supervised actor lifecycles.',
    compatibility:
      'Use Akka’s own actor system and compatible Akka modules. Pekko actor'
      + ' types belong to a separate runtime. Check current distribution'
      + ' and licensing requirements when choosing an Akka version.',
    url: 'https://doc.akka.io/libraries/akka-core/current/typed/actors.html',
    source: 'Akka Typed documentation',
  },
  {
    id: 'akka-streams',
    name: 'Akka Streams',
    kind: 'library',
    category: 'Streaming',
    ecosystems: ['akka'],
    description:
      'Composable asynchronous streams with backpressure, built from'
      + ' sources, flows, and sinks.',
    compatibility:
      'Streams run through Akka materialization. Use documented Reactive'
      + ' Streams adapters for external streaming systems and review'
      + ' cancellation and buffering at the boundary.',
    url: 'https://doc.akka.io/libraries/akka-core/current/stream/index.html',
    source: 'Akka Streams documentation',
  },
  {
    id: 'pekko-typed',
    name: 'Pekko Typed',
    kind: 'library',
    category: 'Actors',
    ecosystems: ['pekko'],
    description:
      'Apache Pekko’s typed actor APIs for concurrent and distributed'
      + ' applications, with message protocols and supervision.',
    compatibility:
      'Use Pekko actor systems and compatible Pekko modules. Shared ancestry'
      + ' with Akka does not make their runtime objects interchangeable.'
      + ' Follow the migration guide when moving an existing application.',
    url: 'https://pekko.apache.org/docs/pekko/current/typed/actors.html',
    source: 'Apache Pekko documentation',
  },
  {
    id: 'pekko-streams',
    name: 'Pekko Streams',
    kind: 'library',
    category: 'Streaming',
    ecosystems: ['pekko'],
    description:
      'Backpressured asynchronous stream processing in the Apache Pekko'
      + ' ecosystem, using sources, flows, and sinks.',
    compatibility:
      'Use Pekko’s stream types and materializer. Connecting to other'
      + ' streaming systems requires documented adapters and compatible'
      + ' Publisher/Subscriber interfaces.',
    url: 'https://pekko.apache.org/docs/pekko/current/stream/index.html',
    source: 'Apache Pekko Streams documentation',
  },
  {
    id: 'scala-future',
    name: 'Future & Promise',
    kind: 'library',
    category: 'Standard library',
    ecosystems: ['future'],
    description:
      'Standard-library asynchronous results. Compose callbacks, map, and'
      + ' flatMap with an ExecutionContext—no effect library required.',
    compatibility:
      'Future.apply schedules work eagerly. Future itself does not provide'
      + ' built-in cancellation or structured resource scopes. Use explicit'
      + ' adapters when entering an effect runtime.',
    url: 'https://docs.scala-lang.org/overviews/core/futures.html',
    source: 'Scala Futures and Promises guide',
    note:
      'kyo-compat offers a Scala Future backend for libraries written'
      + ' against its shared API.',
  },
  {
    id: 'ox',
    name: 'Ox',
    kind: 'library',
    category: 'Direct-style concurrency',
    ecosystems: ['ox'],
    description:
      'Direct-style structured concurrency, streaming, resource management,'
      + ' and resilience for Scala on the JVM.',
    compatibility:
      'Requires Scala 3 and JDK 21+. Scoped forks and interruption are part'
      + ' of its concurrency model. kyo-compat provides an Ox backend for'
      + ' libraries targeting its portability API.',
    url: 'https://ox.softwaremill.com/latest/',
    source: 'SoftwareMill Ox documentation',
  },
  {
    id: 'turbolift',
    name: 'Turbolift',
    kind: 'library',
    category: 'Algebraic effects',
    ecosystems: ['turbolift'],
    description:
      'Algebraic effects and handlers for Scala 3, with composable'
      + ' computations and user-defined effects.',
    compatibility:
      'Requires Java 11+. Its optional turbolift-spot module supplies Cats'
      + ' instances for Computation and Cats Effect instances for its IO'
      + ' effect. Review the module’s supported versions before integrating.',
    url: 'https://marcinzh.github.io/turbolift/',
    source: 'Turbolift documentation and repository',
    secondaryUrl: 'https://github.com/marcinzh/turbolift',
    secondarySource: 'Explore the repository',
  },
  {
    id: 'mixed-guide',
    name: 'Mixed-stack guide',
    kind: 'proposal',
    category: 'Proposed contribution',
    ecosystems: ['zio', 'typelevel', 'kyo'],
    x: 549,
    y: 280,
    description:
      'A proposed community guide to composing ZIO, Typelevel'
      + ' libraries, and Kyo in one architecture.',
    compatibility:
      'This is an editorial proposal, not a published adapter or'
      + ' validated three-way integration. A contribution should'
      + ' document versions, runtime boundaries, resource ownership,'
      + ' and cancellation.',
    url: 'https://github.com/yuri4n/the-scala-compendium/issues/new'
      + '?title=Mixed-stack%20guide%20proposal',
    source: 'Help write this guide',
    note: 'No three-way adapter is claimed. Help document a concrete use case.',
  },
]

export function filterAtlas(
  { ecosystem = 'all', query = '', bridgesOnly = false }: {
    ecosystem?: EcosystemFilter
    query?: string
    bridgesOnly?: boolean
  } = {},
) {
  const term = query.trim().toLowerCase()
  return atlasItems.filter(item =>
    (ecosystem === 'all' || item.ecosystems.includes(ecosystem))
    && (!bridgesOnly || item.kind === 'bridge')
    && [
      item.name,
      item.category,
      item.description,
      item.note || '',
      item.status || '',
      item.maintainer ? maintainerNames[item.maintainer] : '',
      ...item.ecosystems.map(key => ecosystemNames[key]),
    ].join(
      ' ',
    ).toLowerCase().includes(
      term,
    ),
  )
}
