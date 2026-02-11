# Jouw Organisatie Register Site

![GitHub License](https://img.shields.io/github/license/developer-overheid-nl/register-site-template)
![GitHub package.json version](https://img.shields.io/github/package-json/v/developer-overheid-nl/register-site-template)

## Introductie

Dit is een starter template voor een register site, gebouwd met [Astro](https://astro.build). Het is ontworpen om je te helpen snel een register site op te zetten die zoals de register sites van [developer.overheid.nl](https://developer.overheid.nl).

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/developer-overheid-nl/register-site-template?title=developer.overheid.nl%20Register%20Site%20Template)

## Projectstructuur

De mappen-en-bestandsstructuur van dit project is als volgt:

```text
/
├── packages/
│   └── components/
├── public/
├── src/
│   ├── layouts/
│   └── pages/
│       ├── *.astro
│       └── *.md
│   ├── partials/
│   └── types/
└── app.config.ts
└── redocly.yaml
└── package.json
```

### Packages/*

De plek voor eigen packages, zoals unieke componenten. In dit template is er al een voorbeeld `components` package, maar je kunt er zoveel toevoegen als je wilt.

### proprietary

Hier kan je je eigen versie van `@developer-overheid-nl/proprietary-example` plaatsen.  
Doormiddel van een alias in `package.json` kan je `@developer-overheid-nl/proprietary` overschrijven. Bijvoorbeeld:

```json
"dependencies": {
  "@developer-overheid-nl/proprietary": "workspace:@your_org_name/proprietary@*",
}
```

### Public

Hier plaats je alle statische assets, zoals afbeeldingen, die je in je site wilt gebruiken.

### Layouts

Specifieke layouts kunnen hier worden geplaatst. De layout `Markdown.astro` staat ook hier (ipv in de layouts package) omdat de Frontmatter in markdown alleen met relatieve paden werkt.

### Pages

> Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Zie de [Astro documentatie](https://docs.astro.build/en/core-concepts/routing/#file-based-routing) voor meer informatie over routing.

Hier zet je de structuur van je site neer. Er is een voorbeeldstructuur opgezet, maar je zal deze natuurlijk aanpassen aan jouw wensen.

### Partials

Hier plaats je korte stukjes tekst zoals intro-teksten, disclaimers, etc. Deze kan je dan inladen in je pagina met de volgende syntax:

```astro
---
import { Content as Intro } from "../partials/intro.md";
---
<>
  ...
  <Article className="markdown-content utrecht-html" slot="header"><Intro /></Article>
  ...
</>
```

### Types

Het bestand `api-schema.ts` wordt in deze map gegenereerd.  
Eigen Typescript declarations kunnen hier ook toegevoegd worden.

### redocly.yaml

Het bestand `redocly.yaml` bevat de OpenApiSpecification-configuratie van de API. Met `pnpm ts:oas` wordt een typescript declaration aangemaakt op basis van de OAS.  
Hiervoor wordt [OpenAPI TypeScript](https://openapi-ts.dev/) gebruikt en de apps maken gebruik van [openapi-fetch](https://openapi-ts.dev/openapi-fetch/) waardoor de inhoud van de API direct de correcte types heeft.

### app.config.ts

Hier worden algemene instellingen van de app geplaatst, zoals de naam van de app, url's en specifieke taalinstellingen.

## Aan de slag

Wil je deze template gebruiken? Volg dan de volgende stappen:

1. Fork deze repository
2. Clone jouw fork lokaal
3. Installeer de dependencies met `pnpm install`
4. Start de dev server met `pnpm dev`
5. Open `localhost:4321` in je browser

Als de demo site draait, kan je aan de slag met het aanpassen. Zet je eigen organisatiegegevens in `app.config.ts`, `package.json` en de `README.md`. Zoek op `@your_org_name`, `YOUR_ORG_NAME` en `Jouw Organisatie` in de codebase en vervang deze door jouw eigen naam.

## (Dev)Dependencies

- Astro: Site build, routing, SSR / SSG
- React: Components
- i18Next: Localisation
- Typescript
- OpenAPI TypeScript: Type declarations & fetch
- Biome: formatting, linting and assist

## Contact developer.overheid.nl

[💬 Slack](https://codefornl.slack.com/archives/CFV4B3XE2)  •&nbsp;
[📨 Schiet een issue in](https://github.com/developer-overheid-nl/don-register-site/issues) •&nbsp;
[🔀 Github Discussions](https://github.com/orgs/developer-overheid-nl/discussions)  •&nbsp;
[📜 Bijdragen](https://developer.overheid.nl/contributing)

---

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

[the Astro documentation](https://docs.astro.build).
