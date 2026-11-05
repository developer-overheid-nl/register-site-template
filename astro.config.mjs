// @ts-check

import react from "@astrojs/react";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [
    react(),
  ],
  env: {
    schema: {
      API_URL: envField.string({
        context: "server",
        access: "secret",
      }),
      API_ENDPOINT: envField.string({
        context: "server",
        access: "secret",
      }),
      IMAGE_BASE_URL: envField.string({
        context: "server",
        access: "public",
        url: true,
        default:
          "https://raw.githubusercontent.com/developer-overheid-nl/dingen-api/main/images/webp/",
      }),
    },
  },
});
