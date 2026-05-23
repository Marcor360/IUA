import type { ReactNode } from "react";
import {
  IconBuildingBank as BuildingBank,
  IconChecklist as Checklist,
  IconExternalLink as ExternalLink,
  IconFileText as FileText,
  IconMail as Mail,
  IconMapPin as MapPin,
  IconPhone as Phone,
  IconShieldCheck as ShieldCheck
} from "@tabler/icons-react";
import { usePageSeo } from "../utils/seo";

const secondaryPurposes = [
  "Para la gestion de actividades academicas y escolares del alumno relacionadas a su nivel de estudios",
  "Para contratar personal para ser profesor de secundaria, bachillerato, licenciatura, maestria o doctorado",
  "Para realizar el proceso de admision e inscripcion de un alumno a educacion secundaria, bachillerato, licenciatura, maestria o doctorado",
  "Mercadotecnia o publicitaria",
  "Prospeccion comercial"
];

const personalData = [
  "Nombre",
  "Estado civil",
  "Registro Federal de Contribuyentes (RFC)",
  "Clave Unica de Registro de Poblacion (CURP)",
  "Lugar de nacimiento",
  "Fecha de nacimiento",
  "Nacionalidad",
  "Domicilio",
  "Telefono particular",
  "Telefono celular",
  "Correo electronico",
  "Edad",
  "Fotografia",
  "Puesto o cargo que desempena",
  "Referencias laborales",
  "Informacion generada durante los procesos de reclutamiento, seleccion y contratacion",
  "Trayectoria educativa",
  "Titulos",
  "Cedula profesional",
  "Certificados",
  "Reconocimientos",
  "Pasatiempos",
  "Aficiones",
  "Deportes que practica",
  "Juegos de su interes"
];

const sensitiveData = [
  "Posturas ideologicas",
  "Posturas filosoficas",
  "Estado de salud fisico presente, pasado o futuro",
  "Estado de salud mental presente, pasado o futuro"
];

const transfers = [
  {
    recipient: "OpenPay",
    purpose: "Realizar pagos de inscripcion, colegiatura, re-inscripciones y otros servicios academicos",
    consent: "No"
  },
  {
    recipient: "Clientify",
    purpose: "Realizar el seguimiento de los prospectos, alumnos, clientes y usuarios que tengan alguna relacion con IUA o tengan alguna peticion hacia la universidad",
    consent: "No"
  }
];

const trackingPurposes = [
  "Para correlacionar datos de los usuarios con bases de datos de la comunidad estudiantil y analizar el comportamiento de consumo de informacion en nuestro sitio web",
  "Para la creacion, estudio, analisis, actualizacion y comportamiento del usuario ante iniciativas de marketing digital y publicidad en linea",
  "Para llevar a cabo la inscripcion del alumno a su grado escolar",
  "Para llevar un informe de alcance y comportamiento del usuario"
];

const trackingData = [
  "Identificadores, nombre de usuario y contrasenas de una sesion",
  "Idioma preferido por el usuario",
  "Region en la que se encuentra el usuario",
  "Tipo de navegador del usuario",
  "Tipo de sistema operativo del usuario",
  "Fecha y hora del inicio y final de una sesion de un usuario",
  "Paginas web visitadas por un usuario",
  "Busquedas realizadas por un usuario",
  "Publicidad revisada por un usuario",
  "Listas y habitos de consumo en paginas de compras"
];

