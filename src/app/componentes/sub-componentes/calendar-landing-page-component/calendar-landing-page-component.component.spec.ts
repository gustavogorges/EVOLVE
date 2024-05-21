import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarLandingPageComponentComponent } from './calendar-landing-page-component.component';

describe('CalendarLandingPageComponentComponent', () => {
  let component: CalendarLandingPageComponentComponent;
  let fixture: ComponentFixture<CalendarLandingPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarLandingPageComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarLandingPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
