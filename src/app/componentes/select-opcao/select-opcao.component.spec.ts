import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOpcaoComponent } from './select-opcao.component';

describe('SelectOpcaoComponent', () => {
  let component: SelectOpcaoComponent;
  let fixture: ComponentFixture<SelectOpcaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOpcaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectOpcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
