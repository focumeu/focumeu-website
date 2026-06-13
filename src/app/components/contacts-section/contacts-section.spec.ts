import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsSection } from './contacts-section';

describe('ContactsSection', () => {
  let component: ContactsSection;
  let fixture: ComponentFixture<ContactsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
