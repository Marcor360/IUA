import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BotonWats from "./components/botonWats";
import CookieConsent from "./components/cookieConsent";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ProgramPage from "./components/ofertaEducativa/ProgramPage";
import { ContactModalProvider } from "./context/ContactModalContext";
import CareerQuizPage from "./features/careerQuiz/CareerQuizPage";
import AvisoDePrivacidad from "./page/avisoDePrivacidad";
import Campus from "./page/campus";
import CampusDetail from "./page/campusDetail";
import Comunidad from "./page/comunidad";
import HomePage from "./page/home";
import Nosotros from "./page/nosotros";
import NotFound from "./page/notFound";
import OfertaEducativa from "./page/ofertaEducativa";
import ContactoIua from "./page/ofertaEducativa/contactoiua";
import RvoePage from "./page/rvoe";

function ScrollToTop() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "instant", block: "start" }), 0);
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [hash, pathname]);
  return null;
}

export default function App() {
  return (
    <ContactModalProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/oferta" element={<OfertaEducativa />} />
        <Route path="/oferta/:slug" element={<ProgramPage />} />
        <Route path="/campus" element={<Campus />} />
        <Route path="/campus/:slug" element={<CampusDetail />} />
        <Route path="/rvoe" element={<RvoePage />} />
        <Route path="/que-carrera-estudiar" element={<CareerQuizPage />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/contacto" element={<ContactoIua />} />
        <Route path="/aviso-de-privacidad" element={<AvisoDePrivacidad />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <BotonWats />
      <CookieConsent />
    </ContactModalProvider>
  );
}
