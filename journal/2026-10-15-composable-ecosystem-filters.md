# Composable ecosystem filters

## Context

The owner asked for AND/OR ecosystem filters. The existing chips selected
only one ecosystem at a time.

## Options

Make multiple selections always use OR, or let readers switch between OR
and AND to explore unions and intersections explicitly.

## Decision

Each ecosystem chip toggles independently. Match any (OR) is the default;
Match all (AND) requires every selected membership. No selected chips means
all ecosystems in either mode. The All ecosystems chip clears selections
and returns to OR while retaining search and the bridges-only preference.
Clear filters resets all of these controls.

Search and bridges-only combine with either mode. A record with several
memberships still appears once. A proposed guide stays distinct from a
published bridge, even in an intersection. Controls are translated into all
three supported languages and work in map and list views.

## Reason

Developers can explore several ecosystems together, then narrow to their
documented intersections without losing their selections. The logical
operation is visible and uses the same catalogue membership data.
