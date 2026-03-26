export type EducationLevel =
  | "secundaria"
  | "bachillerato"
  | "licenciatura"
  | "maestria"
  | "doctorado";

export type Program = {
  slug: string;
  level: EducationLevel;
  title: string;
  shortTitle: string;
  summary: string;
  pitch: string;
  modality: string;
  duration: string;
  schedule: string;
  campus: string[];
  focusAreas: string[];
  accent: string;
  soft: string;
  heroImage: string;
};

export type Campus = {
  id: "Chalco" | "Reyes" | "Texcoco";
  title: string;
  address: string;
  reference: string;
  phones: string[];
  email: string;
  hours: string;
  mapQuery: string;
};

export type HomeCarouselSlide = {
  title: string;
  label: string;
  href: string;
  image: string;
  description: string;
};

export type LevelBlock = {
  title: string;
  description: string;
  href: string;
  image: string;
  formUrl: string;
  items: Program[];
};

export const institutionalColors = {
  primary: "#9d351f",
  secondary: "#bca059",
};

export const brandLogoUrl =
  "https://iua.edu.mx/wp-content/uploads/2025/02/IUA-Universidad-24.png";

export const admissionsFormUrl =
  "https://apps.clientify.net/forms/embed/18c6d7fcbfb6390b64a28e8d7b7f7d9c";
export const scheduleVisitUrl = "https://reuniones.clientify.com";

export const clientifyForms = {
  secundaria:
    "https://apps.clientify.net/formbuilderembed/simpleembed/#/forms/embedform/172852/45670",
  bachillerato:
    "https://apps.clientify.net/formbuilderembed/simpleembed/#/forms/embedform/172886/45670",
  licenciaturas:
    "https://apps.clientify.net/formbuilderembed/simpleembed/#/forms/embedform/173026/45670",
  maestrias:
    "https://apps.clientify.net/formbuilderembed/simpleembed/#/forms/embedform/173050/45670",
  doctorado:
    "https://apps.clientify.net/formbuilderembed/simpleembed/#/forms/embedform/173056/45670",
  revalidacion:
    "https://apps.clientify.net/formbuilderembed/simpleembed/#/forms/embedform/178664/45670",
  becas:
    "https://apps.clientify.net/formbuilderembed/simpleembed/#/forms/embedform/178777/45670",
};

export function getClientifyFormByLevel(level: EducationLevel): string {
  if (level === "secundaria") {
    return clientifyForms.secundaria;
  }

  if (level === "bachillerato") {
    return clientifyForms.bachillerato;
  }

  if (level === "maestria") {
    return clientifyForms.maestrias;
  }

  if (level === "doctorado") {
    return clientifyForms.doctorado;
  }

  return clientifyForms.licenciaturas;
}

export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros-somos-iua" },
  { label: "Oferta Educativa", href: "/oferta-educativa-iua" },
  { label: "Comunidad", href: "/comunidad" },
  { label: "Explora IUA", href: "/explora-iua" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contactanos" },
];

export const studyNav = [
  { label: "Secundaria", href: "/secundaria-3", accent: "#d86a4b" },
  { label: "Bachillerato", href: "/bachillerato-3", accent: "#cb9e4a" },
  { label: "Licenciaturas", href: "/licenciaturas", accent: "#8f4f3a" },
  { label: "Posgrados", href: "/posgrados", accent: "#5e6b3d" },
];

