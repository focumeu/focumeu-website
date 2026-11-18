import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-moments-section',
  imports: [TranslatePipe, RevealDirective],
  templateUrl: './moments-section.html',
  styleUrl: './moments-section.scss',
})
export class MomentsSection {
  /**
   * Foto della galleria. Per aggiungerne una: crea la versione 640px
   * (es. con cwebp -resize 640 0) e aggiungi la didascalia in
   * MOMENTS.CAPTIONS nei file di traduzione.
   * rot = rotazione in gradi, y = spostamento verticale su desktop (%).
   */
  readonly photos = [
    { key: 'BAR', src: '/assets/images/bar-640.webp', h: 960, rot: -6, y: 4 },
    { key: 'INSEGNA', src: '/assets/images/insegna-640.webp', h: 427, rot: 4, y: 18 },
    { key: 'SPECCHIO', src: '/assets/images/specchio-640.webp', h: 960, rot: -2, y: 0 },
    { key: 'PIATTI', src: '/assets/images/piatti-640.webp', h: 960, rot: 5, y: 14 },
    { key: 'LOUNGE', src: '/assets/images/lounge-640.webp', h: 427, rot: -4, y: 6 },
  ];
}
