import type { ProgramaOferta } from "../../data/ofertaEducativa";

export default function FaqAccordion({ program }: { program: ProgramaOferta }) {
  const faqs = [
    { question: `¿Qué se estudia en ${program.title}?`, answer: program.shortDescription },
    { question: `¿Para quién es recomendable ${program.title}?`, answer: program.perfilIngreso },
    { question: "¿Cuánto dura el programa?", answer: `${program.duration}, organizado en ${program.terms}.` },
    { question: "¿Qué modalidades están publicadas?", answer: `Las modalidades indicadas para este programa son: ${program.modalities.join(", ")}. La disponibilidad debe confirmarse por campus.` },
    { question: "¿Dónde se puede estudiar?", answer: `La ficha actual indica disponibilidad en: ${program.campus.join(", ")}.` }
  ];
  return (
    <div className="program-faq">
      {faqs.map((faq) => (
        <details key={faq.question} className="program-faq__item">
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
