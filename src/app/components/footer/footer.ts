import { Component } from '@angular/core';
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
  constructor(
    private cookieConsent: CookieConsentService,
    private metaPixel: MetaPixelService,
  ) {}

  currentYear = new Date().getFullYear();

  openCookieSettings(): void {
    this.cookieConsent.openPreferences();
  }

  bookBtnClick(): void {
    this.metaPixel.trackEvent('ViewContent', {
      content_name: 'Footer Button - Book now',
    });
  }

  socialFbClick(): void {
    this.metaPixel.trackEvent('ViewContent', {
      content_name: 'Facebook button redirect',
    });
  }
  socialIgClick(): void {
    this.metaPixel.trackEvent('ViewContent', {
      content_name: 'Instagram button redirect',
    });
  }
}
