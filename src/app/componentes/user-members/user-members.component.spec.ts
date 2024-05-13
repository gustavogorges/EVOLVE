import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMembersComponent } from './user-members.component';

describe('UserMembersComponent', () => {
  let component: UserMembersComponent;
  let fixture: ComponentFixture<UserMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
