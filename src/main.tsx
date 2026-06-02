import { Suspense, lazy, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import BotonWats from "./components/botonWats";
import CookieConsent from "./components/cookieConsent";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./styles.css";

const HomePage = lazy(() => import("./page/home"));
const AvisoDePrivacidad = lazy(() => import("./page/avisoDePrivacidad"));
const Campus = lazy(() => import("./page/campus"));
const Comunidad = lazy(() => import("./page/comunidad"));
const Nosotros = lazy(() => import("./page/nosotros"));
const NotFound = lazy(() => import("./page/notFound"));
const OfertaEducativa = lazy(() => import("./page/ofertaEducativa"));
const ProgramPage = lazy(() => import("./components/ofertaEducativa/ProgramPage"));
const ContactoIua = lazy(() => import("./page/ofertaEducativa/contactoiua"));

function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "instant", block: "start" });
      }, 0);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [hash, pathname]);

  return null;
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-iua-cream border-t-iua-burgundy"></div>
    </div>
  );
}

import { ContactModalProvider } from "./context/ContactModalContext";

function App() {
  return (
    <ContactModalProvider>
      <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/oferta" element={<OfertaEducativa />} />
          <Route path="/oferta/:slug" element={<ProgramPage />} />
          <Route path="/campus" element={<Campus />} />
          <Route path="/comunidad" element={<Comunidad />} />
          <Route path="/contacto" element={<ContactoIua />} />
          <Route path="/aviso-de-privacidad" element={<AvisoDePrivacidad />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <BotonWats />
      <CookieConsent />
    </BrowserRouter>
    </ContactModalProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
