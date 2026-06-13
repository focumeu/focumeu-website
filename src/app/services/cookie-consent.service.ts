import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface CookiePreferences {
  necessary: boolean; // sempre true, non modificabile
  analytics: boolean; // es. Google Analytics
  marketing: boolean; // Meta Pixel, ads
  timestamp?: string;
}

const STORAGE_KEY = 'cookie_consent';

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private isBrowser: boolean;

  private preferencesSubject = new BehaviorSubject<CookiePreferences | null>(
    null,
  );
  preferences$ = this.preferencesSubject.asObservable();

  private bannerVisibleSubject = new BehaviorSubject<boolean>(false);
  bannerVisible$ = this.bannerVisibleSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CookiePreferences = JSON.parse(raw);
        this.preferencesSubject.next(parsed);
        this.bannerVisibleSubject.next(false);
      } else {
        this.bannerVisibleSubject.next(true);
      }
    } catch {
      this.bannerVisibleSubject.next(true);
    }
  }

  acceptAll(): void {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    this.save(prefs);
  }

  rejectAll(): void {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    this.save(prefs);
  }

  saveCustom(prefs: Omit<CookiePreferences, 'necessary' | 'timestamp'>): void {
    const full: CookiePreferences = {
      necessary: true,
      ...prefs,
      timestamp: new Date().toISOString(),
    };
    this.save(full);
  }

  private save(prefs: CookiePreferences): void {
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    }
    this.preferencesSubject.next(prefs);
    this.bannerVisibleSubject.next(false);
  }

  hasConsent(): boolean {
    return this.preferencesSubject.value !== null;
  }

  hasMarketingConsent(): boolean {
    return this.preferencesSubject.value?.marketing === true;
  }

  hasAnalyticsConsent(): boolean {
    return this.preferencesSubject.value?.analytics === true;
  }

  /** Riapre il banner (utile dal footer "Gestisci preferenze") */
  openPreferences(): void {
    this.bannerVisibleSubject.next(true);
  }

  resetConsent(): void {
    if (this.isBrowser) {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.preferencesSubject.next(null);
    this.bannerVisibleSubject.next(true);
  }
}
