import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-ferragosto-popup',
  imports: [],
  templateUrl: './ferragosto-popup.html',
  styleUrl: './ferragosto-popup.scss',
})
export class FerragostoPopup {
  @Output()
  closed = new EventEmitter<void>();

  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }

  close(): void {
    this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