export const homeCarouselSlides: HomeCarouselSlide[] = [
  {
    title: "Secundaria",
    label: "Nivel basico",
    href: "/secundaria-3",
    image: "https://iua.edu.mx/wp-content/uploads/2025/06/5.png",
    description:
      "Formacion integral para fortalecer bases academicas y humanas desde la secundaria.",
  },
  {
    title: "Prepa o Bachillerato",
    label: "Nivel medio superior",
    href: "/bachillerato-3",
    image: "https://iua.edu.mx/wp-content/uploads/2025/06/4.png",
    description:
      "Bachillerato tecnologico para continuar a universidad con mejor preparacion.",
  },
  {
    title: "Licenciaturas",
    label: "Nivel superior",
    href: "/licenciaturas",
    image: "https://iua.edu.mx/wp-content/uploads/2025/06/3.png",
    description:
      "Carreras profesionales separadas por area para una navegacion clara.",
  },
  {
    title: "Impulsa tu futuro",
    label: "Proyeccion profesional",
    href: "/oferta-educativa-iua",
    image: "https://iua.edu.mx/wp-content/uploads/2025/06/2.png",
    description:
      "Conecta secundaria, bachillerato, licenciatura y posgrado en un solo recorrido.",
  },
];

export const programs: Program[] = [
  {
    slug: "secundaria-3",
    level: "secundaria",
    title: "Secundaria",
    shortTitle: "Secundaria",
    summary:
      "Fortalecemos las bases pedagogicas con la firme conviccion de continuar preparando a la juventud con alto sentido humanista.",
    pitch:
      "Acompanamos la etapa formativa clave con enfoque academico, emocional y social para construir una base solida.",
    modality: "Escolarizada",
    duration: "3 anos",
    schedule: "Matutino",
    campus: ["Chalco"],
    focusAreas: [
      "Formacion integral y disciplina academica",
      "Acompanamiento docente cercano",
      "Actividades culturales y deportivas",
      "Preparacion para bachillerato tecnologico",
    ],
    accent: "#d86a4b",
    soft: "#f9ece7",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-SECU.png",
  },
  {
    slug: "bachillerato-3",
    level: "bachillerato",
    title: "Bachillerato Tecnologico",
    shortTitle: "Bachillerato",
    summary:
      "Bachillerato Tecnologico te brinda la mejor preparacion si quieres estudiar tu preparatoria y formarte como profesionista tecnico.",
    pitch:
      "Integramos formacion academica y tecnica para que puedas continuar a licenciatura o incorporarte con ventaja al mundo laboral.",
    modality: "Escolarizada",
    duration: "3 anos",
    schedule: "Matutino",
    campus: ["Chalco", "Reyes"],
    focusAreas: [
      "Base academica para estudios superiores",
      "Competencias tecnicas aplicadas",
      "Acompaniamiento para orientacion vocacional",
      "Proyectos interdisciplinarios",
    ],
    accent: "#cb9e4a",
    soft: "#f7f0e1",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-BACH-1.png",
  },
  {
    slug: "licenciatura-en-administracion-de-empresas",
    level: "licenciatura",
    title: "Licenciatura en Administracion de Empresas",
    shortTitle: "Administracion de Empresas",
    summary:
      "Prepara lideres con habilidades gerenciales y estrategicas para el exito empresarial.",
    pitch:
      "Desarrolla vision de negocio, liderazgo y toma de decisiones para impulsar organizaciones competitivas.",
    modality: "Escolarizada y ejecutiva",
    duration: "9 cuatrimestres",
    schedule: "Matutino y sabatino",
    campus: ["Chalco", "Reyes", "Texcoco"],
    focusAreas: [
      "Planeacion y direccion de negocios",
      "Gestion financiera y operativa",
      "Emprendimiento y modelos comerciales",
      "Liderazgo y negociacion",
    ],
    accent: "#8a4d36",
    soft: "#f5e9e4",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-ADMIN.png",
  },
  {
    slug: "licenciatura-en-arquitectura-del-culinarias",
    level: "licenciatura",
    title: "Licenciatura en Arquitectura del Paisaje",
    shortTitle: "Arquitectura del Paisaje",
    summary:
      "Formacion profesional para diseniar y transformar espacios exteriores con criterio funcional, ambiental y humano.",
    pitch:
      "Conecta creatividad, planeacion territorial y sostenibilidad para intervenir espacios urbanos y naturales.",
    modality: "Escolarizada",
    duration: "9 cuatrimestres",
    schedule: "Matutino",
    campus: ["Chalco"],
    focusAreas: [
      "Disenio de espacio publico",
      "Paisajismo y sustentabilidad",
      "Proyectos de regeneracion urbana",
      "Representacion y presentacion de propuestas",
    ],
    accent: "#4d7a4c",
    soft: "#eaf4e9",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2025/06/Botones-PW-IUA-AP.png",
  },
  {
    slug: "licenciatura-en-artes-culinarias",
    level: "licenciatura",
    title: "Licenciatura en Artes Culinarias",
    shortTitle: "Artes Culinarias",
    summary:
      "Formacion gastronomica para crear propuestas culinarias con tecnica, creatividad y enfoque profesional.",
    pitch:
      "Aprende cocina nacional e internacional con enfoque en gestion, innovacion y experiencia de servicio.",
    modality: "Escolarizada",
    duration: "9 cuatrimestres",
    schedule: "Matutino",
    campus: ["Chalco"],
    focusAreas: [
      "Tecnicas culinarias contemporaneas",
      "Administracion de cocina y costos",
      "Innovacion gastronomica",
      "Seguridad e higiene alimentaria",
    ],
    accent: "#b56a32",
    soft: "#f8ece3",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2025/06/Botones-PW-IUA-AC.png",
  },
  {
    slug: "licenciatura-en-contaduria-publica",
    level: "licenciatura",
    title: "Licenciatura en Contaduria Publica",
    shortTitle: "Contaduria Publica",
    summary:
      "Domina la gestion financiera y fiscal para liderar con integridad en el mundo de los negocios.",
    pitch:
      "Forma un perfil solido en analisis financiero, control y cumplimiento para empresas de cualquier tamanio.",
    modality: "Escolarizada y ejecutiva",
    duration: "9 cuatrimestres",
    schedule: "Matutino y sabatino",
    campus: ["Chalco", "Reyes"],
    focusAreas: [
      "Contabilidad financiera y administrativa",
      "Fiscal y auditoria",
      "Costos y control interno",
      "Planeacion financiera",
    ],
    accent: "#3f6f8f",
    soft: "#e7f1f7",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-CP.png",
  },
  {
    slug: "licenciatura-en-derecho",
    level: "licenciatura",
    title: "Licenciatura en Derecho",
    shortTitle: "Derecho",
    summary:
      "Formamos abogados con etica, preparados para enfrentar retos legales y promover la justicia.",
    pitch:
      "Integra teoria juridica, argumentacion y practica profesional para actuar en el ambito publico y privado.",
    modality: "Escolarizada y ejecutiva",
    duration: "9 cuatrimestres",
    schedule: "Matutino y sabatino",
    campus: ["Chalco", "Reyes", "Texcoco"],
    focusAreas: [
      "Litigacion y argumentacion juridica",
      "Derecho civil, penal y mercantil",
      "Mediacion y solucion de conflictos",
      "Practica en sala de juicios orales",
    ],
    accent: "#81423c",
    soft: "#f4e8e7",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-DER.png",
  },
  {
    slug: "licenciatura-en-diseno-grafico",
    level: "licenciatura",
    title: "Licenciatura en Diseno Grafico",
    shortTitle: "Diseno Grafico",
    summary:
      "Aprende a comunicar visualmente e impacta con tus creaciones en el mundo digital y mas alla.",
    pitch:
      "Desarrolla proyectos visuales con enfoque estrategico para marcas, medios y plataformas digitales.",
    modality: "Escolarizada",
    duration: "9 cuatrimestres",
    schedule: "Matutino",
    campus: ["Chalco"],
    focusAreas: [
      "Identidad visual y branding",
      "Diseno editorial y digital",
      "Narrativa visual y campanias",
      "Produccion multimedia",
    ],
    accent: "#b84c3f",
    soft: "#fae8e5",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-DG.png",
  },
  {
    slug: "licenciatura-en-lenguas-extranjeras",
    level: "licenciatura",
    title: "Licenciatura en Lenguas Extranjeras",
    shortTitle: "Lenguas Extranjeras",
    summary:
      "Te abre puertas internacionales con formacion de calidad para comunicadores globales.",
    pitch:
      "Domina competencias linguisticas y pedagogicas para contextos empresariales, educativos y multiculturales.",
    modality: "Escolarizada",
    duration: "9 cuatrimestres",
    schedule: "Matutino",
    campus: ["Chalco", "Reyes"],
    focusAreas: [
      "Dominio avanzado de idiomas",
      "Ensenianza de lenguas",
      "Comunicacion intercultural",
      "Traduccion y mediacion linguistica",
    ],
    accent: "#3e7e77",
    soft: "#e5f3f1",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-LE.png",
  },
  {
    slug: "licenciatura-en-pedagogia",
    level: "licenciatura",
    title: "Licenciatura en Pedagogia",
    shortTitle: "Pedagogia",
    summary:
      "Formamos educadores innovadores listos para transformar el aprendizaje y guiar a nuevas generaciones.",
    pitch:
      "Construye intervenciones educativas con bases psicopedagogicas, diseno curricular y gestion escolar.",
    modality: "Escolarizada y ejecutiva",
    duration: "9 cuatrimestres",
    schedule: "Matutino y sabatino",
    campus: ["Chalco", "Reyes", "Texcoco"],
    focusAreas: [
      "Diseno y evaluacion curricular",
      "Estrategias de aprendizaje",
      "Gestion de instituciones educativas",
      "Intervencion pedagogica",
    ],
    accent: "#7c6240",
    soft: "#f3eee6",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-PED.png",
  },
  {
    slug: "licenciatura-en-psicologia",
    level: "licenciatura",
    title: "Licenciatura en Psicologia",
    shortTitle: "Psicologia",
    summary:
      "Te prepara para entender la mente humana, promoviendo bienestar y salud mental desde la intervencion profesional.",
    pitch:
      "Desarrolla herramientas de evaluacion e intervencion para contextos clinicos, educativos y organizacionales.",
    modality: "Escolarizada y ejecutiva",
    duration: "9 cuatrimestres",
    schedule: "Matutino y sabatino",
    campus: ["Chalco", "Reyes", "Texcoco"],
    focusAreas: [
      "Procesos psicologicos y conducta",
      "Evaluacion y diagnostico",
      "Intervencion en distintos contextos",
      "Etica y responsabilidad profesional",
    ],
    accent: "#6f6f43",
    soft: "#f1f1e7",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-PSI.png",
  },
  {
    slug: "ingenieria-en-sistemas-computacionales",
    level: "licenciatura",
    title: "Ingenieria en Sistemas Computacionales",
    shortTitle: "Ing. en Sistemas Computacionales",
    summary:
      "Impulsa la innovacion, desarrolla software, soluciona problemas y lidera en la era digital.",
    pitch:
      "Integra desarrollo, infraestructura y analitica para resolver retos tecnologicos de alto impacto.",
    modality: "Escolarizada",
    duration: "9 cuatrimestres",
    schedule: "Matutino",
    campus: ["Chalco", "Reyes"],
    focusAreas: [
      "Desarrollo de software",
      "Arquitectura de sistemas y redes",
      "Bases de datos y analitica",
      "Seguridad y continuidad operativa",
    ],
    accent: "#325f97",
    soft: "#e3edf9",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-ING-SC.png",
  },
  {
    slug: "maestria-en-derecho-penal",
    level: "maestria",
    title: "Maestria en Derecho Penal",
    shortTitle: "Mtria. en Derecho Penal",
    summary:
      "Formacion avanzada para profesionales que buscan excelencia en la justicia criminal y la defensa de derechos.",
    pitch:
      "Profundiza en teoria penal y litigacion estrategica para desempeno especializado en el sistema acusatorio.",
    modality: "Ejecutiva",
    duration: "6 cuatrimestres",
    schedule: "Sabatino",
    campus: ["Chalco", "Reyes"],
    focusAreas: [
      "Sistema penal acusatorio",
      "Teoria del delito",
      "Investigacion y tecnica procesal",
      "Argumentacion avanzada",
    ],
    accent: "#6e3f3a",
    soft: "#f2e7e6",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-M-DP.png",
  },
  {
    slug: "maestria-en-educacion",
    level: "maestria",
    title: "Maestria en Educacion",
    shortTitle: "Mtria. en Educacion",
    summary:
      "Formacion avanzada para lideres pedagogicos que buscan innovar y transformar entornos de aprendizaje.",
    pitch:
      "Construye propuestas de mejora educativa, investigacion aplicada y liderazgo institucional para contextos actuales.",
    modality: "Ejecutiva",
    duration: "6 cuatrimestres",
    schedule: "Sabatino",
    campus: ["Chalco", "Reyes", "Texcoco"],
    focusAreas: [
      "Innovacion y planeacion educativa",
      "Evaluacion institucional",
      "Investigacion aplicada",
      "Liderazgo academico",
    ],
    accent: "#536838",
    soft: "#edf3e5",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-M-E.png",
  },
  {
    slug: "doctorado-en-derecho",
    level: "doctorado",
    title: "Doctorado en Derecho",
    shortTitle: "Doctorado en Derecho",
    summary:
      "Investiga y contribuye al campo legal, formando parte de la elite juridica y marcando diferencias significativas.",
    pitch:
      "Consolida un perfil de alta especializacion para investigacion, docencia y liderazgo juridico de alto nivel.",
    modality: "Ejecutiva",
    duration: "9 cuatrimestres",
    schedule: "Sabatino",
    campus: ["Chalco"],
    focusAreas: [
      "Investigacion juridica avanzada",
      "Analisis critico de marcos normativos",
      "Produccion academica especializada",
      "Vinculacion con practica profesional",
    ],
    accent: "#4a4a4a",
    soft: "#ececec",
    heroImage:
      "https://iua.edu.mx/wp-content/uploads/2024/10/Botones-PW-IUA-D-D.png",
  },
];

