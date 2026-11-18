import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { AnalyticsService } from '../../services/analytics.service';
import { MetaPixelService } from '../../services/meta-pixel.service';

@Component({
  selector: 'app-contacts-section',
  imports: [TranslatePipe, RevealDirective],
  templateUrl: './contacts-section.html',
  styleUrl: './contacts-section.scss',
})
export class ContactsSection {
  private analytics = inject(AnalyticsService);
  private metaPixel = inject(MetaPixelService);

  readonly directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Focu+Meu+Sant'Andrea+Apostolo+dello+Ionio";

  /**
   * La mappa Google (pesante e con cookie di terze parti) viene
   * caricata solo quando l'utente la richiede.
   */
  mapLoaded = signal(false);

  loadMap(): void {
    this.mapLoaded.set(true);
    this.track('map_load');
  }

  track(event: string): void {
    this.analytics.trackEvent(event, { location: 'contacts' });
    if (event !== 'map_load') {
      this.metaPixel.trackEvent('Contact', { content_name: `Contacts - ${event}` });
    }
  }
}
