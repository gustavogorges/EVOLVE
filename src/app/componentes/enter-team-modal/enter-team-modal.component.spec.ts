import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterTeamModalComponent } from './enter-team-modal.component';

describe('EnterTeamModalComponent', () => {
  let component: EnterTeamModalComponent;
  let fixture: ComponentFixture<EnterTeamModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterTeamModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterTeamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
