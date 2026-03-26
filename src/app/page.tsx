import Image from "next/image";
import Link from "next/link";
import ClientifyContactForm from "@/components/site/ClientifyContactForm";
import HomeHeroCarousel from "@/components/site/HomeHeroCarousel";
import ProgramCard from "@/components/site/ProgramCard";
import SectionHeading from "@/components/site/SectionHeading";
import {
  admissionActions,
  admissionsFormUrl,
  clientifyForms,
  homeCarouselSlides,
  homeStats,
  scheduleVisitUrl,
} from "@/lib/site-data";
import {
  getBlogCards,
  getCampusesContent,
  getFeaturedProgramsContent,
  getLevelBlocksContent,
} from "@/lib/wordpress/content";

export default async function HomePage() {
  const [blogPosts, campuses, levelBlocks, featuredPrograms] = await Promise.all([
    getBlogCards(3),
    getCampusesContent(),
    getLevelBlocksContent(),
    getFeaturedProgramsContent(),
  ]);

  return (
    <main>
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto w-full max-w-400 px-2 py-4 sm:px-4 md:px-6 lg:px-8 lg:py-6">
          <HomeHeroCarousel slides={homeCarouselSlides} />
        </div>
      </section>

      <section className="surface-band border-b border-gray-200">
        <div className="container-page grid gap-16 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <p className="eyebrow">Renovacion del sitio institucional</p>
            <h1 className="hero-title mt-4">
              Universidad IUA con experiencia digital mas clara, moderna y
              enfocada en conversion
            </h1>
            <div className="accent-line mt-6" />
            <p className="section-text mt-6 max-w-3xl">
              Recreacion completa de la arquitectura principal de iua.edu.mx
              con rutas por nivel academico, paginas por carrera y una base
              escalable para evolucionar el contenido institucional.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/oferta-educativa-iua" className="btn-primary">
                Ver oferta educativa
              </Link>
              <a
                href={admissionsFormUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Inscripciones en linea
              </a>
            </div>
          </div>

          <aside className="card-soft">
            <p className="eyebrow">Indicadores institucionales</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {homeStats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-2xl border border-gray-200 bg-white p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-black">
                    {stat.value}
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section>
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Oferta educativa IUA"
            title="Niveles academicos organizados para una navegacion directa"
            description="La estructura conserva el mapa principal del sitio original: secundaria, bachillerato, licenciaturas y posgrados."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {levelBlocks.map((level) => (
              <Link
                key={level.title}
                href={level.href}
                className="card transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative mb-4 h-36 overflow-hidden rounded-2xl border border-gray-200">
                  <Image
                    src={level.image}
                    alt={level.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-(--color-secondary)">
                  {level.title}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-black">
                  {level.items.length} programas disponibles
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-700">
                  {level.description}
                </p>
                <span className="mt-6 inline-flex text-sm font-medium text-(--color-primary) underline underline-offset-4">
                  Explorar nivel
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <ClientifyContactForm
              title="Solicita informacion de licenciaturas"
              description="Deja tus datos y el equipo de admisiones te contacta para resolver dudas sobre planes de estudio, becas y proceso de ingreso."
              formUrl={clientifyForms.licenciaturas}
              compact
            />
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Programas destacados"
            title="Carreras y posgrados separados por identidad"
            description="Cada programa cuenta con color de acento propio para lectura rapida y jerarquia visual consistente."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>

          <div className="mt-12">
            <ClientifyContactForm
              title="Solicita informacion de posgrados"
              description="Formulario conectado a Clientify para maestrias y doctorado."
              formUrl={clientifyForms.maestrias}
              compact
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Admisiones"
            title="Accesos rapidos para captar prospectos"
            description="Se conserva la logica comercial del sitio institucional: formularios de inscripcion, contacto y agenda de visitas."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {admissionActions.map((action) => (
              <a
                key={action.title}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className="card transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-lg font-semibold text-black">
                  {action.title}
                </p>
                <span className="mt-4 inline-flex text-sm font-medium text-(--color-primary) underline underline-offset-4">
                  Abrir formulario
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Explora IUA"
            title="Campus y centros de atencion visibles desde la home"
            description="Ubicaciones, telefonos y contacto centralizados para mejorar confianza y conversion."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {campuses.map((campus) => (
              <article key={campus.id} className="card">
                <h3 className="text-xl font-semibold text-black">
                  {campus.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-700">
                  {campus.address}
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  {campus.reference}
                </p>
                <p className="mt-4 text-sm font-semibold text-black">
                  {campus.phones.join(" | ")}
                </p>
                <Link
                  href={`/contactanos#${campus.id}`}
                  className="mt-6 inline-flex text-sm font-medium text-(--color-primary) underline underline-offset-4"
                >
                  Ver informacion completa
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Comunidad y blog"
              title="Publicaciones recientes del sitio IUA"
            />
            <Link
              href="/blog"
              className="text-sm font-medium text-(--color-primary) underline underline-offset-4"
            >
              Ver todas las publicaciones
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="card transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-(--color-secondary)">
                  {post.category}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-black">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm text-gray-500">
                  {post.date}
                </p>
                <span className="mt-6 inline-flex text-sm font-medium text-(--color-primary) underline underline-offset-4">
                  Leer articulo
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--color-secondary)">
              Convocatorias y contacto
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Un sitio claro tambien debe convertir mejor
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/80 md:text-lg">
              Integramos arquitectura por carrera, rutas de admision y acceso
              rapido a campus para una experiencia institucional completa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={admissionsFormUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
              >
                Inscribirme ahora
              </a>
              <a
                href={scheduleVisitUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Agendar visita a campus
              </a>
            </div>
          </div>

          <aside className="overflow-hidden rounded-3xl border border-white/15 bg-white/5">
            <div className="relative aspect-16/10 w-full">
              <Image
                src={homeCarouselSlides[3].image}
                alt={homeCarouselSlides[3].title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-secondary)">
                  {homeCarouselSlides[3].label}
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {homeCarouselSlides[3].title}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
