import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPrioridadeComponent } from './select-prioridade.component';

describe('SelectGeralComponent', () => {
  let component: SelectPrioridadeComponent;
  let fixture: ComponentFixture<SelectPrioridadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPrioridadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPrioridadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
