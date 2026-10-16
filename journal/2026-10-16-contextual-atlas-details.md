# Contextual atlas details and staggered sets

## Context

The owner found the aligned left and bottom set edges too rigid and the details
below the map too far from the selected node. This revises the details placement
in [the map-first decision](2026-10-15-map-first-layout.md).

## Options

Keep the lower details section, use a fixed sidebar, or anchor a floating
inspector to each selected node. Randomize the outlines on every render or use
stable, deliberately different offsets and corner radii.

## Decision

Stagger the ZIO and Typelevel left/right edges and raise Kyo's lower edge.
Preserve library positions and the documented overlap memberships. Use stable
geometry so filtering and hydration do not rearrange the map.

Use the installed Reka Popover primitives with shadcn-vue controls. Show one
nonmodal inspector beside a clicked or keyboard-activated node, preferring below
on narrow screens and adjusting to the viewport. Its header keeps the close
button visible while long content scrolls. Close and Escape return focus to the
node; outside interactions keep their intended focus. Filters and view changes
dismiss details. No item opens automatically. Translate the close action into
English, Spanish, and Brazilian Portuguese.

## Reason

Distinct set boundaries make the overlaps easier to follow. Contextual details
keep the developer beside the connection they are exploring, while a portal
avoids clipping at the scrollable map boundary. Using Reka preserves established
keyboard, focus, dismissal, and positioning behavior without another dependency.
