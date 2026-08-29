import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const siteUrl = "https://iua.edu.mx";
const template = readFileSync("dist/index.html", "utf8");
const routes = JSON.parse(readFileSync("src/config/indexableRoutes.json", "utf8"));
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function pageHtml(route, robots = "index, follow") {
  const canonical = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
  const breadcrumbs = route.path === "/" ? [] : [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: route.h1, item: canonical }
  ];
  const schemas = [
    { "@context": "https://schema.org", "@type": "WebPage", name: route.title, description: route.description, url: canonical, isPartOf: { "@id": `${siteUrl}/#website` } },
    ...(breadcrumbs.length ? [{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbs }] : [])
  ];
  const content = `<main id="prerendered-content"><nav aria-label="Migas de pan"><a href="/">Inicio</a>${route.path === "/" ? "" : ` / <span>${escapeHtml(route.h1)}</span>`}</nav><h1>${escapeHtml(route.h1)}</h1><p>${escapeHtml(route.description)}</p><section aria-labelledby="enlaces-principales"><h2 id="enlaces-principales">Información de Universidad IUA</h2><ul><li><a href="/oferta">Consultar oferta educativa</a></li><li><a href="/campus">Conocer campus</a></li><li><a href="/rvoe">Consultar RVOE</a></li><li><a href="/contacto">Contactar admisiones</a></li></ul></section></main>`;
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${robots}">`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${content}</div>`)
    .replace("</head>", `<script type="application/ld+json">${JSON.stringify(schemas).replaceAll("<", "\\u003c")}</script></head>`);
}

for (const route of routes) {
  const destination = route.path === "/" ? "dist/index.html" : join("dist", route.path.slice(1), "index.html");
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, pageHtml(route), "utf8");
}

const notFound = { path: "/404", title: "Página no encontrada | Universidad IUA", description: "La página solicitada no existe. Consulta la oferta educativa o vuelve al inicio.", h1: "Página no encontrada" };
writeFileSync("dist/404.html", pageHtml(notFound, "noindex, follow"), "utf8");
console.log(`Prerendered ${routes.length} indexable routes and 404.html.`);
