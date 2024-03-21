import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCalendarComponent } from './task-calendar.component';

describe('TaskCalendarComponent', () => {
  let component: TaskCalendarComponent;
  let fixture: ComponentFixture<TaskCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
