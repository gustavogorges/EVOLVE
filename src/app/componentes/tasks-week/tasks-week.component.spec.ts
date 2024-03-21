import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksWeekComponent } from './tasks-week.component';

describe('TasksWeekComponent', () => {
  let component: TasksWeekComponent;
  let fixture: ComponentFixture<TasksWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksWeekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
