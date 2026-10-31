export const virtualCampusIntro = [
  "Educación universitaria sin fronteras, con tecnología, calidad académica y acompañamiento permanente.",
  "En Universidad IUA transformamos la educación superior mediante un modelo educativo innovador que integra las Tecnologías de la Información y la Comunicación (TIC), la excelencia académica y la flexibilidad que necesitas para alcanzar tus objetivos profesionales.",
  "Nuestro Plantel Virtual, CONECTA IUA, te permite estudiar desde cualquier lugar, sin renunciar a la calidad educativa, la interacción directa con tus profesores y el acompañamiento institucional durante toda tu formación."
];

export function VirtualCampusIntro({ includeLead = true }: { includeLead?: boolean }) {
  return (
    <div className="space-y-4 text-base leading-8 text-neutral-600">
      {includeLead ? <p className="font-semibold text-neutral-800">{virtualCampusIntro[0]}</p> : null}
      <p>En <strong>Universidad IUA</strong> transformamos la educación superior mediante un modelo educativo innovador que integra las <strong>Tecnologías de la Información y la Comunicación (TIC)</strong>, la excelencia académica y la flexibilidad que necesitas para alcanzar tus objetivos profesionales.</p>
      <p>Nuestro <strong>Plantel Virtual, CONECTA IUA</strong>, te permite estudiar desde cualquier lugar, sin renunciar a la calidad educativa, la interacción directa con tus profesores y el acompañamiento institucional durante toda tu formación.</p>
    </div>
  );
}

const benefits = [
  { title: "Plataforma Académica Virtual", text: "acceso permanente a materiales educativos, actividades, evaluaciones y recursos de aprendizaje." },
  { title: "Microsoft Office 365", text: "licencia institucional para estudiantes, con herramientas digitales que facilitan el desarrollo de sus actividades académicas." },
  { title: "Correo electrónico institucional", text: "cuenta personalizada con dominio @iua.edu.mx, que fortalece tu identidad universitaria." },
  { title: "Clases en vivo mediante Microsoft Teams", text: "sesiones académicas en tiempo real que permiten interactuar directamente con profesores y compañeros." },
  { title: "Clases grabadas", text: "disponibilidad de las sesiones académicas para consultar y reforzar los conocimientos adquiridos, cuantas veces lo necesites." },
  { title: "Profesores de alto nivel académico", text: "docentes con sólida preparación, experiencia profesional y compromiso con la excelencia educativa." },
  { title: "Asistencia y acompañamiento permanente", text: "orientación académica, administrativa y tecnológica durante toda tu trayectoria universitaria." }
];

export default function VirtualCampusExperience() {
  return (
    <div className="mt-12 grid gap-8 rounded-3xl border border-iua-gold/30 bg-iua-cream p-6 md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-iua-gold">Experiencia CONECTA IUA</p>
        <h3 className="mt-3 text-2xl font-black tracking-tight text-neutral-950 md:text-3xl">Una experiencia universitaria respaldada por tecnología</h3>
        <p className="mt-4 text-base leading-8 text-neutral-700">Como estudiante de CONECTA IUA, tendrás acceso a herramientas tecnológicas y servicios académicos diseñados para fortalecer tu aprendizaje:</p>
      </div>
      <ul className="grid gap-3">
        {benefits.map(({ title, text }) => (
          <li key={title} className="rounded-xl bg-white px-5 py-4 text-sm leading-7 text-neutral-700 shadow-sm">
            <strong className="text-iua-burgundy">{title}:</strong> {text}
          </li>
        ))}
      </ul>
      <div className="border-t border-iua-gold/30 pt-6 text-base leading-8 text-neutral-700 lg:col-span-2">
        <h3 className="text-xl font-black text-neutral-950">Estudia a tu ritmo, sin estudiar solo.</h3>
        <p className="mt-3">En CONECTA IUA entendemos que la educación virtual debe ofrecer mucho más que clases a distancia.</p>
        <p className="mt-3">Por ello, nuestro modelo educativo combina <strong>tecnología, interacción humana, calidad académica y seguimiento personalizado</strong>, brindándote las herramientas necesarias para desarrollar conocimientos, habilidades y competencias profesionales.</p>
        <p className="mt-3 font-bold text-iua-burgundy">La distancia no limita tu formación. En Universidad IUA, la tecnología nos conecta y el conocimiento nos transforma.</p>
      </div>
    </div>
  );
}
