import ClientifyContactForm from "@/components/site/ClientifyContactForm";
import Link from "next/link";
import ProgramCard from "@/components/site/ProgramCard";
import SectionHeading from "@/components/site/SectionHeading";
import { getLevelBlocksContent } from "@/lib/wordpress/content";

export default async function OfertaEducativaPage() {
  const levelBlocks = await getLevelBlocksContent();

  return (
    <main>
      <section className="surface-band border-b border-gray-200">
        <div className="container-page py-16 lg:py-20">
          <p className="eyebrow">Oferta educativa IUA</p>
          <h1 className="hero-title mt-3">
            Programas academicos organizados por nivel y carrera
          </h1>
          <div className="accent-line mt-6" />
          <p className="section-text mt-6 max-w-4xl">
            Esta pagina centraliza la estructura institucional para secundaria,
            bachillerato, licenciaturas y posgrados, con navegacion separada
            por programa para mejorar descubrimiento y conversion.
          </p>
        </div>
      </section>

      <section>
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Ruta academica"
            title="Elige nivel y despues carrera"
            description="Cada bloque agrupa programas reales del sitio iua.edu.mx y los presenta con componentes reutilizables."
          />

          <div className="mt-10 space-y-14">
            {levelBlocks.map((level) => (
              <div key={level.title}>
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-3xl">
                    <p className="eyebrow">{level.title}</p>
                    <h2 className="section-title mt-3">{level.description}</h2>
                  </div>
                  <Link href={level.href} className="btn-secondary">
                    Ver pagina del nivel
                  </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {level.items.map((program) => (
                    <ProgramCard key={program.slug} program={program} />
                  ))}
                </div>

                <div className="mt-8">
                  <ClientifyContactForm
                    title={`Formulario de contacto - ${level.title}`}
                    description="Deja tus datos para recibir asesoria academica de este nivel."
                    formUrl={level.formUrl}
                    compact
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
