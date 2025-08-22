/**
 * Analytics Integration - GA4 & GTM Setup
 * Phase 2 implementation following enterprise architecture
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  // Load gtag script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_title: title || document.title,
    page_location: url,
  });
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Web3 specific events
export const trackWeb3Event = (action: 'wallet_connect' | 'wallet_disconnect' | 'transaction_start' | 'transaction_success' | 'transaction_fail', details?: any) => {
  trackEvent(action, 'web3', details?.type || 'unknown', details?.value);
};

// Guide booking events
export const trackBookingEvent = (action: 'booking_start' | 'booking_complete' | 'booking_cancel', guideId?: string, amount?: number) => {
  trackEvent(action, 'booking', guideId, amount);
};

// Contact form events
export const trackContactEvent = (action: 'form_start' | 'form_submit' | 'form_success' | 'form_error', type?: string) => {
  trackEvent(action, 'contact', type);
};