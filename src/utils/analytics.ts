type AnalyticsValue = string | number | boolean;

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

export function trackEvent(event: string, parameters: Record<string, AnalyticsValue> = {}) {
  if (typeof window === "undefined") return;
  const consent = (window as Window & { iuaCookieConsent?: { analytics?: boolean } }).iuaCookieConsent;
  if (!consent?.analytics) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...parameters });
}
