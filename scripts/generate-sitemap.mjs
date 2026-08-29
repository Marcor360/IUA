import { readFileSync, writeFileSync } from "node:fs";

const siteUrl = "https://iua.edu.mx";
const routes = JSON.parse(readFileSync("src/config/indexableRoutes.json", "utf8"));
const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(({ path, updatedAt }) => `  <url><loc>${escapeXml(`${siteUrl}${path === "/" ? "/" : path}`)}</loc>${updatedAt ? `<lastmod>${updatedAt}</lastmod>` : ""}</url>`).join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", sitemap, "utf8");
console.log(`Generated sitemap with ${routes.length} structured routes.`);
