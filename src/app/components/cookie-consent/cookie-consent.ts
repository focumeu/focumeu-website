import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  CookieConsentService,
  CookiePreferences,
} from '../../services/cookie-consent.service';
import { TranslateModule } from '@ngx-translate/core';

type PanelView = 'banner' | 'details';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './cookie-consent.html',
  styleUrls: ['./cookie-consent.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsent implements OnInit, OnDestroy {
  visible = false;
  view: PanelView = 'banner';

  analytics = false;
  marketing = false;

  private destroy$ = new Subject<void>();

  constructor(
    private consentService: CookieConsentService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.consentService.bannerVisible$
      .pipe(takeUntil(this.destroy$))
      .subscribe((visible) => {
        this.visible = visible;
        this.view = 'banner';

        // Pre-popola con le preferenze esistenti se sta riaprendo
        const current = this.consentService['preferencesSubject']
          .value as CookiePreferences | null;
        if (current) {
          this.analytics = current.analytics;
          this.marketing = current.marketing;
        }
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  acceptAll(): void {
    this.consentService.acceptAll();
  }

  rejectAll(): void {
    this.consentService.rejectAll();
  }

  saveCustom(): void {
    this.consentService.saveCustom({
      analytics: this.analytics,
      marketing: this.marketing,
    });
  }

  showDetails(): void {
    this.view = 'details';
    this.cdr.markForCheck();
  }

  showBanner(): void {
    this.view = 'banner';
    this.cdr.markForCheck();
  }
}
