import { type ComponentType } from "react";
import {
  IconArrowRight as ArrowRight,
  IconBook as Book,
  IconBrandWhatsapp as BrandWhatsapp,
  IconCalendarEvent as Calendar,
  IconChalkboard as Chalkboard,
  IconChecklist as Checklist,
  IconCreditCard as CreditCard,
  IconExternalLink as ExternalLink,
  IconFileText as FileText,
  IconHeartHandshake as HeartHandshake,
  IconMail as Mail,
  IconSchool as School,
  IconUserCheck as UserCheck
} from "@tabler/icons-react";
import { usePageSeo } from "../utils/seo";

type IconComponent = ComponentType<{ size?: number | string; className?: string }>;

type LinkCard = {
  title: string;
  text: string;
  href: string;
  icon: IconComponent;
  label?: string;
};

type Platform = {
  title: string;
  href: string;
  points?: string[];
  text?: string;
  label: string;
};

const whatsappUrl = "https://api.whatsapp.com/send?phone=+2201349213&text=Hola";

const platforms: Platform[] = [
  {
    title: "Conecta IUA / Plataforma Alumnos",
    href: "https://plataforma.iua.edu.mx/alumnos/",
    label: "Ingresar a plataforma",
    points: [
      "Consulta información académica.",
      "Revisa avisos institucionales.",
      "Participa en foros y actividades de aula virtual.",
      "Accede a recursos digitales disponibles para alumnos."
    ]
  },
  {
    title: "Plataforma Docente",
    href: "https://plataforma.iua.edu.mx/IUA_ADMIN/",
    label: "Ingresar a plataforma docente",
    points: ["Gestiona asistencias.", "Sube calificaciones.", "Descarga listas de grupo.", "Administra contenido didáctico."]
  },
  {
    title: "Biblioteca Virtual",
    href: "https://elibro.net/es/lc/corpalba/login_usuario/?next=%2Fes%2Flc%2Fcorpalba%2Finicio%2F",
    label: "Entrar a Biblioteca Virtual",
    text: "Accede a una biblioteca digital con libros, revistas, obras de investigación y materiales académicos en distintos idiomas."
  },
  {
    title: "Correo Institucional",
    href: "https://login.microsoftonline.com/login.srf?wa=",
    label: "Ingresar al correo",
    text: "Tu correo institucional te permite comunicarte con profesores, compañeros y acceder a servicios exclusivos para la comunidad IUA."
  }
];

const regulations: LinkCard[] = [
  {
    title: "Reglamento de alumnos de secundaria general",
    text: "Normas, derechos, obligaciones y lineamientos para alumnos de secundaria.",
    href: "https://iua.edu.mx/wp-content/uploads/2022/08/REGLAMENTO-DE-SECUNDARIA.pdf",
    icon: School,
    label: "Ver PDF"
  },
  {
    title: "Reglamento de alumnos de bachillerato",
    text: "Documento general de consulta para alumnos de bachillerato.",
    href: "https://iua.edu.mx/wp-content/uploads/2022/08/ReglamentoGRALiua.pdf",
    icon: Book,
    label: "Ver PDF"
  },
  {
    title: "Reglamento de alumnos de licenciaturas",
    text: "Normatividad aplicable para alumnos de licenciatura.",
    href: "https://iua.edu.mx/wp-content/uploads/2022/08/ReglamentoGRALiua.pdf",
    icon: School,
    label: "Ver PDF"
  },
  {
    title: "Reglamento de alumnos de maestría",
    text: "Documento relacionado con procesos académicos y de titulación para maestría.",
    href: "https://iua.edu.mx/wp-content/uploads/2021/05/reglamento-titulacion-licenciatura-y-maestria-iua.pdf",
    icon: Checklist,
    label: "Ver PDF"
  },
  {
    title: "Reglamento de Servicio Social",
    text: "Lineamientos para el cumplimiento del servicio social.",
    href: "https://iua.edu.mx/wp-content/uploads/2022/08/ReglamentoServicioSocialB.pdf",
    icon: HeartHandshake,
    label: "Ver PDF"
  },
  {
    title: "Reglamento de Titulación",
    text: "Requisitos, modalidades y pasos del proceso de titulación.",
    href: "https://iua.edu.mx/wp-content/uploads/2022/08/ReglamentoTitulacion.pdf",
    icon: FileText,
    label: "Ver PDF"
  },
  {
    title: "Reglamento de Pagos",
    text: "Disposiciones relacionadas con pagos, colegiaturas y procesos administrativos.",
    href: "https://iua.edu.mx/wp-content/uploads/2021/05/reglamento-pagos.pdf",
    icon: CreditCard,
    label: "Ver PDF"
  }
];

