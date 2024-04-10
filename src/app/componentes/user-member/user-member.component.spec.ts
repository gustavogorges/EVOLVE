import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMemberComponent } from './user-member.component';

describe('UserMemberComponent', () => {
  let component: UserMemberComponent;
  let fixture: ComponentFixture<UserMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
