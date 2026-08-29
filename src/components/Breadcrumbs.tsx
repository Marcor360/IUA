import { Link } from "react-router-dom";
import type { BreadcrumbItem } from "../utils/structuredData";

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Migas de pan" className="breadcrumbs">
      <ol>
        {items.map((item, index) => (
          <li key={item.path}>
            {index < items.length - 1 ? <Link to={item.path}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
