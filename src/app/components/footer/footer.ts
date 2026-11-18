import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CookieConsentService } from '../../services/cookie-consent.service';
import { MetaPixelService } from '../../services/meta-pixel.service';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private cookieConsent = inject(CookieConsentService);
  private metaPixel = inject(MetaPixelService);

  readonly currentYear = new Date().getFullYear();

  readonly links = [
    { id: 'story', label: 'NAV.STORY' },
    { id: 'experience', label: 'NAV.EXPERIENCE' },
    { id: 'moments', label: 'NAV.MOMENTS' },
    { id: 'faq', label: 'NAV.FAQ' },
    { id: 'contact', label: 'NAV.CONTACT' },
  ];

  openCookieSettings(): void {
    this.cookieConsent.openPreferences();
  }

  socialClick(network: string): void {
    this.metaPixel.trackEvent('ViewContent', {
      content_name: `${network} button redirect`,
    });
  }
}
