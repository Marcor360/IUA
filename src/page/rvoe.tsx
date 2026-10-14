import { useState } from "react";
import { Link } from "react-router-dom";
import { IconArrowDown, IconExternalLink, IconSearch, IconShieldCheck } from "@tabler/icons-react";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { ofertaEducativa } from "../data/ofertaEducativa";
import { formatRvoeDate, rvoeRecords } from "../data/rvoe";
import { usePageSeo } from "../utils/seo";
import { breadcrumbSchema } from "../utils/structuredData";
import { sectionBreadcrumbs } from "../config/breadcrumbs";

const breadcrumbs = sectionBreadcrumbs("rvoe");
const normalizeSearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-MX");

export default function RvoePage() {
  const [search, setSearch] = useState("");
  const normalizedSearch = normalizeSearch(search.trim());
  const visibleRecords = normalizedSearch
    ? rvoeRecords.filter((record) => normalizeSearch([record.programName, record.institutionName, record.campusName, record.modality, record.number, formatRvoeDate(record.issuedOn)].filter(Boolean).join(" ")).includes(normalizedSearch))
    : rvoeRecords;

  usePageSeo({
    title: "RVOE y validez oficial de estudios | Universidad IUA",
    description: "Consulta los 22 RVOE proporcionados por Universidad IUA, con institución, plantel, modalidad y fecha de cada registro.",
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
            <p>Consulta los Reconocimientos de Validez Oficial de Estudios por programa, institución, plantel y modalidad.</p>
          </div>
        </div>
      </section>

      <div className="program-layout">
        <Breadcrumbs items={breadcrumbs} />
        <section className="rvoe-lookup" aria-labelledby="consulta-rvoe">
          <div className="rvoe-lookup__icon"><IconSearch size={36} aria-hidden="true" /></div>
          <div className="rvoe-lookup__content">
            <p className="program-section__eyebrow">Consulta institucional</p>
            <h2 id="consulta-rvoe">Consulta tu RVOE</h2>
            <p>Encuentra tu programa y comprueba la institución, el plantel, la modalidad oficial y la fecha del reconocimiento.</p>
            <div className="rvoe-lookup__trust"><IconShieldCheck size={19} /><span>Registros ordenados por fecha, del más reciente al más antiguo.</span></div>
          </div>
          <a className="rvoe-lookup__button" href="#programas-rvoe">Consultar directorio <IconArrowDown size={18} /></a>
        </section>

        <section className="program-section" aria-labelledby="programas-rvoe">
          <p className="program-section__eyebrow">Directorio académico</p>
          <h2 id="programas-rvoe">RVOE vigentes</h2>
          <p className="program-section__text">Cada tarjeta corresponde a un registro de la relación proporcionada por IUA.</p>
          <div className="rvoe-directory__toolbar">
            <label className="rvoe-directory__search">
              <IconSearch size={20} aria-hidden="true" />
              <span className="sr-only">Buscar por programa, plantel o número de RVOE</span>
              <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar programa, plantel o RVOE" />
            </label>
          </div>
          {visibleRecords.length ? (
            <div className="rvoe-directory__grid">
              {visibleRecords.map((record) => {
                const program = ofertaEducativa.find(({ id }) => id === record.programId);
                return (
                  <article className="rvoe-directory__card" key={record.number}>
                    <div className="rvoe-directory__card-top">
                      <span className="rvoe-directory__modality">{record.modality}</span>
                      <time dateTime={record.issuedOn}>{formatRvoeDate(record.issuedOn)}</time>
                    </div>
                    <h3>{record.programName}</h3>
                    <p className="rvoe-directory__institution">{record.institutionName}</p>
                    <div className="rvoe-directory__number"><span>Número de RVOE</span><strong>{record.number}</strong></div>
                    {program ? <Link className="rvoe-directory__link" to={`/oferta/${program.slug}`}>Ver programa <IconExternalLink size={16} /></Link> : null}
                  </article>
                );
              })}
            </div>
          ) : <p className="rvoe-directory__empty">No se encontraron registros. Prueba con otro programa, plantel o número de RVOE.</p>}
        </section>
      </div>
    </main>
  );
}
