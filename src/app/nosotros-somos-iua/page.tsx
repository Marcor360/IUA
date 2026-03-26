import Link from "next/link";
import SectionHeading from "@/components/site/SectionHeading";

const pillars = [
  {
    title: "Modelo educativo humanista",
    text: "Formacion academica con enfoque etico, compromiso social y desarrollo integral de cada estudiante.",
  },
  {
    title: "Docencia con experiencia aplicada",
    text: "Profesores que conectan teoria con practica profesional para preparar perfiles competitivos.",
  },
  {
    title: "Vinculacion institucional",
    text: "Acompaniamiento en trayectorias academicas y proyeccion profesional desde cada campus.",
  },
];

export default function NosotrosPage() {
  return (
    <main>
      <section className="surface-band border-b border-[var(--color-gray-200)]">
        <div className="container-page py-16 lg:py-20">
          <p className="eyebrow">Nosotros</p>
          <h1 className="hero-title mt-3">Somos IUA</h1>
          <div className="accent-line mt-6" />
          <p className="section-text mt-6 max-w-4xl">
            Universidad IUA es una institucion comprometida con la formacion de
            profesionistas integros, competitivos y con alto sentido humano,
            capaces de contribuir al desarrollo de su comunidad.
          </p>
        </div>
      </section>

      <section>
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Identidad institucional"
            title="Principios que sostienen nuestra propuesta educativa"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="card">
                <h2 className="text-xl font-semibold text-[var(--color-black)]">
                  {pillar.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-gray-700)]">
                  {pillar.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Propuesta academica
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Construimos trayectorias desde secundaria hasta doctorado
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/80 md:text-lg">
            La nueva arquitectura digital conecta mejor niveles academicos,
            campus y procesos de admision para facilitar la toma de decision.
          </p>
          <div className="mt-8">
            <Link href="/oferta-educativa-iua" className="btn-gold">
              Conocer oferta educativa
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
