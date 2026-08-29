import { Link } from "react-router-dom";
import { IconExternalLink, IconFileCertificate, IconInfoCircle } from "@tabler/icons-react";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { ofertaEducativa } from "../data/ofertaEducativa";
import { usePageSeo } from "../utils/seo";
import { breadcrumbSchema } from "../utils/structuredData";

const breadcrumbs = [{ name: "Inicio", path: "/" }, { name: "RVOE", path: "/rvoe" }];

export default function RvoePage() {
  usePageSeo({
    title: "RVOE y validez oficial de estudios | Universidad IUA",
    description: "Consulta qué es el RVOE, por qué debe verificarse por programa, modalidad y plantel, y accede a la oferta académica de Universidad IUA.",
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
            <p>El Reconocimiento de Validez Oficial de Estudios se verifica para un programa, modalidad y plantel concretos. Esta página centraliza el acceso a la información académica publicada por IUA.</p>
          </div>
          <div className="program-hero__panel"><IconFileCertificate size={42} /><p className="program-hero__note">Los números y documentos oficiales se publicarán únicamente cuando estén vinculados a una fuente institucional comprobable.</p></div>
        </div>
      </section>

      <div className="program-layout">
        <Breadcrumbs items={breadcrumbs} />
        <section className="program-section">
          <p className="program-section__eyebrow">Cómo consultar</p>
          <h2>Qué debes revisar en un RVOE</h2>
          <p className="program-section__text">Antes de inscribirte, confirma el nombre exacto del programa, número de acuerdo, autoridad que lo otorgó, modalidad, plantel y fecha. Un RVOE no debe asumirse como una autorización general para todos los programas de una institución.</p>
          <div className="rvoe-notice"><IconInfoCircle size={22} /><p>El repositorio actual no contiene números de acuerdo ni documentos oficiales enlazables. Para evitar información incorrecta, esos campos permanecen fuera de la interfaz hasta recibir la documentación institucional correspondiente.</p></div>
        </section>

        <section className="program-section" aria-labelledby="programas-rvoe">
          <p className="program-section__eyebrow">Directorio académico</p>
          <h2 id="programas-rvoe">Programas publicados por Universidad IUA</h2>
          <p className="program-section__text">Consulta la ficha académica de cada programa y solicita a admisiones el documento aplicable a la modalidad y al campus de tu interés.</p>
          <div className="table-scroll">
            <table className="rvoe-table">
              <caption className="sr-only">Programas de Universidad IUA con enlaces a sus fichas académicas</caption>
              <thead><tr><th scope="col">Programa</th><th scope="col">Nivel</th><th scope="col">Modalidad publicada</th><th scope="col">Ficha</th></tr></thead>
              <tbody>{ofertaEducativa.map((program) => (
                <tr key={program.id}>
                  <th scope="row">{program.title}</th><td>{program.level}</td><td>{program.modalities.join(", ")}</td>
                  <td><Link to={`/oferta/${program.slug}`}>Consultar {program.title} <IconExternalLink size={15} /></Link></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
