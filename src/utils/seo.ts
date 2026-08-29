import { useEffect } from "react";

export const SITE_URL = "https://iua.edu.mx";
export const SITE_NAME = "Universidad IUA";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/banners/alumnos-1-banner-recorte-1920x700.webp`;

export type RobotsConfig = {
  index?: boolean;
  follow?: boolean;
};

export type SeoConfig = {
  title: string;
  description: string;
  path?: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  robots?: RobotsConfig;
};

export type SeoMetadata = {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  openGraph: Record<string, string>;
  twitter: Record<string, string>;
};

function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function setMeta(selector: string, attribute: "content" | "href", value: string) {
  const element = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

function ensureMetaByProperty(property: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function ensureMetaByName(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function ensureCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
}

export function robotsContent(robots?: RobotsConfig) {
  return [robots?.index === false ? "noindex" : "index", robots?.follow === false ? "nofollow" : "follow"].join(", ");
}

export function buildSeoMetadata({ title, description, path = "/", canonical, image = DEFAULT_OG_IMAGE, type = "website", robots }: SeoConfig): SeoMetadata {
  const url = absoluteUrl(canonical ?? path);
  const imageUrl = absoluteUrl(image);
  return {
    title,
    description,
    canonical: url,
    robots: robotsContent(robots),
    openGraph: {
      "og:locale": "es_MX",
      "og:type": type,
      "og:site_name": SITE_NAME,
      "og:title": title,
      "og:description": description,
      "og:url": url,
      "og:image": imageUrl,
      "og:image:alt": `${SITE_NAME} - ${title}`
    },
    twitter: {
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": imageUrl
    }
  };
}

export function setPageSeo(config: SeoConfig) {
  const metadata = buildSeoMetadata(config);

  document.title = metadata.title;
  setMeta('meta[name="description"]', "content", metadata.description);
  setMeta('meta[name="robots"]', "content", metadata.robots);
  ensureCanonical(metadata.canonical);

  Object.entries(metadata.openGraph).forEach(([property, content]) => ensureMetaByProperty(property, content));
  Object.entries(metadata.twitter).forEach(([name, content]) => ensureMetaByName(name, content));
}

export function usePageSeo(config: SeoConfig) {
  const { title, description, path, canonical, image, type, robots } = config;
  const robotsIndex = robots?.index;
  const robotsFollow = robots?.follow;
  useEffect(() => {
    setPageSeo({ title, description, path, canonical, image, type, robots: { index: robotsIndex, follow: robotsFollow } });
  }, [title, description, path, canonical, image, type, robotsIndex, robotsFollow]);
}
