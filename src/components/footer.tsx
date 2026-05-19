import {
  IconBrandFacebook as BrandFacebook,
  IconBrandInstagram as BrandInstagram,
  IconBrandTiktok as BrandTiktok,
  IconBrandWhatsapp as BrandWhatsapp,
  IconBrandYoutube as BrandYoutube,
  IconCalendarEvent as Calendar,
  IconMail as Mail,
  IconMapPin as MapPin,
  IconPhone as Phone,
  IconShieldCheck as ShieldCheck
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Logo } from "./navbar";

const whatsappUrl = "https://api.whatsapp.com/send?phone=+2201349213&text=Hola";
const admissionsEmail = "admisiones@iua.edu.mx";

const socialLinks = [
  { label: "Facebook", icon: BrandFacebook, href: "https://www.facebook.com/IUA.Mexico" },
  { label: "Instagram", icon: BrandInstagram, href: "https://www.instagram.com/iua.oficial/" },
  { label: "YouTube", icon: BrandYoutube, href: "https://www.youtube.com/channel/UCVHsmdbrL5AQ__LVhwJrwqQ" },
  { label: "TikTok", icon: BrandTiktok, href: "https://tiktok.com/@iua_oficial" },
  { label: "WhatsApp", icon: BrandWhatsapp, href: whatsappUrl }
];

const footerLinks = [
  { label: "Inicio", to: "/" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Oferta academica", to: "/oferta" },
  { label: "Campus", to: "/campus" },
  { label: "Comunidad IUA", to: "/comunidad" },
  { label: "Contacto", to: "/contacto" }
];

const campusContacts = [
  { campus: "Chalco", phone: "55 2236 7939", href: "tel:+525522367939" },
  { campus: "Chalco", phone: "55 2236 6742", href: "tel:+525522366742" },
  { campus: "Los Reyes", phone: "55 5857 2887", href: "tel:+525558572887" },
  { campus: "Texcoco", phone: "59 5925 1420", href: "tel:+525959251420" }
];

export default function Footer() {
  const openCookieSettings = () => {
    window.dispatchEvent(new Event("iua-open-cookie-settings"));
  };

  return (
    <footer className="iua-footer relative z-50 bg-iua-dark px-5 pb-28 pt-16 text-white md:px-6 md:pb-16 md:pt-20">
      <div className="iua-footer__grid mx-auto max-w-7xl pt-6 md:pt-8">
        <div className="space-y-6">
          <Logo inverse />
          <p className="max-w-xs text-sm leading-6 text-white/70">
            Formamos lideres que transforman con programas escolarizados y en linea para cada etapa academica.
          </p>
          <div className="flex gap-3">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-iua-gold hover:text-iua-dark"
              >
                <Icon size={18} stroke={label === "Facebook" ? 1.25 : 2} />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-1">
          <h4 className="mb-5 text-sm font-black uppercase tracking-[0.16em] text-iua-gold">Enlaces</h4>
          <ul className="grid gap-3 text-sm text-white/75">
            {footerLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition hover:text-iua-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-1">
          <h4 className="mb-5 text-sm font-black uppercase tracking-[0.16em] text-iua-gold">Contacto</h4>
          <ul className="space-y-3.5 text-sm text-white/75">
            <li>
              <a href={`mailto:${admissionsEmail}`} className="flex items-center gap-2 transition hover:text-iua-gold">
                <Mail size={17} className="shrink-0" /> {admissionsEmail}
              </a>
            </li>
            <li>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-iua-gold">
                <BrandWhatsapp size={17} className="shrink-0" /> WhatsApp admisiones
              </a>
            </li>
            {campusContacts.map((item) => (
              <li key={`${item.campus}-${item.phone}`}>
                <a href={item.href} className="flex items-center gap-2 transition hover:text-iua-gold">
                  <Phone size={17} className="shrink-0" />
                  <span>{item.campus}: {item.phone}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="iua-footer__rvoe rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
          <div className="flex items-center gap-3">
            <ShieldCheck size={34} className="shrink-0 text-iua-gold" />
            <div>
              <h4 className="font-black">RVOE oficial</h4>
              <p className="mt-1 text-sm leading-6 text-white/70">Programas con reconocimiento oficial.</p>
            </div>
          </div>
          <div className="mt-6 space-y-4 border-t border-white/10 pt-5 text-sm text-white/75">
            <p className="flex gap-2">
              <MapPin size={17} className="mt-0.5 shrink-0 text-iua-gold" />
              Campus Chalco, Los Reyes y Texcoco.
            </p>
            <p className="flex gap-2">
              <Calendar size={17} className="mt-0.5 shrink-0 text-iua-gold" />
              Atencion: Lun. a Vie. 09:00 a 16:00, Sab. 09:00 a 13:00.
            </p>
          </div>
        </div>
      </div>

      <div className="iua-footer__bottom mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/55">
        <p>(c) 2026 Universidad IUA. Todos los derechos reservados.</p>
        <div className="iua-footer__legal-links">
          <Link to="/aviso-de-privacidad" className="transition hover:text-iua-gold">
            Aviso de privacidad
          </Link>
          <button type="button" onClick={openCookieSettings} className="transition hover:text-iua-gold">
            Configurar cookies
          </button>
          <a href={`mailto:${admissionsEmail}`} className="transition hover:text-iua-gold">
            Admisiones
          </a>
        </div>
      </div>
    </footer>
  );
}
