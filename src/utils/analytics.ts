type AnalyticsValue = string | number | boolean;

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

export function trackEvent(event: string, parameters: Record<string, AnalyticsValue> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...parameters });
}
