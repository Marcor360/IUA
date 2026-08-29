import { useEffect, useMemo, useRef, useState } from "react";
import { IconArrowLeft, IconBrandWhatsapp, IconCheck, IconMail, IconPhone, IconX } from "@tabler/icons-react";
import { campusSlugFromLabel, institution, whatsappUrl } from "../config/institution";
import type { ContactContext } from "../context/ContactModalContext";
import { ofertaEducativa } from "../data/ofertaEducativa";
import { trackEvent } from "../utils/analytics";

type Props = { isOpen: boolean; onClose: () => void; context: ContactContext };
type Step = "selection" | "form" | "success";

export function ContactModal({ isOpen, onClose, context }: Props) {
  const [step, setStep] = useState<Step>("selection");
  const [method, setMethod] = useState<"phone" | "email" | null>(null);
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [programa, setPrograma] = useState("");
  const [plantel, setPlantel] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const program = useMemo(() => ofertaEducativa.find((item) => item.id === programa), [programa]);
  const campuses = useMemo(() => {
    if (!program) return institution.campuses;
    const slugs = new Set(program.campus.flatMap((label) => {
      const slug = campusSlugFromLabel(label);
      return slug ? [slug] : [];
    }));
    return institution.campuses.filter((campus) => slugs.has(campus.slug));
  }, [program]);

  useEffect(() => {
    if (!isOpen) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    setStep("selection"); setMethod(null); setNombre(""); setContacto("");
    setPrograma(context.programId ?? ""); setPlantel(context.campusId ?? ""); setWebsite(""); setError("");
    document.body.style.overflow = "hidden";
    window.setTimeout(() => dialogRef.current?.focus(), 0);
    return () => { document.body.style.overflow = ""; previousFocus.current?.focus(); };
  }, [context.campusId, context.programId, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { onClose(); return; }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]):not([tabindex="-1"]),select:not([disabled])'));
      if (!nodes.length) return;
      if (event.shiftKey && document.activeElement === nodes[0]) { event.preventDefault(); nodes.at(-1)?.focus(); }
      else if (!event.shiftKey && document.activeElement === nodes.at(-1)) { event.preventDefault(); nodes[0].focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const message = program ? `Hola, quiero recibir información sobre ${program.title}.` : "Hola, quiero recibir información sobre Universidad IUA.";

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setIsSubmitting(true); setError("");
    try {
      const response = await fetch("/api/contact.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ method, nombre, contacto, programa, plantel, website }) });
      if (!response.ok) throw new Error();
      setStep("success"); trackEvent("lead_submit", { program: programa, campus: plantel, method: method ?? "" });
    } catch { setError("No pudimos enviar tus datos. Intenta de nuevo o escríbenos por WhatsApp."); }
    finally { setIsSubmitting(false); }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" className="relative max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
        <button type="button" onClick={onClose} className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100" aria-label="Cerrar modal"><IconX size={20} /></button>
        {step === "selection" ? <>
          <div className="mb-6 mt-6 text-center"><h2 id="contact-modal-title" className="text-xl font-black text-iua-burgundy">¿Cómo quieres recibir información?</h2><p className="mt-2 text-sm text-neutral-600">Un asesor se pondrá en contacto contigo.</p></div>
          <div className="flex flex-col gap-3">
            <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" onClick={() => { trackEvent("whatsapp_click", { program: programa }); onClose(); }} className="flex items-center gap-4 rounded-2xl border p-4"><IconBrandWhatsapp size={28} className="text-[#25D366]" /><span><strong>WhatsApp</strong><small className="block">Respuesta rápida</small></span></a>
            <button type="button" onClick={() => { setMethod("phone"); setStep("form"); }} className="flex items-center gap-4 rounded-2xl border p-4 text-left"><IconPhone size={28} /><span><strong>Teléfono</strong><small className="block">Te llamamos nosotros</small></span></button>
            <button type="button" onClick={() => { setMethod("email"); setStep("form"); }} className="flex items-center gap-4 rounded-2xl border p-4 text-left"><IconMail size={28} /><span><strong>Correo electrónico</strong><small className="block">Recibe la información</small></span></button>
          </div>
        </> : null}
        {step === "form" ? <>
          <div className="mb-6 mt-6 flex items-center"><button type="button" onClick={() => setStep("selection")} aria-label="Volver" className="mr-3 rounded-full bg-neutral-100 p-2"><IconArrowLeft size={20} /></button><h2 id="contact-modal-title" className="text-xl font-black text-iua-burgundy">Compártenos tus datos</h2></div>
          <form onSubmit={submit} className="flex flex-col gap-4">
            <label className="sr-only" aria-hidden="true">Sitio web<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
            <label className="flex flex-col gap-1"><strong>Nombre completo</strong><input required maxLength={100} value={nombre} onChange={(e) => setNombre(e.target.value)} className="rounded-xl border px-4 py-2.5" /></label>
            <label className="flex flex-col gap-1"><strong>{method === "phone" ? "Número de teléfono" : "Correo electrónico"}</strong><input required maxLength={254} type={method === "phone" ? "tel" : "email"} value={contacto} onChange={(e) => setContacto(e.target.value)} className="rounded-xl border px-4 py-2.5" /></label>
            <label className="flex flex-col gap-1"><strong>Programa de interés</strong><select required value={programa} onChange={(e) => { setPrograma(e.target.value); setPlantel(""); }} className="rounded-xl border px-4 py-2.5"><option value="">Selecciona un programa</option>{ofertaEducativa.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
            <label className="flex flex-col gap-1"><strong>Plantel</strong><select required value={plantel} onChange={(e) => setPlantel(e.target.value)} className="rounded-xl border px-4 py-2.5"><option value="">Selecciona un plantel</option>{campuses.map((campus) => <option key={campus.id} value={campus.id}>{campus.shortName}</option>)}</select></label>
            <button type="submit" disabled={isSubmitting} className="rounded-xl bg-iua-burgundy px-4 py-3 font-bold text-white disabled:opacity-60">{isSubmitting ? "Enviando…" : "Enviar información"}</button>
            {error ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
          </form>
        </> : null}
        {step === "success" ? <div className="py-8 text-center"><IconCheck size={44} className="mx-auto text-green-600" /><h2 id="contact-modal-title" className="mt-3 text-2xl font-black text-iua-burgundy">Datos enviados</h2><p>Un asesor se pondrá en contacto contigo.</p><button type="button" onClick={onClose} className="mt-6 rounded-xl bg-neutral-100 px-5 py-3 font-bold">Cerrar</button></div> : null}
      </div>
    </div>
  );
}
