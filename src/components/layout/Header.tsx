import Link from "next/link";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Oferta Educativa", href: "/oferta-educativa" },
  { label: "Admisiones", href: "/admisiones" },
  { label: "Noticias", href: "/noticias" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-slate-900">
          Universidad
        </Link>

        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
