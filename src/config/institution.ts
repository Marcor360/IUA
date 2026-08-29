export type Campus = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  address?: string;
  phones?: { label: string; href: string }[];
  schedule?: string[];
  appointmentUrl?: string;
  image: string;
  isVirtual?: boolean;
};

export type Institution = {
  name: string;
  description: string;
  url: string;
  logo: string;
  contact: { phone: string; whatsappPhone: string; whatsapp: string; email: string };
  campuses: Campus[];
  socialProfiles: string[];
};

export const institution: Institution = {
  name: "Universidad IUA",
  description: "Institución educativa con secundaria, bachillerato, licenciaturas y posgrados en el Estado de México, además de programas en línea.",
  url: "https://iua.edu.mx",
  logo: "https://iua.edu.mx/Logo-iua.png",
  contact: {
    phone: "+522201349213",
    whatsappPhone: "522201349213",
    whatsapp: "https://api.whatsapp.com/send?phone=2201349213&text=Hola",
    email: "admisiones@iua.edu.mx"
  },
  campuses: [
    {
      id: "campus-chalco",
      slug: "chalco",
      name: "IUA Campus Chalco",
      shortName: "Campus Chalco",
      address: "Carretera Chalco-Mixquic, esquina calle Sauce 1, San Mateo Huitzilzingo, Chalco, Estado de México, C.P. 56625",
      phones: [
        { label: "55 2236-7939", href: "tel:+525522367939" },
        { label: "55 2236-6742", href: "tel:+525522366742" }
      ],
      schedule: ["Lunes a viernes: 09:00 a 16:00", "Sábado: 09:00 a 13:00"],
      appointmentUrl: "https://reuniones.clientify.com/#/iua/chalco",
      image: "/banners/chalco-banner-recorte-1920x700.webp"
    },
    {
      id: "campus-reyes",
      slug: "reyes",
      name: "IUA Campus Reyes",
      shortName: "Campus Reyes",
      address: "Avenida Texcoco número 51, Los Reyes, La Paz, Estado de México, C.P. 56400",
      phones: [{ label: "55 5857-2887", href: "tel:+525558572887" }],
      schedule: ["Lunes a viernes: 09:00 a 16:00", "Sábado: 09:00 a 13:00"],
      appointmentUrl: "https://reuniones.clientify.com/#/iua/reyes",
      image: "/banners/los-reyes-banner-recorte-1920x700.webp"
    },
    {
      id: "campus-texcoco",
      slug: "texcoco",
      name: "IUA Plantel Texcoco",
      shortName: "Plantel Texcoco",
      address: "1a. Cda. de Campo Deportivo 7, San Pedro, 56105 Texcoco de Mora, México",
      phones: [{ label: "59 5925-1420", href: "tel:+525959251420" }],
      schedule: ["Lunes a viernes: 09:00 a 16:00", "Sábado: 09:00 a 13:00"],
      appointmentUrl: "https://reuniones.clientify.com/#/iua/texcoco",
      image: "/banners/biblioteca-banner-recorte-1920x700.webp"
    },
    {
      id: "campus-en-linea",
      slug: "en-linea",
      name: "Conecta IUA - Plantel virtual",
      shortName: "Plantel virtual",
      image: "/banners-edu/educacion en linea.webp",
      isVirtual: true
    }
  ],
  socialProfiles: [
    "https://www.facebook.com/IUA.Official",
    "https://www.instagram.com/iua.oficial/",
    "https://www.youtube.com/@iuaoficial",
    "https://www.tiktok.com/@iua_oficial"
  ]
};

export function whatsappUrl(message = "Hola, quiero recibir información sobre Universidad IUA.") {
  return `https://wa.me/${institution.contact.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export function campusSlugFromLabel(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes("chalco")) return "chalco";
  if (normalized.includes("reyes")) return "reyes";
  if (normalized.includes("texcoco")) return "texcoco";
  if (normalized.includes("virtual") || normalized.includes("línea")) return "en-linea";
  return undefined;
}
