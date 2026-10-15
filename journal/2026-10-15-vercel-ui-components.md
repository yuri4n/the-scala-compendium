# Vercel and UI components

## Context

The owner could not access the cloud's local preview and authorized Vercel
deployment, then chose to import from the Vercel dashboard. They requested
Vercel Analytics, extensive Inspira UI and shadcn usage, and Spectrum UI.

## Options

Deploy through an authenticated Vercel CLI, or push the finished repository
for dashboard import and use the Vercel Git integration. Use Vue components
that fit the existing starter and preserve the Venn layout.

## Decision

Prepare the repository for dashboard import. Register the official Vercel
Analytics Nuxt module. Adopt shadcn-vue Button, Input, Badge, and Switch across
the atlas, and Inspira CardSpotlight, PatternBackground, and BorderBeam in the
featured groups, diagram, wider map, and newsletter. Preserve license notices
and document accessibility and token adaptations. Spectrum adoption remains
pending access to its documentation.

## Reason

The dashboard supplies account authentication and the ongoing deployment path.
The Vue libraries share the starter's rendering and design system. The
verified Vercel preset build prepares deployment without claiming a live URL
or analytics collection before dashboard configuration.
