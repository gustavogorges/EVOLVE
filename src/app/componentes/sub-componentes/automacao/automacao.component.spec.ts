import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomacaoComponent } from './automacao.component';

describe('AutomacaoComponent', () => {
  let component: AutomacaoComponent;
  let fixture: ComponentFixture<AutomacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
