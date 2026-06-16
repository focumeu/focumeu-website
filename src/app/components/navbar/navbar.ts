import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnDestroy {
  isMenuOpen = false;
  isTransparent = true;
  private isBrowser: boolean;
  private scrollY = 0;

  constructor(
    private translate: TranslateService,
    public language: LanguageService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnDestroy(): void {
    this.unlockScroll();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.isTransparent = window.scrollY < 80;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuOpen ? this.lockScroll() : this.unlockScroll();
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.unlockScroll();
  }

  closeOnBackdrop(event: MouseEvent): void {
    // Chiude solo se il click è sul backdrop (non sui figli)
    if ((event.target as HTMLElement).classList.contains('fullscreen-menu')) {
      this.closeMenu();
    }
  }

  scrollTo(sectionId: string): void {
    if (!this.isBrowser) return;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToAndClose(sectionId: string): void {
    this.closeMenu();
    setTimeout(() => this.scrollTo(sectionId), 350);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  private lockScroll(): void {
    if (!this.isBrowser) return;
    this.scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    if (!this.isBrowser) return;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, this.scrollY);

    // Forza il re-check dei listener di scroll
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 50);
  }
}
