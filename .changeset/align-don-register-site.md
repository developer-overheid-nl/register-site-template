---
"@developer-overheid-nl/register-site-template": minor
---

Align dependencies with don-register-site: Astro 7.4.4, @astrojs/react 7.1.2, i18next 26.5.12, design-tokens 11.0.0, @types/react-dom 19.2.7, Biome 2.5.13 and Changesets 3.0.3. The don-register packages now resolve to components 1.7.0, layouts 2.1.1, locales 1.3.0 and proprietary-example 1.2.2. Removed the unused `parse-link-header` dependency. Added `meta.ogImages` to `app.config.ts` with a placeholder `public/social-card.png`; layouts 2.x requires it.
