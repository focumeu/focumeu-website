import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MetaPixelService } from '../../services/meta-pixel.service';

@Component({
  selector: 'app-hero-section',
  imports: [TranslatePipe],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  constructor(private metaPixel: MetaPixelService) {}

  bookBtnClick(): void {
    this.metaPixel.trackEvent('ViewContent', {
      content_name: 'Hero Button - Book now',
    });
  }

  locationBtnClick(): void {
    this.metaPixel.trackEvent('Lead', {
      content_name: 'Hero Button - Directions',
    });
  }
}
