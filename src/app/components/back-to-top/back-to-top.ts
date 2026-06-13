import { Component, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  imports: [CommonModule],
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.scss',
})
export class BackToTop {
  private platformId = inject(PLATFORM_ID);
  isVisible = false;

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isVisible = window.scrollY > 300;
    }
  }

  scrollToTop() {
    if (!isPlatformBrowser(this.platformId)) return;
    (document.activeElement as HTMLElement)?.blur();
    this.smoothScrollToTop(300);
  }

  private smoothScrollToTop(duration: number) {
    const start = window.scrollY;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        window.scrollTo(0, 0);
        this.isVisible = false;
      }
    };

    requestAnimationFrame(animate);
  }
}
