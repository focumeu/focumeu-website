import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookieConsentService } from './cookie-consent.service';
import { filter } from 'rxjs/operators';

// Estendi window per il fbq
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

@Injectable({ providedIn: 'root' })
export class MetaPixelService {
  private isBrowser: boolean;
  private loaded = false;

  private readonly PIXEL_ID = '1000236275709997';

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private consentService: CookieConsentService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Reagisce ai cambiamenti di consenso
    this.consentService.preferences$
      .pipe(filter((prefs) => prefs !== null))
      .subscribe((prefs) => {
        if (prefs!.marketing) {
          this.init();
        }
      });
  }

  private init(): void {
    if (!this.isBrowser || this.loaded) return;
    this.loaded = true;

    // Snippet standard Meta Pixel
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js',
    );

    window.fbq('init', this.PIXEL_ID);
    window.fbq('track', 'PageView');

    console.log('[MetaPixel] Inizializzato con Pixel ID:', this.PIXEL_ID);
  }

  /** Traccia un evento standard (es. 'Purchase', 'Lead', 'ViewContent') */
  trackEvent(eventName: string, params?: object): void {
    if (!this.isBrowser || !this.loaded) return;
    window.fbq('track', eventName, params);
  }

  /** Traccia un evento custom */
  trackCustomEvent(eventName: string, params?: object): void {
    if (!this.isBrowser || !this.loaded) return;
    window.fbq('trackCustom', eventName, params);
  }
}
