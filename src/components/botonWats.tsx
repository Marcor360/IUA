import { IconBrandWhatsapp as BrandWhatsapp } from "@tabler/icons-react";

const whatsappUrl = "https://api.whatsapp.com/send?phone=+2201349213&text=Hola";

export default function BotonWats() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Hablar por WhatsApp"
      title="Hablar por WhatsApp"
      className="whatsapp-float"
    >
      <BrandWhatsapp size={30} className="whatsapp-float__icon" />
    </a>
  );
}
