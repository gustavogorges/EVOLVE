import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberListFullViewProjectComponent } from './member-list-full-view-project.component';

describe('MemberListFullViewProjectComponent', () => {
  let component: MemberListFullViewProjectComponent;
  let fixture: ComponentFixture<MemberListFullViewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberListFullViewProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberListFullViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
