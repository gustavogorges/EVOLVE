import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskApprovalComponent } from './project-task-approval.component';

describe('ProjectTaskApprovalComponent', () => {
  let component: ProjectTaskApprovalComponent;
  let fixture: ComponentFixture<ProjectTaskApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTaskApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTaskApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
