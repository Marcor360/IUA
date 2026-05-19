import type { ReactNode } from "react";

type InfoSectionProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  children?: ReactNode;
};

export default function InfoSection({ eyebrow, title, text, children }: InfoSectionProps) {
  return (
    <section className="program-section">
      {eyebrow ? <p className="program-section__eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p className="program-section__text">{text}</p> : null}
      {children}
    </section>
  );
}
