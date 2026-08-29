import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const siteUrl = "https://iua.edu.mx";
const routes = JSON.parse(readFileSync("src/config/indexableRoutes.json", "utf8"));
const failures = [];
const paths = new Set();

function textContent(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

for (const route of routes) {
  if (paths.has(route.path)) failures.push(`Ruta duplicada: ${route.path}`);
  paths.add(route.path);
  const file = route.path === "/" ? "dist/index.html" : join("dist", route.path.slice(1), "index.html");
  if (!existsSync(file)) { failures.push(`HTML ausente: ${route.path}`); continue; }
  const html = readFileSync(file, "utf8");
  const canonical = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
  const requirements = [
    ["title", /<title>[^<]+<\/title>/i],
    ["description", /<meta name="description" content="[^"]+"/i],
    ["robots", /<meta name="robots" content="index, follow"/i],
    ["canonical", new RegExp(`<link rel="canonical" href="${canonical.replaceAll("/", "\\/")}"`)],
    ["h1", /<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/i],
    ["Schema", /application\/ld\+json/i]
  ];
  for (const [label, pattern] of requirements) if (!pattern.test(html)) failures.push(`${route.path}: falta ${label}`);
  if (!/<div id="root">\s*<(?!\/div)/i.test(html)) failures.push(`${route.path}: root prerender vacio`);
  if (textContent(html).length < 500) failures.push(`${route.path}: contenido HTML insuficiente`);
  if (route.path.startsWith("/oferta/") && !["/oferta/secundaria", "/oferta/bachillerato"].includes(route.path)) {
    for (const heading of ["Perfil de ingreso", "Perfil de egreso", "Campo laboral", "Plan de estudios"]) {
      if (!html.includes(heading)) failures.push(`${route.path}: falta contenido academico ${heading}`);
    }
    if (!html.includes("EducationalOccupationalProgram") || !html.includes("BreadcrumbList")) failures.push(`${route.path}: Schema de programa incompleto`);
  }
  if (route.path.startsWith("/campus/") && (!html.includes("BreadcrumbList") || !/(CollegeOrUniversity|EducationalOrganization)/.test(html))) failures.push(`${route.path}: Schema de campus incompleto`);
}

const sitemap = readFileSync("public/sitemap.xml", "utf8");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const urlEntries = [...sitemap.matchAll(/<url>[\s\S]*?<\/url>/g)];
if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>') || !sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">') || urlEntries.length !== locations.length) failures.push("Sitemap XML invalido");
if (locations.length !== new Set(locations).size) failures.push("Sitemap contiene URLs duplicadas");
if (locations.some((url) => { try { const parsed = new URL(url); return parsed.protocol !== "https:" || parsed.origin !== siteUrl; } catch { return true; } })) failures.push("Sitemap contiene URL no HTTPS o de otro host");
if (locations.some((url) => url.includes("/api/") || url.endsWith("/404"))) failures.push("Sitemap contiene API o 404");
if (locations.length !== routes.length || routes.some(({ path }) => !locations.includes(`${siteUrl}${path === "/" ? "/" : path}`))) failures.push("Sitemap y manifiesto estructurado difieren");
for (const required of ["/rvoe", "/que-carrera-estudiar", "/campus/reyes", "/campus/texcoco", "/oferta/psicologia"]) if (!paths.has(required)) failures.push(`Sitemap omite ${required}`);
if (sitemap.includes("<priority>")) failures.push("Sitemap contiene priority");
if (!existsSync("dist/404.html") || !/noindex, follow/.test(readFileSync("dist/404.html", "utf8"))) failures.push("404.html ausente o indexable");

if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`SEO build valid: ${routes.length} SSR routes, ${locations.length} unique sitemap URLs and noindex 404.`);
