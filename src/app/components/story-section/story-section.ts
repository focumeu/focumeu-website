import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-story-section',
  imports: [TranslatePipe],
  templateUrl: './story-section.html',
  styleUrl: './story-section.scss',
})
export class StorySection {}
