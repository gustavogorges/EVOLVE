import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaCardPadraoComponent } from './tarefa-card-padrao.component';

describe('TarefaCardPadraoComponent', () => {
  let component: TarefaCardPadraoComponent;
  let fixture: ComponentFixture<TarefaCardPadraoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarefaCardPadraoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefaCardPadraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
