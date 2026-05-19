import type { ComponentType } from "react";
import {
  IconBooks,
  IconBrain,
  IconBriefcase,
  IconBuildingSkyscraper,
  IconCalculator,
  IconCertificate,
  IconChefHat,
  IconCode,
  IconGavel,
  IconLanguage,
  IconPalette,
  IconSchool,
  IconShieldCheck
} from "@tabler/icons-react";

export type ProgramaOferta = {
  id: string;
  slug: string;
  level: "Secundaria" | "Bachillerato" | "Licenciatura" | "Maestría" | "Doctorado";
  title: string;
  icon: ComponentType<{ size?: number | string; className?: string }>;
  shortDescription: string;
  heroDescription: string;
  badges: string[];
  campus: string[];
  modalities: string[];
  duration: string;
  terms: string;
  benefits: string[];
  perfilIngreso: string;
  perfilEgreso: string;
  campoLaboral: string[];
  planEstudios: string[];
};

export const ofertaEducativa: ProgramaOferta[] = [
  {
    id: "secundaria",
    slug: "secundaria",
    level: "Secundaria",
    title: "Secundaria",
    icon: IconSchool,
    shortDescription: "Continúa tu formación básica en un ambiente académico cercano, con acompañamiento y enfoque en el desarrollo integral del estudiante.",
    heroDescription: "Fortalece tu formación académica en una etapa clave para tu desarrollo personal, escolar y social.",
    badges: ["Formación integral", "Acompañamiento académico", "Desarrollo de habilidades"],
    campus: ["Plantel Reyes"],
    modalities: ["Escolarizada"],
    duration: "Según ciclo escolar oficial",
    terms: "Ciclo escolar",
    benefits: ["Acompañamiento académico durante una etapa clave.", "Formación orientada al desarrollo integral.", "Fortalecimiento de hábitos de estudio.", "Ambiente escolar cercano y estructurado.", "Preparación para continuar al bachillerato."],
    perfilIngreso: "Ideal para estudiantes que buscan continuar su educación básica en un ambiente académico estructurado, cercano y orientado al desarrollo integral. Este nivel está pensado para alumnos que requieren acompañamiento, formación en valores, hábitos de estudio y bases sólidas para avanzar hacia el bachillerato.",
    perfilEgreso: "Al concluir la secundaria, el estudiante contará con conocimientos fundamentales, mejores hábitos académicos, mayor capacidad de organización y herramientas para continuar su preparación en el nivel medio superior. También fortalecerá su comunicación, responsabilidad y convivencia escolar.",
    campoLaboral: ["Continuidad académica hacia bachillerato.", "Desarrollo de habilidades escolares.", "Preparación para etapas académicas posteriores."],
    planEstudios: ["Español", "Matemáticas", "Ciencias", "Historia", "Formación Cívica y Ética"]
  },
  {
    id: "bachillerato",
    slug: "bachillerato",
    level: "Bachillerato",
    title: "Bachillerato",
    icon: IconBooks,
    shortDescription: "Prepárate para tu siguiente etapa académica con una formación sólida, práctica y orientada a tu futuro profesional.",
    heroDescription: "Construye las bases académicas que necesitas para avanzar hacia la universidad y tomar mejores decisiones sobre tu futuro profesional.",
    badges: ["Formación académica sólida", "Orientación vocacional", "Preparación universitaria"],
    campus: ["Plantel Reyes", "Plantel Chalco"],
    modalities: ["Escolarizada"],
    duration: "Según plan de bachillerato vigente",
    terms: "Plan académico vigente",
    benefits: ["Preparación para ingresar a licenciatura.", "Desarrollo de habilidades académicas.", "Orientación para elegir carrera.", "Formación práctica y estructurada.", "Acompañamiento durante una etapa decisiva."],
    perfilIngreso: "Ideal para estudiantes que concluyeron la secundaria y desean continuar su formación académica con una visión más clara hacia la universidad y el mundo profesional. Es una opción para jóvenes que buscan fortalecer sus conocimientos, descubrir sus intereses vocacionales y prepararse para tomar mejores decisiones sobre su futuro.",
    perfilEgreso: "Al egresar, el estudiante contará con bases académicas para ingresar a la educación superior, mayor capacidad de análisis, comunicación y resolución de problemas. También podrá identificar mejor sus intereses profesionales y continuar su desarrollo académico con mayor seguridad.",
    campoLaboral: ["Continuidad académica hacia licenciatura.", "Preparación para áreas profesionales futuras.", "Desarrollo de habilidades académicas y vocacionales."],
    planEstudios: ["Matemáticas", "Comunicación", "Ciencias Sociales", "Ciencias Experimentales", "Orientación Vocacional"]
  },
  {
    id: "derecho",
    slug: "derecho",
    level: "Licenciatura",
    title: "Licenciatura en Derecho",
    icon: IconGavel,
    shortDescription: "Prepárate para destacar en el ámbito jurídico, empresarial y gubernamental con formación práctica, argumentación legal y visión estratégica.",
    heroDescription: "Desarrolla una formación jurídica sólida para analizar conflictos, construir argumentos legales y participar en procesos de solución, asesoría y litigación.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes", "Campus Texcoco"],
    modalities: ["Escolarizada", "Ejecutiva", "En línea"],
    duration: "3 años 4 meses",
    terms: "10 cuatrimestres",
    benefits: ["Formación jurídica práctica y estratégica.", "Docentes con experiencia práctica y teórica.", "Sala de Juicios Orales.", "Cámara de Gesell.", "Certificaciones prácticas durante la carrera.", "Opciones de horario para combinar estudio y trabajo."],
    perfilIngreso: "Ideal para personas interesadas en las leyes, la justicia, la argumentación, la negociación y la solución de conflictos. Esta carrera es para estudiantes con facilidad de comunicación, pensamiento analítico, sentido de responsabilidad y gusto por comprender cómo funcionan las normas que regulan a la sociedad.",
    perfilEgreso: "Al egresar, podrás analizar problemas jurídicos, construir argumentos legales, participar en procesos de litigación, asesorar a personas u organizaciones y desenvolverte en contextos públicos, privados o independientes. Tu formación te permitirá actuar con ética, criterio jurídico y capacidad estratégica.",
    campoLaboral: ["Despachos jurídicos", "Empresas privadas", "Gobierno y sector público", "Consultoría legal", "Litigación independiente"],
    planEstudios: ["Derecho Público", "Derecho Privado", "Litigación Oral", "Derecho Corporativo", "Mediación y Negociación"]
  },
  {
    id: "psicologia",
    slug: "psicologia",
    level: "Licenciatura",
    title: "Licenciatura en Psicología",
    icon: IconBrain,
    shortDescription: "Comprende el comportamiento humano y desarrolla habilidades para orientar, evaluar y acompañar procesos personales, educativos y sociales.",
    heroDescription: "Prepárate para comprender el comportamiento humano y generar un impacto positivo en personas, instituciones y comunidades.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes", "Campus Texcoco"],
    modalities: ["Escolarizada", "Ejecutiva", "En línea"],
    duration: "3 años",
    terms: "9 cuatrimestres",
    benefits: ["Formación humana y práctica.", "Cámara de Gesell.", "Laboratorios especializados.", "Docentes con experiencia profesional.", "Certificaciones prácticas durante la carrera.", "Preparación para distintos contextos psicológicos."],
    perfilIngreso: "Esta licenciatura es ideal para personas interesadas en comprender el comportamiento humano, las emociones, los procesos mentales y la forma en que las personas se relacionan con su entorno. Es una carrera para quienes tienen vocación de servicio, empatía, capacidad de escucha y gusto por ayudar a otros.",
    perfilEgreso: "Al egresar, contarás con conocimientos y habilidades para analizar, orientar e intervenir en diferentes contextos relacionados con la conducta humana. Podrás participar en procesos de evaluación, acompañamiento, prevención, orientación y desarrollo humano, aplicando principios éticos y herramientas psicológicas.",
    campoLaboral: ["Clínicas y hospitales", "Escuelas e instituciones educativas", "Empresas privadas", "Consultoría psicológica", "Atención independiente"],
    planEstudios: ["Psicología Clínica", "Psicología Educativa", "Desarrollo Humano", "Evaluación Psicológica", "Terapia y Orientación"]
  },
  {
    id: "pedagogia",
    slug: "pedagogia",
    level: "Licenciatura",
    title: "Licenciatura en Pedagogía",
    icon: IconSchool,
    shortDescription: "Prepárate para transformar la educación mediante estrategias de enseñanza, planeación académica e innovación educativa.",
    heroDescription: "Desarrolla habilidades para crear, implementar y evaluar proyectos educativos con una visión innovadora y humana.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes", "Campus Texcoco"],
    modalities: ["Escolarizada", "Ejecutiva", "En línea"],
    duration: "3 años 4 meses",
    terms: "10 cuatrimestres",
    benefits: ["Formación enfocada en enseñanza y aprendizaje.", "Preparación para diseño de programas educativos.", "Docentes con experiencia práctica y teórica.", "Certificaciones prácticas durante la carrera.", "Desarrollo de habilidades de liderazgo educativo.", "Opciones de horario flexible."],
    perfilIngreso: "La Licenciatura en Pedagogía está dirigida a personas con interés por la educación, la enseñanza, el aprendizaje y el desarrollo integral de niños, jóvenes y adultos. Es ideal para quienes disfrutan comunicar ideas, organizar actividades, guiar procesos formativos y buscar nuevas formas de enseñar.",
    perfilEgreso: "Al concluir la carrera, serás capaz de diseñar, implementar y evaluar estrategias educativas enfocadas en mejorar los procesos de enseñanza y aprendizaje. Podrás desarrollarte en instituciones educativas, áreas de capacitación, orientación académica, diseño curricular, gestión escolar y proyectos de innovación educativa.",
    campoLaboral: ["Escuelas e instituciones educativas", "Capacitación empresarial", "Diseño de programas educativos", "Orientación educativa", "Consultoría pedagógica"],
    planEstudios: ["Didáctica", "Psicología Educativa", "Planeación Académica", "Evaluación Educativa", "Innovación Educativa"]
  },
  {
    id: "arquitectura",
    slug: "arquitectura",
    level: "Licenciatura",
    title: "Licenciatura en Arquitectura",
    icon: IconBuildingSkyscraper,
    shortDescription: "Desarrolla proyectos arquitectónicos con visión estética, funcional y técnica mediante dibujo, diseño digital y representación visual.",
    heroDescription: "Convierte tus ideas en proyectos arquitectónicos mediante diseño, dibujo técnico, representación visual y planeación de espacios.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes", "Campus Texcoco"],
    modalities: ["Escolarizada", "Ejecutiva", "En línea"],
    duration: "3 años",
    terms: "9 cuatrimestres",
    benefits: ["Formación creativa, técnica y funcional.", "Talleres especializados.", "Laboratorios de diseño.", "Desarrollo de proyectos arquitectónicos.", "Herramientas de representación digital.", "Preparación para despachos y proyectos independientes."],
    perfilIngreso: "Esta carrera es ideal para personas creativas, observadoras y con interés por el diseño, el dibujo, la representación visual, los espacios y la construcción de ideas arquitectónicas. Está dirigida a estudiantes que disfrutan imaginar, planear y transformar espacios.",
    perfilEgreso: "Al egresar, contarás con habilidades para desarrollar propuestas arquitectónicas, representar proyectos de forma técnica y visual, y participar en procesos de diseño, planeación y presentación de espacios. Podrás aplicar conocimientos de dibujo arquitectónico, diseño digital, representación gráfica, construcción, urbanismo y composición visual.",
    campoLaboral: ["Despachos de arquitectura", "Constructoras", "Diseño digital", "Proyectos urbanos", "Dibujo arquitectónico independiente"],
    planEstudios: ["Dibujo Arquitectónico", "Diseño Digital", "Representación 3D", "Construcción", "Urbanismo"]
  },
  {
    id: "artes-culinarias",
    slug: "artes-culinarias",
    level: "Licenciatura",
    title: "Licenciatura en Artes Culinarias",
    icon: IconChefHat,
    shortDescription: "Convierte tu pasión por la cocina en una profesión con técnicas culinarias, creatividad gastronómica y visión emprendedora.",
    heroDescription: "Prepárate para destacar en el mundo gastronómico con técnica, creatividad, práctica profesional y visión de negocio.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes", "Campus Texcoco"],
    modalities: ["Escolarizada", "Ejecutiva", "En línea"],
    duration: "3 años",
    terms: "9 cuatrimestres",
    benefits: ["Formación gastronómica práctica.", "Cocinas y talleres especializados.", "Desarrollo de creatividad culinaria.", "Preparación para restaurantes, hoteles y eventos.", "Visión emprendedora.", "Aprendizaje de cocina internacional e innovación culinaria."],
    perfilIngreso: "La Licenciatura en Artes Culinarias está pensada para personas apasionadas por la cocina, la gastronomía, la creatividad y el servicio. Es ideal para quienes disfrutan preparar alimentos, experimentar con sabores, conocer técnicas culinarias y participar en experiencias gastronómicas.",
    perfilEgreso: "Al finalizar la carrera, tendrás conocimientos y habilidades para crear, preparar y presentar propuestas gastronómicas con técnica, creatividad y visión profesional. Podrás desempeñarte en restaurantes, hoteles, servicios de catering, eventos, cocina internacional, repostería, administración gastronómica o emprendimientos propios.",
    campoLaboral: ["Restaurantes", "Hoteles", "Catering y eventos", "Emprendimientos gastronómicos", "Cocina internacional"],
    planEstudios: ["Cocina Internacional", "Repostería", "Administración Gastronómica", "Nutrición", "Innovación Culinaria"]
  },
  {
    id: "contaduria-publica",
    slug: "contaduria-publica",
    level: "Licenciatura",
    title: "Licenciatura en Contaduría Pública",
    icon: IconCalculator,
    shortDescription: "Prepárate para gestionar información financiera, fiscal y contable dentro de empresas, despachos, instituciones o proyectos independientes.",
    heroDescription: "Desarrolla una visión financiera, fiscal y administrativa para tomar decisiones estratégicas dentro de empresas y organizaciones.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes", "Campus Texcoco"],
    modalities: ["Escolarizada", "Ejecutiva", "En línea"],
    duration: "3 años 4 meses",
    terms: "10 cuatrimestres",
    benefits: ["Formación financiera y fiscal.", "Talleres contables y administrativos.", "Desarrollo de pensamiento analítico.", "Preparación para auditoría, impuestos y finanzas.", "Docentes con experiencia profesional.", "Herramientas para gestión empresarial."],
    perfilIngreso: "La Licenciatura en Contaduría Pública es ideal para personas interesadas en las finanzas, los números, la administración, la organización y el análisis de información económica. Está dirigida a estudiantes responsables, ordenados y con capacidad para interpretar datos, resolver problemas y tomar decisiones con base en información financiera.",
    perfilEgreso: "Al egresar, estarás preparado para analizar, registrar, interpretar y gestionar información financiera, contable y fiscal dentro de organizaciones públicas, privadas o independientes. Podrás participar en áreas de contabilidad, auditoría, impuestos, finanzas, administración, consultoría y control interno.",
    campoLaboral: ["Despachos contables", "Empresas privadas", "Consultoría financiera", "Gobierno y sector público", "Auditoría independiente"],
    planEstudios: ["Contabilidad Financiera", "Auditoría", "Fiscal", "Finanzas", "Administración"]
  },
  {
    id: "administracion-de-empresas",
    slug: "administracion-de-empresas",
    level: "Licenciatura",
    title: "Licenciatura en Administración de Empresas",
    icon: IconBriefcase,
    shortDescription: "Prepárate para liderar proyectos, equipos y negocios con una formación enfocada en estrategia, innovación y toma de decisiones.",
    heroDescription: "Desarrolla habilidades para dirigir empresas, gestionar recursos, liderar equipos y crear estrategias de crecimiento.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes", "Campus Texcoco"],
    modalities: ["Escolarizada", "Ejecutiva", "En línea"],
    duration: "3 años 4 meses",
    terms: "10 cuatrimestres",
    benefits: ["Formación estratégica para negocios.", "Desarrollo de liderazgo.", "Herramientas de administración, finanzas y marketing.", "Preparación para emprender.", "Docentes con experiencia práctica.", "Enfoque en toma de decisiones empresariales."],
    perfilIngreso: "Esta licenciatura está dirigida a personas con interés en los negocios, el liderazgo, la organización, la toma de decisiones y la gestión de proyectos. Es ideal para estudiantes con iniciativa, visión emprendedora, capacidad de comunicación y gusto por coordinar personas, recursos e ideas.",
    perfilEgreso: "Al terminar la carrera, contarás con herramientas para planear, organizar, dirigir y evaluar proyectos, áreas y procesos dentro de una empresa. Podrás desempeñarte en recursos humanos, ventas, marketing, finanzas, administración general, consultoría, emprendimiento o dirección de negocios.",
    campoLaboral: ["Empresas privadas", "Recursos humanos", "Marketing y ventas", "Emprendimiento", "Consultoría empresarial"],
    planEstudios: ["Administración", "Finanzas", "Recursos Humanos", "Marketing", "Emprendimiento"]
  },
  {
    id: "diseno-grafico",
    slug: "diseno-grafico",
    level: "Licenciatura",
    title: "Licenciatura en Diseño Gráfico",
    icon: IconPalette,
    shortDescription: "Crea proyectos visuales para marcas, campañas, medios digitales y comunicación gráfica con creatividad y estrategia.",
    heroDescription: "Convierte tu creatividad en soluciones visuales para marcas, medios digitales, publicidad y comunicación gráfica.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes", "Campus Texcoco"],
    modalities: ["Escolarizada", "Ejecutiva", "En línea"],
    duration: "3 años",
    terms: "9 cuatrimestres",
    benefits: ["Formación creativa y digital.", "Laboratorios de diseño.", "Talleres creativos.", "Desarrollo de branding y publicidad.", "Preparación para medios digitales.", "Posibilidad de estudiar en línea."],
    perfilIngreso: "La Licenciatura en Diseño Gráfico es ideal para personas creativas, visuales y con interés por la comunicación, el arte, la tecnología y el mundo digital. Está dirigida a estudiantes que disfrutan crear imágenes, desarrollar ideas visuales, diseñar marcas, comunicar mensajes y explorar herramientas digitales.",
    perfilEgreso: "Al egresar, serás capaz de desarrollar proyectos visuales para marcas, medios digitales, campañas publicitarias, productos editoriales, contenidos multimedia y comunicación corporativa. Podrás aplicar conocimientos de diseño digital, branding, ilustración, publicidad, producción visual y comunicación gráfica.",
    campoLaboral: ["Agencias de publicidad", "Diseño digital", "Branding y marketing", "Medios audiovisuales", "Diseño independiente"],
    planEstudios: ["Diseño Digital", "Branding", "Ilustración", "Publicidad", "Producción Multimedia"]
  },
  {
    id: "lenguas-extranjeras",
    slug: "lenguas-extranjeras",
    level: "Licenciatura",
    title: "Licenciatura en Lenguas Extranjeras",
    icon: IconLanguage,
    shortDescription: "Desarrolla habilidades lingüísticas y culturales para comunicarte en contextos educativos, empresariales e internacionales.",
    heroDescription: "Prepárate para comunicarte en un mundo global mediante el dominio de idiomas, cultura y comunicación internacional.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes", "Campus Texcoco"],
    modalities: ["Escolarizada", "Ejecutiva", "En línea"],
    duration: "3 años",
    terms: "9 cuatrimestres",
    benefits: ["Formación lingüística y cultural.", "Laboratorios de idiomas.", "Preparación para enseñanza, traducción y comunicación.", "Desarrollo de habilidades interculturales.", "Enfoque global.", "Posibilidad de estudiar en línea."],
    perfilIngreso: "La Licenciatura en Lenguas Extranjeras está dirigida a personas interesadas en los idiomas, la comunicación, la cultura, la enseñanza y los entornos internacionales. Es ideal para estudiantes con facilidad para aprender, escuchar, hablar y expresarse, así como para quienes disfrutan conocer otras culturas.",
    perfilEgreso: "Al egresar, contarás con habilidades lingüísticas, comunicativas y culturales para desenvolverte en contextos educativos, empresariales, turísticos e internacionales. Podrás participar en enseñanza de idiomas, traducción, interpretación, capacitación, comunicación intercultural y proyectos relacionados con el uso profesional de lenguas extranjeras.",
    campoLaboral: ["Escuelas e instituciones educativas", "Traducción e interpretación", "Empresas internacionales", "Turismo", "Capacitación en idiomas"],
    planEstudios: ["Inglés Avanzado", "Traducción", "Comunicación Internacional", "Fonética", "Cultura Global"]
  },
  {
    id: "ingenieria-en-sistemas-computacionales",
    slug: "ingenieria-en-sistemas-computacionales",
    level: "Licenciatura",
    title: "Ingeniería en Sistemas Computacionales",
    icon: IconCode,
    shortDescription: "Desarrolla soluciones tecnológicas mediante programación, bases de datos, redes, desarrollo web y seguridad informática.",
    heroDescription: "Prepárate para crear, implementar y administrar soluciones tecnológicas en un mundo cada vez más digital.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes", "Campus Texcoco"],
    modalities: ["Escolarizada", "Ejecutiva", "En línea"],
    duration: "3 años",
    terms: "9 cuatrimestres",
    benefits: ["Formación en programación y tecnología.", "Laboratorios de cómputo.", "Talleres tecnológicos.", "Desarrollo de software.", "Bases de datos, redes y seguridad informática.", "Posibilidad de estudiar en línea."],
    perfilIngreso: "Esta ingeniería es ideal para personas interesadas en la tecnología, la programación, la innovación, el análisis lógico y la solución de problemas. Está dirigida a estudiantes curiosos, analíticos y con gusto por entender cómo funcionan los sistemas, las aplicaciones, las redes, las bases de datos y las plataformas digitales.",
    perfilEgreso: "Al egresar, contarás con conocimientos para diseñar, desarrollar, implementar y administrar soluciones tecnológicas en diferentes tipos de organizaciones. Podrás desempeñarte en desarrollo de software, bases de datos, redes, soporte tecnológico, seguridad informática, desarrollo web, consultoría tecnológica y gestión de proyectos digitales.",
    campoLaboral: ["Empresas tecnológicas", "Desarrollo de software", "Redes y soporte", "Seguridad informática", "Consultoría tecnológica"],
    planEstudios: ["Programación", "Redes", "Bases de Datos", "Desarrollo Web", "Seguridad Informática"]
  },
  {
    id: "maestria-derecho-penal",
    slug: "maestria-derecho-penal",
    level: "Maestría",
    title: "Maestría en Derecho Penal",
    icon: IconShieldCheck,
    shortDescription: "Especialízate en litigación penal, análisis jurídico, sistema acusatorio y estrategia legal con enfoque profesional.",
    heroDescription: "Fortalece tu perfil jurídico con conocimientos avanzados en derecho penal, litigación, sistema acusatorio y estrategia jurídica.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes"],
    modalities: ["Ejecutiva", "En línea"],
    duration: "2 años",
    terms: "6 cuatrimestres",
    benefits: ["Especialización en derecho penal.", "Formación para litigación estratégica.", "Análisis de casos penales.", "Docentes con experiencia práctica.", "Sala de Juicios Orales.", "Modalidad flexible para profesionistas."],
    perfilIngreso: "La Maestría en Derecho Penal está dirigida a profesionistas del área jurídica interesados en fortalecer su preparación en litigación, análisis penal, estrategia jurídica y sistema de justicia. Es ideal para licenciados en Derecho o perfiles afines que buscan especializarse en el ámbito penal.",
    perfilEgreso: "Al egresar, contarás con herramientas avanzadas para analizar casos penales, diseñar estrategias jurídicas, participar en procesos de litigación y comprender el funcionamiento del sistema penal desde una perspectiva crítica y profesional.",
    campoLaboral: ["Despachos jurídicos", "Fiscalías y tribunales", "Consultoría penal", "Gobierno y sector público", "Litigación independiente"],
    planEstudios: ["Litigación Penal", "Sistema Acusatorio", "Criminología", "Derechos Humanos", "Estrategia Jurídica"]
  },
  {
    id: "maestria-educacion",
    slug: "maestria-educacion",
    level: "Maestría",
    title: "Maestría en Educación",
    icon: IconCertificate,
    shortDescription: "Impulsa proyectos educativos, fortalece tu liderazgo académico y desarrolla estrategias de innovación educativa.",
    heroDescription: "Especialízate en gestión, innovación y liderazgo educativo para transformar procesos de enseñanza y aprendizaje.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes"],
    modalities: ["Ejecutiva", "En línea"],
    duration: "1 año 8 meses",
    terms: "5 cuatrimestres",
    benefits: ["Formación en innovación educativa.", "Liderazgo académico.", "Diseño curricular.", "Gestión de proyectos educativos.", "Evaluación educativa.", "Modalidad flexible para profesionistas."],
    perfilIngreso: "La Maestría en Educación está dirigida a profesionistas interesados en mejorar los procesos de enseñanza, gestión académica, innovación educativa y liderazgo institucional. Es ideal para docentes, coordinadores, directivos, capacitadores o personas vinculadas al sector educativo.",
    perfilEgreso: "Al egresar, contarás con habilidades para diseñar, dirigir, evaluar e innovar proyectos educativos con visión estratégica. Podrás desarrollarte en instituciones educativas, áreas de coordinación académica, capacitación empresarial, consultoría educativa, diseño curricular o gestión de programas formativos.",
    campoLaboral: ["Instituciones educativas", "Coordinación académica", "Capacitación empresarial", "Diseño curricular", "Consultoría educativa"],
    planEstudios: ["Innovación Educativa", "Gestión Académica", "Evaluación Educativa", "Diseño Curricular", "Liderazgo Educativo"]
  },
  {
    id: "doctorado-derecho",
    slug: "doctorado-derecho",
    level: "Doctorado",
    title: "Doctorado en Derecho",
    icon: IconCertificate,
    shortDescription: "Desarrolla investigación jurídica avanzada y fortalece tu perfil académico, profesional y de liderazgo legal.",
    heroDescription: "Consolida tu perfil jurídico con investigación avanzada, pensamiento crítico y capacidad para generar conocimiento especializado.",
    badges: ["RVOE Federal", "Becas disponibles", "Horarios flexibles"],
    campus: ["Campus Chalco", "Campus Reyes"],
    modalities: ["Ejecutiva", "En línea"],
    duration: "2 años",
    terms: "6 cuatrimestres",
    benefits: ["Investigación jurídica avanzada.", "Formación para docencia e investigación.", "Análisis jurídico especializado.", "Desarrollo de pensamiento crítico.", "Metodología jurídica.", "Modalidad flexible para profesionistas."],
    perfilIngreso: "El Doctorado en Derecho está dirigido a profesionistas con formación jurídica que desean profundizar en la investigación, el análisis crítico y la generación de conocimiento especializado. Es ideal para abogados, académicos, investigadores, docentes, consultores o profesionales del sector público y privado.",
    perfilEgreso: "Al egresar, contarás con habilidades avanzadas para desarrollar investigación jurídica, analizar problemáticas complejas y generar propuestas con impacto académico, institucional o profesional. Podrás desempeñarte en docencia, investigación, consultoría especializada, instituciones públicas, organismos jurídicos, litigación estratégica o alta dirección.",
    campoLaboral: ["Instituciones académicas", "Investigación jurídica", "Consultoría especializada", "Gobierno y sector público", "Litigación estratégica"],
    planEstudios: ["Investigación Jurídica", "Derecho Constitucional", "Argumentación Jurídica", "Derechos Humanos", "Metodología Jurídica"]
  }
];

export const ofertaFaq = [
  {
    question: "¿El programa cuenta con RVOE?",
    answer: "Sí, el programa cuenta con reconocimiento oficial de validez ante la SEP."
  },
  {
    question: "¿Qué duración tiene el programa?",
    answer: "La duración depende del programa. En esta página puedes consultar la duración y número de cuatrimestres correspondiente."
  },
  {
    question: "¿Qué modalidades manejan?",
    answer: "Las modalidades disponibles pueden ser escolarizada, ejecutiva y en línea, según el programa."
  },
  {
    question: "¿Puedo trabajar mientras estudio?",
    answer: "Sí, IUA cuenta con opciones de horarios flexibles pensadas para estudiantes que desean combinar su formación académica con actividades laborales o personales."
  },
  {
    question: "¿Hay becas disponibles?",
    answer: "Sí, puedes preguntar por las becas y descuentos disponibles. Un asesor puede ayudarte a revisar las opciones vigentes."
  },
  {
    question: "¿Cómo puedo iniciar mi proceso de inscripción?",
    answer: "Puedes solicitar información por WhatsApp o mediante el formulario de contacto. Un asesor te orientará paso a paso."
  }
];
