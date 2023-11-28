import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoAddTarefaComponent } from './botao-add-tarefa.component';

describe('BotaoAddTarefaComponent', () => {
  let component: BotaoAddTarefaComponent;
  let fixture: ComponentFixture<BotaoAddTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotaoAddTarefaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoAddTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
