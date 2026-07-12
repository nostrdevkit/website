import { defineConfig } from "astro/config";

const config = {
  output: "static",
  trailingSlash: "always",
  site: process.env.SITE_URL ?? "https://nostrdevkit.org",
};

if (process.env.BASE_PATH) {
  config.base = process.env.BASE_PATH;
}

export default defineConfig(config);
