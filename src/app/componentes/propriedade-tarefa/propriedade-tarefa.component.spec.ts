import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropriedadeTarefaComponent } from './propriedade-tarefa.component';

describe('PropriedadeTarefaComponent', () => {
  let component: PropriedadeTarefaComponent;
  let fixture: ComponentFixture<PropriedadeTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropriedadeTarefaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropriedadeTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
