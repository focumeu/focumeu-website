import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { SeoService } from './services/seo.service';
import { AnalyticsService } from './services/analytics.service';
import { MetaPixelService } from './services/meta-pixel.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private languageService = inject(LanguageService);
  private seo = inject(SeoService);
  private translate = inject(TranslateService);

  // Istanziati all'avvio: restano in ascolto del consenso cookie
  // e caricano gli script di tracciamento solo se autorizzati.
  private analytics = inject(AnalyticsService);
  private metaPixel = inject(MetaPixelService);

  constructor() {
    this.languageService.init(); // ← prima la lingua
    this.seo.init(); // ← poi i meta, che ora trovano currentLang valorizzato

    this.translate.onLangChange.subscribe(() => {
      this.seo.updateForCurrentLang();
    });
  }
}
