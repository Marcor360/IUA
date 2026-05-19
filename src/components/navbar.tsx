import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  IconArrowRight as ArrowRight,
  IconBrandWhatsapp as BrandWhatsapp,
  IconChevronDown as ChevronDown,
  IconMail as Mail,
  IconMenu2 as Menu,
  IconX as X
} from "@tabler/icons-react";

type NavItem = {
  label: string;
  to: string;
};

type LogoProps = {
  inverse?: boolean;
};

const navItems: NavItem[] = [
  { label: "Nosotros", to: "/nosotros" },
  { label: "Oferta", to: "/oferta" },
  { label: "Campus", to: "/campus" },
  { label: "Comunidad", to: "/comunidad" },
  { label: "Contacto", to: "/contacto" }
];

const communityLinks = [
  { label: "Plataformas academicas IUA", to: "/comunidad#plataformas" },
  { label: "Reglamentos IUA", to: "/comunidad#reglamentos" },
  { label: "Titulacion IUA", to: "/comunidad#titulacion" },
  { label: "Apoyo institucional", to: "/comunidad#apoyo" }
];

const whatsappUrl = "https://api.whatsapp.com/send?phone=+2201349213&text=Hola";
const leadFormUrl = "https://apps.clientify.net/formbuilderembed/simpleembed/#/success/twostepformpopup/171625/45670";
const admissionsEmail = "admisiones@iua.edu.mx";

export function Logo({ inverse = false }: LogoProps) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3 md:gap-4" aria-label="Ir al inicio">
      <img
        src="/Logo-iua.png"
        alt="Universidad IUA"
        className={`shrink-0 object-contain ${
          inverse ? "h-14 w-14 md:h-16 md:w-16" : "h-16 w-16 md:h-20 md:w-20 lg:h-22 lg:w-22"
        }`}
      />
      <div className="min-w-0 leading-tight">
        <p className={`text-lg font-black tracking-tight ${inverse ? "text-white md:text-xl" : "text-iua-burgundy md:text-xl"}`}>
          Universidad IUA
        </p>
        <p className={`mt-1 max-w-[14rem] font-medium md:max-w-none ${inverse ? "text-xs text-white/60" : "text-sm text-neutral-500"}`}>
          Formamos lideres que transforman
        </p>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const closeCommunityTimeout = useRef<number | null>(null);

  const openCommunityMenu = () => {
    if (closeCommunityTimeout.current) {
      window.clearTimeout(closeCommunityTimeout.current);
      closeCommunityTimeout.current = null;
    }
    setIsCommunityOpen(true);
  };

  const closeCommunityMenuWithDelay = () => {
    closeCommunityTimeout.current = window.setTimeout(() => {
      setIsCommunityOpen(false);
    }, 140);
  };

  const closeCommunityMenuNow = () => {
    if (closeCommunityTimeout.current) {
      window.clearTimeout(closeCommunityTimeout.current);
      closeCommunityTimeout.current = null;
    }
    setIsCommunityOpen(false);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      closeCommunityMenuNow();

      if (isMenuOpen || currentScrollY < 24) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY + 8) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY - 8) {
        setIsHeaderVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    closeCommunityMenuNow();
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCommunityOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className={`site-header ${isHeaderVisible ? "site-header--visible" : "site-header--hidden"}`}>
      <div className="hidden bg-iua-burgundy text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs font-semibold">
          <div className="flex items-center gap-5">
            <a href={`mailto:${admissionsEmail}`} className="inline-flex items-center gap-1.5 transition hover:text-iua-gold">
              <Mail size={14} /> Admisiones: {admissionsEmail}
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-iua-gold">
              <BrandWhatsapp size={14} /> WhatsApp
            </a>
          </div>
          <span>Inscripciones abiertas para nuevo ingreso</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 bg-white px-5 py-2 md:px-6 md:py-3">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
            item.label === "Comunidad" ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={openCommunityMenu}
                onMouseLeave={closeCommunityMenuWithDelay}
              >
                <NavLink
                  to={item.to}
                  aria-haspopup="menu"
                  aria-expanded={isCommunityOpen}
                  onFocus={openCommunityMenu}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold transition ${
                      isActive
                        ? "bg-iua-cream text-iua-burgundy"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-iua-burgundy"
                    }`
                  }
                >
                  Comunidad{" "}
                  <ChevronDown
                    size={15}
                    className={`transition ${isCommunityOpen ? "rotate-180" : ""}`}
                  />
                </NavLink>

                <div
                  onMouseEnter={openCommunityMenu}
                  onMouseLeave={closeCommunityMenuWithDelay}
                  className={`absolute left-1/2 top-full z-70 w-76 -translate-x-1/2 pt-3 transition duration-150 ${
                    isCommunityOpen
                      ? "visible opacity-100"
                      : "invisible pointer-events-none opacity-0"
                  }`}
                >
                  <div className="rounded-2xl border border-black/5 bg-white p-2 shadow-2xl shadow-neutral-900/15 ring-1 ring-black/5">
                    {communityLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={closeCommunityMenuNow}
                        className="block rounded-xl px-4 py-3 text-sm font-bold text-neutral-700 transition hover:bg-iua-cream hover:text-iua-burgundy focus:bg-iua-cream focus:text-iua-burgundy focus:outline-none"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-iua-cream text-iua-burgundy"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-iua-burgundy"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={leadFormUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl bg-iua-burgundy px-5 py-3 text-sm font-bold text-white shadow-lg shadow-iua-burgundy/20 transition hover:-translate-y-0.5 hover:bg-iua-dark md:inline-flex md:items-center md:gap-2"
          >
            Pedir informacion <ArrowRight size={16} />
          </a>
          <button
            className="rounded-xl border border-neutral-200 bg-white p-3 text-iua-burgundy transition hover:border-iua-gold/60 hover:bg-iua-cream md:hidden"
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <nav className="mx-5 mb-4 animate-rise rounded-2xl border border-black/5 bg-white p-2 shadow-xl shadow-neutral-900/10">
          {navItems.map((item) =>
            item.label === "Comunidad" ? (
              <div key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-bold transition ${
                      isActive ? "bg-iua-cream text-iua-burgundy" : "text-neutral-700 hover:bg-neutral-50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
                <div className="mt-1 grid gap-1 border-l border-iua-gold/30 pl-3">
                  {communityLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-600 transition hover:bg-iua-cream hover:text-iua-burgundy"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-bold transition ${
                    isActive ? "bg-iua-cream text-iua-burgundy" : "text-neutral-700 hover:bg-neutral-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
          <a
            onClick={() => setIsMenuOpen(false)}
            href={leadFormUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-iua-burgundy px-4 py-3 text-sm font-black text-white"
          >
            Pedir informacion <ArrowRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}
