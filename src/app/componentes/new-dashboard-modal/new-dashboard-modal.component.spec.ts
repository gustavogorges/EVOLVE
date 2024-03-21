import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDashboardModalComponent } from './new-dashboard-modal.component';

describe('NewDashboardModalComponent', () => {
  let component: NewDashboardModalComponent;
  let fixture: ComponentFixture<NewDashboardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDashboardModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDashboardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