const procedures: LinkCard[] = [
  {
    title: "Inscripción en línea",
    text: "Inicia tu proceso de admisión desde el sitio web.",
    href: "https://apps.clientify.net/formbuilderembed/simpleembed/#/success/twostepformpopup/171625/45670",
    icon: ArrowRight,
    label: "Quiero inscribirme"
  },
  {
    title: "Revalidación de estudios",
    text: "Solicita información para validar estudios previos.",
    href: "https://apps.clientify.net/formbuilderembed/simpleembed/#/forms/embedform/178664/45670",
    icon: FileText,
    label: "Quiero revalidar"
  },
  {
    title: "Beca IUA",
    text: "Consulta opciones de apoyo para continuar tu formación.",
    href: "https://apps.clientify.net/formbuilderembed/simpleembed/#/forms/embedform/178777/45670",
    icon: HeartHandshake,
    label: "Quiero una beca"
  }
];

const visitCampuses = [
  { name: "Campus Chalco", href: "https://reuniones.clientify.com/#/iua/chalco" },
  { name: "Campus Los Reyes", href: "https://reuniones.clientify.com/#/iua/reyes" },
  { name: "Campus Texcoco", href: "https://reuniones.clientify.com/#/iua/texcoco" }
];

const faqs = [
  {
    question: "¿Dónde ingreso a mi plataforma de alumno?",
    answer: "En Conecta IUA puedes consultar avisos, actividades, foros, recursos e información académica."
  },
  {
    question: "¿Dónde consulto los reglamentos?",
    answer: "En la sección de reglamentos escolares encontrarás los PDFs por nivel académico y trámite."
  },
  {
    question: "¿Qué necesito para iniciar titulación?",
    answer: "Debes validar créditos, servicio social, modalidad y documentación con Servicios Escolares."
  }
];

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-iua-gold">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-neutral-600">{text}</p> : null}
    </div>
  );
}

function ExternalCard({ item }: { item: LinkCard }) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-iua-gold/40 hover:shadow-xl hover:shadow-neutral-900/10"
    >
      <div className="mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-iua-cream text-iua-burgundy">
        <Icon size={27} />
      </div>
      <h3 className="text-xl font-black leading-tight text-neutral-950">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{item.text}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-iua-burgundy">
        {item.label ?? "Ingresar"} <ExternalLink size={16} className="transition group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

