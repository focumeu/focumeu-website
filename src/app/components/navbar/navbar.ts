import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnDestroy {
  readonly language = inject(LanguageService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly links = [
    { id: 'story', label: 'NAV.STORY' },
    { id: 'experience', label: 'NAV.EXPERIENCE' },
    { id: 'moments', label: 'NAV.MOMENTS' },
    { id: 'faq', label: 'NAV.FAQ' },
    { id: 'contact', label: 'NAV.CONTACT' },
  ];

  isMenuOpen = false;
  /** trasparente sopra la hero, piena dopo un po' di scroll */
  isTransparent = true;
  /** nascosta scorrendo verso il basso, riappare scorrendo verso l'alto */
  isHidden = false;

  private lastY = 0;
  private ticking = false;

  ngOnDestroy(): void {
    this.setScrollLock(false);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser || this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      this.isTransparent = y < 80;
      this.isHidden = y > 400 && y > this.lastY;
      this.lastY = y;
      this.ticking = false;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.setScrollLock(this.isMenuOpen);
  }

  closeMenu(): void {
    if (!this.isMenuOpen) return;
    this.isMenuOpen = false;
    this.setScrollLock(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    // passando a desktop il menu mobile non serve più
    if (this.isBrowser && window.innerWidth > 1024) this.closeMenu();
  }

  private setScrollLock(lock: boolean): void {
    if (!this.isBrowser) return;
    document.documentElement.style.overflow = lock ? 'hidden' : '';
  }
}
