import { describe, expect, it } from "vitest";
import routes from "../config/indexableRoutes.json";
import { institution, campusSlugFromLabel } from "../config/institution";
import { ofertaEducativa } from "./ofertaEducativa";
import { relatedProgramIds } from "./relatedPrograms";

describe("academic catalog integrity", () => {
  it("has unique required identifiers and indexable routes", () => {
    expect(new Set(ofertaEducativa.map(({ id }) => id)).size).toBe(ofertaEducativa.length);
    expect(new Set(ofertaEducativa.map(({ slug }) => slug)).size).toBe(ofertaEducativa.length);
    expect(ofertaEducativa.every(({ id, slug, title }) => Boolean(id && slug && title))).toBe(true);
    const paths = new Set(routes.map(({ path }) => path));
    expect(ofertaEducativa.every(({ slug }) => paths.has(`/oferta/${slug}`))).toBe(true);
    expect(institution.campuses.every(({ slug }) => paths.has(`/campus/${slug}`))).toBe(true);
  });

  it("references existing campuses, related programs and images", () => {
    const programIds = new Set(ofertaEducativa.map(({ id }) => id));
    const campusSlugs = new Set(institution.campuses.map(({ slug }) => slug));
    expect(ofertaEducativa.every(({ campus }) => campus.every((label) => { const slug = campusSlugFromLabel(label); return !slug || campusSlugs.has(slug); }))).toBe(true);
    expect(Object.entries(relatedProgramIds).every(([id, related]) => programIds.has(id) && related.every((item) => programIds.has(item)))).toBe(true);
    expect(ofertaEducativa.every(({ banner, recuadro }) => (!banner || banner.startsWith("/")) && (!recuadro || recuadro.startsWith("/")))).toBe(true);
  });
});
