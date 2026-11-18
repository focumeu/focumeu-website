import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-experiences-section',
  imports: [TranslatePipe, RevealDirective],
  templateUrl: './experiences-section.html',
  styleUrl: './experiences-section.scss',
})
export class ExperiencesSection {
  readonly items = [
    {
      title: 'EXPERIENCE.SUBTITLE1',
      text: 'EXPERIENCE.TEXT1',
      illo: '/assets/illustrations/aperol_sand-560.webp',
    },
    {
      title: 'EXPERIENCE.SUBTITLE2',
      text: 'EXPERIENCE.TEXT2',
      illo: '/assets/illustrations/pepper_sand-560.webp',
    },
    {
      title: 'EXPERIENCE.SUBTITLE3',
      text: 'EXPERIENCE.TEXT3',
      illo: '/assets/illustrations/sun_sand-560.webp',
    },
  ];
}
