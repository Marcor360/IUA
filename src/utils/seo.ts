import { useEffect } from "react";

export const SITE_URL = "https://iua.edu.mx";
export const SITE_NAME = "Universidad IUA";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/banners/alumnos-1-banner-recorte-1920x700.webp`;

export type SeoConfig = {
  title: string;
  description: string;
  path?: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  robots?: { index: boolean; follow: boolean };
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

export function setPageSeo({ title, description, path = "/", canonical, image = DEFAULT_OG_IMAGE, type = "website", robots = { index: true, follow: true } }: SeoConfig) {
  const url = absoluteUrl(canonical ?? path);
  const imageUrl = absoluteUrl(image);

  document.title = title;
  setMeta('meta[name="description"]', "content", description);
  setMeta('meta[name="robots"]', "content", `${robots.index ? "index" : "noindex"}, ${robots.follow ? "follow" : "nofollow"}`);
  ensureCanonical(url);

  ensureMetaByProperty("og:locale", "es_MX");
  ensureMetaByProperty("og:type", type);
  ensureMetaByProperty("og:site_name", SITE_NAME);
  ensureMetaByProperty("og:title", title);
  ensureMetaByProperty("og:description", description);
  ensureMetaByProperty("og:url", url);
  ensureMetaByProperty("og:image", imageUrl);
  ensureMetaByProperty("og:image:alt", `${SITE_NAME} - ${title}`);

  ensureMetaByName("twitter:card", "summary_large_image");
  ensureMetaByName("twitter:title", title);
  ensureMetaByName("twitter:description", description);
  ensureMetaByName("twitter:image", imageUrl);
}

export function usePageSeo(config: SeoConfig) {
  useEffect(() => {
    setPageSeo(config);
  }, [config.title, config.description, config.path, config.canonical, config.image, config.type, config.robots?.index, config.robots?.follow]);
}
