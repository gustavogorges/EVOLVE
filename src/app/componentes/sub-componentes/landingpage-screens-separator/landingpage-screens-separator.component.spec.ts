import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageScreensSeparatorComponent } from './landingpage-screens-separator.component';

describe('LandingpageScreensSeparatorComponent', () => {
  let component: LandingpageScreensSeparatorComponent;
  let fixture: ComponentFixture<LandingpageScreensSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingpageScreensSeparatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageScreensSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
