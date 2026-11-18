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

  /**
   * Priorità: parametro ?lang= nell'URL (usato da sitemap/hreflang)
   * → lingua salvata in localStorage → italiano.
   */
  init() {
    const lang = this.isBrowser
      ? (this.fromUrl() ?? this.fromStorage() ?? 'it')
      : 'it'; // ← su server usa sempre italiano
    if (this.isBrowser && this.fromUrl()) this.save(lang);
    this.translate.use(lang);
  }

  setLanguage(code: string) {
    if (!this.isSupported(code)) return;
    this.translate.use(code);
    this.save(code);
  }

  private isSupported(code: string | null): code is string {
    return !!code && this.languages.some((l) => l.code === code);
  }

  private fromUrl(): string | null {
    const code = new URLSearchParams(window.location.search).get('lang');
    return this.isSupported(code) ? code : null;
  }

  private fromStorage(): string | null {
    try {
      const code = localStorage.getItem(this.STORAGE_KEY);
      return this.isSupported(code) ? code : null;
    } catch {
      return null;
    }
  }

  private save(code: string) {
    try {
      localStorage.setItem(this.STORAGE_KEY, code);
    } catch {
      /* storage non disponibile (es. navigazione privata) */
    }
  }

  getCurrent(): string {
    return this.translate.currentLang() ?? 'it';
  }
}
