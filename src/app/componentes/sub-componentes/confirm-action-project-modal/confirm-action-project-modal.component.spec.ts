import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmActionProjectModalComponent } from './confirm-action-project-modal.component';

describe('DeleteMemberOfProjectModalComponent', () => {
  let component: ConfirmActionProjectModalComponent;
  let fixture: ComponentFixture<ConfirmActionProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmActionProjectModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmActionProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
