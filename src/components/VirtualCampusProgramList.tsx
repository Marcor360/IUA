import { Link } from "react-router-dom";
import { ofertaEducativa } from "../data/ofertaEducativa";
import { virtualCampusProgramIds } from "../data/virtualCampusPrograms";

const programs = virtualCampusProgramIds.map((id) => {
  const program = ofertaEducativa.find((item) => item.id === id);
  if (!program) throw new Error(`Programa del plantel virtual no encontrado: ${id}`);
  return program;
});

export default function VirtualCampusProgramList() {
  return (
    <ul className="campus-programs__list mt-4 rounded-xl border border-[#eadfca]">
      {programs.map((program) => (
        <li key={program.id}>
          <Link to={`/oferta/${program.slug}`}>
            {program.id === "ingenieria-en-sistemas-computacionales" ? "Licenciatura en Ingeniería en Sistemas Computacionales" : program.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
