export const relatedProgramIds: Readonly<Record<string, readonly string[]>> = {
  secundaria: ["bachillerato"], bachillerato: ["derecho", "psicologia", "administracion-de-empresas"],
  derecho: ["maestria-derecho-penal", "doctorado-derecho"], psicologia: ["pedagogia", "maestria-educacion"],
  pedagogia: ["psicologia", "maestria-educacion"], arquitectura: ["diseno-grafico"],
  "artes-culinarias": ["administracion-de-empresas"], "contaduria-publica": ["administracion-de-empresas"],
  "administracion-de-empresas": ["contaduria-publica", "derecho"], "diseno-grafico": ["arquitectura", "lenguas-extranjeras"],
  "lenguas-extranjeras": ["diseno-grafico", "pedagogia"], "ingenieria-en-sistemas-computacionales": ["diseno-grafico", "administracion-de-empresas"],
  "maestria-derecho-penal": ["derecho", "doctorado-derecho"], "maestria-educacion": ["pedagogia", "psicologia"],
  "doctorado-derecho": ["derecho", "maestria-derecho-penal"]
};
