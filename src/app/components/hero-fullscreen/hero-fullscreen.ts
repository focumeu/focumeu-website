import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MetaPixelService } from '../../services/meta-pixel.service';

@Component({
  selector: 'app-hero-fullscreen',
  imports: [TranslatePipe],
  templateUrl: './hero-fullscreen.html',
  styleUrl: './hero-fullscreen.scss',
})
export class HeroFullscreen {
  constructor(private metaPixel: MetaPixelService) {}

  bookBtnClick(): void {
    this.metaPixel.trackEvent('ViewContent', {
      content_name: 'Hero Fullscreen - Book now',
    });
  }

  locationBtnClick(): void {
    this.metaPixel.trackEvent('Lead', {
      content_name: 'Hero Fullscreen - Directions',
    });
  }
}
