import { useEffect, useState, useMemo } from "react";
import {
  IconBrandWhatsapp as BrandWhatsapp,
  IconPhone as Phone,
  IconMail as Mail,
  IconX as X,
  IconArrowLeft as ArrowLeft,
  IconCheck as Check,
} from "@tabler/icons-react";
import { ofertaEducativa } from "../data/ofertaEducativa";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const whatsappUrl = "https://api.whatsapp.com/send?phone=+2201349213&text=Hola";

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState<"selection" | "form" | "success">("selection");
  const [selectedMethod, setSelectedMethod] = useState<"phone" | "email" | null>(null);

  // Form state
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [programa, setPrograma] = useState("");
  const [plantel, setPlantel] = useState("");

  const campusOptions = useMemo(() => {
    const campus = new Set(
      ofertaEducativa.flatMap((program) => 
        program.campus.map(c => c.replace("Plantel", "Campus"))
      )
    );
    return Array.from(campus);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // Reset state when opening
      setStep("selection");
      setSelectedMethod(null);
      setNombre("");
      setContacto("");
      setPrograma("");
      setPlantel("");
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se enviaría la información a Clientify o al backend
    console.log({ method: selectedMethod, nombre, contacto, programa, plantel });
    setStep("success");
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <div className="relative w-full max-w-sm rounded-[2rem] bg-white p-6 sm:p-8 shadow-2xl ring-1 ring-black/5 animate-rise max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-neutral-200 hover:text-neutral-900"
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        {step === "selection" && (
          <>
            <div className="mb-6 mt-6">
              <h3 className="text-xl font-black tracking-tight text-iua-burgundy text-center px-2">
                Selecciona por qué método quieres recibir la información
              </h3>
              <p className="mt-2 text-center text-sm text-neutral-600 px-2">
                Un asesor se pondrá en contacto contigo a la brevedad.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[#25D366] hover:bg-neutral-50 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                  <BrandWhatsapp size={28} />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">WhatsApp</p>
                  <p className="text-xs text-neutral-500">Respuesta rápida</p>
                </div>
              </a>

              <button
                onClick={() => {
                  setSelectedMethod("phone");
                  setStep("form");
                }}
                className="w-full text-left flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-iua-gold hover:bg-neutral-50 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-iua-cream text-iua-gold">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Teléfono</p>
                  <p className="text-xs text-neutral-500">Te llamamos nosotros</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedMethod("email");
                  setStep("form");
                }}
                className="w-full text-left flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-iua-burgundy hover:bg-neutral-50 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-iua-burgundy/10 text-iua-burgundy">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Correo electrónico</p>
                  <p className="text-xs text-neutral-500">Recibe toda la información</p>
                </div>
              </button>
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <div className="mb-6 mt-6 flex items-center pr-6">
              <button
                onClick={() => setStep("selection")}
                className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-neutral-200 hover:text-neutral-900"
                aria-label="Volver"
              >
                <ArrowLeft size={20} />
              </button>
              <h3 className="text-xl font-black tracking-tight text-iua-burgundy leading-tight">
                Compártenos tus datos
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-neutral-700">Nombre completo</span>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm transition focus:border-iua-burgundy focus:bg-white focus:outline-none focus:ring-1 focus:ring-iua-burgundy"
                  placeholder="Tu nombre"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-neutral-700">
                  {selectedMethod === "phone" ? "Número de teléfono" : "Correo electrónico"}
                </span>
                <input
                  type={selectedMethod === "phone" ? "tel" : "email"}
                  required
                  value={contacto}
                  onChange={(e) => setContacto(e.target.value)}
                  className="rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm transition focus:border-iua-burgundy focus:bg-white focus:outline-none focus:ring-1 focus:ring-iua-burgundy"
                  placeholder={selectedMethod === "phone" ? "55 1234 5678" : "correo@ejemplo.com"}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-neutral-700">Programa de interés</span>
                <select
                  required
                  value={programa}
                  onChange={(e) => setPrograma(e.target.value)}
                  className="rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm transition focus:border-iua-burgundy focus:bg-white focus:outline-none focus:ring-1 focus:ring-iua-burgundy"
                >
                  <option value="" disabled>Selecciona una opción</option>
                  {ofertaEducativa.map((prog) => (
                    <option key={prog.id} value={prog.title}>{prog.title}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-neutral-700">Plantel</span>
                <select
                  required
                  value={plantel}
                  onChange={(e) => setPlantel(e.target.value)}
                  className="rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm transition focus:border-iua-burgundy focus:bg-white focus:outline-none focus:ring-1 focus:ring-iua-burgundy"
                >
                  <option value="" disabled>Selecciona un plantel</option>
                  {campusOptions.map((campus) => (
                    <option key={campus} value={campus}>{campus}</option>
                  ))}
                  <option value="En línea">En línea</option>
                </select>
              </label>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-iua-burgundy px-4 py-3 text-sm font-bold text-white transition hover:bg-iua-dark hover:-translate-y-0.5 shadow-lg shadow-iua-burgundy/20"
              >
                Enviar información
              </button>
            </form>
          </>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Check size={36} />
            </div>
            <h3 className="mb-2 text-2xl font-black text-iua-burgundy">¡Datos enviados!</h3>
            <p className="text-neutral-600">
              Gracias por tu interés. Un asesor se pondrá en contacto contigo muy pronto.
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-neutral-100 px-4 py-3 text-sm font-bold text-neutral-700 transition hover:bg-neutral-200"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
