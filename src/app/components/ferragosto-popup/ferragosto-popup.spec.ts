import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FerragostoPopup } from './ferragosto-popup';

describe('FerragostoPopup', () => {
  let component: FerragostoPopup;
  let fixture: ComponentFixture<FerragostoPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FerragostoPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FerragostoPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
