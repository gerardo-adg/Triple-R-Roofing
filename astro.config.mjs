import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://triplerroofs.com",
  output: "static",
  compressHTML: true,
  integrations: [
    sitemap({
      // Internal Phase 2 reference page - never a real route visitors
      // or search engines should land on.
      filter: (page) => !page.includes("/design-system"),
    }),
  ],
});
