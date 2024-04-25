import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaReportsComponent } from './tela-reports.component';

describe('TelaReportsComponent', () => {
  let component: TelaReportsComponent;
  let fixture: ComponentFixture<TelaReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
