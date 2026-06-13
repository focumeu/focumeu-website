import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './services/language.service';
import { SeoService } from './services/seo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Focumeu - Ristorante & Bar';

  private seo = inject(SeoService);
  private translate = inject(TranslateService);

  constructor(private languageService: LanguageService) {
    this.languageService.init(); // ← prima la lingua
    this.seo.init(); // ← poi i meta, che ora trovano currentLang valorizzato

    this.translate.onLangChange.subscribe(() => {
      this.seo.updateForCurrentLang();
    });
  }
}
