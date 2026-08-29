import { readFileSync } from "node:fs";
import { createServer } from "vite";

const failures = [];
const routes = JSON.parse(readFileSync("src/config/indexableRoutes.json", "utf8"));
const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });

try {
  const [{ ofertaEducativa }, { institution }, { relatedProgramIds }, rvoe] = await Promise.all([
    vite.ssrLoadModule("/src/data/ofertaEducativa.ts"),
    vite.ssrLoadModule("/src/config/institution.ts"),
    vite.ssrLoadModule("/src/data/relatedPrograms.ts"),
    vite.ssrLoadModule("/src/data/rvoe.ts")
  ]);
  const programIds = new Set();
  const slugs = new Set();
  for (const program of ofertaEducativa) {
    if (programIds.has(program.id)) failures.push(`Programa duplicado: ${program.id}`);
    if (slugs.has(program.slug)) failures.push(`Slug duplicado: ${program.slug}`);
    programIds.add(program.id); slugs.add(program.slug);
  }
  const routePaths = new Set();
  for (const route of routes) {
    if (routePaths.has(route.path)) failures.push(`Ruta duplicada: ${route.path}`);
    routePaths.add(route.path);
  }
  const campusIds = new Set(institution.campuses.map(({ id }) => id));
  for (const [programId, relatedIds] of Object.entries(relatedProgramIds)) {
    if (!programIds.has(programId)) failures.push(`Programa related inexistente: ${programId}`);
    for (const relatedId of relatedIds) if (!programIds.has(relatedId)) failures.push(`relatedProgram inexistente: ${programId} -> ${relatedId}`);
  }
  for (const record of rvoe.rvoeRecords) {
    if (!programIds.has(record.programId)) failures.push(`RVOE referencia programa inexistente: ${record.programId}`);
    if (record.campusId && !campusIds.has(record.campusId)) failures.push(`RVOE referencia campus inexistente: ${record.campusId}`);
  }
  failures.push(...rvoe.validateRvoeRecords());
} finally {
  await vite.close();
}

if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log("Structured data valid: unique programs, slugs and routes; related programs, campus and RVOE references resolve.");
