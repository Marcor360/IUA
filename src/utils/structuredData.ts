import { institution } from "../config/institution";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["CollegeOrUniversity", "Organization"],
    "@id": `${institution.url}/#organization`,
    name: institution.name,
    url: `${institution.url}/`,
    logo: institution.logo,
    description: institution.description,
    sameAs: institution.socialProfiles,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "admisiones",
      telephone: institution.contact.phone,
      email: institution.contact.email,
      areaServed: "MX",
      availableLanguage: "es"
    }
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${institution.url}${item.path}`
    }))
  };
}

export function educationalProgramSchema(program: {
  title: string;
  level: string;
  shortDescription: string;
  slug: string;
  duration: string;
  modalities: string[];
  campus: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "@id": `${institution.url}/oferta/${program.slug}#program`,
    name: program.title,
    description: program.shortDescription,
    url: `${institution.url}/oferta/${program.slug}`,
    provider: { "@id": `${institution.url}/#organization` },
    educationalCredentialAwarded: program.level,
    timeToComplete: program.duration,
    educationalProgramMode: program.modalities,
    areaServed: program.campus
  };
}
