import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPropriedadeComponent } from './select-propriedade.component';

describe('SelectPropriedadeComponent', () => {
  let component: SelectPropriedadeComponent;
  let fixture: ComponentFixture<SelectPropriedadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPropriedadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPropriedadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