export const programSlugs = programs.map((program) => program.slug);

export const programsByLevel: Record<EducationLevel, Program[]> = {
  secundaria: programs.filter((program) => program.level === "secundaria"),
  bachillerato: programs.filter((program) => program.level === "bachillerato"),
  licenciatura: programs.filter((program) => program.level === "licenciatura"),
  maestria: programs.filter((program) => program.level === "maestria"),
  doctorado: programs.filter((program) => program.level === "doctorado"),
};

export const levelBlocks: LevelBlock[] = [
  {
    title: "Secundaria",
    description: "Formacion media basica con enfoque integral y acompanamiento.",
    href: "/secundaria-3",
    image: "https://iua.edu.mx/wp-content/uploads/2025/06/5.png",
    formUrl: clientifyForms.secundaria,
    items: programsByLevel.secundaria,
  },
  {
    title: "Bachillerato Tecnologico",
    description:
      "Preparacion academica y tecnica para continuar a universidad o integrarte al campo laboral.",
    href: "/bachillerato-3",
    image: "https://iua.edu.mx/wp-content/uploads/2025/06/4.png",
    formUrl: clientifyForms.bachillerato,
    items: programsByLevel.bachillerato,
  },
  {
    title: "Licenciaturas",
    description:
      "Programas profesionales para desarrollar competencias disciplinarias y liderazgo.",
    href: "/licenciaturas",
    image: "https://iua.edu.mx/wp-content/uploads/2025/06/3.png",
    formUrl: clientifyForms.licenciaturas,
    items: programsByLevel.licenciatura,
  },
  {
    title: "Posgrados",
    description:
      "Maestrias y doctorado para especializacion y desarrollo academico avanzado.",
    href: "/posgrados",
    image: "https://iua.edu.mx/wp-content/uploads/2025/06/2.png",
    formUrl: clientifyForms.maestrias,
    items: [...programsByLevel.maestria, ...programsByLevel.doctorado],
  },
];

