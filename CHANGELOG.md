# @developer-overheid-nl/register-site-template

## 0.3.0

### Minor Changes

- 021b176: Align dependencies with don-register-site: Astro 7.4.4, @astrojs/react 7.1.2, i18next 26.5.12, design-tokens 11.0.0, @types/react-dom 19.2.7, Biome 2.5.13 and Changesets 3.0.3. The don-register packages now resolve to components 1.7.0, layouts 2.1.1, locales 1.3.0 and proprietary-example 1.2.2. Removed the unused `parse-link-header` dependency. Added `meta.ogImages` to `app.config.ts` with a placeholder `public/social-card.png`; layouts 2.x requires it.

### Patch Changes

- b693fad: Regenerate `src/types/api-schema.ts` from Dingen API OAS 1.2.0. `/tags` is now typed as an object of tag name to count, the tag filter is `tags_like`, and the `X-Total-Count` and `Link` pagination headers are typed. This removes the `@ts-expect-error` on `parseTags` in `src/pages/dingen/pagina/[...page].astro`. README.md and AGENTS.md explain how to run the Dingen API locally with JSON Server and a `.env.local`.
- @your_org_name/components@0.3.0

## 0.2.0

### Minor Changes

- ec7a514: Template example updated with newer pagination and facet filters.
  Updated packages.

### Patch Changes

- @your_org_name/components@0.2.0
