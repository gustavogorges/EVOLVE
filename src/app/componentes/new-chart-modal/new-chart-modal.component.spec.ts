import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChartModalComponent } from './new-chart-modal.component';

describe('NewChartModalComponent', () => {
  let component: NewChartModalComponent;
  let fixture: ComponentFixture<NewChartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChartModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewChartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
