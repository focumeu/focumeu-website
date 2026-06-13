import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FaqItem } from '../faq-item/faq-item';

@Component({
  selector: 'app-faq-section',
  imports: [TranslateModule, FaqItem],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.scss',
})
export class FaqSection {}
