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
import { usePageSeo } from "../../utils/seo";
import { campusSlugFromLabel } from "../../config/institution";
import { breadcrumbSchema, educationalProgramSchema } from "../../utils/structuredData";
import Breadcrumbs from "../Breadcrumbs";
import JsonLd from "../JsonLd";
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
  const campusText = program.campus.join(", ");
  const description = `${program.title} en Universidad IUA: perfil de ingreso y egreso, áreas de formación, duración, modalidades y disponibilidad en ${campusText}.`;
  const keywords = uniqueKeywords([
    program.title,
    `${program.title} IUA`,
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

  if (!program) {
    return <NotFound />;
  }

  const breadcrumbs = [
    { name: "Inicio", path: "/" },
    { name: "Oferta educativa", path: "/oferta" },
    { name: program.title, path: `/oferta/${program.slug}` }
  ];

  return (
    <main className="oferta-page">
      <JsonLd id="program-jsonld" data={[educationalProgramSchema(program), breadcrumbSchema(breadcrumbs)]} />
      <ProgramHero program={program} />

      <div className="program-layout">
        <Breadcrumbs items={breadcrumbs} />
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
                {program.campus.map((campus) => { const slug = campusSlugFromLabel(campus); return slug ? <Link key={campus} to={`/campus#campus-${slug}`} className="oferta-chip oferta-chip--muted">{campus}</Link> : <span key={campus} className="oferta-chip oferta-chip--muted">{campus}</span>; })}
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
              {program.campus.map((campus) => { const slug = campusSlugFromLabel(campus); return <li key={campus}><IconMapPin size={19} /> {slug ? <Link to={`/campus#campus-${slug}`}>{campus}</Link> : campus}</li>; })}
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
          <FaqAccordion program={program} />
        </InfoSection>

        <section className="program-quiz-link"><div><p className="program-section__eyebrow">Orientación vocacional</p><h2>¿No sabes si este programa es para ti?</h2><p>Compara tus intereses con distintas áreas mediante nuestro test orientativo gratuito.</p></div><Link to="/que-carrera-estudiar" className="oferta-button">Realizar test vocacional</Link></section>

        <CtaBlock />
      </div>
    </main>
  );
}
