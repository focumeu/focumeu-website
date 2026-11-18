import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

const OG_LOCALE_MAP: Record<string, string> = {
  it: 'it_IT',
  en: 'en_GB',
  fr: 'fr_FR',
  // aggiungi qui altre lingue: de: 'de_DE', ecc.
};

const SITE_URL = 'https://focu-meu.it';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private translate = inject(TranslateService);

  /** Chiama questo una volta sola all'avvio dell'app */
  init(): void {
    this.injectRestaurantSchema();
    this.setHreflang();
    this.updateForCurrentLang();
  }

  /** Chiama questo ad ogni cambio lingua */
  updateForCurrentLang(): void {
    this.translate
      .get([
        'SEO.TITLE',
        'SEO.DESCRIPTION',
        'SEO.KEYWORDS',
        'SEO.OG_TITLE',
        'SEO.OG_DESCRIPTION',
      ])
      .subscribe((t) => {
        // lingua letta qui (non prima del get): le traduzioni si caricano in
        // modo asincrono e una chiamata precedente non deve sovrascrivere la lingua attiva
        const lang = this.translate.getCurrentLang() ?? 'it';
        const pageUrl =
          lang === 'it' ? `${SITE_URL}/` : `${SITE_URL}/?lang=${lang}`;

        this.title.setTitle(t['SEO.TITLE']);

        this.meta.updateTag({
          name: 'description',
          content: t['SEO.DESCRIPTION'],
        });
        this.meta.updateTag({ name: 'keywords', content: t['SEO.KEYWORDS'] });

        this.meta.updateTag({
          property: 'og:title',
          content: t['SEO.OG_TITLE'],
        });
        this.meta.updateTag({
          property: 'og:description',
          content: t['SEO.OG_DESCRIPTION'],
        });
        this.meta.updateTag({
          property: 'og:locale',
          content: OG_LOCALE_MAP[lang] ?? 'it_IT',
        });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:url', content: pageUrl });
        this.meta.updateTag({ property: 'og:image', content: OG_IMAGE });

        this.setCanonical(pageUrl);
        this.document.documentElement.lang = lang;
      });
  }

  setHreflang(): void {
    const head = this.document.head;
    const langs = [
      { lang: 'it', href: `${SITE_URL}/` },
      { lang: 'en', href: `${SITE_URL}/?lang=en` },
      { lang: 'fr', href: `${SITE_URL}/?lang=fr` },
    ];

    head.querySelectorAll('link[rel="alternate"]').forEach((el) => el.remove());

    langs.forEach(({ lang, href }) => {
      const link = this.document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = href;
      head.appendChild(link);
    });

    const def = this.document.createElement('link');
    def.rel = 'alternate';
    def.setAttribute('hreflang', 'x-default');
    def.href = `${SITE_URL}/`;
    head.appendChild(def);
  }

  /** Canonical coerente con la lingua attiva (evita contenuti duplicati). */
  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  injectRestaurantSchema(): void {
    // NB: gli orari di apertura NON sono dichiarati qui perché il locale è
    // stagionale: la fonte ufficiale degli orari è la scheda Google Business.
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: 'Focu Meu',
      image: OG_IMAGE,
      logo: `${SITE_URL}/logo_fm.webp`,
      url: `${SITE_URL}/`,
      telephone: '+393516372505',
      email: 'info.focumeu@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Via Raffaele Lombardi, 20',
        addressLocality: "Sant'Andrea Apostolo dello Ionio",
        addressRegion: 'CZ',
        postalCode: '88060',
        addressCountry: 'IT',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 38.612389,
        longitude: 16.5625641,
      },
      hasMap: 'https://www.google.com/maps/place/Focu+Meu/@38.612389,16.5625641,17z',
      servesCuisine: ['Calabrese', 'Italiana', 'Seafood', 'Griglia', 'Brace'],
      priceRange: '€€',
      acceptsReservations: true,
      sameAs: [
        'https://www.instagram.com/focumeu_it',
        'https://www.facebook.com/profile.php?id=61573220798900',
      ],
    };

    const existing = this.document.getElementById('restaurant-schema');
    if (existing) existing.remove();

    const script = this.document.createElement('script');
    script.id = 'restaurant-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
