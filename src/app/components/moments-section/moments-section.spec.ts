import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavoursSection } from './moments-section';

describe('FlavoursSection', () => {
  let component: FlavoursSection;
  let fixture: ComponentFixture<FlavoursSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlavoursSection],
    }).compileComponents();

    fixture = TestBed.createComponent(FlavoursSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
