import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CookieConsentService } from './cookie-consent.service';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean;
  }
}

/**
 * Google Analytics 4 caricato SOLO dopo il consenso ai cookie analitici.
 * Se il consenso viene revocato, la raccolta dati viene disattivata.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly MEASUREMENT_ID = 'G-K9N7MGX65D';

  private document = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private loaded = false;

  constructor() {
    if (!this.isBrowser) return;

    inject(CookieConsentService)
      .preferences$.pipe(filter((prefs) => prefs !== null))
      .subscribe((prefs) => {
        if (prefs!.analytics) {
          window[`ga-disable-${this.MEASUREMENT_ID}`] = false;
          this.load();
        } else {
          window[`ga-disable-${this.MEASUREMENT_ID}`] = true;
        }
      });
  }

  private load(): void {
    if (this.loaded) return;
    this.loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag richiede l'oggetto `arguments`, non un array
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', this.MEASUREMENT_ID, { anonymize_ip: true });

    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.MEASUREMENT_ID}`;
    this.document.head.appendChild(script);
  }

  /** Evento GA4 personalizzato (ignorato se manca il consenso). */
  trackEvent(name: string, params?: Record<string, unknown>): void {
    if (!this.isBrowser || !this.loaded) return;
    window.gtag('event', name, params);
  }
}
