export type LegacyRoute =
  | { from: string; status: 301; to: string }
  | { from: string; status: 410 };

/** Añadir solo rutas antiguas verificadas. No se inventan equivalencias. */
export const legacyRedirects: readonly LegacyRoute[] = [];
