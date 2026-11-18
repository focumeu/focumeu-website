import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MetaPixelService } from '../../services/meta-pixel.service';
import { AnalyticsService } from '../../services/analytics.service';
// POPUP FERRAGOSTO — scommenta questa riga e "FerragostoPopup" negli imports
// import { FerragostoPopup } from '../ferragosto-popup/ferragosto-popup';

@Component({
  selector: 'app-hero-fullscreen',
  imports: [
    TranslatePipe,
    // FerragostoPopup,
  ],
  templateUrl: './hero-fullscreen.html',
  styleUrl: './hero-fullscreen.scss',
})
export class HeroFullscreen {
  private metaPixel = inject(MetaPixelService);
  private analytics = inject(AnalyticsService);

  // ── Tracciamento dei pulsanti della hero "IN STAGIONE" ──
  bookBtnClick(): void {
    this.metaPixel.trackEvent('Lead', { content_name: 'Hero - Prenota' });
    this.analytics.trackEvent('booking_click', { location: 'hero' });
  }

  whatsappBtnClick(): void {
    this.metaPixel.trackEvent('Contact', { content_name: 'Hero - WhatsApp' });
    this.analytics.trackEvent('whatsapp_click', { location: 'hero' });
  }

  locationBtnClick(): void {
    this.metaPixel.trackEvent('FindLocation', {
      content_name: 'Hero - Indicazioni',
    });
    this.analytics.trackEvent('directions_click', { location: 'hero' });
  }
}
