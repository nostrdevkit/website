import type { APIContext } from "astro";
import { site as siteConfig } from "../config/site";

export function GET({ site }: APIContext) {
  const baseUrl = site ?? new URL(siteConfig.url);
  const sitemapUrl = new URL("/sitemap.xml", baseUrl).toString();

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
