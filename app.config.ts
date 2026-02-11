type i18nTranslations = Record<string, string | Record<string, string>>;

const mainSiteUrl = "https://developer.overheid.nl";

export default {
  title: "Ding-register",
  mainSite: {
    name: "Jouw organisatie",
    url: mainSiteUrl,
  },
  urlHomepage: [
    "/",
    "/dingen/pagina/[...page]",
  ],
  items: {
    type: "dingen",
  },
  i18n: {
    nl: {
      components: {
        items_one: "Ding",
        items_other: "Dingen",
        "back-to-homepage": "Terug naar het Ding-registeroverzicht",
      },
    },
  } as Record<string, i18nTranslations>,
  topNavigation: {
    items: [
      {
        id: "home",
        label: "Home",
        href: mainSiteUrl,
      },
      {
        id: "dingen",
        label: "Dingen",
        href: "/dingen",
        current: true,
      },
    ],
    endItems: [
      {
        id: "github",
        label: "GitHub",
        href: "https://github.com/developer-overheid-nl/register-site-template",
        icon: "_external",
        target: "_blank",
      },
    ],
  },
  footer: {
    columns: [
      {
        title: "Mede mogelijk gemaakt door",
        text: `
![developer.overheid.nl](/sponsors/developer-overheid-nl.svg)  
`,
      },
      {
        title: "Registers",
        items: [
          {
            id: "add-dingen",
            label: "Dingen toevoegen",
            href: "/dingen/toevoegen",
          },
          {
            id: "archive",
            label: "Archief",
            href: "https://web.archive.org/",
            icon: "_external",
            target: "_blank",
          },
        ],
      },
      {
        title: "Community",
        items: [
          {
            id: "slack",
            label: "Slack",
            href: "https://codefornl.slack.com/archives/CFV4B3XE2",
            icon: "_external",
            target: "_blank",
          },
          {
            id: "github",
            label: "Github",
            href: "https://github.com/developer-overheid-nl",
            icon: "_external",
            target: "_blank",
          },
        ],
      },
      {
        title: "Overig",
        items: [
          {
            id: "bijdragen",
            label: "Bijdragen",
            href: "https://developer.overheid.nl/contributing",
          },
          {
            id: "contact",
            label: "Contact",
            href: "https://developer.overheid.nl/contact",
          },
        ],
      },
    ],
  },
};
