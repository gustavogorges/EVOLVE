import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipesRecentesComponent } from './equipes-recentes.component';

describe('EquipesRecentesComponent', () => {
  let component: EquipesRecentesComponent;
  let fixture: ComponentFixture<EquipesRecentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipesRecentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipesRecentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
