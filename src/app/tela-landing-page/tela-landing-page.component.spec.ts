import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaLandingPageComponent } from './tela-landing-page.component';

describe('TelaLandingPageComponent', () => {
  let component: TelaLandingPageComponent;
  let fixture: ComponentFixture<TelaLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