export default function Comunidad() {
  usePageSeo({
    title: "Comunidad IUA | Plataformas, Reglamentos y Trámites",
    description: "Acceso para alumnos y docentes de Universidad IUA. Ingresa a plataformas académicas, consulta reglamentos escolares, opciones de titulación, servicio social, biblioteca virtual y trámites en línea.",
    keywords: ["comunidad iua", "plataforma alumnos iua", "biblioteca virtual iua", "reglamentos escolares iua", "titulacion iua", "servicio social iua", "correo institucional iua", "tramites universidad iua", "estudiantes iua"],
    path: "/comunidad",
    image: "/banners/biblioteca-banner-recorte-1920x700.webp"
  });

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="relative overflow-hidden bg-iua-dark px-5 py-16 text-white md:px-6 md:py-20">
        <img
          src="/banners/biblioteca-banner-recorte-1920x700.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-50"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-r from-iua-dark/92 via-iua-burgundy/70 to-iua-dark/42" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur">
              <UserCheck size={16} /> Comunidad IUA
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              Accesos, reglamentos y trámites para la comunidad IUA
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/86 sm:text-lg sm:leading-8">
              Consulta tus plataformas académicas, reglamentos escolares, información de titulación, servicio social, pagos, becas y trámites institucionales en un solo lugar.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#reglamentos" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-black text-iua-burgundy shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-iua-cream">
                Consultar reglamentos <FileText size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="plataformas" className="bg-iua-cream px-5 py-16 scroll-mt-28 md:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Recursos digitales"
            title="Plataformas académicas IUA"
            text="Accede a herramientas digitales para consultar información, actividades, avisos institucionales, biblioteca virtual y servicios académicos."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {platforms.map((platform) => (
              <article key={platform.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h3 className="text-2xl font-black text-neutral-950">{platform.title}</h3>
                {platform.points ? (
                  <ul className="mt-4 space-y-2">
                    {platform.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-6 text-neutral-600">
                        <Checklist size={18} className="mt-0.5 shrink-0 text-iua-gold" /> {point}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm leading-7 text-neutral-600">{platform.text}</p>
                )}
                <a href={platform.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl border border-iua-burgundy px-4 py-2 text-sm font-black text-iua-burgundy transition hover:bg-iua-cream">
                  {platform.label} <ExternalLink size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reglamentos" className="px-5 py-16 scroll-mt-28 md:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Normatividad institucional"
            title="Reglamento escolar"
            text="Consulta los documentos oficiales de acuerdo con tu nivel académico o trámite escolar."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regulations.map((item) => (
              <ExternalCard key={item.title} item={item} />
            ))}
          </div>

        </div>
      </section>

      <section id="apoyo" className="px-5 py-16 scroll-mt-28 md:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Apoyo institucional"
            title="Servicio social, pagos, becas y trámites escolares"
            text="Consulta documentos administrativos o inicia procesos de inscripción, revalidación, beca y visita a campus."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {procedures.map((item) => (
              <ExternalCard key={item.title} item={item} />
            ))}
            <article className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-iua-gold/40 hover:shadow-xl hover:shadow-neutral-900/10">
              <div className="mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-iua-cream text-iua-burgundy">
                <Calendar size={27} />
              </div>
              <h3 className="text-xl font-black leading-tight text-neutral-950">Agenda una visita</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">Elige el campus que quieres conocer y agenda tu visita personalizada.</p>
              <details className="group mt-5">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl border border-iua-burgundy px-4 py-2 text-sm font-black text-iua-burgundy transition hover:bg-iua-cream">
                  Seleccionar campus
                  <ArrowRight size={16} className="transition group-open:rotate-90" />
                </summary>
                <div className="mt-3 grid gap-2">
                  {visitCampuses.map((campus) => (
                    <a
                      key={campus.name}
                      href={campus.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-xl bg-iua-cream px-4 py-3 text-sm font-bold text-neutral-700 transition hover:bg-iua-burgundy hover:text-white"
                    >
                      {campus.name}
                      <ExternalLink size={15} />
                    </a>
                  ))}
                </div>
              </details>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-iua-cream px-5 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Dudas comunes de la comunidad IUA"
            text="Una guía rápida para ubicar los recursos principales."
          />
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <h3 className="font-black text-neutral-950">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-iua-dark p-7 text-white shadow-2xl shadow-iua-burgundy/20 md:p-10">
          <img src="/banners/educacion-2-banner-recorte-1920x700.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-35" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-linear-to-r from-iua-dark/92 via-iua-burgundy/76 to-iua-dark/54" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">¿Necesitas apoyo con un trámite?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78">
                Habla con un asesor o revisa la oferta educativa para elegir el programa que mejor se adapta a tu siguiente etapa.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-iua-gold px-7 py-4 text-sm font-black text-iua-dark shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d4a13a]">
                Hablar con un asesor <BrandWhatsapp size={18} />
              </a>
              <a href="/oferta" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-black text-iua-burgundy shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-iua-cream">
                Ver oferta educativa <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
