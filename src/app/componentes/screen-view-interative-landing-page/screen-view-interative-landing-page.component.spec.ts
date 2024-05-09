import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenViewInterativeLandingPageComponent } from './screen-view-interative-landing-page.component';

describe('ScreenViewInterativeLandingPageComponent', () => {
  let component: ScreenViewInterativeLandingPageComponent;
  let fixture: ComponentFixture<ScreenViewInterativeLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenViewInterativeLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenViewInterativeLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
