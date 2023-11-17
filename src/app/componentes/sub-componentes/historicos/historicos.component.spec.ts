import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricosComponent } from './historicos.component';

describe('HistoricosComponent', () => {
  let component: HistoricosComponent;
  let fixture: ComponentFixture<HistoricosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
