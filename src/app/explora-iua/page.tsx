import Image from "next/image";
import SectionHeading from "@/components/site/SectionHeading";
import { scheduleVisitUrl } from "@/lib/site-data";
import { getCampusesContent } from "@/lib/wordpress/content";

const gallery = [
  "https://iua.edu.mx/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-28-at-3.34.32-PM-480x320.jpeg",
  "https://iua.edu.mx/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-29-at-9.38.12-AM-480x320.jpeg",
  "https://iua.edu.mx/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-22-at-12.34.49-PMn-480x320.jpeg",
];

export default async function ExploraIuaPage() {
  const campuses = await getCampusesContent();

  return (
    <main>
      <section className="surface-band border-b border-[var(--color-gray-200)]">
        <div className="container-page py-16 lg:py-20">
          <p className="eyebrow">Explora IUA</p>
          <h1 className="hero-title mt-3">
            Conoce nuestros campus y espacios academicos
          </h1>
          <div className="accent-line mt-6" />
          <p className="section-text mt-6 max-w-4xl">
            Esta seccion replica la experiencia de campus del sitio original y
            mejora la presentacion visual con tarjetas consistentes y acceso
            rapido a cita presencial.
          </p>
        </div>
      </section>

      <section>
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Campus"
            title="Presencia fisica en Chalco, Reyes y Texcoco"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {campuses.map((campus) => (
              <article key={campus.id} className="card">
                <h2 className="text-xl font-semibold text-[var(--color-black)]">
                  {campus.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-gray-700)]">
                  {campus.address}
                </p>
                <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                  {campus.reference}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    campus.mapQuery,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex text-sm font-medium text-[var(--color-primary)] underline underline-offset-4"
                >
                  Abrir mapa
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Vida en campus"
            title="Galeria institucional"
            description="Se integra una muestra visual para reforzar confianza y cercania con futuros estudiantes."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {gallery.map((image) => (
              <article key={image} className="card p-3">
                <Image
                  src={image}
                  alt="Campus IUA"
                  width={480}
                  height={320}
                  className="h-56 w-full rounded-2xl object-cover"
                />
              </article>
            ))}
          </div>

          <div className="mt-10">
            <a
              href={scheduleVisitUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Agendar visita guiada
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
