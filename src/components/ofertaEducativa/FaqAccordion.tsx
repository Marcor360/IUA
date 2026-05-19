import { ofertaFaq } from "../../data/ofertaEducativa";

export default function FaqAccordion() {
  return (
    <div className="program-faq">
      {ofertaFaq.map((faq) => (
        <details key={faq.question} className="program-faq__item">
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
