import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPerfilComponent } from './dashboard-perfil.component';

describe('DashboardPerfilComponent', () => {
  let component: DashboardPerfilComponent;
  let fixture: ComponentFixture<DashboardPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
