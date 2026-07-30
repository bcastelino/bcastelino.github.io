// Global typing for the Google Analytics gtag.js function injected at runtime.
export {};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
