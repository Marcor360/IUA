import { institution } from "../config/institution";
import { ofertaEducativa } from "./ofertaEducativa";
import { isValidRvoeNumber, resolveRvoe, rvoeRecords, type RvoeModality, type RvoeRecord } from "./rvoe";

export type CommercialModality = "Escolarizada" | "Ejecutiva" | "En línea";

export type ProgramOffering = {
  id: string;
  programId: string;
  campusId?: string;
  commercialModality?: CommercialModality;
  officialModality: RvoeModality;
  institutionId?: string;
  rvoeNumber: string;
};

/**
 * Asociaciones programa/RVOE confirmadas por la lista proporcionada por IUA.
 * La modalidad comercial queda vacía cuando la fuente sólo confirma la oficial.
 */
export const programOfferings: readonly ProgramOffering[] = rvoeRecords.map((record) => ({
  id: `rvoe-${record.number}`,
  programId: record.programId,
  campusId: record.campusId,
  officialModality: record.modality,
  institutionId: record.institutionId,
  rvoeNumber: record.number
}));

export type OfferingRvoeQuery = Omit<ProgramOffering, "id" | "rvoeNumber">;

export function resolveOfferingRvoeFrom(
  offerings: readonly ProgramOffering[],
  query: OfferingRvoeQuery
): RvoeRecord | undefined {
  const matches = offerings.filter((offering) =>
    offering.programId === query.programId &&
    offering.campusId === query.campusId &&
    offering.commercialModality === query.commercialModality &&
    offering.officialModality === query.officialModality &&
    offering.institutionId === query.institutionId
  );

  if (matches.length !== 1) return undefined;
  const offering = matches[0];
  const record = resolveRvoe({
    programId: offering.programId,
    campusId: offering.campusId,
    modality: offering.officialModality,
    institutionId: offering.institutionId
  });
  return record?.number === offering.rvoeNumber ? record : undefined;
}

export function resolveOfferingRvoe(query: OfferingRvoeQuery) {
  return resolveOfferingRvoeFrom(programOfferings, query);
}

export function rvoeOfferingsForProgram(programId: string) {
  return programOfferings.flatMap((offering) => {
    if (offering.programId !== programId) return [];
    const rvoe = resolveOfferingRvoe(offering);
    return rvoe ? [{ offering, rvoe }] : [];
  });
}

export function validateProgramOfferings() {
  const errors: string[] = [];
  const programIds = new Set(ofertaEducativa.map(({ id }) => id));
  const campusIds = new Set(institution.campuses.map(({ id }) => id));
  const ids = new Set<string>();
  const mappings = new Set<string>();

  for (const offering of programOfferings) {
    if (ids.has(offering.id)) errors.push(`Offering duplicado: ${offering.id}`);
    ids.add(offering.id);
    if (!programIds.has(offering.programId)) errors.push(`Offering con programa inexistente: ${offering.id}`);
    if (offering.campusId && !campusIds.has(offering.campusId)) errors.push(`Offering con campus inexistente: ${offering.id}`);
    if (!isValidRvoeNumber(offering.rvoeNumber)) errors.push(`Offering con RVOE inválido: ${offering.id}`);
    if (!offering.officialModality) errors.push(`Modalidad oficial no declarada: ${offering.id}`);

    const identity = [offering.programId, offering.campusId ?? "", offering.commercialModality, offering.officialModality, offering.institutionId ?? ""].join("|");
    if (mappings.has(identity)) errors.push(`Mapping de offering ambiguo: ${identity}`);
    mappings.add(identity);

    const record = resolveRvoe({
      programId: offering.programId,
      campusId: offering.campusId,
      modality: offering.officialModality,
      institutionId: offering.institutionId
    });
    if (!record || record.number !== offering.rvoeNumber) errors.push(`Offering referencia RVOE inexistente o no coincidente: ${offering.id}`);
  }
  return errors;
}
