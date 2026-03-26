import LevelOverviewPage from "@/components/site/LevelOverviewPage";
import { clientifyForms } from "@/lib/site-data";
import { getProgramsByLevelContent } from "@/lib/wordpress/content";

export default async function LicenciaturasPage() {
  const programs = await getProgramsByLevelContent("licenciatura");

  return (
    <LevelOverviewPage
      eyebrow="Oferta educativa"
      title="Licenciaturas IUA"
      description="Conoce cada licenciatura e ingenieria disponible en IUA. Esta version organiza los programas con identidad visual por carrera y accesos directos a detalle."
      heroCtaLabel="Ir a inscripciones online"
      heroCtaHref="/inscripciones-online"
      formUrl={clientifyForms.licenciaturas}
      formTitle="Formulario de licenciaturas"
      programs={programs}
    />
  );
}
