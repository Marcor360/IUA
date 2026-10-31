import type { BreadcrumbItem } from "../config/breadcrumbs";
import { breadcrumbSchema } from "../utils/structuredData";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";

export default function PageBreadcrumbs({ id, items }: { id: string; items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd id={id} data={breadcrumbSchema(items)} />
      <div className="page-breadcrumbs"><Breadcrumbs items={items} /></div>
    </>
  );
}
