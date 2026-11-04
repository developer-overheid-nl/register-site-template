---
"@developer-overheid-nl/register-site-template": patch
---

Regenerate `src/types/api-schema.ts` from Dingen API OAS 1.2.0. `/tags` is now typed as an object of tag name to count, the tag filter is `tags_like`, and the `X-Total-Count` and `Link` pagination headers are typed. This removes the `@ts-expect-error` on `parseTags` in `src/pages/dingen/pagina/[...page].astro`. README.md and AGENTS.md explain how to run the Dingen API locally with JSON Server and a `.env.local`.
