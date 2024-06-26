import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeRecenteComponent } from './equipe-recente-card.component';

describe('EquipeRecenteCardComponent', () => {
  let component: EquipeRecenteComponent;
  let fixture: ComponentFixture<EquipeRecenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipeRecenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipeRecenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
