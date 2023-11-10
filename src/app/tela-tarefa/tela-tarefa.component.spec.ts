import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaTarefaComponent } from './tela-tarefa.component';

describe('TelaTarefaComponent', () => {
  let component: TelaTarefaComponent;
  let fixture: ComponentFixture<TelaTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaTarefaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
