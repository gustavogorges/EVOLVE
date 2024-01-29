import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCreationScreenComponent } from './team-creation-screen.component';

describe('TeamCreationScreenComponent', () => {
  let component: TeamCreationScreenComponent;
  let fixture: ComponentFixture<TeamCreationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamCreationScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamCreationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
