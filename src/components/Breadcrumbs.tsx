import { Link } from "react-router-dom";
import type { BreadcrumbItem } from "../config/breadcrumbs";

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Migas de pan" className="breadcrumbs">
      <ol>
        {items.map((item, index) => (
          <li key={item.path}>
            {index < items.length - 1 ? <><Link to={item.path}>{item.name}</Link><span className="breadcrumbs__separator" aria-hidden="true">›</span></> : <span aria-current="page">{item.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
