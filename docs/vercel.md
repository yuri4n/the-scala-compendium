# Import into Vercel

Import `yuri4n/the-scala-compendium` from the Vercel dashboard into the owner's
account or team. Use the repository root and the Nuxt framework preset. Keep
Node 24 and the pinned pnpm version; default framework build settings are
sufficient. The public shared-library submodule must be included in checkout.

Use `main` as the production branch. The Git integration can create preview
deployments for other branches and pull requests. CI validates the Vercel
build and does not publish; keep Vercel's Git integration as the publisher.

After import, enable **Web Analytics** in the Vercel project's Analytics tab.
The official `@vercel/analytics/nuxt` module is already registered. It injects
the client script and tracks Nuxt page navigation. Analytics collection is
only verified after the deployed service is enabled and receives traffic.

Vercel supplies the production URL used by the shared site configuration. If
using a custom domain, set `NUXT_SITE_URL` to that public canonical URL.

The dashboard route does not require a `VERCEL_TOKEN` in this cloud environment.
The optional CLI connection requirement was prepared before the owner chose
dashboard import; it is not a prerequisite for Git deployments.

## Local validation

```sh
NUXT_TELEMETRY_DISABLED=1 NITRO_PRESET=vercel pnpm build
```

This generates `.vercel/output` with a Node 24 function. Do not deploy a local
prebuilt artifact with a localhost canonical URL. A successful local build is
not proof that Vercel has deployed the repository.