function Section({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-iua-gold">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-950 md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 rounded-xl bg-iua-cream px-4 py-3 text-sm leading-6 text-neutral-700">
          <Checklist size={18} className="mt-0.5 shrink-0 text-iua-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AvisoDePrivacidad() {
  usePageSeo({
    title: "Aviso de Privacidad | Universidad IUA",
    description: "Consulta el aviso de privacidad de Universidad IUA, responsable del tratamiento de datos personales, derechos ARCO, cookies y transferencias.",
    path: "/aviso-de-privacidad",
    image: "/banners/educacion-2-banner-recorte-1920x700.webp"
  });

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      <section className="relative overflow-hidden bg-iua-dark px-5 py-16 text-white md:px-6 md:py-20">
        <div className="absolute inset-0 bg-linear-to-r from-iua-dark/92 via-iua-burgundy/76 to-iua-dark/54" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur">
              <ShieldCheck size={16} /> Universidad IUA
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Aviso de privacidad
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
              Corporativo Universitario Alba, S.C., mejor conocido como Universidad IUA, informa el uso,
              proteccion y tratamiento de los datos personales recabados a traves de sus servicios,
              sitio web y canales de atencion.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="min-w-0 space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <BuildingBank size={34} className="text-iua-gold" />
              <h2 className="mt-3 text-xl font-black text-neutral-950">Responsable</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                Corporativo Universitario Alba, S.C. Calle Abasolo 104, colonia El Carmen,
                Texcoco de Mora, Texcoco, C.P. 56100, Estado de Mexico, Mexico.
              </p>
              <a
                href="https://iua.edu.mx"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-black text-iua-burgundy"
              >
                iua.edu.mx <ExternalLink size={15} />
              </a>
            </div>

            <div className="rounded-2xl bg-iua-dark p-6 text-white shadow-sm">
              <h2 className="text-xl font-black">Datos ARCO</h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-white/75">
                <p className="flex gap-2">
                  <Mail size={17} className="mt-0.5 shrink-0 text-iua-gold" />
                  soy@iua.edu.mx
                </p>
                <p className="flex gap-2">
                  <Phone size={17} className="mt-0.5 shrink-0 text-iua-gold" />
                  +52 220 134 9213
                </p>
                <p className="flex gap-2">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-iua-gold" />
                  Abasolo #104, El Carmen, Texcoco de Mora.
                </p>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-6">
            <Section eyebrow="Finalidades" title="Para que fines utilizaremos sus datos personales">
              <p>
                Los datos personales que recabamos de usted se utilizan para las finalidades necesarias
                del servicio que solicita. De manera adicional, podremos utilizar su informacion personal
                para finalidades secundarias que nos permiten brindar una mejor atencion.
              </p>
              <BulletList items={secondaryPurposes} />
              <div className="rounded-2xl border border-iua-gold/30 bg-iua-cream p-5">
                <p className="font-black text-iua-burgundy">No consentimiento para finalidades secundarias</p>
                <p className="mt-2">
                  Usted puede indicar que no consiente el uso de sus datos personales para las finalidades
                  secundarias listadas. La negativa no sera motivo para negar los servicios o productos que
                  solicita o contrata con Universidad IUA.
                </p>
              </div>
            </Section>

            <Section eyebrow="Datos recabados" title="Datos personales que utilizaremos">
              <BulletList items={personalData} />
              <div>
                <h3 className="mt-6 text-lg font-black text-neutral-950">Datos personales sensibles</h3>
                <p className="mt-2">
                  Para las finalidades informadas tambien podremos utilizar los siguientes datos personales
                  considerados sensibles, que requieren especial proteccion:
                </p>
                <div className="mt-4">
                  <BulletList items={sensitiveData} />
                </div>
              </div>
            </Section>

            <Section eyebrow="Transferencias" title="Con quien compartimos su informacion personal">
              <div className="overflow-x-auto rounded-2xl border border-black/10">
                <table className="w-full min-w-[500px] text-left text-sm">
                  <thead className="bg-iua-burgundy text-white">
                    <tr>
                      <th className="px-4 py-3 font-black">Destinatario</th>
                      <th className="px-4 py-3 font-black">Finalidad</th>
                      <th className="px-4 py-3 font-black">Consentimiento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 bg-white">
                    {transfers.map((transfer) => (
                      <tr key={transfer.recipient}>
                        <td className="px-4 py-4 font-bold text-neutral-950">{transfer.recipient}</td>
                        <td className="px-4 py-4 text-neutral-700">{transfer.purpose}</td>
                        <td className="px-4 py-4 text-neutral-700">{transfer.consent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section eyebrow="Derechos ARCO" title="Acceso, rectificacion, cancelacion u oposicion">
              <p>
                Usted tiene derecho a conocer que datos personales tenemos de usted, para que los utilizamos
                y las condiciones del uso que les damos. Tambien puede solicitar la correccion de su informacion,
                su eliminacion de registros o bases de datos, u oponerse a su uso para fines especificos.
              </p>
              <p>
                Para ejercer cualquiera de los derechos ARCO debera presentar su solicitud al correo
                <a href="mailto:soy@iua.edu.mx" className="font-black text-iua-burgundy"> soy@iua.edu.mx</a>.
              </p>
              <div className="rounded-2xl bg-iua-cream p-5">
                <p className="font-black text-neutral-950">Departamento de datos personales</p>
                <p className="mt-2">Responsable: Aurelio Alba</p>
                <p>Domicilio: Abasolo #104, El Carmen, Texcoco de Mora, C.P. 56100, Estado de Mexico.</p>
                <p>Correo: soy@iua.edu.mx</p>
                <p>Telefono: +52 220 134 9213</p>
              </div>
            </Section>

            <Section eyebrow="Consentimiento" title="Revocacion y limitacion de uso">
              <p>
                Usted puede revocar el consentimiento otorgado para el tratamiento de sus datos personales.
                En algunos casos no podremos atender la solicitud o concluir el uso de forma inmediata por
                obligaciones legales o por la naturaleza del servicio solicitado.
              </p>
              <p>
                Para revocar su consentimiento o limitar el uso y divulgacion de su informacion personal,
                envie un correo a
                <a href="mailto:soy@iua.edu.mx" className="font-black text-iua-burgundy"> soy@iua.edu.mx</a>.
              </p>
            </Section>

            <Section eyebrow="Tecnologias" title="Uso de cookies y tecnologias de rastreo">
              <p>
                En nuestro portal de internet utilizamos cookies, web beacons u otras tecnologias para
                monitorear comportamiento de navegacion, brindar mejor servicio y mejorar la experiencia
                en el sitio.
              </p>
              <h3 className="text-lg font-black text-neutral-950">Finalidades de rastreo</h3>
              <BulletList items={trackingPurposes} />
              <h3 className="pt-3 text-lg font-black text-neutral-950">Datos obtenidos por estas tecnologias</h3>
              <BulletList items={trackingData} />
              <div className="rounded-2xl border border-black/10 p-5">
                <p className="font-black text-neutral-950">Terceros relacionados con tecnologias y servicios</p>
                <p className="mt-2">
                  OpenPay: pagos de inscripcion, re-inscripcion, colegiaturas y servicios escolares.
                  Clientify: gestion de la relacion con usuarios, prospectos, alumnos y clientes usando CRM.
                </p>
              </div>
            </Section>

            <Section eyebrow="Actualizaciones" title="Cambios al aviso de privacidad">
              <p>
                El presente aviso puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos
                requerimientos legales, necesidades por servicios ofrecidos, practicas de privacidad, cambios
                en el modelo de negocio u otras causas.
              </p>
              <p>
                Universidad IUA informara los cambios a traves de su sitio web:
                <a
                  href="https://iua.edu.mx/aviso-de-privacidad/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-black text-iua-burgundy"
                >
                  {" "}https://iua.edu.mx/aviso-de-privacidad/
                </a>.
              </p>
            </Section>

            <section className="rounded-2xl bg-iua-dark p-6 text-white shadow-xl shadow-iua-burgundy/20 md:p-8">
              <FileText size={34} className="text-iua-gold" />
              <h2 className="mt-3 text-2xl font-black tracking-tight">Consentimiento del titular</h2>
              <p className="mt-4 text-sm leading-7 text-white/75 md:text-base md:leading-8">
                Al hacer uso del sitio web https://iua.edu.mx y/o del chatbot de IUA doy consentimiento
                expreso para que mis datos personales sean tratados de conformidad con los terminos y
                condiciones informados en el presente aviso de privacidad.
              </p>
              <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-iua-burgundy">
                Ultima actualizacion: 16/04/2024
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
