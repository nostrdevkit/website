import { defineConfig } from "astro/config";

const config = {
  output: "static",
  trailingSlash: "always",
};

if (process.env.SITE_URL) {
  config.site = process.env.SITE_URL;
}

if (process.env.BASE_PATH) {
  config.base = process.env.BASE_PATH;
}

export default defineConfig(config);
