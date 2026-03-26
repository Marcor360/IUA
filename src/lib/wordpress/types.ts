export type WpRenderedField = {
  rendered: string;
};

export type WpAcademicLevel =
  | "secundaria"
  | "bachillerato"
  | "licenciatura"
  | "maestria"
  | "doctorado";

export type WpProgramMeta = {
  short_title?: string;
  summary?: string;
  pitch?: string;
  duration?: string;
  schedule?: string;
  focus_areas?: string[];
  accent_color?: string;
  accent_soft_color?: string;
  clientify_form_url?: string;
  schedule_visit_url?: string;
  brochure_url?: string;
  hero_label?: string;
  is_featured_home?: boolean;
  is_featured_level?: boolean;
  campus_ids?: number[];
};

export type WpCampusMeta = {
  short_name?: string;
  address?: string;
  reference?: string;
  phones?: string[];
  email?: string;
  hours?: string;
  map_query?: string;
  google_maps_embed_url?: string;
  schedule_visit_url?: string;
};

export type WpBannerMeta = {
  label?: string;
  headline?: string;
  description?: string;
  target_url?: string;
  sort_order?: number;
  is_active?: boolean;
};

export type WpBaseEntity<TMeta = Record<string, unknown>> = {
  id: number;
  slug: string;
  title: WpRenderedField;
  content: WpRenderedField;
  excerpt: WpRenderedField;
  featured_media: number;
  meta: TMeta;
};

export type WpProgramEntity = WpBaseEntity<WpProgramMeta> & {
  iua_nivel?: number[];
  iua_area?: number[];
  iua_modalidad?: number[];
};

export type WpCampusEntity = WpBaseEntity<WpCampusMeta>;

export type WpBannerEntity = WpBaseEntity<WpBannerMeta>;

export type WpPostEntity = {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: WpRenderedField;
  excerpt: WpRenderedField;
  content: WpRenderedField;
  categories: number[];
  featured_media: number;
};

export type WpCategoryEntity = {
  id: number;
  name: string;
  slug: string;
};

export type WpMediaEntity = {
  id: number;
  source_url: string;
  alt_text: string;
};
