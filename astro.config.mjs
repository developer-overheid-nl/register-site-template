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
    },
  },
});
