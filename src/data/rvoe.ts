export type RvoeModality = "Escolarizada" | "No Escolarizada" | "Mixta";

export type RvoeRecord = {
  programId: string;
  programName: string;
  campusId?: "campus-reyes" | "campus-texcoco";
  campusName?: string;
  modality: RvoeModality;
  institutionId?: "instituto-universitario-anahuac";
  institutionName?: string;
  number: string;
};

/** Fuente única: registros proporcionados por IUA desde `RVOE Vigentes.xlsx`. */
export const rvoeRecords: readonly RvoeRecord[] = [
  { programId: "doctorado-derecho", programName: "Doctorado en Derecho", modality: "No Escolarizada", number: "20230625" },
  { programId: "derecho", programName: "Derecho", modality: "No Escolarizada", number: "20220259" },
  { programId: "maestria-derecho-penal", programName: "Maestría en Derecho Penal", modality: "No Escolarizada", number: "20220258" },
  { programId: "diseno-grafico", programName: "Diseño Gráfico", modality: "No Escolarizada", number: "20230626" },
  { programId: "maestria-educacion", programName: "Maestría en Educación", modality: "Mixta", number: "20230623" },
  { programId: "ingenieria-en-sistemas-computacionales", programName: "Ingeniería en Sistemas Computacionales", modality: "No Escolarizada", number: "20230627" },
  { programId: "lenguas-extranjeras", programName: "Lenguas Extranjeras", modality: "No Escolarizada", number: "20230624" },
  { programId: "derecho", programName: "Derecho", modality: "Escolarizada", institutionId: "instituto-universitario-anahuac", institutionName: "Instituto Universitario Anáhuac", number: "20100134" },
  { programId: "administracion-de-empresas", programName: "Administración de Empresas", modality: "Escolarizada", number: "20221279" },
  { programId: "contaduria-publica", programName: "Contaduría Pública", modality: "Escolarizada", number: "20221280" },
  { programId: "maestria-derecho-penal", programName: "Maestría en Derecho Penal", modality: "Escolarizada", institutionId: "instituto-universitario-anahuac", institutionName: "Instituto Universitario Anáhuac", number: "20123329" },
  { programId: "pedagogia", programName: "Pedagogía", modality: "Escolarizada", number: "20170767" },
  { programId: "psicologia", programName: "Psicología", modality: "Mixta", number: "20170768" },
  { programId: "derecho", programName: "Derecho", campusId: "campus-reyes", campusName: "Plantel Los Reyes", modality: "Escolarizada", number: "20220839" },
  { programId: "administracion-de-empresas", programName: "Administración de Empresas", campusId: "campus-reyes", campusName: "Plantel Los Reyes", modality: "Escolarizada", number: "20171938" },
  { programId: "contaduria-publica", programName: "Contaduría Pública", campusId: "campus-reyes", campusName: "Plantel Los Reyes", modality: "Escolarizada", number: "20171939" },
  { programId: "maestria-derecho-penal", programName: "Maestría en Derecho Penal", campusId: "campus-reyes", campusName: "Plantel Los Reyes", modality: "Escolarizada", number: "20171889" },
  { programId: "pedagogia", programName: "Pedagogía", campusId: "campus-reyes", campusName: "Plantel Los Reyes", modality: "Escolarizada", number: "20171888" },
  { programId: "lenguas-extranjeras", programName: "Lenguas Extranjeras", campusId: "campus-reyes", campusName: "Plantel Los Reyes", modality: "No Escolarizada", number: "20250501" },
  { programId: "arquitectura", programName: "Arquitectura del Paisaje", campusId: "campus-texcoco", campusName: "Plantel Texcoco", modality: "Mixta", number: "20250493" },
  { programId: "artes-culinarias", programName: "Artes Culinarias", campusId: "campus-texcoco", campusName: "Plantel Texcoco", modality: "Mixta", number: "20250492" },
  { programId: "lenguas-extranjeras", programName: "Lenguas Extranjeras", campusId: "campus-texcoco", campusName: "Plantel Texcoco", modality: "No Escolarizada", number: "20250500" }
] as const;

export type RvoeQuery = Pick<RvoeRecord, "programId" | "modality"> & {
  campusId?: string;
  institutionId?: string;
};

export function isValidRvoeNumber(number: string) {
  return /^\d{8}$/.test(number);
}

export function resolveRvoeFrom(records: readonly RvoeRecord[], query: RvoeQuery): RvoeRecord | undefined {
  const matches = records.filter((record) =>
    record.programId === query.programId &&
    record.modality === query.modality &&
    record.campusId === query.campusId &&
    record.institutionId === query.institutionId &&
    isValidRvoeNumber(record.number)
  );
  return matches.length === 1 ? matches[0] : undefined;
}

export function resolveRvoe(query: RvoeQuery): RvoeRecord | undefined {
  return resolveRvoeFrom(rvoeRecords, query);
}

export function validateRvoeRecords() {
  const errors: string[] = [];
  const identities = new Set<string>();
  for (const record of rvoeRecords) {
    if (!/^\d{8}$/.test(record.number)) errors.push(`RVOE inválido: ${record.number}`);
    const identity = [record.programId, record.campusId ?? "", record.modality, record.institutionId ?? ""].join("|");
    if (identities.has(identity)) errors.push(`Mapping ambiguo: ${identity}`);
    identities.add(identity);
  }
  return errors;
}
