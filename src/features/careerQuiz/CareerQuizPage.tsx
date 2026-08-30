import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { IconArrowRight, IconBrain, IconRefresh } from "@tabler/icons-react";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { trackEvent } from "../../utils/analytics";
import { usePageSeo } from "../../utils/seo";
import { breadcrumbSchema } from "../../utils/structuredData";
import { careers, questions } from "./data";
import { dominantDimensions, rankCareers, scoreAnswers } from "./scoring";
import { sectionBreadcrumbs } from "../../config/breadcrumbs";

const dimensionNames = { R: "Realista", I: "Investigador", A: "Artístico", S: "Social", E: "Emprendedor", C: "Convencional" } as const;
const breadcrumbs = sectionBreadcrumbs("quiz");

export default function CareerQuizPage() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState(false);
  const current = questions.find((question) => !answers[question.id]);
  const results = useMemo(() => rankCareers(scoreAnswers(questions, answers), careers), [answers]);
  const dominant = dominantDimensions(scoreAnswers(questions, answers));

  usePageSeo({ title: "¿Qué carrera estudiar? Test vocacional gratuito | Universidad IUA", description: "Conoce factores para elegir una carrera y realiza un test vocacional RIASEC gratuito, sin registro y con resultados explicables.", path: "/que-carrera-estudiar" });

  function begin() { setStarted(true); trackEvent("career_quiz_start"); }
  function answer(optionId: string) {
    if (!current) return;
    const next = { ...answers, [current.id]: optionId };
    setAnswers(next);
    if (Object.keys(next).length === questions.length) { setComplete(true); trackEvent("career_quiz_complete"); }
  }
  function reset() { setStarted(false); setComplete(false); setAnswers({}); }

  return (
    <main className="oferta-page quiz-page">
      <JsonLd id="quiz-breadcrumb-jsonld" data={breadcrumbSchema(breadcrumbs)} />
      <section className="oferta-hero"><div className="oferta-hero__inner"><div><p className="oferta-hero__eyebrow">Orientación vocacional</p><h1>¿Qué carrera estudiar?</h1><p>Elegir una carrera implica relacionar tus intereses, habilidades, materias preferidas y estilo de trabajo. Este test usa un modelo RIASEC determinista para ayudarte a explorar opciones; no sustituye una orientación profesional.</p></div><div className="program-hero__panel"><IconBrain size={44} /><p className="program-hero__note">{questions.length} preguntas · resultados inmediatos · sin pedir datos personales</p></div></div></section>
      <div className="program-layout">
        <Breadcrumbs items={breadcrumbs} />
        <section className="program-section quiz-intro">
          <p className="program-section__eyebrow">Antes de comenzar</p><h2>Cómo elegir una carrera con más claridad</h2>
          <p className="program-section__text">Considera qué actividades disfrutas, las asignaturas que te interesan, el entorno laboral que prefieres y el tipo de problemas que quieres resolver. La orientación vocacional organiza esas señales; no dicta una decisión única.</p>
          <div className="program-two-columns"><div><h3>¿Cómo funciona?</h3><p>Las respuestas suman puntos en seis dimensiones RIASEC. Después comparamos tu perfil con perfiles ocupacionales preparados para esta herramienta y mostramos las coincidencias de mayor afinidad.</p></div><div><h3>¿Qué resultados ofrece?</h3><p>Verás tus dimensiones dominantes, opciones de carrera, una afinidad orientativa y enlaces secundarios a programas relacionados disponibles en IUA.</p></div></div>
        </section>

        {!started && <section className="quiz-card"><h2>Descubre áreas compatibles con tus intereses</h2><p>No hay respuestas correctas. Elige la opción que más se parezca a ti hoy.</p><button className="oferta-button" onClick={begin}>Comenzar test <IconArrowRight size={18} /></button></section>}
        {started && !complete && current && <section className="quiz-card" aria-live="polite"><div className="quiz-progress"><span>Pregunta {Object.keys(answers).length + 1} de {questions.length}</span><progress value={Object.keys(answers).length} max={questions.length} /></div><h2>{current.prompt}</h2><div className="quiz-options">{current.options.map((option) => <button key={option.id} onClick={() => answer(option.id)}>{option.label}</button>)}</div></section>}
        {complete && <section className="quiz-results" aria-live="polite">
          <p className="program-section__eyebrow">Tu perfil orientativo</p>
          <h2>{dimensionNames[dominant[0]]} + {dimensionNames[dominant[1]]}</h2>
          <p>Estas dimensiones reflejan tus respuestas actuales. Explora las opciones y contrástalas con planes de estudio, requisitos y experiencias reales.</p>
          <h3>Resultados vocacionales generales</h3>
          <div className="quiz-result-grid">{results.slice(0, 4).map((career, index) => <article key={career.id}><span>Opción {index + 1}</span><h3>{career.name}</h3><strong>{career.affinity}% de afinidad orientativa</strong><p>{career.explanation}</p></article>)}</div>
          <h3>Opciones relacionadas disponibles en Universidad IUA</h3>
          <ul className="program-list">{results.slice(0, 4).filter((career) => career.iuaProgramSlug).map((career) => <li key={career.id}><Link to={`/oferta/${career.iuaProgramSlug}`} onClick={() => trackEvent("career_iua_program_click", { program: career.iuaProgramSlug! })}>{career.name} <IconArrowRight size={16} /></Link></li>)}</ul>
          <button className="oferta-button" onClick={reset}>Repetir test <IconRefresh size={18} /></button>
        </section>}
      </div>
    </main>
  );
}
