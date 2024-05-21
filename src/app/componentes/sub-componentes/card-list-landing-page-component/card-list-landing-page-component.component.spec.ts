import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListLandingPageComponentComponent } from './card-list-landing-page-component.component';

describe('CardListLandingPageComponentComponent', () => {
  let component: CardListLandingPageComponentComponent;
  let fixture: ComponentFixture<CardListLandingPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardListLandingPageComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardListLandingPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
