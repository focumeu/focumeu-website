import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-experiences-section',
  imports: [TranslatePipe],
  templateUrl: './experiences-section.html',
  styleUrl: './experiences-section.scss',
})
export class ExperiencesSection {}
