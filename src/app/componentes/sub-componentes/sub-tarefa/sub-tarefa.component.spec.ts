import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTarefaComponent } from './sub-tarefa.component';

describe('SubTarefaComponent', () => {
  let component: SubTarefaComponent;
  let fixture: ComponentFixture<SubTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTarefaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