export const campuses: Campus[] = [
  {
    id: "Chalco",
    title: "IUA Campus Chalco",
    address:
      "Carretera Chalco-Mixquic, esquina calle Sauce 1, San Mateo Huitzilzingo, Chalco, Estado de Mexico, CP 56625.",
    reference: "A 1000 metros del Palacio de Justicia.",
    phones: ["55 2236-7939", "55 2236-6742"],
    email: "admisiones@iua.edu.mx",
    hours: "Lunes a viernes: 09:00 - 16:00 | Sabado: 09:00 - 13:00",
    mapQuery:
      "Carretera Chalco-Mixquic, esquina calle Sauce 1, San Mateo Huitzilzingo, Chalco",
  },
  {
    id: "Reyes",
    title: "IUA Campus Reyes",
    address:
      "Avenida Texcoco numero 51, Los Reyes, La Paz, Estado de Mexico, CP 56400.",
    reference: "A una cuadra del metro Los Reyes (Linea A).",
    phones: ["55 5857-2887"],
    email: "admisiones@iua.edu.mx",
    hours: "Lunes a viernes: 09:00 - 16:00 | Sabado: 09:00 - 13:00",
    mapQuery: "Avenida Texcoco 51, Los Reyes, La Paz, Estado de Mexico",
  },
  {
    id: "Texcoco",
    title: "Centro de Enlace Texcoco",
    address:
      "1a. Cda. de Campo Deportivo 7, San Pedro, 56105 Texcoco de Mora, Mexico.",
    reference: "Atencion de informes y vinculacion academica.",
    phones: ["59 5925-1420"],
    email: "admisiones@iua.edu.mx",
    hours: "Lunes a viernes: 09:00 - 16:00 | Sabado: 09:00 - 13:00",
    mapQuery: "1a Cda. de Campo Deportivo 7, San Pedro, Texcoco",
  },
];

