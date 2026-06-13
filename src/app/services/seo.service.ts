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
    const lang = this.translate.currentLang ?? this.translate.defaultLang;

    this.translate
      .get([
        'SEO.TITLE',
        'SEO.DESCRIPTION',
        'SEO.KEYWORDS',
        'SEO.OG_TITLE',
        'SEO.OG_DESCRIPTION',
      ])
      .subscribe((t) => {
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
        this.meta.updateTag({ property: 'og:type', content: 'website' }); // ← fix: era 'restaurant', non valido
        this.meta.updateTag({
          property: 'og:url',
          content: 'https://focu-meu.it',
        });
        this.meta.updateTag({
          property: 'og:image',
          content: 'https://focu-meu.it/assets/images/og-image.jpg',
        });

        this.document.documentElement.lang = lang;
      });
  }

  setHreflang(): void {
    const head = this.document.head;
    const langs = [
      { lang: 'it', href: 'https://focu-meu.it' },
      { lang: 'en', href: 'https://focu-meu.it?lang=en' },
      { lang: 'fr', href: 'https://focu-meu.it?lang=fr' },
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
    def.href = 'https://focu-meu.it';
    head.appendChild(def);
  }

  injectRestaurantSchema(): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: 'Focu Meu',
      image: 'https://focu-meu.it/assets/images/restaurant_placeholder.jpg',
      url: 'https://focu-meu.it',
      telephone: '+393516372505',
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
      servesCuisine: ['Calabrese', 'Italiana', 'Seafood', 'Griglia', 'Brace'],
      priceRange: '€€',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '08:00',
          closes: '02:00',
        },
      ],
      sameAs: [
        'https://www.instagram.com/focumeu_it',
        'https://www.facebook.com/profile.php?id=61573220798900',
        'https://www.google.com/maps/place/Focu+Meu/@38.612389,16.5625641',
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
