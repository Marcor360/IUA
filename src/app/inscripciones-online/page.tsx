import ClientifyContactForm from "@/components/site/ClientifyContactForm";
import {
  admissionActions,
  admissionsFormUrl,
  clientifyForms,
  scheduleVisitUrl,
} from "@/lib/site-data";

const steps = [
  {
    title: "1. Elige nivel o carrera",
    text: "Selecciona el programa academico que deseas estudiar desde la oferta educativa.",
  },
  {
    title: "2. Completa tu formulario",
    text: "Registra tus datos en la plataforma de admisiones para iniciar seguimiento personalizado.",
  },
  {
    title: "3. Recibe asesoria",
    text: "El equipo de admisiones te orienta sobre requisitos, becas, pagos y fecha de inicio.",
  },
  {
    title: "4. Confirma tu ingreso",
    text: "Finaliza documentacion y asegura tu lugar en el campus de tu preferencia.",
  },
];

export default function InscripcionesOnlinePage() {
  return (
    <main>
      <section className="surface-band border-b border-[var(--color-gray-200)]">
        <div className="container-page py-16 lg:py-20">
          <p className="eyebrow">Inscripciones online</p>
          <h1 className="hero-title mt-3">
            Inicia tu proceso de admision en IUA
          </h1>
          <div className="accent-line mt-6" />
          <p className="section-text mt-6 max-w-4xl">
            Pagina enfocada en conversion con formularios por nivel academico y
            acceso directo a asesoria de admisiones.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={admissionsFormUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Abrir formulario general
            </a>
            <a
              href={scheduleVisitUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Agendar una visita
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-16">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article key={step.title} className="card">
                <h2 className="text-lg font-semibold text-[var(--color-black)]">
                  {step.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-gray-700)]">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container-page py-16">
          <p className="eyebrow">Formularios por nivel</p>
          <h2 className="section-title mt-3">Accesos rapidos de captacion</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {admissionActions.map((action) => (
              <a
                key={action.title}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className="card transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-lg font-semibold text-[var(--color-black)]">
                  {action.title}
                </p>
                <span className="mt-4 inline-flex text-sm font-medium text-[var(--color-primary)] underline underline-offset-4">
                  Abrir formulario
                </span>
              </a>
            ))}
          </div>

          <div className="mt-12">
            <ClientifyContactForm
              title="Formulario de contacto para admisiones"
              description="Formulario integrado con Clientify para seguimiento automatico del equipo comercial."
              formUrl={clientifyForms.licenciaturas}
              compact
            />
          </div>
        </div>
      </section>
    </main>
  );
}
