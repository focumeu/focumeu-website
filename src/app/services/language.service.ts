import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly STORAGE_KEY = 'app_language';
  private isBrowser: boolean;

  languages = [
    { code: 'it', label: 'Italiano', flag: 'it.svg' },
    { code: 'en', label: 'English', flag: 'gb.svg' },
    { code: 'fr', label: 'Français', flag: 'fr.svg' },
  ];

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object, // ← capisce se siamo su browser o server
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  init() {
    const saved = this.isBrowser
      ? (localStorage.getItem(this.STORAGE_KEY) ?? 'it') // ← solo su browser
      : 'it'; // ← su server usa sempre italiano
    this.translate.use(saved);
  }

  setLanguage(code: string) {
    this.translate.use(code);
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, code); // ← solo su browser
    }
  }

  getCurrent(): string {
    return this.translate.currentLang() ?? 'it';
  }
}
