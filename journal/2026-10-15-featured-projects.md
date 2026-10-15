# Featured libraries and connections

## Context

The owner asked for more emphasis on their libraries and utilities, and on
Kyo’s projects. They named tui4s, h34s, and possibly kyo-h34s and zio-h34s.
They also requested coverage beyond effect systems: Akka, Pekko, plain
Futures, and smaller approaches.

## Options

Use ecosystem placement alone, or add prominent project groups with explicit
maintainer and development labels while preserving the map’s spatial meaning.

## Decision

Add “From yuri4n” and “From Kyo” groups above the atlas. Selecting a featured
project clears conflicting filters and opens its details. Start with h34s
selected. Include maintainer labels on nodes, list rows, and the detail panel;
search also matches maintainer names and candidate integration notes.

Place tui4s in Kyo and the existing h34s baseline in ZIO. Label both as early
projects and identify restricted source access. Keep kyo-h34s and zio-h34s as
candidate names in h34s notes, without implemented bridge nodes. Add the
upstream kyo-compat module to the Kyo/ZIO overlap and feature it with kyo-zio.
Its memberships also include its Scala Future and Ox backends.

Add separate regions and filters for Akka, Apache Pekko, Scala Future, Ox,
and Turbolift. Keep the original three-region overlap diagram; do not imply
unverified runtime relationships by overlapping the additional regions.

## Reason

This gives the owner’s work and Kyo integrations a clear editorial emphasis
without confusing authorship, intended support, and current implementations.
The full ecosystem remains browsable.

## Sources checked

- tui4s README at `2d5354dc2f5ce05324e905dc3b7e1798850ebef5`: Kyo terminal
  runner, unpublished; Cats Effect and ZIO support planned.
- h34s README, baseline notes, and build at
  `c324d34c41cbf9a77562867196421e935d447db5`: ZIO-based Scala.js baseline,
  not a verified MVP. Kyo core and optional ZIO integration are planned.
- Upstream getkyo/kyo main module documentation for kyo-zio, kyo-compat,
  kyo-reactive-streams, and kyo-prelude streaming.
- Standalone kyo-h34s and zio-h34s implementations were not verified.
  The existing h34s ZIO module is named zio-h3-ext.
