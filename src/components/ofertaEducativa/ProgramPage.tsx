import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IconArrowLeft,
  IconBuildingCommunity,
  IconCalendarStats,
  IconCheck,
  IconMapPin,
  IconRosetteDiscountCheck
} from "@tabler/icons-react";
import { ofertaEducativa } from "../../data/ofertaEducativa";
import { SITE_URL, usePageSeo } from "../../utils/seo";
import CtaBlock from "./CtaBlock";
import FaqAccordion from "./FaqAccordion";
import InfoSection from "./InfoSection";
import ProgramHero from "./ProgramHero";
import "../../styles/ofertaEducativa.css";

export default function ProgramPage({ slug }: { slug: string }) {
  const program = ofertaEducativa.find((item) => item.slug === slug);

  usePageSeo({
    title: program ? `${program.title} | Oferta Educativa IUA` : "Programa no encontrado | Universidad IUA",
    description: program
      ? `${program.title}: ${program.shortDescription} Consulta modalidades, campus, duración, plan de estudios y becas disponibles en IUA.`
      : "El programa solicitado no está disponible en la oferta educativa de Universidad IUA.",
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
      description: program.shortDescription,
      url: `${SITE_URL}/oferta/${program.slug}`,
      provider: {
        "@type": "CollegeOrUniversity",
        name: "Universidad IUA",
        url: SITE_URL
      },
      educationalCredentialAwarded: program.level,
      timeRequired: program.duration,
      courseMode: program.modalities,
      areaServed: program.campus
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [program]);

  if (!program) {
    return (
      <main className="oferta-page">
        <section className="oferta-empty">
          <h1>Programa no encontrado</h1>
          <p>El programa que buscas no está disponible en la oferta educativa actual.</p>
          <Link to="/oferta" className="oferta-button">Volver a oferta educativa</Link>
        </section>
      </main>
    );
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
