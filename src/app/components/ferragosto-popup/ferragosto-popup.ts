import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { FERRAGOSTO, Lang, Text } from './ferragosto-popup.config';

const STORAGE_PREFIX = 'ferragosto_popup_closed_';

/**
 * Popup del menù di Ferragosto.
 * - compare da solo SOLO tra FERRAGOSTO.showFrom e showUntil (1–15 agosto)
 * - una volta chiuso non ricompare per tutto l'anno sullo stesso dispositivo
 * - anteprima in qualsiasi periodo aggiungendo ?ferragosto=preview all'URL
 */
@Component({
  selector: 'app-ferragosto-popup',
  templateUrl: './ferragosto-popup.html',
  styleUrl: './ferragosto-popup.scss',
})
export class FerragostoPopup implements OnInit, OnDestroy {
  private document = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private translate = inject(TranslateService);

  readonly data = FERRAGOSTO;
  readonly year = new Date().getFullYear();
  readonly visible = signal(false);

  private closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');
  private dialog = viewChild<ElementRef<HTMLElement>>('dialog');
  private previousFocus: HTMLElement | null = null;
  private timer?: ReturnType<typeof setTimeout>;

  private lang = computed<Lang>(() => {
    const l = this.translate.currentLang();
    return l === 'en' || l === 'fr' ? l : 'it';
  });

  readonly bookUrl = computed(
    () =>
      `https://wa.me/${this.data.whatsapp}?text=${encodeURIComponent(
        `Ciao Focu Meu, vorrei prenotare per il menù di Ferragosto ${this.year}.`,
      )}`,
  );

  /** testo nella lingua corrente */
  t(text: Text): string {
    return text[this.lang()] ?? text.it;
  }

  ngOnInit(): void {
    if (!this.isBrowser || !this.shouldShow()) return;
    // breve attesa: lascia prima vedere la pagina
    this.timer = setTimeout(() => this.open(), 1500);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
    this.lockScroll(false);
  }

  close(): void {
    if (!this.visible()) return;
    this.visible.set(false);
    this.lockScroll(false);
    try {
      localStorage.setItem(STORAGE_PREFIX + this.year, '1');
    } catch {
      /* storage non disponibile */
    }
    this.previousFocus?.focus();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  /** tiene il focus da tastiera dentro al popup */
  @HostListener('document:keydown.tab', ['$event'])
  onTab(event: Event): void {
    const root = this.dialog()?.nativeElement;
    if (!this.visible() || !root) return;
    const focusables = root.querySelectorAll<HTMLElement>('a[href], button');
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const e = event as KeyboardEvent;
    if (e.shiftKey && this.document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && this.document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  private open(): void {
    this.previousFocus = this.document.activeElement as HTMLElement | null;
    this.visible.set(true);
    this.lockScroll(true);
    setTimeout(() => this.closeBtn()?.nativeElement.focus());
  }

  private shouldShow(): boolean {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ferragosto') === 'preview') return true;

    try {
      if (localStorage.getItem(STORAGE_PREFIX + this.year)) return false;
    } catch {
      /* storage non disponibile: mostra comunque */
    }

    const now = new Date();
    const today = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')}`;
    return today >= this.data.showFrom && today <= this.data.showUntil;
  }

  private lockScroll(lock: boolean): void {
    if (!this.isBrowser) return;
    this.document.documentElement.style.overflow = lock ? 'hidden' : '';
  }
}
