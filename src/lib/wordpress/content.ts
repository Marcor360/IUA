import {
  blogPosts as fallbackBlogPosts,
  campuses as fallbackCampuses,
  levelBlocks as fallbackLevelBlocks,
  programs as fallbackPrograms,
  type Campus,
  type EducationLevel,
  type LevelBlock,
  type Program,
} from "@/lib/site-data";
import {
  getWordPressCampuses,
  getWordPressCategories,
  getWordPressLevels,
  getWordPressMediaById,
  getWordPressModalities,
  getWordPressPosts,
  getWordPressPrograms,
} from "@/lib/wordpress/client";
import type {
  WpCampusEntity,
  WpCategoryEntity,
  WpMediaEntity,
  WpPostEntity,
  WpProgramEntity,
} from "@/lib/wordpress/types";

export type BlogCard = {
  slug: string;
  title: string;
  category: string;
  date: string;
  href: string;
};

const validLevels: EducationLevel[] = [
  "secundaria",
  "bachillerato",
  "licenciatura",
  "maestria",
  "doctorado",
];

const featuredProgramSlugs = [
  "licenciatura-en-administracion-de-empresas",
  "licenciatura-en-derecho",
  "licenciatura-en-psicologia",
  "ingenieria-en-sistemas-computacionales",
  "maestria-en-educacion",
  "doctorado-en-derecho",
];

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function pickFirstText(
  ...values: Array<string | null | undefined>
): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function resolveCategoryName(
  post: WpPostEntity,
  categories: WpCategoryEntity[],
): string {
  const firstCategoryId = post.categories[0];
  const category = categories.find((item) => item.id === firstCategoryId);

  return category?.name ?? "Comunidad";
}

function mapWpPostToCard(
  post: WpPostEntity,
  categories: WpCategoryEntity[],
): BlogCard {
  return {
    slug: post.slug,
    title: stripTags(post.title.rendered),
    category: resolveCategoryName(post, categories),
    date: formatBlogDate(post.date),
    href: post.link,
  };
}

function mapWpCampusToCampus(entity: WpCampusEntity): Campus {
  const title = stripTags(entity.title.rendered);
  const shortName = entity.meta.short_name ?? title;

  let id: Campus["id"] = "Chalco";

  if (/reyes/i.test(shortName)) {
    id = "Reyes";
  } else if (/texcoco/i.test(shortName)) {
    id = "Texcoco";
  }

  return {
    id,
    title,
    address: entity.meta.address ?? "",
    reference: entity.meta.reference ?? "",
    phones: entity.meta.phones ?? [],
    email: entity.meta.email ?? "",
    hours: entity.meta.hours ?? "",
    mapQuery: entity.meta.map_query ?? entity.meta.address ?? title,
  };
}

function getLevelFromTermIds(
  program: WpProgramEntity,
  levels: WpCategoryEntity[],
): EducationLevel | null {
  const levelId = program.iua_nivel?.[0];
  const levelSlug = levels.find((item) => item.id === levelId)?.slug;

  if (levelSlug && validLevels.includes(levelSlug as EducationLevel)) {
    return levelSlug as EducationLevel;
  }

  return null;
}

function getModalityFromTermIds(
  program: WpProgramEntity,
  modalities: WpCategoryEntity[],
): string {
  const modalityId = program.iua_modalidad?.[0];
  const modalityName = modalities.find((item) => item.id === modalityId)?.name;

  return modalityName ?? "Escolarizada";
}

function getCampusNamesFromIds(
  program: WpProgramEntity,
  campuses: WpCampusEntity[],
): string[] {
  const campusIds = program.meta.campus_ids ?? [];

  return campusIds
    .map((id) => campuses.find((campus) => campus.id === id))
    .filter((campus): campus is WpCampusEntity => Boolean(campus))
    .map((campus) => stripTags(campus.title.rendered));
}

function getFallbackProgramBySlug(slug: string): Program | undefined {
  return fallbackPrograms.find((program) => program.slug === slug);
}

function getFallbackProgramsByLevel(level: EducationLevel): Program[] {
  return fallbackPrograms.filter((program) => program.level === level);
}

function getFallbackLevelBlock(level: EducationLevel): LevelBlock | undefined {
  const targetHref =
    level === "secundaria"
      ? "/secundaria-3"
      : level === "bachillerato"
        ? "/bachillerato-3"
        : level === "licenciatura"
          ? "/licenciaturas"
          : "/posgrados";

  return fallbackLevelBlocks.find((block) => block.href === targetHref);
}

function getHeroImageUrl(
  program: WpProgramEntity,
  mediaById: Map<number, WpMediaEntity>,
  fallbackProgram?: Program,
): string {
  const media = mediaById.get(program.featured_media);

  return media?.source_url ?? fallbackProgram?.heroImage ?? "";
}

