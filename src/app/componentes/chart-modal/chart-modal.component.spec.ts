import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartModalComponent } from './chart-modal.component';

describe('ChartModalComponent', () => {
  let component: ChartModalComponent;
  let fixture: ComponentFixture<ChartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
