import type {
  WpBannerEntity,
  WpCampusEntity,
  WpCategoryEntity,
  WpMediaEntity,
  WpPostEntity,
  WpProgramEntity,
} from "@/lib/wordpress/types";

export const WORDPRESS_API_BASE =
  process.env.NEXT_PUBLIC_WORDPRESS_API_BASE ?? "https://iua.edu.mx/wp-json/wp/v2";

type QueryValue = string | number | boolean | undefined;

type WordpressFetchOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

function buildWordPressUrl(
  path: string,
  query?: Record<string, QueryValue>,
): string {
  const url = new URL(path, WORDPRESS_API_BASE.endsWith("/") ? WORDPRESS_API_BASE : `${WORDPRESS_API_BASE}/`);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

export async function wordpressFetch<T>(
  path: string,
  query?: Record<string, QueryValue>,
  options?: WordpressFetchOptions,
): Promise<T> {
  const url = buildWordPressUrl(path, query);

  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export async function getWordPressPosts() {
  return wordpressFetch<WpPostEntity[]>("posts", { per_page: 12 }, {
    next: { revalidate: 300, tags: ["wp-posts"] },
  });
}

export async function getWordPressCategories() {
  return wordpressFetch<WpCategoryEntity[]>("categories", { per_page: 100 }, {
    next: { revalidate: 300, tags: ["wp-categories"] },
  });
}

export async function getWordPressLevels() {
  return wordpressFetch<WpCategoryEntity[]>("iua_nivel", { per_page: 100 }, {
    next: { revalidate: 300, tags: ["wp-levels"] },
  });
}

export async function getWordPressModalities() {
  return wordpressFetch<WpCategoryEntity[]>("iua_modalidad", { per_page: 100 }, {
    next: { revalidate: 300, tags: ["wp-modalities"] },
  });
}

export async function getWordPressPrograms() {
  return wordpressFetch<WpProgramEntity[]>("iua_programa", { per_page: 100 }, {
    next: { revalidate: 300, tags: ["wp-programs"] },
  });
}

export async function getWordPressProgramBySlug(slug: string) {
  const items = await wordpressFetch<WpProgramEntity[]>(
    "iua_programa",
    { slug, per_page: 1 },
    { next: { revalidate: 300, tags: [`wp-program-${slug}`] } },
  );

  return items[0] ?? null;
}

export async function getWordPressCampuses() {
  return wordpressFetch<WpCampusEntity[]>("iua_campus", { per_page: 100 }, {
    next: { revalidate: 300, tags: ["wp-campuses"] },
  });
}

export async function getWordPressBanners() {
  return wordpressFetch<WpBannerEntity[]>("iua_banner", { per_page: 100 }, {
    next: { revalidate: 300, tags: ["wp-banners"] },
  });
}

export async function getWordPressMediaById(id: number) {
  return wordpressFetch<WpMediaEntity>(`media/${id}`, undefined, {
    next: { revalidate: 300, tags: [`wp-media-${id}`] },
  });
}
