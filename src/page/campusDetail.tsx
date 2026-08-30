import { Link, useParams } from "react-router-dom";
import { IconBrandWhatsapp, IconChevronDown, IconMapPin, IconPhone, IconSchool } from "@tabler/icons-react";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { institution, campusSlugFromLabel } from "../config/institution";
import { ofertaEducativa } from "../data/ofertaEducativa";
import { usePageSeo } from "../utils/seo";
import { breadcrumbSchema, campusSchema } from "../utils/structuredData";
import NotFound from "./notFound";
import { campusBreadcrumbs } from "../config/breadcrumbs";

export default function CampusDetailPage() {
  const { slug = "" } = useParams();
  const campus = institution.campuses.find((item) => item.slug === slug);
  usePageSeo({
    title: campus ? `${campus.name} | Universidad IUA` : "Campus no encontrado | Universidad IUA",
    description: campus ? `Consulta información, contacto y programas relacionados con ${campus.name}.` : "El campus solicitado no existe.",
    path: campus ? `/campus/${campus.slug}` : `/campus/${slug}`,
    robots: campus ? undefined : { index: false, follow: true },
    image: campus?.image
  });
  if (!campus) return <NotFound />;

  const programs = ofertaEducativa.filter((program) => program.campus.some((label) => campusSlugFromLabel(label) === campus.slug));
  const breadcrumbs = campusBreadcrumbs(campus);

  return (
    <main className="oferta-page">
      <JsonLd id="campus-jsonld" data={[campusSchema(campus), breadcrumbSchema(breadcrumbs)]} />
      <section className="program-hero" style={{ backgroundImage: `linear-gradient(135deg, rgb(78 7 16 / .94), rgb(122 14 26 / .82)), url("${campus.image}")` }}>
        <div className="program-hero__inner"><div><p className="program-hero__eyebrow">Campus Universidad IUA</p><h1>{campus.name}</h1><p className="program-hero__description">{campus.isVirtual ? "Plantel para consultar la oferta publicada en modalidad en línea." : "Consulta ubicación, contacto y programas relacionados con esta sede."}</p></div></div>
      </section>
      <div className="program-layout">
        <Breadcrumbs items={breadcrumbs} />
        <section className="program-section">
          <h2>Información del campus</h2>
          {campus.address ? <p className="program-section__text"><IconMapPin size={19} /> {campus.address}</p> : null}
          {campus.phones?.length ? <ul className="program-list">{campus.phones.map((phone) => <li key={phone.href}><IconPhone size={19} /><a href={phone.href}>{phone.label}</a></li>)}</ul> : null}
          {campus.schedule?.length ? <><h3>Horario de atención</h3><ul>{campus.schedule.map((item) => <li key={item}>{item}</li>)}</ul></> : null}
          <a className="oferta-button" href={institution.contact.whatsapp} target="_blank" rel="noreferrer">Solicitar información <IconBrandWhatsapp size={18} /></a>
        </section>
        <section className="program-section campus-programs">
          <h2>Programas relacionados con {campus.shortName}</h2>
          <p className="program-section__text">La disponibilidad puede cambiar por periodo y modalidad; confirma la apertura con admisiones.</p>
          <details className="campus-programs__dropdown">
            <summary>
              <span><IconSchool size={20} /> Ver {programs.length} programas disponibles</span>
              <IconChevronDown className="campus-programs__chevron" size={22} aria-hidden="true" />
            </summary>
            <ul className="campus-programs__list">{programs.map((program) => <li key={program.id}><Link to={`/oferta/${program.slug}`}>{program.title}</Link></li>)}</ul>
          </details>
        </section>
      </div>
    </main>
  );
}
