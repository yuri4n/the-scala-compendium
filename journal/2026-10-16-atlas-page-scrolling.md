# Let vertical scrolling pass through the atlas

## Context

The diagram contained overscroll on both axes. Wheel input over its background
or nodes could not scroll the page. Narrow screens also had a separate vertical
scroll area inside the diagram.

## Options

Forward wheel events with JavaScript, or allow native vertical scroll chaining
and keep the full diagram height in page flow.

## Decision

Contain only horizontal overscroll. Let vertical input scroll the page and
remove the narrow-screen height cap. Preserve horizontal map panning and the
floating inspector's independent scrolling for long content.

## Reason

The browser can handle mouse, trackpad, and touch input without custom event
interception. One vertical scroll surface keeps navigation predictable at all
screen widths. Browser checks exercise wheel input over both empty map space
and nodes, plus sideways panning on narrow screens.
