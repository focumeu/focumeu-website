import {
  Directive,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          sharedObserver!.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  return sharedObserver;
}

/**
 * Animazione di ingresso allo scroll.
 * Uso: `<div appReveal>` oppure `<div appReveal [revealDelay]="120">`.
 * Un solo IntersectionObserver condiviso per tutta la pagina; gli stili
 * sono in styles.scss e si disattivano con "riduci movimento".
 */
@Directive({
  selector: '[appReveal]',
  host: {
    'data-reveal': '',
    '[style.--reveal-delay.ms]': 'revealDelay()',
  },
})
export class RevealDirective implements OnDestroy {
  revealDelay = input(0);

  private el = inject(ElementRef<HTMLElement>);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private document = inject(DOCUMENT);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement as HTMLElement;

      // già visibile al caricamento: nessuna animazione (evita "lampeggi")
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        node.classList.add('is-visible');
      } else {
        getObserver().observe(node);
      }
      this.document.documentElement.classList.add('reveal-ready');
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser && sharedObserver) {
      sharedObserver.unobserve(this.el.nativeElement);
    }
  }
}
