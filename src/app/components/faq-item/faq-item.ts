import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-faq-item',
  imports: [CommonModule, TranslateModule],
  templateUrl: './faq-item.html',
  styleUrl: './faq-item.scss',
})
export class FaqItem {
  @Input() question = '';
  @Input() answer = '';
  isOpen = false;
}
