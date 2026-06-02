import { readFileSync, writeFileSync } from "node:fs";

const siteUrl = "https://iua.edu.mx";

const staticRoutes = [
  { path: "/", priority: "1.0" },
  { path: "/nosotros", priority: "0.8" },
  { path: "/oferta", priority: "0.9" },
  { path: "/campus", priority: "0.8" },
  { path: "/comunidad", priority: "0.7" },
  { path: "/contacto", priority: "0.8" },
  { path: "/aviso-de-privacidad", priority: "0.4" }
];

const dataSource = readFileSync("src/data/ofertaEducativa.ts", "utf8");
const programSlugs = Array.from(dataSource.matchAll(/slug:\s*"([^"]+)"/g), (match) => match[1]);

const routes = [
  ...staticRoutes,
  ...programSlugs.map((slug) => ({ path: `/oferta/${slug}`, priority: "0.8" }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${siteUrl}${route.path === "/" ? "/" : route.path}</loc><priority>${route.priority}</priority></url>`).join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", sitemap, "utf8");
