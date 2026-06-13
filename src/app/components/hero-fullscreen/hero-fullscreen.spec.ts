import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFullscreen } from './hero-fullscreen';

describe('HeroFullscreen', () => {
  let component: HeroFullscreen;
  let fixture: ComponentFixture<HeroFullscreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFullscreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroFullscreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
