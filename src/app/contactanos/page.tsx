import ClientifyContactForm from "@/components/site/ClientifyContactForm";
import { clientifyForms, scheduleVisitUrl } from "@/lib/site-data";
import { getCampusesContent } from "@/lib/wordpress/content";

export default async function ContactanosPage() {
  const campuses = await getCampusesContent();

  return (
    <main>
      <section className="surface-band border-b border-[var(--color-gray-200)]">
        <div className="container-page py-16 lg:py-20">
          <p className="eyebrow">Contacto</p>
          <h1 className="hero-title mt-3">
            Informacion operativa por campus IUA
          </h1>
          <div className="accent-line mt-6" />
          <p className="section-text mt-6 max-w-4xl">
            Direcciones, telefonos, correo institucional y horarios en una sola
            pantalla para facilitar admisiones y visitas.
          </p>
        </div>
      </section>

      <section>
        <div className="container-page space-y-10 py-16">
          {campuses.map((campus) => (
            <article
              key={campus.id}
              id={campus.id}
              className="card grid gap-8 lg:grid-cols-[1fr_1fr]"
            >
              <div>
                <p className="eyebrow">{campus.id}</p>
                <h2 className="section-title mt-3">{campus.title}</h2>

                <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-gray-700)]">
                  <div>
                    <p className="font-semibold text-[var(--color-black)]">
                      Direccion
                    </p>
                    <p>{campus.address}</p>
                    <p className="text-[var(--color-gray-500)]">
                      {campus.reference}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-black)]">
                      Contacto
                    </p>
                    {campus.phones.map((phone) => (
                      <p key={phone}>{phone}</p>
                    ))}
                    <p>{campus.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-black)]">
                      Horario de atencion
                    </p>
                    <p>{campus.hours}</p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      campus.mapQuery,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    Ver en mapa
                  </a>
                  <a
                    href={scheduleVisitUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    Agendar cita
                  </a>
                </div>
              </div>

              <div className="card-soft p-3">
                <iframe
                  title={`Mapa ${campus.title}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    campus.mapQuery,
                  )}&t=m&z=16&output=embed&iwloc=near`}
                  loading="lazy"
                  className="h-[320px] w-full rounded-2xl border border-[var(--color-gray-200)]"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-light">
        <div className="container-page py-16">
          <ClientifyContactForm
            title="Formulario de contacto institucional"
            description="Canal oficial de contacto conectado con Clientify para seguimiento de admisiones."
            formUrl={clientifyForms.licenciaturas}
          />
        </div>
      </section>
    </main>
  );
}
