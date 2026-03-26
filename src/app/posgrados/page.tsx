import LevelOverviewPage from "@/components/site/LevelOverviewPage";
import { clientifyForms } from "@/lib/site-data";
import { getProgramsByLevelContent } from "@/lib/wordpress/content";

export default async function PosgradosPage() {
  const [maestrias, doctorados] = await Promise.all([
    getProgramsByLevelContent("maestria"),
    getProgramsByLevelContent("doctorado"),
  ]);

  return (
    <LevelOverviewPage
      eyebrow="Oferta educativa"
      title="Posgrados IUA"
      description="Maestrias y doctorado con modalidad ejecutiva para fortalecer perfil profesional, investigacion y liderazgo academico."
      heroCtaLabel="Conocer requisitos de ingreso"
      heroCtaHref="/inscripciones-online"
      formUrl={clientifyForms.maestrias}
      formTitle="Formulario de posgrados"
      programs={[...maestrias, ...doctorados]}
    />
  );
}