function mapWpProgramToProgram(
  entity: WpProgramEntity,
  levels: WpCategoryEntity[],
  modalities: WpCategoryEntity[],
  campuses: WpCampusEntity[],
  mediaById: Map<number, WpMediaEntity>,
): Program | null {
  const level = getLevelFromTermIds(entity, levels);

  if (!level) {
    return null;
  }

  const fallbackProgram = getFallbackProgramBySlug(entity.slug);
  const fallbackLevelBlock = getFallbackLevelBlock(level);
  const title = stripTags(entity.title.rendered);
  const campusNames = getCampusNamesFromIds(entity, campuses);

  return {
    slug: entity.slug,
    level,
    title,
    shortTitle: entity.meta.short_title ?? fallbackProgram?.shortTitle ?? title,
    summary: pickFirstText(
      entity.meta.summary,
      stripTags(entity.excerpt.rendered),
      fallbackProgram?.summary,
    ),
    pitch: pickFirstText(
      entity.meta.pitch,
      stripTags(entity.content.rendered),
      fallbackProgram?.pitch,
    ),
    modality: getModalityFromTermIds(entity, modalities),
    duration: pickFirstText(entity.meta.duration, fallbackProgram?.duration),
    schedule: pickFirstText(entity.meta.schedule, fallbackProgram?.schedule),
    campus: campusNames.length > 0 ? campusNames : (fallbackProgram?.campus ?? []),
    focusAreas: entity.meta.focus_areas ?? fallbackProgram?.focusAreas ?? [],
    accent: pickFirstText(
      entity.meta.accent_color,
      fallbackProgram?.accent,
      fallbackLevelBlock?.items[0]?.accent,
      "#9d351f",
    ),
    soft: pickFirstText(
      entity.meta.accent_soft_color,
      fallbackProgram?.soft,
      "#f6ebe8",
    ),
    heroImage: getHeroImageUrl(entity, mediaById, fallbackProgram),
  };
}

function sortCampuses(items: Campus[]): Campus[] {
  const order: Campus["id"][] = ["Chalco", "Reyes", "Texcoco"];

  return [...items].sort(
    (left, right) => order.indexOf(left.id) - order.indexOf(right.id),
  );
}

export async function getBlogCards(limit?: number): Promise<BlogCard[]> {
  try {
    const [posts, categories] = await Promise.all([
      getWordPressPosts(),
      getWordPressCategories(),
    ]);

    const mapped = posts.map((post) => mapWpPostToCard(post, categories));
    return typeof limit === "number" ? mapped.slice(0, limit) : mapped;
  } catch {
    return typeof limit === "number"
      ? fallbackBlogPosts.slice(0, limit)
      : fallbackBlogPosts;
  }
}

export async function getCampusesContent(): Promise<Campus[]> {
  try {
    const campuses = await getWordPressCampuses();

    if (!campuses.length) {
      return fallbackCampuses;
    }

    return sortCampuses(campuses.map(mapWpCampusToCampus));
  } catch {
    return sortCampuses(fallbackCampuses);
  }
}

export async function getProgramsContent(): Promise<Program[]> {
  try {
    const [programs, levels, modalities, campuses] = await Promise.all([
      getWordPressPrograms(),
      getWordPressLevels(),
      getWordPressModalities(),
      getWordPressCampuses(),
    ]);

    if (!programs.length) {
      return fallbackPrograms;
    }

    const mediaIds = [
      ...new Set(
        programs
          .map((program) => program.featured_media)
          .filter((mediaId) => typeof mediaId === "number" && mediaId > 0),
      ),
    ];

    const mediaEntries = await Promise.all(
      mediaIds.map(async (id) => {
        try {
          return [id, await getWordPressMediaById(id)] as const;
        } catch {
          return [id, null] as const;
        }
      }),
    );

    const mediaById = new Map<number, WpMediaEntity>();

    mediaEntries.forEach(([id, media]) => {
      if (media) {
        mediaById.set(id, media);
      }
    });

    const mapped = programs
      .map((program) =>
        mapWpProgramToProgram(program, levels, modalities, campuses, mediaById),
      )
      .filter((program): program is Program => Boolean(program));

    return mapped.length ? mapped : fallbackPrograms;
  } catch {
    return fallbackPrograms;
  }
}

export async function getProgramBySlugContent(slug: string): Promise<Program | null> {
  const programs = await getProgramsContent();
  return (
    programs.find((program) => program.slug === slug) ??
    getFallbackProgramBySlug(slug) ??
    null
  );
}

export async function getProgramSlugsContent(): Promise<string[]> {
  const programs = await getProgramsContent();
  return [...new Set([...programs, ...fallbackPrograms].map((program) => program.slug))];
}

export async function getProgramsByLevelContent(
  level: EducationLevel,
): Promise<Program[]> {
  const programs = await getProgramsContent();
  const filteredPrograms = programs.filter((program) => program.level === level);

  return filteredPrograms.length
    ? filteredPrograms
    : getFallbackProgramsByLevel(level);
}

export async function getFeaturedProgramsContent(limit = 6): Promise<Program[]> {
  const programs = await getProgramsContent();
  const featuredPrograms = programs.filter((program) =>
    featuredProgramSlugs.includes(program.slug),
  );
  const fallbackFeaturedPrograms = fallbackPrograms
    .filter((program) => featuredProgramSlugs.includes(program.slug))
    .filter(
      (program) => !featuredPrograms.some((featured) => featured.slug === program.slug),
    );

  return [...featuredPrograms, ...fallbackFeaturedPrograms].slice(0, limit);
}

export async function getLevelBlocksContent(): Promise<LevelBlock[]> {
  const programs = await getProgramsContent();

  return fallbackLevelBlocks.map((block) => {
    const level =
      block.href === "/secundaria-3"
        ? "secundaria"
        : block.href === "/bachillerato-3"
          ? "bachillerato"
          : block.href === "/licenciaturas"
            ? "licenciatura"
            : undefined;

    if (level) {
      const levelPrograms = programs.filter((program) => program.level === level);

      return {
        ...block,
        items: levelPrograms.length ? levelPrograms : block.items,
      };
    }

    const posgradoPrograms = programs.filter(
      (program) => program.level === "maestria" || program.level === "doctorado",
    );

    return {
      ...block,
      items: posgradoPrograms.length ? posgradoPrograms : block.items,
    };
  });
}
