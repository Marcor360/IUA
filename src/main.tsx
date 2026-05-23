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
const OfertaEducativa = lazy(() => import("./page/ofertaEducativa"));
const AdministracionDeEmpresasPage = lazy(() => import("./page/ofertaEducativa/administracion-de-empresas"));
const ArquitecturaPage = lazy(() => import("./page/ofertaEducativa/arquitectura"));
const ArtesCulinariasPage = lazy(() => import("./page/ofertaEducativa/artes-culinarias"));
const BachilleratoPage = lazy(() => import("./page/ofertaEducativa/bachillerato"));
const ContaduriaPublicaPage = lazy(() => import("./page/ofertaEducativa/contaduria-publica"));
const ContactoIua = lazy(() => import("./page/ofertaEducativa/contactoiua"));
const DerechoPage = lazy(() => import("./page/ofertaEducativa/derecho"));
const DisenoGraficoPage = lazy(() => import("./page/ofertaEducativa/diseno-grafico"));
const DoctoradoDerechoPage = lazy(() => import("./page/ofertaEducativa/doctorado-derecho"));
const IngenieriaEnSistemasComputacionalesPage = lazy(() => import("./page/ofertaEducativa/ingenieria-en-sistemas-computacionales"));
const LenguasExtranjerasPage = lazy(() => import("./page/ofertaEducativa/lenguas-extranjeras"));
const MaestriaDerechoPenalPage = lazy(() => import("./page/ofertaEducativa/maestria-derecho-penal"));
const MaestriaEducacionPage = lazy(() => import("./page/ofertaEducativa/maestria-educacion"));
const PedagogiaPage = lazy(() => import("./page/ofertaEducativa/pedagogia"));
const PsicologiaPage = lazy(() => import("./page/ofertaEducativa/psicologia"));
const SecundariaPage = lazy(() => import("./page/ofertaEducativa/secundaria"));

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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/oferta" element={<OfertaEducativa />} />
          <Route path="/oferta/secundaria" element={<SecundariaPage />} />
          <Route path="/oferta/bachillerato" element={<BachilleratoPage />} />
          <Route path="/oferta/derecho" element={<DerechoPage />} />
          <Route path="/oferta/psicologia" element={<PsicologiaPage />} />
          <Route path="/oferta/pedagogia" element={<PedagogiaPage />} />
          <Route path="/oferta/arquitectura" element={<ArquitecturaPage />} />
          <Route path="/oferta/artes-culinarias" element={<ArtesCulinariasPage />} />
          <Route path="/oferta/contaduria-publica" element={<ContaduriaPublicaPage />} />
          <Route path="/oferta/administracion-de-empresas" element={<AdministracionDeEmpresasPage />} />
          <Route path="/oferta/diseno-grafico" element={<DisenoGraficoPage />} />
          <Route path="/oferta/lenguas-extranjeras" element={<LenguasExtranjerasPage />} />
          <Route path="/oferta/ingenieria-en-sistemas-computacionales" element={<IngenieriaEnSistemasComputacionalesPage />} />
          <Route path="/oferta/maestria-derecho-penal" element={<MaestriaDerechoPenalPage />} />
          <Route path="/oferta/maestria-educacion" element={<MaestriaEducacionPage />} />
          <Route path="/oferta/doctorado-derecho" element={<DoctoradoDerechoPage />} />
          <Route path="/campus" element={<Campus />} />
          <Route path="/comunidad" element={<Comunidad />} />
          <Route path="/contacto" element={<ContactoIua />} />
          <Route path="/aviso-de-privacidad" element={<AvisoDePrivacidad />} />
        </Routes>
      </Suspense>
      <Footer />
      <BotonWats />
      <CookieConsent />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
