// contacts-section.ts
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contacts-section',
  imports: [CommonModule, TranslateModule],
  templateUrl: './contacts-section.html',
  styleUrl: './contacts-section.scss',
})
export class ContactsSection implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  mapLoaded = false;

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    console.log('mapContainer:', this.mapContainer);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.mapLoaded = true;
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(this.mapContainer.nativeElement);
  }
}
