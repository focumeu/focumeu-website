import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-story-section',
  imports: [TranslatePipe, RevealDirective],
  templateUrl: './story-section.html',
  styleUrl: './story-section.scss',
})
export class StorySection {}
