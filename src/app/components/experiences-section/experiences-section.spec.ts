import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesSection } from './experiences-section';

describe('ExperiencesSection', () => {
  let component: ExperiencesSection;
  let fixture: ComponentFixture<ExperiencesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencesSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperiencesSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
