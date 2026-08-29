import { describe, expect, it } from "vitest";
import { ofertaEducativa } from "./ofertaEducativa";
import { resolveRvoe, rvoeRecords, validateRvoeRecords } from "./rvoe";
import { institution } from "../config/institution";

describe("RVOE", () => {
  it("preserva los 22 registros oficiales proporcionados", () => {
    expect(rvoeRecords).toHaveLength(22);
    expect(new Set(rvoeRecords.map(({ number }) => number)).size).toBe(22);
  });

  it("no contiene mappings ambiguos ni referencias inexistentes", () => {
    expect(validateRvoeRecords()).toEqual([]);
    const programIds = new Set(ofertaEducativa.map(({ id }) => id));
    const campusIds = new Set(institution.campuses.map(({ id }) => id));
    expect(rvoeRecords.every(({ programId }) => programIds.has(programId))).toBe(true);
    expect(rvoeRecords.every(({ campusId }) => !campusId || campusIds.has(campusId))).toBe(true);
  });

  it("exige programa, modalidad, plantel e institución exactos", () => {
    expect(resolveRvoe({ programId: "derecho", modality: "Escolarizada", campusId: "campus-reyes" })?.number).toBe("20220839");
    expect(resolveRvoe({ programId: "derecho", modality: "Escolarizada" })).toBeUndefined();
    expect(resolveRvoe({ programId: "derecho", modality: "Escolarizada", institutionId: "instituto-universitario-anahuac" })?.number).toBe("20100134");
  });
});
