export interface BreadcrumbItem {
  name: string;
  path: string;
}

const home: BreadcrumbItem = { name: "Inicio", path: "/" };

const sections = {
  oferta: { name: "Oferta educativa", path: "/oferta" },
  campus: { name: "Campus", path: "/campus" },
  rvoe: { name: "RVOE", path: "/rvoe" },
  nosotros: { name: "Nosotros", path: "/nosotros" },
  comunidad: { name: "Comunidad", path: "/comunidad" },
  contacto: { name: "Contacto", path: "/contacto" },
  quiz: { name: "¿Qué carrera estudiar?", path: "/que-carrera-estudiar" },
  privacidad: { name: "Aviso de privacidad", path: "/aviso-de-privacidad" }
} satisfies Record<string, BreadcrumbItem>;

export function sectionBreadcrumbs(section: keyof typeof sections): BreadcrumbItem[] {
  return [home, sections[section]];
}

export function programBreadcrumbs(program: { title: string; slug: string }): BreadcrumbItem[] {
  return [...sectionBreadcrumbs("oferta"), { name: program.title, path: `/oferta/${program.slug}` }];
}

export function campusBreadcrumbs(campus: { shortName: string; slug: string }): BreadcrumbItem[] {
  return [...sectionBreadcrumbs("campus"), { name: campus.shortName, path: `/campus/${campus.slug}` }];
}
