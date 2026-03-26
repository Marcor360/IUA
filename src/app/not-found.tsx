import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="container-page py-20">
      <p className="eyebrow">404</p>
      <h1 className="hero-title mt-3">Pagina no encontrada</h1>
      <p className="section-text mt-6 max-w-2xl">
        La ruta solicitada no existe en esta version del sitio institucional.
        Puedes regresar al inicio o consultar la oferta educativa.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className="btn-primary">
          Volver al inicio
        </Link>
        <Link href="/oferta-educativa-iua" className="btn-secondary">
          Ver oferta educativa
        </Link>
      </div>
    </main>
  );
}
