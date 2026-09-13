import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  IconArrowRight as ArrowRight,
  IconBrandWhatsapp as BrandWhatsapp,
  IconChevronDown as ChevronDown,
  IconMenu2 as Menu,
  IconX as X
} from "@tabler/icons-react";
import { useContactModal } from "../context/ContactModalContext";
import { institution } from "../config/institution";

type NavItem = {
  label: string;
  to: string;
  external?: boolean;
};

type LogoProps = {
  inverse?: boolean;
  footer?: boolean;
};

const navItems: NavItem[] = [
  { label: "Nosotros", to: "/nosotros" },
  { label: "Oferta", to: "/oferta" },
  { label: "Campus", to: "/campus" },
  { label: "Comunidad", to: "/comunidad" },
  { label: "Contacto", to: "/contacto" },
  { label: "Blog", to: "https://blog.iua.edu.mx/", external: true }
];

const communityLinks = [
  { label: "Plataformas academicas IUA", to: "/comunidad#plataformas" },
  { label: "Reglamentos IUA", to: "/comunidad#reglamentos" },
  { label: "Titulacion IUA", to: "/comunidad#titulacion" },
  { label: "Apoyo institucional", to: "/comunidad#apoyo" }
];

const offerLinks = [
  { label: "RVOE oficial", to: "/rvoe" }
];

const whatsappUrl = institution.contact.whatsapp;

