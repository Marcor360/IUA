type ClientifyContactFormProps = {
  title: string;
  description: string;
  formUrl: string;
  compact?: boolean;
};

export default function ClientifyContactForm({
  title,
  description,
  formUrl,
  compact = false,
}: ClientifyContactFormProps) {
  return (
    <article className="space-y-4">
      <div className="max-w-4xl">
        <p className="eyebrow">Formulario de contacto</p>
        <h3 className="section-title mt-3">{title}</h3>
        <p className="section-text mt-4">{description}</p>
      </div>

      <iframe
        title={title}
        src={formUrl}
        loading="lazy"
        className={`block w-full rounded-2xl border border-gray-200 bg-white shadow-sm ${
          compact ? "h-[620px] sm:h-[660px]" : "h-[740px] sm:h-[780px]"
        }`}
      />

      <a
        href={formUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex text-sm font-medium text-(--color-primary) underline underline-offset-4"
      >
        Abrir formulario de Clientify en nueva pestaña
      </a>
    </article>
  );
}
