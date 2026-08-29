import { Link } from "react-router-dom";
import { IconArrowDown, IconExternalLink, IconFileCertificate, IconSearch, IconShieldCheck } from "@tabler/icons-react";
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
        <section className="rvoe-lookup" aria-labelledby="consulta-rvoe">
          <div className="rvoe-lookup__icon"><IconSearch size={36} aria-hidden="true" /></div>
          <div className="rvoe-lookup__content">
            <p className="program-section__eyebrow">Consulta institucional</p>
            <h2 id="consulta-rvoe">Consulta tu RVOE</h2>
            <p>Encuentra el reconocimiento de tu programa y revisa el número, modalidad y plantel que aparecen en la fuente proporcionada por Universidad IUA.</p>
            <div className="rvoe-lookup__trust"><IconShieldCheck size={19} /><span>Información clara, organizada y sin asociaciones automáticas.</span></div>
          </div>
          <a className="rvoe-lookup__button" href="#programas-rvoe">Consultar directorio <IconArrowDown size={18} /></a>
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
                    <td data-label="Plantel o institución">{record.campusName ?? record.institutionName ?? "Sin plantel especificado en la fuente"}</td>
                    <td data-label="Modalidad">{record.modality}</td>
                    <td data-label="RVOE"><strong>RVOE: {record.number}</strong></td>
                    <td data-label="Ficha">{program ? <Link to={`/oferta/${program.slug}`}>Consultar {program.title} <IconExternalLink size={15} /></Link> : null}</td>
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