export function Logo({ inverse = false, footer = false }: LogoProps) {
  if (footer) {
    return (
      <Link to="/" className="flex min-w-0 flex-col items-center gap-3 text-center md:flex-row md:gap-4 md:text-left" aria-label="Ir al inicio">
        <img
          src="/Logo-iua.png"
          width="492"
          height="507"
          alt="Universidad IUA"
          decoding="async"
          className="h-28 w-28 shrink-0 object-contain md:h-16 md:w-16"
        />
        <div className="min-w-0 leading-tight">
          <p className={`text-2xl font-black tracking-tight md:text-xl ${inverse ? "text-white" : "text-iua-burgundy"}`}>Universidad IUA</p>
          <p className={`mt-1 max-w-xs text-sm font-medium ${inverse ? "text-white/60" : "text-neutral-500"}`}>Formamos lideres que transforman</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/" className="grid min-w-0 grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 md:gap-x-4" aria-label="Ir al inicio">
      <img
        src="/Logo-iua.png"
        width="492"
        height="507"
        alt="Universidad IUA"
        decoding="async"
        className="row-span-1 h-13 w-13 shrink-0 object-contain md:h-16 md:w-16"
      />
      <p className={`min-w-0 text-lg font-black leading-tight tracking-tight md:text-xl ${inverse ? "text-white" : "text-iua-burgundy"}`}>
        Universidad IUA
      </p>
      <p className={`col-span-2 min-w-0 text-xs font-medium leading-tight md:text-sm ${inverse ? "text-white/60" : "text-neutral-500"}`}>
        Formamos lideres que transforman
      </p>
    </Link>
  );
}

export default function Navbar() {
  const { openContactModal } = useContactModal();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const closeCommunityTimeout = useRef<number | null>(null);
  const closeOfferTimeout = useRef<number | null>(null);

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

  const openOfferMenu = () => {
    if (closeOfferTimeout.current) {
      window.clearTimeout(closeOfferTimeout.current);
      closeOfferTimeout.current = null;
    }
    setIsOfferOpen(true);
  };

  const closeOfferMenuWithDelay = () => {
    closeOfferTimeout.current = window.setTimeout(() => {
      setIsOfferOpen(false);
    }, 140);
  };

  const closeOfferMenuNow = () => {
    if (closeOfferTimeout.current) {
      window.clearTimeout(closeOfferTimeout.current);
      closeOfferTimeout.current = null;
    }
    setIsOfferOpen(false);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      closeCommunityMenuNow();
      closeOfferMenuNow();

      if (isMenuOpen || currentScrollY < 32) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
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
    closeOfferMenuNow();
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCommunityOpen(false);
        setIsOfferOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <header className={`site-header ${isHeaderVisible ? "site-header--visible" : "site-header--hidden"}`}>
      <div className="hidden bg-iua-burgundy text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs font-semibold">
          <div className="flex items-center gap-5">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-iua-gold">
              <BrandWhatsapp size={14} /> WhatsApp
            </a>
          </div>
          <span>Inscripciones abiertas para nuevo ingreso</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 bg-white px-5 py-2 md:px-6 md:py-3">
        <Logo />
        <nav className="hidden items-center gap-8 xl:flex">
          {navItems.map((item) =>
            item.label === "Oferta" ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={openOfferMenu}
                onMouseLeave={closeOfferMenuWithDelay}
              >
                <NavLink
                  to={item.to}
                  aria-haspopup="menu"
                  aria-expanded={isOfferOpen}
                  onFocus={openOfferMenu}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold transition ${
                      isActive ? "bg-iua-cream text-iua-burgundy" : "text-neutral-700 hover:bg-neutral-100 hover:text-iua-burgundy"
                    }`
                  }
                >
                  Oferta <ChevronDown size={15} className={`transition ${isOfferOpen ? "rotate-180" : ""}`} />
                </NavLink>

                <div
                  onMouseEnter={openOfferMenu}
                  onMouseLeave={closeOfferMenuWithDelay}
                  className={`absolute left-1/2 top-full z-70 w-56 -translate-x-1/2 pt-3 transition duration-150 ${
                    isOfferOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
                  }`}
                >
                  <div className="rounded-2xl border border-black/5 bg-white p-2 shadow-2xl shadow-neutral-900/15 ring-1 ring-black/5">
                    {offerLinks.map((link) => (
                      <Link key={link.to} to={link.to} onClick={closeOfferMenuNow} className="block rounded-xl px-4 py-3 text-sm font-bold text-neutral-700 transition hover:bg-iua-cream hover:text-iua-burgundy focus:bg-iua-cream focus:text-iua-burgundy focus:outline-none">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : item.label === "Comunidad" ? (
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
            ) : item.external ? (
              <a
                key={item.to}
                href={item.to}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-3 py-2 text-sm font-bold text-neutral-700 transition hover:bg-neutral-100 hover:text-iua-burgundy"
              >
                {item.label}
              </a>
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
          <button
            onClick={() => openContactModal()}
            className="hidden rounded-xl bg-iua-burgundy px-5 py-3 text-sm font-bold text-white shadow-lg shadow-iua-burgundy/20 transition hover:-translate-y-0.5 hover:bg-iua-dark xl:inline-flex xl:items-center xl:gap-2"
          >
            Pedir informacion <ArrowRight size={16} />
          </button>
          <button
            className="rounded-xl border border-neutral-200 bg-white p-3 text-iua-burgundy transition hover:border-iua-gold/60 hover:bg-iua-cream xl:hidden"
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
      <div className="site-header-spacer" aria-hidden="true" />

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-black/50 transition-opacity duration-300 xl:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-[100] flex w-[75vw] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 xl:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-100 p-4">
          <span className="text-sm font-black text-iua-burgundy">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-iua-burgundy"
            aria-label="Cerrar menu"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {navItems.map((item) =>
            item.label === "Oferta" ? (
              <div key={item.to} className="mb-1">
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
                  {offerLinks.map((link) => (
                    <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-600 transition hover:bg-iua-cream hover:text-iua-burgundy">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : item.label === "Comunidad" ? (
              <div key={item.to} className="mb-1">
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
            ) : item.external ? (
              <a
                key={item.to}
                href={item.to}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="mb-1 block rounded-xl px-4 py-3 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `mb-1 block rounded-xl px-4 py-3 text-sm font-bold transition ${
                    isActive ? "bg-iua-cream text-iua-burgundy" : "text-neutral-700 hover:bg-neutral-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
          <div className="mt-4 px-2">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                openContactModal();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-iua-burgundy px-4 py-3 text-sm font-black text-white transition hover:bg-iua-dark"
            >
              Pedir informacion <ArrowRight size={16} />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
