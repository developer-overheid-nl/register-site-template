# AGENTS.md

This file guides AI coding agents (Claude Code and others) and maintainers working in this repository. Its main topic is **aligning this template with the upstream [don-register-site](https://github.com/developer-overheid-nl/don-register-site) monorepo**.

## What this is

A starter template for a register site, built with Astro (`output: "server"`). It consumes the packages that upstream publishes to npm:

- `@developer-overheid-nl/don-register-components`: React components
- `@developer-overheid-nl/don-register-layouts`: Astro layouts and SSR helpers (`getRouting`, `parseHeaders`, …)
- `@developer-overheid-nl/don-register-locales`: i18next strings
- `@developer-overheid-nl/proprietary`: an npm alias for `@developer-overheid-nl/proprietary-example`

Workspace packages in this repo: the root package, `packages/components` (`@your_org_name/components`), and `proprietary` (`@your_org_name/proprietary`, private).

The closest upstream equivalent of this template is `apps/api-register`. Use it as the reference when upstream changes affect `app.config.ts`, `astro.config.mjs` or pages.

## Commands

```
pnpm install
pnpm dev               # astro dev on localhost:4321
pnpm build             # fails with NoAdapterInstalled: no adapter is configured (see below)
pnpm biome:check       # format + lint + import sort
pnpm biome:migrate     # run after bumping @biomejs/biome
pnpm changeset         # add a changeset
pnpm changeset status  # show what will be bumped
```

## Rules for every alignment

1. **Don't change these lines in `package.json`:**
   ```json
   "@developer-overheid-nl/don-register-components": "latest",
   "@developer-overheid-nl/don-register-layouts": "latest",
   "@developer-overheid-nl/don-register-locales": "latest",
   "@developer-overheid-nl/proprietary": "npm:@developer-overheid-nl/proprietary-example@*",
   ```
   Only the lockfile resolution for these four changes.
2. `pnpm update <pkg>` **rewrites** the `npm:…@*` alias to `@^x.y.z`. Always pass `--no-save`, then confirm with `git diff package.json` that the lines above are unchanged.
3. Pin exact versions (no `^`/`~`) for every other dependency. Upstream does the same through its catalog.
4. Only align dependencies this template actually uses. Upstream-only tooling (Storybook, Cypress, Vitest, Chromatic, lefthook, Playwright, `@astrojs/mdx`, Piwik Pro, Altcha) is out of scope unless the template starts using it.

## Alignment procedure

### 1. Collect upstream versions

The sources of truth upstream:

| What | Upstream file |
|---|---|
| Shared dependency versions | `pnpm-workspace.yaml` → `catalog:` |
| React pins | `pnpm-workspace.yaml` → `catalogs.react19` + `overrides` |
| Root dev tools (Biome, Changesets) | root `package.json` → `devDependencies` |
| Node range | root `package.json` → `engines`, `.node-version` |
| Peer ranges of the published packages | `npm view @developer-overheid-nl/don-register-components peerDependencies` |
| Breaking changes | `packages/*/CHANGELOG.md` (look for `### Major Changes`) |
| Reference app config | `apps/api-register/app.config.ts`, `apps/api-register/astro.config.mjs` |
| Changesets setup | `.changeset/config.json`, `.github/workflows/publish.yml` |

To read a file: `gh api repos/developer-overheid-nl/don-register-site/contents/<path> --jq .content | base64 -d`.

### 2. Compare and update `package.json`

Compare each direct dependency against the upstream catalog. Check in particular:

- `astro` + `@astrojs/react`: major bumps need a migration check (step 5).
- `react`, `react-dom`: must equal the upstream `overrides` value (currently `catalogs.react19`). Mirror the overrides in the local `pnpm-workspace.yaml`.
- `@types/react`, `@types/react-dom`: must satisfy the **peer range** of components/layouts (`catalogs.react19`), not the upstream root catalog value.
- `@rijkshuisstijl-community/design-tokens`: match the version components/layouts depend on, so pnpm installs only one copy.
- Drop dependencies that upstream replaced with code in its packages. Example: `parse-link-header` went away when layouts 2.1.0 added `parseLinkHeader`. Grep `src/`, `packages/` and `proprietary/` before removing anything.

pnpm settings (`overrides`, `onlyBuiltDependencies`, `ignoredBuiltDependencies`) belong in `pnpm-workspace.yaml`, not in a `"pnpm"` block in `package.json`.

### 3. Refresh the lockfile

```
pnpm install
pnpm update @developer-overheid-nl/don-register-components @developer-overheid-nl/don-register-layouts @developer-overheid-nl/don-register-locales @developer-overheid-nl/proprietary --no-save
pnpm install --frozen-lockfile
```

Confirm the resolved versions:

```
node -p "require('./node_modules/@developer-overheid-nl/don-register-layouts/package.json').version"
```

### 4. Handle breaking changes in the published packages

Read every `### Major Changes` entry between the old and new versions in the upstream changelogs, and apply it to `app.config.ts`, `astro.config.mjs` and `src/`. Upstream's `apps/api-register` shows the expected result.

Example from a previous alignment: layouts 2.0.0 made `meta.ogImages["/"]` required in `app.config.ts`. Without it, `Base.astro` throws on every page.

### 5. Tooling with breaking changes

- **Biome:** run `pnpm biome:migrate`, then `pnpm biome:check`. Commit the updated `$schema` URL in `biome.json`.
- **Changesets:** the CLI major version and `changesets/action` major version must match (CLI 2 ↔ action v1, CLI 3 ↔ action v2). On a CLI bump, also:
  - update the `$schema` URL in `.changeset/config.json` to the `@changesets/config` version the CLI depends on (`npm view @changesets/cli@<v> dependencies`);
  - update the action pin in `.github/workflows/changelog.yml` (pin by full commit SHA with a `# vX.Y.Z` comment, the same SHA upstream uses);
  - read the CLI's major changelog. CLI 3, for example, stopped versioning private packages by default; `privatePackages: { version: true, tag: false }` keeps `@your_org_name/proprietary` in the fixed version group.
- **Node:** keep `engines.node` and `node-version` in `.github/workflows/*.yml` in line with upstream's `.node-version`.

### 6. Add a changeset

Add `.changeset/<name>.md` with a `minor` bump for `@developer-overheid-nl/register-site-template` (the fixed group bumps the others). List the new versions and any changes users of the template must make.

## Verification

1. `pnpm install --frozen-lockfile` succeeds. Peer warnings for react / `@types/react*` mean step 2 is incomplete.
2. `pnpm dev`, then open `/` and `/dingen`: both return 200, the list, pagination and facet filters render, and `<head>` contains `og:image`.
3. `pnpm biome:check` reports nothing new (two `noSvgWithoutTitle` errors for the SVGs in `public/` are known).
4. `pnpm changeset status` lists all three workspace packages.
5. `git diff package.json` shows the four protected lines unchanged.
6. After merging to `main`: the "Changelog Release" workflow creates the "Version Packages" PR.

## Known issues (not caused by alignment)

- `pnpm build` fails with `NoAdapterInstalled`. The template uses server rendering without an adapter; each fork picks its own (upstream uses `@astrojs/node` in standalone mode).
- pnpm peer warning `@amsterdam/design-system-css@1.0.0: found 1.0.1`. This comes from upstream's components package.
- React "unique key" warning in `FacetFilters` during dev. This also comes from upstream's components package.
- The two `// @ts-expect-error` casts in `packages/components/helpers/facetFilters.ts` aren't type-checked; the template has no `tsc` script.

## Alignment log

Add a row after each alignment.

| Date | components | layouts | locales | proprietary-example | astro | Notes |
|---|---|---|---|---|---|---|
| 2026-11-03 | 1.7.0 | 2.1.1 | 1.3.0 | 1.2.2 | 7.4.4 | Astro 6 → 7, layouts 2.x (`ogImages`), Changesets 3 + action v2, `parse-link-header` removed |
