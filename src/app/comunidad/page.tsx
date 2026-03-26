import Link from "next/link";
import SectionHeading from "@/components/site/SectionHeading";
import { communityResources } from "@/lib/site-data";

const scholarships = [
  "Beca de apoyo",
  "Beca de pertenencia",
  "Beca pase directo",
  "Beca deportiva",
  "Beca vecindad",
];

export default function ComunidadPage() {
  return (
    <main>
      <section className="surface-band border-b border-[var(--color-gray-200)]">
        <div className="container-page py-16 lg:py-20">
          <p className="eyebrow">Comunidad IUA</p>
          <h1 className="hero-title mt-3">
            Recursos academicos, reglamentos y vida universitaria
          </h1>
          <div className="accent-line mt-6" />
          <p className="section-text mt-6 max-w-4xl">
            Seccion reconstruida para centralizar documentos clave, beneficios y
            servicios para estudiantes de todos los niveles.
          </p>
        </div>
      </section>

      <section>
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Recursos"
            title="Accesos institucionales"
            description="Documentacion y herramientas visibles desde una sola pantalla."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {communityResources.map((resource) => (
              <article key={resource} className="card">
                <h2 className="text-lg font-semibold text-[var(--color-black)]">
                  {resource}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-gray-700)]">
                  Recurso disponible para consulta y acompanamiento academico.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Becas IUA"
            title="Opciones de apoyo para tu trayectoria"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {scholarships.map((item) => (
              <article key={item} className="card-soft">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">
                  {item}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-gray-700)]">
                  Solicita informacion personalizada en admisiones.
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/contactanos" className="btn-primary">
              Solicitar informacion de becas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
