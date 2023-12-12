import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaKanbanComponent } from './tarefa-kanban.component';

describe('TarefaKanbanComponent', () => {
  let component: TarefaKanbanComponent;
  let fixture: ComponentFixture<TarefaKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarefaKanbanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefaKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
