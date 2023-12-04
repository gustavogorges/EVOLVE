import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusComponentCriarTarefaComponent } from './status-component-criar-tarefa.component';

describe('StatusComponentCriarTarefaComponent', () => {
  let component: StatusComponentCriarTarefaComponent;
  let fixture: ComponentFixture<StatusComponentCriarTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusComponentCriarTarefaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusComponentCriarTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
