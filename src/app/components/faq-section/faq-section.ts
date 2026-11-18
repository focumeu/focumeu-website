import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FaqItem } from '../faq-item/faq-item';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-faq-section',
  imports: [TranslatePipe, FaqItem, RevealDirective],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.scss',
})
export class FaqSection {
  /**
   * Numeri delle domande mostrate (chiavi FAQ.QUESTIONn / FAQ.ANSWERn).
   * La 7 (brunch) è esclusa: aggiungila qui per mostrarla.
   */
  readonly questions = [1, 2, 3, 4, 5, 6, 8];
}
