import { getBlogCards } from "@/lib/wordpress/content";

export default async function BlogPage() {
  const blogPosts = await getBlogCards();

  return (
    <main>
      <section className="surface-band border-b border-[var(--color-gray-200)]">
        <div className="container-page py-16 lg:py-20">
          <p className="eyebrow">Blog IUA</p>
          <h1 className="hero-title mt-3">
            Noticias y contenidos de la comunidad academica
          </h1>
          <div className="accent-line mt-6" />
          <p className="section-text mt-6 max-w-4xl">
            Integracion del bloque editorial actual con formato de lectura clara
            y tarjetas consistentes para mejorar descubrimiento de contenidos.
          </p>
        </div>
      </section>

      <section>
        <div className="container-page py-16">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="card transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)]">
                  {post.category}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-[var(--color-black)]">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm text-[var(--color-gray-500)]">
                  {post.date}
                </p>
                <span className="mt-6 inline-flex text-sm font-medium text-[var(--color-primary)] underline underline-offset-4">
                  Leer en sitio original
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
