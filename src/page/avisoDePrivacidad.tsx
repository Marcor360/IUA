import { IconShieldCheck as ShieldCheck } from "@tabler/icons-react";
import PageBreadcrumbs from "../components/PageBreadcrumbs";
import { sectionBreadcrumbs } from "../config/breadcrumbs";
import { usePageSeo } from "../utils/seo";
import noticeText from "../content/avisoDePrivacidad.txt?raw";

const breadcrumbs = sectionBreadcrumbs("privacidad");
const sectionHeading = /^(PRIMERO|SEGUNDO|TERCERO|CUARTO|QUINTO|SEXTO|SÉPTIMO|OCTAVO|NOVENO|DÉCIMO|DÉCIMO PRIMERO|DÉCIMO SEGUNDO)\. (.+)$/gm;
const headings = [...noticeText.matchAll(sectionHeading)];
const sections = headings.map((heading, index) => ({
  title: heading[2],
  number: heading[1],
  text: noticeText.slice((heading.index ?? 0) + heading[0].length, headings[index + 1]?.index).trim()
}));

function sectionContent(text: string) {
  const parts = text.split(/(?=^• )/m);
  if (parts.length === 1) return <p>{text.replace(/\s+/g, " ")}</p>;

  const introduction = parts.shift()?.replace(/\s+/g, " ").trim();
  const last = parts.pop()?.replace(/\s+/g, " ").trim() ?? "";
  const finalBulletEnd = last.indexOf(". Finalidades secundarias,");
  const bullets = [...parts.map((part) => part.replace(/\s+/g, " ").trim().replace(/^•\s*/, "")),
    finalBulletEnd >= 0 ? last.slice(0, finalBulletEnd + 1).replace(/^•\s*/, "") : last.replace(/^•\s*/, "")];
  const conclusion = finalBulletEnd >= 0 ? last.slice(finalBulletEnd + 2) : "";

  return (
    <>
      <p>{introduction}</p>
      <ul className="list-disc space-y-2 pl-6">{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
      {conclusion && <p>{conclusion}</p>}
    </>
  );
}

export default function AvisoDePrivacidad() {
  usePageSeo({
    title: "Aviso de Privacidad Integral | Universidad IUA",
    description: "Consulta el aviso de privacidad integral de Corporativo Universitario Alba, S.C., Universidad IUA e Instituto Universitario Anáhuac.",
    path: "/aviso-de-privacidad",
    image: "/banners/educacion-2-banner-recorte-1920x700.webp"
  });

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      <section className="relative overflow-hidden bg-iua-dark px-5 py-16 text-white md:px-6 md:py-20">
        <div className="absolute inset-0 bg-linear-to-r from-iua-dark/92 via-iua-burgundy/76 to-iua-dark/54" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur"><ShieldCheck size={16} /> Universidad IUA</p>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl">Aviso de privacidad integral</h1>
            <p className="mt-5 text-base font-semibold leading-7 text-white/90 sm:text-lg">Corporativo Universitario Alba, S.C. | Universidad IUA | Instituto Universitario Anáhuac</p>
            <p className="mt-3 text-sm text-white/75">Fecha de actualización: 11 de octubre de 2026</p>
          </div>
        </div>
      </section>

      <PageBreadcrumbs id="privacidad-breadcrumb-jsonld" items={breadcrumbs} />

      <div className="mx-auto max-w-5xl space-y-6 px-5 py-12 md:px-6 md:py-16">
        <p className="rounded-2xl bg-iua-cream p-6 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
          En cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y demás disposiciones aplicables, se informa a las personas titulares sobre el tratamiento de sus datos personales.
        </p>
        {sections.map((section) => (
          <section key={section.number} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-iua-gold">{section.number}</p>
            <h2 className="mt-3 text-xl font-black tracking-tight text-neutral-950 md:text-2xl">{section.title}</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">{sectionContent(section.text)}</div>
          </section>
        ))}
      </div>
    </main>
  );
}
