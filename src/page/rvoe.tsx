import { Link } from "react-router-dom";
import { IconExternalLink, IconFileCertificate, IconInfoCircle } from "@tabler/icons-react";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { ofertaEducativa } from "../data/ofertaEducativa";
import { rvoeRecords } from "../data/rvoe";
import { usePageSeo } from "../utils/seo";
import { breadcrumbSchema } from "../utils/structuredData";

const breadcrumbs = [{ name: "Inicio", path: "/" }, { name: "RVOE", path: "/rvoe" }];

export default function RvoePage() {
  usePageSeo({
    title: "RVOE y validez oficial de estudios | Universidad IUA",
    description: "Consulta los RVOE proporcionados por Universidad IUA, relacionados por programa, modalidad, plantel e institución cuando la fuente los especifica.",
    path: "/rvoe"
  });

  return (
    <main className="oferta-page">
      <JsonLd id="rvoe-breadcrumb-jsonld" data={breadcrumbSchema(breadcrumbs)} />
      <section className="oferta-hero">
        <div className="oferta-hero__inner">
          <div>
            <p className="oferta-hero__eyebrow">Información institucional</p>
            <h1>RVOE y validez oficial de estudios en Universidad IUA</h1>
            <p>El Reconocimiento de Validez Oficial de Estudios se verifica para un programa, modalidad y plantel concretos. Esta página publica únicamente los registros proporcionados por Universidad IUA.</p>
          </div>
          <div className="program-hero__panel"><IconFileCertificate size={42} /><p className="program-hero__note">Cada número conserva el programa, modalidad y plantel o institución indicados en la fuente disponible.</p></div>
        </div>
      </section>

      <div className="program-layout">
        <Breadcrumbs items={breadcrumbs} />
        <section className="program-section">
          <p className="program-section__eyebrow">Cómo consultar</p>
          <h2>Qué debes revisar en un RVOE</h2>
          <p className="program-section__text">Confirma el nombre exacto del programa, la modalidad y el plantel o institución. Un RVOE corresponde a esa combinación y no autoriza automáticamente todos los programas de una institución.</p>
          <div className="rvoe-notice"><IconInfoCircle size={22} /><p>Cuando la fuente no identifica un plantel, esta página no lo atribuye a una sede por inferencia.</p></div>
        </section>

        <section className="program-section" aria-labelledby="programas-rvoe">
          <p className="program-section__eyebrow">Directorio académico</p>
          <h2 id="programas-rvoe">Programas con RVOE en la fuente proporcionada</h2>
          <p className="program-section__text">Los registros se presentan por combinación académica para evitar asociaciones ambiguas.</p>
          <div className="table-scroll">
            <table className="rvoe-table">
              <caption className="sr-only">RVOE vigentes proporcionados por Universidad IUA</caption>
              <thead><tr><th scope="col">Programa</th><th scope="col">Plantel o institución</th><th scope="col">Modalidad</th><th scope="col">RVOE</th><th scope="col">Ficha</th></tr></thead>
              <tbody>{rvoeRecords.map((record) => {
                const program = ofertaEducativa.find(({ id }) => id === record.programId);
                return (
                  <tr key={record.number}>
                    <th scope="row">{record.programName}</th>
                    <td>{record.campusName ?? record.institutionName ?? "Sin plantel especificado en la fuente"}</td>
                    <td>{record.modality}</td>
                    <td><strong>RVOE: {record.number}</strong></td>
                    <td>{program ? <Link to={`/oferta/${program.slug}`}>Consultar {program.title} <IconExternalLink size={15} /></Link> : null}</td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
