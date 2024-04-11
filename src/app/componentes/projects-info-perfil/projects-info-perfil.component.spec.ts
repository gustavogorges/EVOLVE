import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsInfoPerfilComponent } from './projects-info-perfil.component';

describe('ProjectsInfoPerfilComponent', () => {
  let component: ProjectsInfoPerfilComponent;
  let fixture: ComponentFixture<ProjectsInfoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsInfoPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsInfoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
