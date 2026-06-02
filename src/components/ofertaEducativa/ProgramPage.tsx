import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  IconArrowLeft,
  IconBuildingCommunity,
  IconCalendarStats,
  IconCheck,
  IconMapPin,
  IconRosetteDiscountCheck
} from "@tabler/icons-react";
import { ofertaEducativa } from "../../data/ofertaEducativa";
import NotFound from "../../page/notFound";
import { SITE_URL, usePageSeo } from "../../utils/seo";
import CtaBlock from "./CtaBlock";
import FaqAccordion from "./FaqAccordion";
import InfoSection from "./InfoSection";
import ProgramHero from "./ProgramHero";
import "../../styles/ofertaEducativa.css";

const generalProgramKeywords = [
  "Universidad IUA",
  "oferta educativa IUA",
  "carreras IUA",
  "licenciaturas IUA",
  "posgrados IUA",
  "becas IUA",
  "RVOE SEP",
  "estudiar en IUA",
  "campus Chalco",
  "campus Los Reyes",
  "campus Texcoco",
  "Conecta IUA",
  "Plantel virtual"
];

type Program = (typeof ofertaEducativa)[number];

function uniqueKeywords(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function buildProgramSeo(program: Program) {
  const online = program.modalities.includes("En línea");
  const titleSuffix = online ? "en línea | Universidad IUA" : "en IUA | Universidad IUA";
  const title = `${program.title} ${titleSuffix}`;
  const modalityText = program.modalities.join(", ");
  const campusText = program.campus.join(", ");
  const description = `${program.title} en Universidad IUA. Estudia en modalidad ${modalityText}, con RVOE, becas disponibles, duración de ${program.duration} y atención en ${campusText}.`;
  const keywords = uniqueKeywords([
    program.title,
    `${program.title} IUA`,
    `${program.title} con RVOE`,
    `${program.title} becas`,
    `${program.level} IUA`,
    ...program.modalities.map((modality) => `${program.title} ${modality.toLowerCase()}`),
    ...program.campus.map((campus) => `${program.title} ${campus}`),
    ...program.planEstudios,
    ...program.campoLaboral,
    ...(program.seoKeywords ?? []),
    ...generalProgramKeywords
  ]);

  return { title, description, keywords };
}

export default function ProgramPage({ slug }: { slug?: string }) {
  const params = useParams();
  const programSlug = slug ?? params.slug ?? "";
  const program = ofertaEducativa.find((item) => item.slug === programSlug);
  const seo = program ? buildProgramSeo(program) : null;

  usePageSeo({
    title: seo?.title ?? "Programa no encontrado | Universidad IUA",
    description: seo?.description ?? "El programa solicitado no está disponible en la oferta educativa de Universidad IUA.",
    keywords: seo?.keywords ?? generalProgramKeywords,
    path: program ? `/oferta/${program.slug}` : "/oferta",
    image: "/banners/educacion-2-banner-recorte-1920x700.webp",
    type: "article"
  });

  useEffect(() => {
    const scriptId = "program-course-jsonld";
    document.getElementById(scriptId)?.remove();
    if (!program) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      name: program.title,
      description: seo?.description ?? program.shortDescription,
      url: `${SITE_URL}/oferta/${program.slug}`,
      inLanguage: "es-MX",
      keywords: seo?.keywords.join(", "),
      provider: {
        "@type": "CollegeOrUniversity",
        name: "Universidad IUA",
        url: SITE_URL
      },
      educationalLevel: program.level,
      educationalCredentialAwarded: program.title,
      timeRequired: program.duration,
      courseMode: program.modalities,
      areaServed: program.campus,
      hasCourseInstance: program.modalities.map((modality) => ({
        "@type": "CourseInstance",
        courseMode: modality,
        courseWorkload: program.duration,
        location: program.campus.join(", ")
      }))
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [program]);

  if (!program) {
    return <NotFound />;
  }

  return (
    <main className="oferta-page">
      <ProgramHero program={program} />

      <div className="program-layout">
        <Link to="/oferta" className="program-back">
          <IconArrowLeft size={17} /> Volver a oferta educativa
        </Link>

        <div className="program-grid">
          <InfoSection eyebrow="Beneficios" title="Por qué estudiar este programa en IUA">
            <ul className="program-list program-list--cards">
              {program.benefits.map((benefit) => (
                <li key={benefit}><IconCheck size={19} /> {benefit}</li>
              ))}
            </ul>
          </InfoSection>

          <aside className="program-summary">
            <h2>Información clave</h2>
            <div className="program-summary__item">
              <IconCalendarStats size={22} />
              <div><strong>Duración</strong><span>{program.duration}</span></div>
            </div>
            <div className="program-summary__item">
              <IconRosetteDiscountCheck size={22} />
              <div><strong>Periodo</strong><span>{program.terms}</span></div>
            </div>
            <div className="program-summary__block">
              <strong>Modalidades disponibles</strong>
              <div className="oferta-chip-list">
                {program.modalities.map((modality) => <span key={modality} className="oferta-chip">{modality}</span>)}
              </div>
            </div>
            <div className="program-summary__block">
              <strong>Campus</strong>
              <div className="oferta-chip-list">
                {program.campus.map((campus) => <span key={campus} className="oferta-chip oferta-chip--muted">{campus}</span>)}
              </div>
            </div>
          </aside>
        </div>

        <div className="program-two-columns">
          <InfoSection eyebrow="Perfil de ingreso" title="Para quién es este programa" text={program.perfilIngreso} />
          <InfoSection eyebrow="Perfil de egreso" title="Qué podrás lograr al egresar" text={program.perfilEgreso} />
        </div>

        <div className="program-two-columns">
          <InfoSection eyebrow="Campo laboral" title="Dónde podrás desarrollarte">
            <ul className="program-list">
              {program.campoLaboral.map((item) => (
                <li key={item}><IconBuildingCommunity size={19} /> {item}</li>
              ))}
            </ul>
          </InfoSection>

          <InfoSection eyebrow="Campus y modalidad" title="Disponibilidad del programa">
            <ul className="program-list">
              {program.campus.map((campus) => (
                <li key={campus}><IconMapPin size={19} /> {campus}</li>
              ))}
            </ul>
            <div className="program-inline-chips">
              {program.modalities.map((modality) => <span key={modality}>{modality}</span>)}
            </div>
          </InfoSection>
        </div>

        <InfoSection eyebrow="Plan de estudios" title="Áreas de formación" text="Conoce algunas de las áreas académicas principales del programa." >
          <div id="plan-estudios" className="program-subjects">
            {program.planEstudios.map((subject) => (
              <span key={subject}>{subject}</span>
            ))}
          </div>
        </InfoSection>

        <InfoSection eyebrow="Becas" title="Pregunta por becas disponibles" text="IUA cuenta con opciones de becas y descuentos disponibles según convocatoria, sede y proceso de inscripción. Un asesor puede ayudarte a revisar las opciones vigentes." />

        <InfoSection eyebrow="Preguntas frecuentes" title="Dudas comunes antes de inscribirte">
          <FaqAccordion />
        </InfoSection>

        <CtaBlock />
      </div>
    </main>
  );
}