export const homeStats = [
  { label: "Campus activos", value: "3" },
  { label: "Niveles academicos", value: "6" },
  { label: "Programas clave", value: "15" },
  { label: "Canal de admision", value: "100% online disponible" },
];

export const admissionActions = [
  {
    title: "Inscripciones Secundaria",
    href: clientifyForms.secundaria,
  },
  {
    title: "Inscripciones Bachillerato",
    href: clientifyForms.bachillerato,
  },
  {
    title: "Inscripciones Licenciatura",
    href: clientifyForms.licenciaturas,
  },
  {
    title: "Inscripciones Posgrado",
    href: clientifyForms.maestrias,
  },
];

export const communityResources = [
  "Biblioteca virtual",
  "Reglamento de alumnos",
  "Becas institucionales",
  "Servicio social y titulacion",
  "Conecta IUA",
  "Revista IUA",
];

export const blogPosts = [
  {
    slug: "por-que-estudiar-en-iua",
    title: "Por que estudiar en IUA",
    category: "Vistazo academico",
    date: "21 marzo 2026",
    href: "https://iua.edu.mx/por-que-estudiar-en-iua/",
  },
  {
    slug: "caravana-iua",
    title: "Caravana IUA",
    category: "Vistazo academico",
    date: "8 agosto 2022",
    href: "https://iua.edu.mx/caravana-iua/",
  },
  {
    slug: "por-que-hay-dias-frios-en-verano",
    title: "Por que hay dias frios en verano",
    category: "Vistazo cultural",
    date: "14 junio 2022",
    href: "https://iua.edu.mx/por-que-hay-dias-frios-en-verano/",
  },
  {
    slug: "bloqueo-creativo",
    title: "Bloqueo creativo",
    category: "Vistazo recreativo",
    date: "8 junio 2022",
    href: "https://iua.edu.mx/bloqueo-creativo/",
  },
  {
    slug: "como-ser-productivo-en-vacaciones",
    title: "Como ser productivo en vacaciones de verano",
    category: "Vistazo recreativo",
    date: "23 mayo 2022",
    href: "https://iua.edu.mx/como-ser-productivo-en-vacaciones/",
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}
