import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsProjectComponent } from './comments-project.component';

describe('CommentsProjectComponent', () => {
  let component: CommentsProjectComponent;
  let fixture: ComponentFixture<CommentsProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
