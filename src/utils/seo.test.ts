import { describe, expect, it } from "vitest";
import { buildSeoMetadata, robotsContent, SITE_URL } from "./seo";

describe("SEO metadata", () => {
  it.each([
    [undefined, "index, follow"],
    [{ index: false }, "noindex, follow"],
    [{ follow: false }, "index, nofollow"],
    [{ index: false, follow: false }, "noindex, nofollow"]
  ] as const)("serializa robots %#", (robots, expected) => {
    expect(robotsContent(robots)).toBe(expected);
  });

  it("genera canonical, description, Open Graph y Twitter desde una sola configuracion", () => {
    const metadata = buildSeoMetadata({
      title: "Psicologia | Universidad IUA",
      description: "Descripcion academica verificable.",
      canonical: "/oferta/psicologia",
      image: "/banners-edu/psicologia.webp",
      type: "article"
    });

    expect(metadata.canonical).toBe(`${SITE_URL}/oferta/psicologia`);
    expect(metadata.description).toBe("Descripcion academica verificable.");
    expect(metadata.openGraph).toMatchObject({
      "og:type": "article",
      "og:title": "Psicologia | Universidad IUA",
      "og:description": "Descripcion academica verificable.",
      "og:url": `${SITE_URL}/oferta/psicologia`,
      "og:image": `${SITE_URL}/banners-edu/psicologia.webp`
    });
    expect(metadata.twitter).toMatchObject({
      "twitter:card": "summary_large_image",
      "twitter:title": "Psicologia | Universidad IUA",
      "twitter:description": "Descripcion academica verificable.",
      "twitter:image": `${SITE_URL}/banners-edu/psicologia.webp`
    });
  });
});
