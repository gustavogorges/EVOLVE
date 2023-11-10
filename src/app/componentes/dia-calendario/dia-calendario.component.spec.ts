import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaCalendarioComponent } from './dia-calendario.component';

describe('DiaCalendarioComponent', () => {
  let component: DiaCalendarioComponent;
  let fixture: ComponentFixture<DiaCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaCalendarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
