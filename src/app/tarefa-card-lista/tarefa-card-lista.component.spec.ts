import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaCardListaComponent } from './tarefa-card-lista.component';

describe('TarefaCardListaComponent', () => {
  let component: TarefaCardListaComponent;
  let fixture: ComponentFixture<TarefaCardListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarefaCardListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefaCardListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
