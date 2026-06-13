import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-moments-section',
  imports: [TranslateModule, CommonModule],
  templateUrl: './moments-section.html',
  styleUrl: './moments-section.scss',
})
export class MomentsSection implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private intervalId?: ReturnType<typeof setInterval>;

  current = 0;
  exiting = -1;
  isDesktop = false;

  rotations: number[] = [];

  public dishes = [
    {
      name: 'bar',
      image: '/assets/images/bar.webp',
      description: 'Cocktails su bancone bar',
    },
    {
      name: 'insegna',
      image: '/assets/images/insegna.webp',
      description: 'Insegna ingresso locale',
    },
    {
      name: 'specchio',
      image: '/assets/images/specchio.webp',
      description: "Scorcio dello specchio all'ingresso",
    },
    {
      name: 'piatti',
      image: '/assets/images/piatti.webp',
      description: 'Mise en place',
    },
    {
      name: 'lounge',
      image: '/assets/images/lounge.webp',
      description: 'Area divanettu lounge',
    },
  ];

  ngOnInit(): void {
    this.rotations = this.dishes.map(
      (_, i) => (i % 2 === 0 ? 1 : -1) * (2 + Math.random() * 4),
    );

    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth > 1024;
      this.startAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const wasDesktop = this.isDesktop;
      this.isDesktop = window.innerWidth > 1024;

      // se cambia breakpoint, ricalcola l'autoplay
      if (wasDesktop !== this.isDesktop) {
        this.resetAutoplay();
      }
    }
  }

  next(): void {
    this.exiting = this.current;
    setTimeout(() => {
      this.exiting = -1;
    }, 450);
    this.current = (this.current + 1) % this.dishes.length;
    this.resetAutoplay();
  }

  goTo(index: number, event: Event): void {
    event.stopPropagation();
    if (index === this.current) return;
    this.exiting = this.current;
    setTimeout(() => {
      this.exiting = -1;
    }, 450);
    this.current = index;
    this.resetAutoplay();
  }

  getZ(i: number): number {
    const total = this.dishes.length;
    return i === this.current ? total : i < this.current ? i : total - i;
  }

  private startAutoplay(): void {
    if (!this.isDesktop) {
      this.intervalId = setInterval(() => this.next(), 5000);
    }
  }

  private stopAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private resetAutoplay(): void {
    this.stopAutoplay();
    if (isPlatformBrowser(this.platformId)) this.startAutoplay();
  }
}
