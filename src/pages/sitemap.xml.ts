import type { APIContext } from "astro";
import { site as siteConfig } from "../config/site";

const pages = ["/", "/donate/", "/license/", "/maintainers/", "/patrons/"];

export function GET({ site }: APIContext) {
  const baseUrl = site ?? new URL(siteConfig.url);
  const urls = pages
    .map((path) => {
      const loc = new URL(path, baseUrl).toString();

      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        "    <changefreq>weekly</changefreq>",
        "    <priority>0.8</priority>",
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
