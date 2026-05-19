import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconAdjustmentsHorizontal as Adjustments,
  IconCookie as Cookie,
  IconShieldCheck as ShieldCheck,
  IconX as X
} from "@tabler/icons-react";

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "iua_cookie_preferences";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: ""
};

function readPreferences() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as CookiePreferences;
  } catch {
    return null;
  }
}

function applyPreferences(preferences: CookiePreferences) {
  const globalWindow = window as Window & { iuaCookieConsent?: CookiePreferences };
  globalWindow.iuaCookieConsent = preferences;
  window.dispatchEvent(new CustomEvent("iua-cookie-consent-change", { detail: preferences }));
}

function savePreferences(preferences: Omit<CookiePreferences, "necessary" | "updatedAt">) {
  const nextPreferences: CookiePreferences = {
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    updatedAt: new Date().toISOString()
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences));
  applyPreferences(nextPreferences);
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    const storedPreferences = readPreferences();

    if (storedPreferences) {
      setPreferences(storedPreferences);
      applyPreferences(storedPreferences);
    } else {
      setIsVisible(true);
    }

    const openSettings = () => {
      setPreferences(readPreferences() ?? defaultPreferences);
      setIsConfigOpen(true);
      setIsVisible(true);
    };

    window.addEventListener("iua-open-cookie-settings", openSettings);
    return () => window.removeEventListener("iua-open-cookie-settings", openSettings);
  }, []);

  const acceptAll = () => {
    savePreferences({ analytics: true, marketing: true });
    setPreferences({ necessary: true, analytics: true, marketing: true, updatedAt: new Date().toISOString() });
    setIsVisible(false);
    setIsConfigOpen(false);
  };

  const rejectOptional = () => {
    savePreferences({ analytics: false, marketing: false });
    setPreferences({ necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString() });
    setIsVisible(false);
    setIsConfigOpen(false);
  };

  const saveCurrentPreferences = () => {
    savePreferences({ analytics: preferences.analytics, marketing: preferences.marketing });
    setIsVisible(false);
    setIsConfigOpen(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-modal={isConfigOpen} aria-label="Configuracion de cookies">
      <div className="cookie-consent__panel">
        <button
          type="button"
          className="cookie-consent__close"
          aria-label="Cerrar aviso de cookies"
          onClick={rejectOptional}
        >
          <X size={18} />
        </button>

        <div className="cookie-consent__icon">
          <Cookie size={26} />
        </div>

        <div className="cookie-consent__content">
          <p className="cookie-consent__eyebrow">Privacidad IUA</p>
          <h2>Usamos cookies para mejorar tu experiencia</h2>
          <p>
            Utilizamos cookies necesarias para que el sitio funcione y, con tu permiso,
            cookies analiticas y de marketing para mejorar nuestros servicios y comunicaciones.
          </p>
          <Link to="/aviso-de-privacidad" className="cookie-consent__link">
            Consultar aviso de privacidad
          </Link>

          {isConfigOpen ? (
            <div className="cookie-consent__settings">
              <label className="cookie-consent__option cookie-consent__option--locked">
                <span>
                  <strong>Necesarias</strong>
                  <small>Indispensables para navegacion, seguridad y preferencias basicas.</small>
                </span>
                <span className="cookie-consent__badge">Siempre activas</span>
              </label>

              <label className="cookie-consent__option">
                <span>
                  <strong>Analiticas</strong>
                  <small>Nos ayudan a entender el uso del sitio y mejorar sus contenidos.</small>
                </span>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(event) => setPreferences((current) => ({ ...current, analytics: event.target.checked }))}
                />
              </label>

              <label className="cookie-consent__option">
                <span>
                  <strong>Marketing</strong>
                  <small>Permiten medir campanas y personalizar comunicaciones de admisiones.</small>
                </span>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(event) => setPreferences((current) => ({ ...current, marketing: event.target.checked }))}
                />
              </label>
            </div>
          ) : null}
        </div>

        <div className="cookie-consent__actions">
          {isConfigOpen ? (
            <button type="button" className="cookie-consent__button cookie-consent__button--primary" onClick={saveCurrentPreferences}>
              <ShieldCheck size={17} /> Guardar configuracion
            </button>
          ) : (
            <button type="button" className="cookie-consent__button cookie-consent__button--ghost" onClick={() => setIsConfigOpen(true)}>
              <Adjustments size={17} /> Configurar
            </button>
          )}
          <button type="button" className="cookie-consent__button cookie-consent__button--ghost" onClick={rejectOptional}>
            Solo necesarias
          </button>
          <button type="button" className="cookie-consent__button cookie-consent__button--primary" onClick={acceptAll}>
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
