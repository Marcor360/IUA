import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconCalendarEvent,
  IconClockHour4,
  IconExternalLink,
  IconMail,
  IconMapPin,
  IconPhone,
  IconSchool
} from "@tabler/icons-react";
import { usePageSeo } from "../../utils/seo";

const whatsappUrl = "https://api.whatsapp.com/send?phone=+2201349213&text=Hola";
const admissionsEmail = "admisiones@iua.edu.mx";

const campuses = [
  {
    name: "IUA Chalco",
    address: "Carretera Chalco-Mixquic, esquina calle Sauce 1, San Mateo Huitzilzingo, Chalco, Estado de México, C.P. 56625. A 1000 metros de Palacio de Justicia.",
    phones: [
      { label: "55 2236-7939", href: "tel:+525522367939" },
      { label: "55 2236-6742", href: "tel:+525522366742" }
    ],
    schedule: ["Lunes a Viernes: 09:00 - 4:00pm", "Sábado: 09:00 - 1:00pm"],
    appointmentUrl: "https://reuniones.clientify.com/#/iua/chalco",
    image: "/banners/chalco-banner-recorte-1920x700.webp"
  },
  {
    name: "IUA Reyes",
    address: "Avenida Texcoco número 51, Los Reyes, La Paz, Estado de México, C.P. 56400. A una cuadra del metro Los Reyes, línea A.",
    phones: [
      { label: "55 5857-2887", href: "tel:+525558572887" }
    ],
    schedule: ["Lunes a Viernes: 09:00 - 4:00pm", "Sábado: 09:00 - 1:00pm"],
    appointmentUrl: "https://reuniones.clientify.com/#/iua/reyes",
    image: "/banners/los-reyes-banner-recorte-1920x700.webp"
  },
  {
    name: "IUA Texcoco",
    address: "1a. Cda. de Campo Deportivo 7, San Pedro, 56105 Texcoco de Mora, México.",
    phones: [
      { label: "59 5925-1420", href: "tel:+525959251420" }
    ],
    schedule: ["Lunes a Viernes: 09:00 - 4:00pm", "Sábado: 09:00 - 1:00pm"],
    appointmentUrl: "https://reuniones.clientify.com/#/iua/texcoco",
    image: "/banners/biblioteca-banner-recorte-1920x700.webp"
  }
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/IUA.Mexico", icon: IconBrandFacebook },
  { label: "Instagram", href: "https://www.instagram.com/iua.oficial/", icon: IconBrandInstagram },
  { label: "YouTube", href: "https://www.youtube.com/@iuaoficial", icon: IconBrandYoutube },
  { label: "TikTok", href: "https://www.tiktok.com/@iua_oficial", icon: IconBrandTiktok }
];

export default function ContactoIua() {
  usePageSeo({
    title: "Contacto IUA | Admisiones, campus y WhatsApp",
    description: "Contacta a Universidad IUA por WhatsApp, correo o teléfono. Agenda una cita en campus Chalco, Reyes o Texcoco y recibe orientación de admisiones.",
    path: "/contacto",
    image: "/banners/alumnos-1-banner-recorte-1920x700.webp"
  });

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="relative overflow-hidden bg-iua-dark px-5 py-16 text-white md:px-6 md:py-24">
        <img
          src="/banners/alumnos-1-banner-recorte-1920x700.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-r from-iua-dark/94 via-iua-burgundy/78 to-iua-dark/46" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur">
              <IconSchool size={16} /> Contacto IUA
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              Estamos listos para orientarte
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/86 sm:text-lg sm:leading-8">
              Resuelve tus dudas sobre campus, programas, becas, procesos de inscripción y agenda una visita en el plantel que mejor se adapta a ti.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-iua-gold px-7 py-4 text-sm font-black text-iua-dark shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d4a13a]">
                Chatear por WhatsApp <IconBrandWhatsapp size={18} />
              </a>
              <a href={`mailto:${admissionsEmail}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-black text-iua-burgundy shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-iua-cream">
                Escribir a admisiones <IconMail size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-iua-cream px-5 py-12 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10">
            <IconBrandWhatsapp size={34} className="text-iua-gold" />
            <h2 className="mt-4 text-xl font-black text-neutral-950">Chatea con nosotros</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">Recibe orientación rápida por WhatsApp con el número oficial usado en el sitio IUA.</p>
          </a>
          <a href={`mailto:${admissionsEmail}`} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10">
            <IconMail size={34} className="text-iua-gold" />
            <h2 className="mt-4 text-xl font-black text-neutral-950">Correo de admisiones</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{admissionsEmail}</p>
          </a>
          <div className="rounded-2xl bg-iua-dark p-6 text-white shadow-sm">
            <IconClockHour4 size={34} className="text-iua-gold" />
            <h2 className="mt-4 text-xl font-black">Horarios de atención</h2>
            <p className="mt-2 text-sm leading-6 text-white/75">Lunes a Viernes: 09:00 - 4:00pm<br />Sábado: 09:00 - 1:00pm</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-iua-gold">Conoce nuestros planteles</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">Elige el campus que quieres visitar</h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              Agenda una cita para recibir atención personalizada sobre oferta educativa, becas y requisitos de inscripción.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {campuses.map((campus) => (
              <article key={campus.name} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10">
                <img src={campus.image} alt={campus.name} className="aspect-video w-full object-cover" loading="lazy" decoding="async" />
                <div className="p-6">
                  <h3 className="text-2xl font-black text-iua-burgundy">{campus.name}</h3>
                  <div className="mt-5 space-y-4 text-sm leading-6 text-neutral-600">
                    <p className="flex gap-2">
                      <IconMapPin size={18} className="mt-1 shrink-0 text-iua-gold" />
                      <span>{campus.address}</span>
                    </p>
                    <div className="flex gap-2">
                      <IconPhone size={18} className="mt-1 shrink-0 text-iua-gold" />
                      <div className="grid gap-1">
                        {campus.phones.map((phone) => (
                          <a key={phone.href} href={phone.href} className="font-bold text-neutral-700 transition hover:text-iua-burgundy">
                            Tel: {phone.label}
                          </a>
                        ))}
                      </div>
                    </div>
                    <p className="flex gap-2">
                      <IconMail size={18} className="mt-1 shrink-0 text-iua-gold" />
                      <a href={`mailto:${admissionsEmail}`} className="font-bold text-neutral-700 transition hover:text-iua-burgundy">{admissionsEmail}</a>
                    </p>
                    <div className="flex gap-2">
                      <IconClockHour4 size={18} className="mt-1 shrink-0 text-iua-gold" />
                      <div>{campus.schedule.map((item) => <p key={item}>{item}</p>)}</div>
                    </div>
                  </div>
                  <a href={campus.appointmentUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-iua-burgundy px-5 py-3 text-sm font-black text-white shadow-lg shadow-iua-burgundy/20 transition hover:-translate-y-0.5 hover:bg-iua-dark">
                    Quiero agendar cita en campus <IconCalendarEvent size={17} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-iua-cream px-5 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-iua-gold">@IUA.Oficial</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">Conecta con IUA en redes sociales</h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              Sigue las redes oficiales para conocer noticias, actividades, convocatorias y lo último en sus campus.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-white p-5 text-sm font-black text-neutral-800 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:text-iua-burgundy hover:shadow-xl hover:shadow-neutral-900/10">
                <span className="inline-flex items-center gap-3"><Icon size={24} className="text-iua-gold" /> {label}</span>
                <IconExternalLink size={17} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
