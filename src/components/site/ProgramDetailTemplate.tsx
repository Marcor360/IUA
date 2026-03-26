import ClientifyContactForm from "@/components/site/ClientifyContactForm";
import Link from "next/link";
import Image from "next/image";
import type { Program } from "@/lib/site-data";
import {
  getClientifyFormByLevel,
  scheduleVisitUrl,
  studyNav,
} from "@/lib/site-data";

type ProgramDetailTemplateProps = {
  program: Program;
  relatedPrograms: Program[];
};

export default function ProgramDetailTemplate({
  program,
  relatedPrograms,
}: ProgramDetailTemplateProps) {
  return (
    <main>
      <section
        className="border-b"
        style={{
          borderColor: program.accent,
          background: `linear-gradient(140deg, ${program.soft} 0%, var(--color-white) 65%)`,
        }}
      >
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:py-20">
          <div>
            <p className="eyebrow">Oferta educativa IUA</p>
            <h1 className="hero-title mt-3">{program.title}</h1>
            <p className="section-text mt-6">{program.pitch}</p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-[var(--color-gray-300)] bg-white px-3 py-1">
                Modalidad: {program.modality}
              </span>
              <span className="rounded-full border border-[var(--color-gray-300)] bg-white px-3 py-1">
                Duracion: {program.duration}
              </span>
              <span className="rounded-full border border-[var(--color-gray-300)] bg-white px-3 py-1">
                Horario: {program.schedule}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={getClientifyFormByLevel(program.level)}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Quiero inscribirme
              </a>
              <a
                href={scheduleVisitUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Agendar visita
              </a>
            </div>
          </div>

          <div className="card-soft">
            <Image
              src={program.heroImage}
              alt={`Imagen de ${program.title}`}
              width={466}
              height={120}
              className="w-full rounded-2xl border border-[var(--color-gray-200)] bg-white p-2"
            />

            <p className="mt-5 text-sm font-medium text-[var(--color-gray-500)]">
              Campus con oferta disponible
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {program.campus.map((campus) => (
                <span
                  key={campus}
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: program.accent, color: "var(--color-white)" }}
                >
                  {campus}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-16">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="card">
              <p className="eyebrow">Perfil del programa</p>
              <h2 className="section-title mt-3">Lo que vas a desarrollar</h2>
              <p className="section-text mt-4">{program.summary}</p>

              <ul className="mt-8 space-y-3 text-sm leading-7 text-[var(--color-gray-700)]">
                {program.focusAreas.map((area) => (
                  <li key={area} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="card-soft">
              <p className="eyebrow">Ruta academica</p>
              <h2 className="section-title mt-3">Siguiente paso recomendado</h2>
              <p className="section-text mt-4">
                Recibe asesoria personalizada para conocer plan de estudios,
                colegiaturas, becas y requisitos de ingreso.
              </p>

              <div className="mt-8 space-y-3">
                <Link href="/inscripciones-online" className="btn-primary w-full">
                  Ver proceso de inscripcion
                </Link>
                <Link href="/contactanos" className="btn-secondary w-full">
                  Contactar admisiones
                </Link>
              </div>
            </article>
          </div>

          <div className="mt-10">
            <ClientifyContactForm
              title={`Formulario de contacto para ${program.shortTitle}`}
              description="Este formulario esta conectado a Clientify para seguimiento directo de admisiones."
              formUrl={getClientifyFormByLevel(program.level)}
              compact
            />
          </div>
        </div>
      </section>

      {relatedPrograms.length ? (
        <section className="section-light">
          <div className="container-page py-16">
            <p className="eyebrow">Mas programas</p>
            <h2 className="section-title mt-3">Opciones relacionadas</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {relatedPrograms.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${related.slug}`}
                  className="card transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-[var(--color-black)]">
                    {related.shortTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-gray-700)]">
                    {related.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-dark">
        <div className="container-page py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Navegacion academica
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {studyNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
