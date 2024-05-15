import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberToProjectModalComponent } from './add-member-to-project-modal.component';

describe('AddMemberToProjectModalComponent', () => {
  let component: AddMemberToProjectModalComponent;
  let fixture: ComponentFixture<AddMemberToProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberToProjectModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMemberToProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
