import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-faq-item',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './faq-item.html',
  styleUrl: './faq-item.scss',
})
export class FaqItem {
  @Input() question = '';
  @Input() answer = '';
  isOpen = false;
}
