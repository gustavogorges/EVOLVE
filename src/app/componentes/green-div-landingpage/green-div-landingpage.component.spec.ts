import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenDivLandingpageComponent } from './green-div-landingpage.component';

describe('GreenDivLandingpageComponent', () => {
  let component: GreenDivLandingpageComponent;
  let fixture: ComponentFixture<GreenDivLandingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenDivLandingpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenDivLandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
