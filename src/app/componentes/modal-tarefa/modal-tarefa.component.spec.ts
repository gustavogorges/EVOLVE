import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTarefaComponent } from './modal-tarefa.component';

describe('ModalTarefaComponent', () => {
  let component: ModalTarefaComponent;
  let fixture: ComponentFixture<ModalTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTarefaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
