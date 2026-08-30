import { describe, expect, it } from "vitest";
import { ofertaEducativa } from "./ofertaEducativa";
import { isValidRvoeNumber, resolveRvoe, resolveRvoeFrom, rvoeRecords, validateRvoeRecords } from "./rvoe";
import type { RvoeRecord } from "./rvoe";
import { institution } from "../config/institution";
import { programOfferings, resolveOfferingRvoe, resolveOfferingRvoeFrom, rvoeOfferingsForProgram, validateProgramOfferings, type ProgramOffering } from "./programOfferings";

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

  it("publica los registros confirmados para cada ficha", () => {
    expect(rvoeOfferingsForProgram("psicologia").map(({ rvoe }) => rvoe.number)).toEqual(["20170768"]);
    expect(rvoeOfferingsForProgram("derecho").map(({ rvoe }) => rvoe.number)).toEqual(["20220259", "20100134", "20220839"]);
    expect(rvoeOfferingsForProgram("arquitectura").map(({ rvoe }) => rvoe.number)).toEqual(["20250493"]);
  });

  it("resuelve ofertas con el contexto oficial exacto confirmado", () => {
    expect(resolveOfferingRvoe({ programId: "derecho", campusId: "campus-reyes", officialModality: "Escolarizada" })?.number).toBe("20220839");
    expect(rvoeOfferingsForProgram("derecho")).toHaveLength(3);
    expect(rvoeOfferingsForProgram("arquitectura")).toHaveLength(1);
    expect(validateProgramOfferings()).toEqual([]);
    expect(programOfferings.every(({ rvoeNumber }) => isValidRvoeNumber(rvoeNumber))).toBe(true);
  });

  it("no equipara modalidades comerciales y oficiales", () => {
    expect(resolveOfferingRvoe({ programId: "derecho", campusId: "campus-reyes", commercialModality: "En línea", officialModality: "No Escolarizada" })).toBeUndefined();
    expect(resolveOfferingRvoe({ programId: "pedagogia", campusId: "campus-chalco", commercialModality: "Escolarizada", officialModality: "Escolarizada" })).toBeUndefined();
  });

  it("rechaza ofertas ambiguas, RVOE inválidos y contextos de campus distintos", () => {
    const base: ProgramOffering = { id: "a", programId: "derecho", campusId: "campus-reyes", commercialModality: "Escolarizada", officialModality: "Escolarizada", rvoeNumber: "20220839" };
    const query = { programId: "derecho", campusId: "campus-reyes", commercialModality: "Escolarizada" as const, officialModality: "Escolarizada" as const };
    expect(resolveOfferingRvoeFrom([base, { ...base, id: "b" }], query)).toBeUndefined();
    expect(resolveOfferingRvoeFrom([{ ...base, rvoeNumber: "invalido" }], query)).toBeUndefined();
    expect(resolveOfferingRvoeFrom([base], { ...query, campusId: "campus-texcoco" })).toBeUndefined();
  });

  it("distingue los registros sin plantel de los registros por campus", () => {
    expect(rvoeOfferingsForProgram("lenguas-extranjeras")).toHaveLength(3);
    expect(resolveOfferingRvoe({ programId: "lenguas-extranjeras", officialModality: "No Escolarizada" })?.number).toBe("20230624");
    expect(resolveOfferingRvoe({ programId: "lenguas-extranjeras", campusId: "campus-texcoco", officialModality: "No Escolarizada" })?.number).toBe("20250500");
  });

  it("oculta coincidencias inexistentes", () => {
    expect(rvoeOfferingsForProgram("programa-inexistente")).toEqual([]);
  });

  it("rechaza numeros invalidos y coincidencias ambiguas", () => {
    const base: RvoeRecord = { programId: "prueba", programName: "Prueba", modality: "Mixta", number: "12345678" };
    expect(isValidRvoeNumber("12345678")).toBe(true);
    expect(isValidRvoeNumber("1234-5678")).toBe(false);
    expect(resolveRvoeFrom([{ ...base, number: "invalido" }], { programId: "prueba", modality: "Mixta" })).toBeUndefined();
    expect(resolveRvoeFrom([base, { ...base, number: "87654321" }], { programId: "prueba", modality: "Mixta" })).toBeUndefined();
  });
});
