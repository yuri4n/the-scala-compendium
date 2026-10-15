# Agents

These instructions are for AI agents that work in this repository. They use ASD-STE100 (Simplified Technical English). Keep that style when you edit this file. The owner's global `~/.claude/AGENTS.md` adds to these rules.

## 1. Purpose and stack

This repository holds the app The Scala Compendium (package name `the-scala-compendium`).

- Stack: Nuxt 4.6, Nuxt UI 4, Tailwind CSS 4 (through Nuxt UI), TypeScript 6, pnpm 10.34.6, Node 24.
- The app extends three layers of the yuri4n.dev library: `@yuri4n/nuxt-preferences`, `@yuri4n/nuxt-ui`, and `@yuri4n/nuxt-base`.
- Node: `mise.toml` pins `node = "24"`, and `package.json` sets `engines.node` to `24.x`. Do not change them to `lts` or `latest`. `lts` becomes Node 26 in late October 2026. Vercel has no Node 26 runtime. Nuxt 4.6 needs Node `^24.15.0` on the 24 line.

## 2. Commands

Run pnpm only in the repository root. Never run pnpm in `vendor/`.

- `pnpm dev`: start the dev server.
- `pnpm lint` and `pnpm lint:fix`: lint and format all files.
- `pnpm typecheck`: run `nuxt typecheck`.
- `pnpm test`: run the Vitest projects `unit` and `nuxt`.
- `pnpm test:e2e`: run Playwright. Run `pnpm exec playwright install chromium` one time first.
- `pnpm build`: build the app.

Before a commit, run `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.

## 3. The library

- `vendor/yuri4n.dev` is a git submodule. It holds the yuri4n.dev library at a release tag.
- Do not edit files in `vendor/` from this repository. Change the library in its own repository, release a new tag, then move the submodule to the tag (README, "Update or change the library").
- After a clone, run `git submodule update --init --recursive` (or `pnpm lib:init`) before `pnpm install`.
- A Renovate pull request that moves the submodule has an old `pnpm-lock.yaml`. Its CI fails with `ERR_PNPM_OUTDATED_LOCKFILE`. To repair it, check out the branch, run `git submodule update --init`, run `pnpm install`, and commit `pnpm-lock.yaml`. Get the owner's yes before you push.

## 4. TypeScript and Vue

- Do not use `as` casts, in `<script>` and in `<template>`. Lint enforces this rule. `as const` is permitted.
- Do not use `!` non-null assertions.
- Use type guards, generic overloads with a concrete union in the implementation, `Object.assign` for generic merges, and an exhaustive `switch` with `satisfies never`.
- When a `useAsyncData` payload is a union, wrap it in `{ value }`. Then `PickFrom` does not change the union.
- Read `process` through `import process from 'node:process'`. The lint rule `node/prefer-global/process` enforces this.
- Components: use `<script setup lang="ts">`. Destructure the props. Use literal unions in `defineProps`. Do not use conditional types in `defineProps`, because compiler-sfc cannot resolve them. A wrapper component sets `inheritAttrs: false`. Type the emits and the slots.
- Class merge: when a wrapper first needs it, add the two-line `cn` helper to `app/utils/cn.ts` (README, "Add on first use"). When a second app needs it, move it to yuri4n.dev.
- Composables: use kebab-case file names `use-*.ts` with a default export.
- Stores: use setup stores in `app/stores/<name>.store.ts`. Add `@pinia/nuxt` and `pinia` when the first store comes.
- Data: use `useAsyncData` or `useFetch` with an explicit key in `<script setup>`. Do not fetch SSR data only on the client.
- Server: validate all input with zod. Put pure helpers in `shared/utils`.

## 5. CSS

- Use only the semantic tokens: `bg-background`, `text-foreground`, `bg-card`, `border-border` and the other slots. `app/assets/css/main.css` sets their values (the skin).
- In a scoped `<style>`, use `@reference`. Do not use `@import` there.
- Use `@theme static` for variables that code reads at run time.
- Use `@source inline()` for class names that code makes from data.
- Add an `@source` line for each folder outside `app/` that holds classes (`content/`, `shared/`, `server/`). Nuxt UI scans only the `app/` folder of each layer.
- Tailwind 4 removes unused variables only in a production build. Before each push that changes styles, do the local production check: run `pnpm build && node .output/server/index.mjs`, then open the page.

## 6. Icons

- Add `@iconify-json/<set>` to `package.json` for each icon set that the app uses. Without it, SSR gets the icons from the Iconify API and can time out on Vercel.
- Today the app uses only `lucide`.

## 7. Dev server

- Run `unset PORT` before `nuxt dev`. When `PORT` is set, Vite HMR uses the app port and the page fails with HTTP 426. The `dev` entry of `.claude/launch.json` does this.
- The first start of the dev server is slow (about 25 s).
- When Nuxt dev shows "IPC connection closed", look for conditional types in `defineProps`. Then run `touch nuxt.config.ts` to restart the server.

## 8. Decisions

Write each decision in `journal/`. `journal/README.md` gives the format.

## 9. Change discipline

- Before you start, record a baseline: the branch, the status and the remotes.
- Keep the uncommitted work of other persons. Do not stash, discard or move it without the owner's yes.
- Use one branch (or one worktree) for each agent and each task.
- Stage files by name. Make small commits.
- Open a draft pull request for work that is not complete.
- Before a push, make sure that the remote, the repository and the base branch are correct.
- Do not merge, force-push or delete a branch without the owner's yes.
- Before a large refactor, write a plan and get the owner's confirmation.

## 10. Second-use rule

- When a second app needs code from this app, move the code to yuri4n.dev. Do not copy it.
- Do not move code to yuri4n.dev when only one app uses it.

## 11. Deploy

- Work gets to production through a pull request.
- CI (the `ci` job) is the proof. It builds with the Nitro preset `vercel`, the same preset that the publisher uses.
- Exactly one machine publishes the app:
  - Default: the Vercel Git integration. The library is public, so Vercel clones the submodule over HTTPS. `vercel.json` has no `git` key. Do not set `DEPLOY_FROM_CI`.
  - Alternative: the `deploy` job of `.github/workflows/ci.yml`, when the repository variable `DEPLOY_FROM_CI` is `true`. Then the app has the `vercel` CLI as an exact devDependency (`pnpm add -D -E -w vercel@<version>`), and `vercel.json` sets `"git": { "deploymentEnabled": false }`.
- Never turn on the two publishers at the same time.
- Agents never deploy, never push, and never create remote repositories without the owner's yes.

## 12. Secrets

- Agents never create, read, print or store tokens or other secret values.
- For the alternative publisher only, the owner creates these items on GitHub: the secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`, and the repository variable `DEPLOY_FROM_CI`.
- `SUBMODULES_TOKEN` is optional. The library is public, so CI reads it with `github.token`.
- In `.env*` files, write and say only the key names. Never write or print the values.
