import LevelOverviewPage from "@/components/site/LevelOverviewPage";
import { clientifyForms } from "@/lib/site-data";
import { getProgramsByLevelContent } from "@/lib/wordpress/content";

export default async function MaestriasPage() {
  const programs = await getProgramsByLevelContent("maestria");

  return (
    <LevelOverviewPage
      eyebrow="Posgrados IUA"
      title="Maestrias"
      description="Especializate con programas ejecutivos disenados para profesionistas en activo que buscan crecimiento academico y laboral."
      heroCtaLabel="Solicitar asesoria de posgrado"
      heroCtaHref="/contactanos"
      formUrl={clientifyForms.maestrias}
      formTitle="Formulario de maestrias"
      programs={programs}
    />
  );
}
