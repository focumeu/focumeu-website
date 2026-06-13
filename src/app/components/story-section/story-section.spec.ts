import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorySection } from './story-section';

describe('HistorySection', () => {
  let component: StorySection;
  let fixture: ComponentFixture<StorySection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorySection],
    }).compileComponents();

    fixture = TestBed.createComponent(StorySection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
