import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const siteUrl = "https://iua.edu.mx";
const template = readFileSync("dist/index.html", "utf8");
const source = readFileSync("src/data/ofertaEducativa.ts", "utf8");
const programs = Array.from(source.matchAll(/slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?shortDescription:\s*"([^"]+)"/g), ([, slug, title, description]) => ({ slug, title, description }));

const routes = [
  { path: "/", title: "Universidad IUA | Oferta educativa y campus", description: "Universidad IUA ofrece secundaria, bachillerato, licenciaturas y posgrados en campus del Estado de México y mediante programas en línea.", h1: "Universidad IUA: secundaria, bachillerato, licenciaturas y posgrados" },
  { path: "/nosotros", title: "Nosotros | Universidad IUA", description: "Conoce la institución, misión, visión, modelo educativo, oferta y campus de Universidad IUA.", h1: "Universidad IUA: institución, misión y modelo educativo" },
  { path: "/oferta", title: "Oferta educativa | Universidad IUA", description: "Consulta secundaria, bachillerato, licenciaturas, maestrías y doctorado publicados por Universidad IUA.", h1: "Oferta educativa IUA" },
  { path: "/campus", title: "Campus | Universidad IUA", description: "Conoce Campus Chalco, Campus Reyes, Plantel Texcoco y el plantel virtual de Universidad IUA.", h1: "Campus de Universidad IUA" },
  { path: "/rvoe", title: "RVOE y validez oficial | Universidad IUA", description: "Información para consultar RVOE por programa, modalidad y plantel en Universidad IUA.", h1: "RVOE y validez oficial de estudios en Universidad IUA" },
  { path: "/que-carrera-estudiar", title: "¿Qué carrera estudiar? Test vocacional | Universidad IUA", description: "Guía y test vocacional RIASEC gratuito, explicable y sin registro para explorar opciones de carrera.", h1: "¿Qué carrera estudiar?" },
  ...programs.map((program) => ({ path: `/oferta/${program.slug}`, title: `${program.title} | Universidad IUA`, description: program.description, h1: program.title }))
];

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

for (const route of routes) {
  const canonical = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: route.title, description: route.description, url: canonical, isPartOf: { "@id": `${siteUrl}/#website` } }).replace(/</g, "\\u003c");
  const initial = `<main id="prerendered-content"><h1>${escapeHtml(route.h1)}</h1><p>${escapeHtml(route.description)}</p><p><a href="/oferta">Consultar oferta educativa</a> · <a href="/campus">Conocer campus</a> · <a href="/contacto">Solicitar información</a></p></main>`;
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    .replace("</head>", `<script type="application/ld+json">${jsonLd}</script></head>`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${initial}</div>`);
  const destination = route.path === "/" ? "dist/index.html" : join("dist", route.path.slice(1), "index.html");
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, html, "utf8");
}

console.log(`Prerendered ${routes.length} GEO routes.`);
