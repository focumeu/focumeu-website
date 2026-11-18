import { Component, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-back-to-top',
  imports: [TranslatePipe],
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.scss',
})
export class BackToTop {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  isVisible = false;

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isBrowser) this.isVisible = window.scrollY > 800;
  }

  scrollToTop(): void {
    if (!this.isBrowser) return;
    // lo scroll fluido è gestito via CSS (e disattivato con "riduci movimento")
    window.scrollTo({ top: 0 });
  }
}
