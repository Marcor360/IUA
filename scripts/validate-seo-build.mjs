import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const siteUrl = "https://iua.edu.mx";
const routes = JSON.parse(readFileSync("src/config/indexableRoutes.json", "utf8"));
const failures = [];
const paths = new Set();

for (const route of routes) {
  if (paths.has(route.path)) failures.push(`Ruta duplicada: ${route.path}`);
  paths.add(route.path);
  const file = route.path === "/" ? "dist/index.html" : join("dist", route.path.slice(1), "index.html");
  if (!existsSync(file)) { failures.push(`HTML ausente: ${route.path}`); continue; }
  const html = readFileSync(file, "utf8");
  const canonical = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
  for (const [label, pattern] of [
    ["title", /<title>[^<]+<\/title>/i], ["description", /<meta name="description" content="[^"]+"/i],
    ["robots", /<meta name="robots" content="index, follow"/i], ["canonical", new RegExp(`<link rel="canonical" href="${canonical.replaceAll("/", "\\/")}"`)],
    ["h1", /<h1>[^<]+<\/h1>/i], ["Schema", /application\/ld\+json/i]
  ]) if (!pattern.test(html)) failures.push(`${route.path}: falta ${label}`);
}

const sitemap = readFileSync("public/sitemap.xml", "utf8");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>') || !sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) failures.push("Sitemap XML inválido");
if (locations.length !== new Set(locations).size) failures.push("Sitemap contiene URLs duplicadas");
if (locations.some((url) => !url.startsWith(`${siteUrl}/`))) failures.push("Sitemap contiene URL no absoluta o de otro host");
if (locations.length !== routes.length) failures.push("Sitemap y manifiesto no contienen el mismo número de rutas");
if (sitemap.includes("<priority>")) failures.push("Sitemap todavía contiene priority");
if (!existsSync("dist/404.html") || !/noindex, follow/.test(readFileSync("dist/404.html", "utf8"))) failures.push("404.html ausente o indexable");

if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`SEO build valid: ${routes.length} routes, unique sitemap and noindex 404.`);
