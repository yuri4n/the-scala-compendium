export type Ecosystem
  = | 'zio' | 'typelevel' | 'kyo'
    | 'akka' | 'pekko' | 'future' | 'ox' | 'turbolift' | 'shared'
export type EcosystemFilter = Ecosystem | 'all'
export type Maintainer = 'yuri4n' | 'kyo'
export const maintainerNames: Record<Maintainer, string> = {
  yuri4n: 'yuri4n',
  kyo: 'Kyo project',
}
export interface AtlasItem {
  id: string
  name: string
  kind: 'library' | 'tool' | 'bridge' | 'proposal'
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
  shared: 'Shared tools',
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
    x: 150,
    y: 130,
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
    x: 345,
    y: 130,
    description: 'Composable, backpressured streaming in the ZIO ecosystem.',
    compatibility:
      'Built on ZIO. Crossing into another streaming system'
      + ' requires an explicit bridge.',
    url: 'https://zio.dev/reference/stream/',
    source: 'ZIO documentation',
  },
  {
    id: 'zio-http',
    name: 'ZIO HTTP',
    kind: 'library',
    category: 'HTTP',
    ecosystems: ['zio'],
    x: 150,
    y: 195,
    description:
      'HTTP clients, servers, typed endpoints, and WebSockets built on ZIO.',
    compatibility:
      'Follow the client/server backend guidance for your platform. Manage'
      + ' services through ZIO layers and resource scopes.',
    url: 'https://ziohttp.com',
    source: 'ZIO HTTP documentation',
  },
  {
    id: 'zio-json',
    name: 'ZIO JSON',
    kind: 'library',
    category: 'JSON',
    ecosystems: ['zio'],
    x: 345,
    y: 195,
    description:
      'Derive JSON encoders and decoders for Scala data types, with readable'
      + ' decoding errors.',
    compatibility:
      'Basic encoding and decoding do not require running a ZIO effect. Check'
      + ' platform dependencies when using Java time-zone types.',
    url: 'https://zio.dev/zio-json/',
    source: 'ZIO JSON documentation',
  },
  {
    id: 'zio-schema',
    name: 'ZIO Schema',
    kind: 'library',
    category: 'Data modeling',
    ecosystems: ['zio'],
    x: 150,
    y: 260,
    description:
      'Describe data structures as values and derive codecs,'
      + ' transformations, and'
      + ' migrations.',
    compatibility:
      'Add the derivation and format-specific modules you need.'
      + ' Sharing a schema'
      + ' does not automatically preserve wire-format compatibility.',
    url: 'https://zio.dev/zio-schema/',
    source: 'ZIO Schema documentation',
  },
  {
    id: 'zio-config',
    name: 'ZIO Config',
    kind: 'library',
    category: 'Configuration',
    ecosystems: ['zio'],
    x: 345,
    y: 260,
    description:
      'Typed configuration with automatic derivation and sources such as HOCON,'
      + ' YAML, and TOML.',
    compatibility:
      'The 4.x line extends ZIO’s core Config API. Select matching'
      + ' source modules'
      + ' and follow the migration guide when coming from older versions.',
    url: 'https://zio.dev/zio-config/',
    source: 'ZIO Config documentation',
  },
  {
    id: 'zio-cli',
    name: 'ZIO CLI',
    kind: 'library',
    category: 'Command line',
    ecosystems: ['zio'],
    x: 150,
    y: 325,
    description:
      'Compose typed commands, options, arguments, and help text for ZIO'
      + ' applications.',
    compatibility:
      'Command handlers run in ZIO. Check platform support for filesystem and'
      + ' process features used by your application.',
    url: 'https://zio.dev/zio-cli/',
    source: 'ZIO CLI documentation',
  },
  {
    id: 'zio-kafka',
    name: 'ZIO Kafka',
    kind: 'library',
    category: 'Messaging',
    ecosystems: ['zio'],
    x: 345,
    y: 325,
    description:
      'ZIO and ZStream APIs for Kafka consumers, producers, and'
      + ' administration.',
    compatibility:
      'Wraps the Java Kafka client. Scope clients carefully and choose'
      + ' offset-commit and delivery behavior explicitly.',
    url: 'https://zio.dev/zio-kafka/',
    source: 'ZIO Kafka documentation',
  },
  {
    id: 'zio-logging',
    name: 'ZIO Logging',
    kind: 'library',
    category: 'Observability',
    ecosystems: ['zio'],
    x: 150,
    y: 390,
    description:
      'Structured logging with fiber-local context, configurable output, and'
      + ' logging-backend integrations.',
    compatibility:
      'Core logging supports JVM, JS, and Native. Backend integrations are JVM'
      + ' modules; choose the adapter matching your SLF4J version.',
    url: 'https://zio.dev/zio-logging/',
    source: 'ZIO Logging documentation',
  },
  {
    id: 'h34s',
    name: 'h34s',
    kind: 'library',
    category: 'Scala.js · Nuxt / Nitro',
    ecosystems: ['zio'],
    maintainer: 'yuri4n',
    status: 'In development',
    x: 345,
    y: 390,
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
    x: 100,
    y: 560,
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
    x: 255,
    y: 560,
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
    x: 410,
    y: 560,
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
    x: 100,
    y: 620,
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
    x: 735,
    y: 290,
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
    x: 900,
    y: 290,
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
    id: 'kyo-http',
    name: 'kyo-http',
    kind: 'library',
    category: 'HTTP',
    ecosystems: ['kyo'],
    maintainer: 'kyo',
    x: 735,
    y: 375,
    description:
      'HTTP clients and servers with streaming bodies, composable'
      + ' middleware, and'
      + ' OpenAPI support.',
    compatibility:
      'Uses Kyo effects. Select the documented platform backend;'
      + ' Scala.js server'
      + ' deployment uses Node.js.',
    url: 'https://github.com/getkyo/kyo/tree/main/kyo-http',
    source: 'Kyo module documentation',
  },
  {
    id: 'kyo-sql',
    name: 'kyo-sql',
    kind: 'library',
    category: 'Database',
    ecosystems: ['kyo'],
    maintainer: 'kyo',
    x: 900,
    y: 375,
    description:
      'Raw SQL and typed queries sharing one execution model, with Kyo-managed'
      + ' database connections.',
    compatibility:
      'Add a driver module for your database. PostgreSQL and MySQL use native'
      + ' wire protocols; SQLite uses an embedded native backend.',
    url: 'https://github.com/getkyo/kyo/tree/main/kyo-sql',
    source: 'Kyo module documentation',
  },
  {
    id: 'kyo-schema',
    name: 'kyo-schema',
    kind: 'library',
    category: 'Schemas & data',
    ecosystems: ['kyo'],
    maintainer: 'kyo',
    x: 735,
    y: 460,
    description:
      'Derive schemas, validation, lenses, structural diffs, and'
      + ' conversions from'
      + ' Scala types.',
    compatibility:
      'The core is usable without Kyo’s effect runtime. JSON, YAML,'
      + ' Protobuf, and'
      + ' other formats require their separate codec modules.',
    url: 'https://github.com/getkyo/kyo/tree/main/kyo-schema',
    source: 'Kyo module documentation',
  },
  {
    id: 'kyo-ui',
    name: 'kyo-ui',
    kind: 'library',
    category: 'User interfaces',
    ecosystems: ['kyo'],
    maintainer: 'kyo',
    x: 900,
    y: 545,
    description:
      'Reactive interfaces described as pure Scala values, with'
      + ' browser, server-'
      + ' driven, and SSR runners.',
    compatibility:
      'DOM mounting uses Scala.js. Server-driven rendering uses HTTP and'
      + ' WebSocket handlers; choose the runner for the deployment target.',
    url: 'https://github.com/getkyo/kyo/tree/main/kyo-ui',
    source: 'Kyo module documentation',
  },
  {
    id: 'kyo-config',
    name: 'kyo-config',
    kind: 'library',
    category: 'Configuration',
    ecosystems: ['kyo'],
    maintainer: 'kyo',
    x: 900,
    y: 460,
    description:
      'Typed configuration and feature flags, including static settings and'
      + ' dynamic rollout rules.',
    compatibility:
      'Static flags resolve once; dynamic flags evaluate for a supplied key.'
      + ' System properties take precedence over environment variables'
      + ' and defaults.',
    url: 'https://github.com/getkyo/kyo/tree/main/kyo-config',
    source: 'Kyo module documentation',
  },
  {
    id: 'kyo-stm',
    name: 'kyo-stm',
    kind: 'library',
    category: 'Shared state',
    ecosystems: ['kyo'],
    maintainer: 'kyo',
    x: 735,
    y: 545,
    description:
      'Software transactional memory for composing atomic updates across'
      + ' references, maps, and tables.',
    compatibility:
      'Transaction bodies can run again after conflicts. Keep external I/O and'
      + ' other observable side effects outside the transaction.',
    url: 'https://github.com/getkyo/kyo/tree/main/kyo-stm',
    source: 'Kyo module documentation',
  },
  {
    id: 'kyo-test',
    name: 'kyo-test',
    kind: 'library',
    category: 'Testing',
    ecosystems: ['kyo'],
    maintainer: 'kyo',
    x: 735,
    y: 630,
    description:
      'A test framework for Kyo computations, with asynchronous tests and'
      + ' optional property and snapshot testing.',
    compatibility:
      'Suites handle their additional effects before execution. Supports JVM,'
      + ' Scala.js, and Scala Native; distinct from the kyo-zio-test bridge.',
    url: 'https://github.com/getkyo/kyo/tree/main/kyo-test',
    source: 'Kyo module documentation',
  },
  {
    id: 'tui4s',
    name: 'tui4s',
    kind: 'library',
    category: 'Terminal UI',
    ecosystems: ['kyo'],
    maintainer: 'yuri4n',
    status: 'Unpublished',
    x: 900,
    y: 630,
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
    x: 300,
    y: 480,
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
    x: 560,
    y: 265,
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
    x: 560,
    y: 350,
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
    x: 560,
    y: 620,
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
    id: 'cats',
    name: 'Cats',
    category: 'Functional foundations',
    ecosystems: [
      'typelevel',
    ],
    description:
      'Foundational type classes, data types, and syntax for composing'
      + ' functional Scala programs.',
    compatibility:
      'Can be used without Cats Effect. Choose artifacts matching your'
      + ' Scala version and target platform.',
    url: 'https://typelevel.org/cats/',
    source: 'Cats documentation',
    kind: 'library',
    x: 255,
    y: 620,
  },
  {
    id: 'circe',
    name: 'Circe',
    category: 'JSON',
    ecosystems: [
      'typelevel',
    ],
    description:
      'JSON values, encoders, decoders, and derivation for Scala data'
      + ' models.',
    compatibility:
      'Core codecs work independently of an effect runtime. Streaming'
      + ' JSON support comes through separate integrations such as'
      + ' circe-fs2.',
    url: 'https://circe.github.io/circe/',
    source: 'Circe documentation',
    kind: 'library',
    x: 410,
    y: 620,
  },
  {
    id: 'skunk',
    name: 'Skunk',
    category: 'Database',
    ecosystems: [
      'typelevel',
    ],
    description:
      'Typed PostgreSQL access built on Cats Effect and FS2, with'
      + ' resource-managed sessions.',
    compatibility:
      'PostgreSQL-specific. Acquire sessions and pools through Resource'
      + ' and match codecs to database column types.',
    url: 'https://typelevel.org/skunk/',
    source: 'Skunk documentation',
    kind: 'library',
    x: 100,
    y: 680,
  },
  {
    id: 'fs2-kafka',
    name: 'FS2 Kafka',
    category: 'Messaging',
    ecosystems: [
      'typelevel',
    ],
    description:
      'Backpressured Kafka consumer and producer streams, with batched'
      + ' processing and offset commits.',
    compatibility:
      'Uses the Java Kafka client. Configure processing, commit, retry,'
      + ' and delivery behavior explicitly.',
    url: 'https://typelevel.org/fs2-kafka',
    source: 'FS2 Kafka documentation',
    kind: 'library',
    x: 255,
    y: 680,
  },
  {
    id: 'decline',
    name: 'Decline',
    category: 'Command line',
    ecosystems: [
      'typelevel',
    ],
    description:
      'Compose typed command-line options, arguments, and subcommands'
      + ' using Cats.',
    compatibility:
      'The core parser does not require Cats Effect. Add decline-effect'
      + ' for CommandIOApp integration.',
    url: 'https://monovore.com/decline/',
    source: 'Decline documentation',
    kind: 'library',
    x: 410,
    y: 680,
  },
  {
    id: 'akka-http',
    name: 'Akka HTTP',
    category: 'HTTP',
    ecosystems: [
      'akka',
    ],
    description:
      'HTTP clients, servers, and a routing DSL built on Akka Actors and'
      + ' Streams.',
    compatibility:
      'Match HTTP and Streams versions. Check the selected Akka'
      + ' release’s licensing and repository-access requirements.',
    url: 'https://doc.akka.io/libraries/akka-http/current/',
    source: 'Akka HTTP documentation',
    kind: 'library',
  },
  {
    id: 'akka-cluster',
    name: 'Akka Cluster',
    category: 'Distributed actors',
    ecosystems: [
      'akka',
    ],
    description:
      'Cluster membership and coordination for actor systems distributed'
      + ' across machines.',
    compatibility:
      'Configure serialization, node discovery, downing, and shutdown.'
      + ' Cluster membership alone does not make application state durable.'
      + ' Check the selected Akka release’s licensing and repository-access'
      + ' requirements.',
    url: 'https://doc.akka.io/libraries/akka-core/current/typed/cluster.html',
    source: 'Akka Cluster documentation',
    kind: 'library',
  },
  {
    id: 'akka-persistence',
    name: 'Akka Persistence',
    category: 'Event sourcing',
    ecosystems: [
      'akka',
    ],
    description:
      'Recover actor state by replaying persisted events, with optional'
      + ' snapshots.',
    compatibility:
      'Select a journal and snapshot-store plugin, define stable'
      + ' persistence IDs, and plan serialization evolution. Check the'
      + ' selected Akka release’s licensing and repository-access'
      + ' requirements.',
    url:
      'https://doc.akka.io/libraries/akka-core/current/typed/persistence.html',
    source: 'Akka Persistence documentation',
    kind: 'library',
  },
  {
    id: 'pekko-http',
    name: 'Pekko HTTP',
    category: 'HTTP',
    ecosystems: [
      'pekko',
    ],
    description:
      'HTTP clients, servers, and routing built on Apache Pekko Actors'
      + ' and Streams.',
    compatibility:
      'HTTP has its own release cycle. Select a compatible Pekko Streams'
      + ' version and review migration changes when coming from Akka HTTP.',
    url: 'https://pekko.apache.org/docs/pekko-http/current/',
    source: 'Apache Pekko HTTP documentation',
    kind: 'library',
  },
  {
    id: 'pekko-cluster',
    name: 'Pekko Cluster',
    category: 'Distributed actors',
    ecosystems: [
      'pekko',
    ],
    description:
      'Cluster membership and coordination for distributed Apache Pekko'
      + ' actor systems.',
    compatibility:
      'Configure serialization, bootstrap, downing, and shutdown. Treat'
      + ' mixed Akka/Pekko clusters as a separate, version-specific'
      + ' migration concern.',
    url: 'https://pekko.apache.org/docs/pekko/current/typed/cluster.html',
    source: 'Apache Pekko Cluster documentation',
    kind: 'library',
  },
  {
    id: 'pekko-persistence',
    name: 'Pekko Persistence',
    category: 'Event sourcing',
    ecosystems: [
      'pekko',
    ],
    description:
      'Event-sourced actors that rebuild their state after restart or'
      + ' relocation.',
    compatibility:
      'Requires a journal plugin and optionally a snapshot store.'
      + ' Validate persisted data, serializers, and plugin compatibility'
      + ' during migrations.',
    url: 'https://pekko.apache.org/docs/pekko/current/typed/persistence.html',
    source: 'Apache Pekko Persistence documentation',
    kind: 'library',
  },
  {
    id: 'play',
    name: 'Play Framework',
    category: 'Web framework',
    ecosystems: [
      'pekko',
      'future',
    ],
    description:
      'Play 3 is a Scala and Java web framework with routing,'
      + ' asynchronous controllers, JSON, templates, and WebSockets.',
    compatibility:
      'Play 3 uses Pekko; Play 2.9 uses Akka. Async Scala actions return'
      + ' Future, and blocking work needs an appropriate execution context.',
    url: 'https://www.playframework.com/documentation/latest/ScalaHome',
    source: 'Play Framework documentation',
    kind: 'library',
  },
  {
    id: 'tapir',
    name: 'Tapir',
    kind: 'library',
    category: 'HTTP & APIs',
    description:
      'Describe HTTP endpoints once and interpret them as servers,'
      + ' clients, or API documentation.',
    compatibility:
      'Choose an explicit server or client interpreter. Official'
      + ' integrations include ZIO, Cats Effect, Future, Akka HTTP, and'
      + ' Pekko HTTP; endpoint descriptions do not convert between their'
      + ' runtimes.',
    url: 'https://tapir.softwaremill.com/en/latest/',
    source: 'Tapir documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'sttp',
    name: 'sttp client',
    kind: 'library',
    category: 'HTTP & APIs',
    description:
      'Describe HTTP requests and response handling with a common Scala'
      + ' client API.',
    compatibility:
      'Select a backend for the platform, effect type, streaming, and'
      + ' WebSocket capabilities you need. Backends manage connections and'
      + ' have different capabilities.',
    url: 'https://sttp.softwaremill.com/en/latest/',
    source: 'sttp client documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'upickle',
    name: 'uPickle',
    kind: 'library',
    category: 'Data & serialization',
    description:
      'JSON and MessagePack serialization with readers and writers for'
      + ' Scala data types.',
    compatibility:
      'Encoding and decoding do not require an effect runtime. Share'
      + ' compatible codecs and configuration across producers and'
      + ' consumers, and match platform artifacts to your build.',
    url: 'https://com-lihaoyi.github.io/upickle/',
    source: 'uPickle documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'chimney',
    name: 'Chimney',
    kind: 'library',
    category: 'Data & serialization',
    description:
      'Derive type-safe transformations between Scala data models, with'
      + ' explicit customizations where shapes differ.',
    compatibility:
      'Transformation code is independent of an effect runtime. Choose'
      + ' documentation for your release line: the 2.x sources target newer'
      + ' Scala and JDK versions than the 1.x line.',
    url: 'https://chimney.readthedocs.io/',
    source: 'Chimney documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'slick',
    name: 'Slick',
    kind: 'library',
    category: 'Data & serialization',
    description:
      'Compose relational queries and database actions in Scala, with'
      + ' typed mappings and access to plain SQL.',
    compatibility:
      'Choose the database profile and JDBC driver. Follow the execution'
      + ' API for your Slick release; current development documentation'
      + ' differs from older Future-based releases.',
    url: 'https://scala-slick.org/doc/stable/',
    source: 'Slick documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'quill',
    name: 'Quill',
    kind: 'library',
    category: 'Data & serialization',
    description:
      'Write quoted Scala queries that can be translated to SQL at'
      + ' compile time.',
    compatibility:
      'Choose a database context, such as JDBC, ZIO JDBC, or Doobie.'
      + ' Scala 3 support comes from the ProtoQuill implementation; module'
      + ' availability depends on Scala version and context.',
    url: 'https://zio.dev/zio-quill/',
    source: 'ZIO Quill documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'laminar',
    name: 'Laminar',
    kind: 'library',
    category: 'Platforms & UI',
    description:
      'Build reactive browser interfaces in Scala.js using Airstream'
      + ' signals and event streams.',
    compatibility:
      'Targets the browser through Scala.js. Use JavaScript-compatible'
      + ' dependencies; integrations with server-side effect libraries are'
      + ' separate architectural choices.',
    url: 'https://laminar.dev/documentation',
    source: 'Laminar documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'scala-js',
    name: 'Scala.js',
    kind: 'tool',
    category: 'Platforms & UI',
    description:
      'Compile Scala to JavaScript for browser applications, Node.js'
      + ' programs, and shared client/server code.',
    compatibility:
      'Dependencies must support Scala.js. JVM-specific APIs and'
      + ' libraries are not automatically available; JavaScript interop and'
      + ' execution environments have their own constraints.',
    url: 'https://www.scala-js.org/doc/',
    source: 'Scala.js documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'scala-native',
    name: 'Scala Native',
    kind: 'tool',
    category: 'Platforms & UI',
    description:
      'Compile Scala ahead of time into native applications with a'
      + ' lightweight managed runtime.',
    compatibility:
      'Use Native-compatible dependencies and the documented native'
      + ' toolchain. Check supported operating systems, native libraries,'
      + ' and Java API coverage.',
    url: 'https://scala-native.org/en/stable/',
    source: 'Scala Native documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'scala-cli',
    name: 'Scala CLI',
    kind: 'tool',
    category: 'Build & tooling',
    description:
      'Compile, run, test, and package Scala source files and scripts'
      + ' with concise configuration.',
    compatibility:
      'Suited to scripts, examples, and smaller projects. Its documented'
      + ' scope does not replace a multi-module build tool or an extensible'
      + ' task system.',
    url: 'https://scala-cli.virtuslab.org/docs/overview',
    source: 'Scala CLI documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'sbt',
    name: 'sbt',
    kind: 'tool',
    category: 'Build & tooling',
    description:
      'Build, test, and publish Scala and Java projects, including'
      + ' multi-project builds and incremental compilation.',
    compatibility:
      'Pin the sbt version and use compatible plugins. sbt 1.x and 2.x'
      + ' require their respective build and migration documentation.',
    url: 'https://www.scala-sbt.org/',
    source: 'sbt documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'mill',
    name: 'Mill',
    kind: 'tool',
    category: 'Build & tooling',
    description:
      'Define modular builds for compiling, testing, and packaging'
      + ' Scala, Java, and Kotlin projects.',
    compatibility:
      'Use the wrapper, version, and build syntax expected by the'
      + ' project. Mill modules and tasks are separate from sbt plugins and'
      + ' settings.',
    url: 'https://mill-build.org/',
    source: 'Mill documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'metals',
    name: 'Metals',
    kind: 'tool',
    category: 'Build & tooling',
    description:
      'Scala language-server support for navigation, diagnostics,'
      + ' completions, and development inside compatible editors.',
    compatibility:
      'Import the project’s supported build and configure its JDK.'
      + ' Features vary by editor, build server, and Scala compiler'
      + ' version.',
    url: 'https://scalameta.org/metals/',
    source: 'Metals documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'scalafmt',
    name: 'Scalafmt',
    kind: 'tool',
    category: 'Build & tooling',
    description:
      'Format Scala source consistently from editors, build tools, or'
      + ' the command line.',
    compatibility:
      'Pin the formatter version and choose the appropriate Scala'
      + ' dialect in project configuration so local and CI formatting'
      + ' agree.',
    url: 'https://scalameta.org/scalafmt/',
    source: 'Scalafmt documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'scalafix',
    name: 'Scalafix',
    kind: 'tool',
    category: 'Build & tooling',
    description:
      'Apply automated Scala rewrites and lint rules for maintenance and'
      + ' migrations.',
    compatibility:
      'Semantic rules require compatible SemanticDB compiler output;'
      + ' syntactic rules do not require the same semantic setup. Check'
      + ' each rule’s Scala-version support.',
    url: 'https://scalacenter.github.io/scalafix/',
    source: 'Scalafix documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'munit',
    name: 'MUnit',
    kind: 'library',
    category: 'Testing',
    description:
      'Write concise Scala tests with useful assertions, diffs,'
      + ' fixtures, and extensible test APIs.',
    compatibility:
      'Supports JVM, Scala.js, and Scala Native with matching artifacts.'
      + ' Effect-specific testing extensions are separate integrations.',
    url: 'https://scalameta.org/munit/',
    source: 'MUnit documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'scalatest',
    name: 'ScalaTest',
    kind: 'library',
    category: 'Testing',
    description:
      'A Scala and Java testing toolkit with multiple test styles,'
      + ' assertions, and integration options.',
    compatibility:
      'Select the modules and test style your project uses. Async and'
      + ' effect support depends on the selected testing API or integration'
      + ' rather than automatic execution of arbitrary effects.',
    url: 'https://www.scalatest.org/',
    source: 'ScalaTest documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'scalacheck',
    name: 'ScalaCheck',
    kind: 'library',
    category: 'Testing',
    description:
      'Test properties over generated inputs and shrink failures to'
      + ' simpler counterexamples.',
    compatibility:
      'Works standalone or through test-framework integrations.'
      + ' Generators and properties should represent meaningful domain'
      + ' constraints; generated checks do not prove all possible inputs.',
    url: 'https://www.scalacheck.org/',
    source: 'ScalaCheck documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'spark',
    name: 'Apache Spark',
    kind: 'library',
    category: 'Data processing',
    description:
      'Distributed data processing with Scala APIs for SQL, DataFrames,'
      + ' machine learning, and Structured Streaming.',
    compatibility:
      'Match the Scala binary version, Java version, and dependencies to'
      + ' the Spark distribution. Executor-side code and serialization must'
      + ' work in the cluster environment.',
    url: 'https://spark.apache.org/docs/latest/',
    source: 'Apache Spark documentation',
    ecosystems: [
      'shared',
    ],
  },
  {
    id: 'mixed-guide',
    name: 'Mixed-stack guide',
    kind: 'proposal',
    category: 'Proposed contribution',
    ecosystems: ['zio', 'typelevel', 'kyo'],
    x: 560,
    y: 480,
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
  items: AtlasItem[] = atlasItems,
) {
  const term = query.trim().toLowerCase()
  return items.filter(item =>
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
