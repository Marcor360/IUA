export type Source = { title: string; url: string; accessedAt?: string };

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: "elegir-carrera" | "comparaciones" | "campo-laboral" | "decision-universitaria" | "local";
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  reviewer?: string;
  sources?: Source[];
  relatedPrograms?: string[];
  relatedArticles?: string[];
};

// Arquitectura editorial preparada. No se publican artículos hasta contar con
// autoría, revisión, fuentes y fechas editoriales verificables.
export const articles: Article[] = [];
