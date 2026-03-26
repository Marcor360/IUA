import ClientifyContactForm from "@/components/site/ClientifyContactForm";
import Link from "next/link";
import ProgramCard from "@/components/site/ProgramCard";
import SectionHeading from "@/components/site/SectionHeading";
import type { Program } from "@/lib/site-data";

type LevelOverviewPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  formUrl: string;
  formTitle: string;
  programs: Program[];
};

export default function LevelOverviewPage({
  eyebrow,
  title,
  description,
  heroCtaLabel,
  heroCtaHref,
  formUrl,
  formTitle,
  programs,
}: LevelOverviewPageProps) {
  return (
    <main>
      <section className="border-b border-[var(--color-gray-200)]">
        <div className="container-page py-16 lg:py-20">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="hero-title mt-3">{title}</h1>
          <div className="accent-line mt-6" />
          <p className="section-text mt-6 max-w-4xl">{description}</p>
          <div className="mt-8">
            <Link href={heroCtaHref} className="btn-primary">
              {heroCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Programas disponibles"
            title="Selecciona el programa ideal para tu perfil"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>

          <div className="mt-12">
            <ClientifyContactForm
              title={formTitle}
              description="Comparte tus datos y una asesora academica se pondra en contacto contigo para darte informacion personalizada."
              formUrl={formUrl}
              compact
            />
          </div>
        </div>
      </section>
    </main>
  );
}
