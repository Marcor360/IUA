export type RvoeModality = "Escolarizada" | "No Escolarizada" | "Mixta";

export type RvoeRecord = {
  programId: string;
  programName: string;
  campusId?: "campus-reyes" | "campus-texcoco";
  campusName?: string;
  modality: RvoeModality;
  institutionId?: "instituto-universitario-anahuac";
  institutionName: string;
  number: string;
  issuedOn: string;
};

/** Fuente única: registros proporcionados por IUA desde `RVOE_Vigentes_Mejorado.xlsx`. */
export const rvoeRecords: readonly RvoeRecord[] = [
  { programId: "lenguas-extranjeras", programName: "Lenguas Extranjeras", campusId: "campus-reyes", campusName: "Plantel Los Reyes", modality: "No Escolarizada", institutionName: "Instituto Universitario Anáhuac Plantel los Reyes", number: "20250501", issuedOn: "2025-03-28" },
  { programId: "arquitectura", programName: "Arquitectura del Paisaje", campusId: "campus-texcoco", campusName: "Plantel Texcoco", modality: "Mixta", institutionName: "Instituto Universitario Anáhuac Plantel Texcoco", number: "20250493", issuedOn: "2025-03-28" },
  { programId: "artes-culinarias", programName: "Artes Culinarias", campusId: "campus-texcoco", campusName: "Plantel Texcoco", modality: "Mixta", institutionName: "Instituto Universitario Anáhuac Plantel Texcoco", number: "20250492", issuedOn: "2025-03-28" },
  { programId: "lenguas-extranjeras", programName: "Lenguas Extranjeras", campusId: "campus-texcoco", campusName: "Plantel Texcoco", modality: "No Escolarizada", institutionName: "Instituto Universitario Anáhuac Plantel Texcoco", number: "20250500", issuedOn: "2025-03-28" },
  { programId: "doctorado-derecho", programName: "Doctorado en Derecho", modality: "No Escolarizada", institutionName: "Universidad IUA", number: "20230625", issuedOn: "2023-02-24" },
  { programId: "diseno-grafico", programName: "Diseño Gráfico", modality: "No Escolarizada", institutionName: "Universidad IUA", number: "20230626", issuedOn: "2023-02-24" },
  { programId: "maestria-educacion", programName: "Maestría en Educación", modality: "Mixta", institutionName: "Universidad IUA", number: "20230623", issuedOn: "2023-02-24" },
  { programId: "ingenieria-en-sistemas-computacionales", programName: "Ingeniería en Sistemas Computacionales", modality: "No Escolarizada", institutionName: "Universidad IUA", number: "20230627", issuedOn: "2023-02-24" },
  { programId: "lenguas-extranjeras", programName: "Lenguas Extranjeras", modality: "No Escolarizada", institutionName: "Universidad IUA", number: "20230624", issuedOn: "2023-02-24" },
  { programId: "administracion-de-empresas", programName: "Administración de Empresas", modality: "Escolarizada", institutionName: "Universidad IUA", number: "20221279", issuedOn: "2022-10-07" },
  { programId: "contaduria-publica", programName: "Contaduría Pública", modality: "Escolarizada", institutionName: "Universidad IUA", number: "20221280", issuedOn: "2022-10-07" },
  { programId: "derecho", programName: "Derecho", campusId: "campus-reyes", campusName: "Plantel Los Reyes", modality: "Escolarizada", institutionName: "Instituto Universitario Anáhuac Plantel los Reyes", number: "20220839", issuedOn: "2022-07-19" },
  { programId: "derecho", programName: "Derecho", modality: "No Escolarizada", institutionName: "Universidad IUA", number: "20220259", issuedOn: "2022-03-07" },
  { programId: "maestria-derecho-penal", programName: "Maestría en Derecho Penal", modality: "No Escolarizada", institutionName: "Universidad IUA", number: "20220258", issuedOn: "2022-03-07" },
  { programId: "administracion-de-empresas", programName: "Administración de Empresas", campusId: "campus-reyes", campusName: "Plantel Los Reyes", modality: "Escolarizada", institutionName: "Instituto Universitario Anáhuac Plantel los Reyes", number: "20171938", issuedOn: "2017-12-19" },
  { programId: "contaduria-publica", programName: "Contaduría Pública", campusId: "campus-reyes", campusName: "Plantel Los Reyes", modality: "Escolarizada", institutionName: "Instituto Universitario Anáhuac Plantel los Reyes", number: "20171939", issuedOn: "2017-12-19" },
  { programId: "maestria-derecho-penal", programName: "Maestría en Derecho Penal", campusId: "campus-reyes", campusName: "Plantel Los Reyes", modality: "Escolarizada", institutionName: "Instituto Universitario Anáhuac Plantel los Reyes", number: "20171889", issuedOn: "2017-12-18" },
  { programId: "pedagogia", programName: "Pedagogía", campusId: "campus-reyes", campusName: "Plantel Los Reyes", modality: "Escolarizada", institutionName: "Instituto Universitario Anáhuac Plantel los Reyes", number: "20171888", issuedOn: "2017-12-18" },
  { programId: "pedagogia", programName: "Pedagogía", modality: "Escolarizada", institutionName: "Universidad IUA", number: "20170767", issuedOn: "2017-07-14" },
  { programId: "psicologia", programName: "Psicología", modality: "Mixta", institutionName: "Universidad IUA", number: "20170768", issuedOn: "2017-07-14" },
  { programId: "maestria-derecho-penal", programName: "Maestría en Derecho Penal", modality: "Escolarizada", institutionId: "instituto-universitario-anahuac", institutionName: "Instituto Universitario Anáhuac", number: "20123329", issuedOn: "2012-12-14" },
  { programId: "derecho", programName: "Derecho", modality: "Escolarizada", institutionId: "instituto-universitario-anahuac", institutionName: "Instituto Universitario Anáhuac", number: "20100134", issuedOn: "2010-02-08" }
] as const;

export type RvoeQuery = Pick<RvoeRecord, "programId" | "modality"> & {
  campusId?: string;
  institutionId?: string;
};

export function isValidRvoeNumber(number: string) {
  return /^\d{8}$/.test(number);
}

export function formatRvoeDate(issuedOn: string) {
  const [year, month, day] = issuedOn.split("-");
  return `${day}/${month}/${year}`;
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
    if (!/^\d{4}-\d{2}-\d{2}$/.test(record.issuedOn)) errors.push(`Fecha de RVOE inválida: ${record.number}`);
    const identity = [record.programId, record.campusId ?? "", record.modality, record.institutionId ?? ""].join("|");
    if (identities.has(identity)) errors.push(`Mapping ambiguo: ${identity}`);
    identities.add(identity);
  }
  return errors;
}
