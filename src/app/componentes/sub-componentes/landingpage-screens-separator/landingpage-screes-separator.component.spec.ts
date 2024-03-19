import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageScreesSeparatorComponent } from './landingpage-screes-separator.component';

describe('LandingpageScreesSeparatorComponent', () => {
  let component: LandingpageScreesSeparatorComponent;
  let fixture: ComponentFixture<LandingpageScreesSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingpageScreesSeparatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageScreesSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
