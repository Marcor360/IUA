import { describe, expect, it } from "vitest";
import { ofertaEducativa } from "./ofertaEducativa";
import { isValidRvoeNumber, resolveProgramPageRvoe, resolveRvoe, resolveRvoeFrom, rvoeRecords, validateRvoeRecords } from "./rvoe";
import type { RvoeRecord } from "./rvoe";
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

  it("resuelve un programa unico para la pagina publica", () => {
    expect(resolveProgramPageRvoe("psicologia")?.number).toBe("20170768");
  });

  it("no elige automaticamente entre campus o modalidades", () => {
    expect(resolveProgramPageRvoe("lenguas-extranjeras")).toBeUndefined();
    expect(resolveProgramPageRvoe("derecho")).toBeUndefined();
    expect(resolveProgramPageRvoe("arquitectura")).toBeUndefined();
  });

  it("oculta coincidencias inexistentes", () => {
    expect(resolveProgramPageRvoe("programa-inexistente")).toBeUndefined();
  });

  it("rechaza numeros invalidos y coincidencias ambiguas", () => {
    const base: RvoeRecord = { programId: "prueba", programName: "Prueba", modality: "Mixta", number: "12345678" };
    expect(isValidRvoeNumber("12345678")).toBe(true);
    expect(isValidRvoeNumber("1234-5678")).toBe(false);
    expect(resolveRvoeFrom([{ ...base, number: "invalido" }], { programId: "prueba", modality: "Mixta" })).toBeUndefined();
    expect(resolveRvoeFrom([base, { ...base, number: "87654321" }], { programId: "prueba", modality: "Mixta" })).toBeUndefined();
  });
});
