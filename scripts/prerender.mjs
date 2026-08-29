import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createServer } from "vite";

const siteUrl = "https://iua.edu.mx";
const template = readFileSync("dist/index.html", "utf8");
const routes = JSON.parse(readFileSync("src/config/indexableRoutes.json", "utf8"));
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");

function replaceMeta(html, selector, value) {
  const escaped = escapeHtml(value);
  return html.replace(selector, (tag) => tag.replace(/content="[^"]*"/, `content="${escaped}"`));
}

function pageHtml(route, robots = "index, follow") {
  const canonical = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
  const appHtml = render(route.path);
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${robots}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  html = replaceMeta(html, /<meta property="og:title"[^>]*>/, route.title);
  html = replaceMeta(html, /<meta property="og:description"[\s\S]*?\/>/, route.description);
  html = replaceMeta(html, /<meta property="og:url"[^>]*>/, canonical);
  html = replaceMeta(html, /<meta name="twitter:title"[^>]*>/, route.title);
  html = replaceMeta(html, /<meta name="twitter:description"[\s\S]*?\/>/, route.description);
  return html;
}

try {
  for (const route of routes) {
    const destination = route.path === "/" ? "dist/index.html" : join("dist", route.path.slice(1), "index.html");
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, pageHtml(route), "utf8");
  }

  const notFound = { path: "/404", title: "Pagina no encontrada | Universidad IUA", description: "La pagina solicitada no existe. Consulta la oferta educativa o vuelve al inicio." };
  writeFileSync("dist/404.html", pageHtml(notFound, "noindex, follow"), "utf8");
  console.log(`Prerendered ${routes.length} routes with React SSR and 404.html.`);
} finally {
  await vite.close();
}
