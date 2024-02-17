import { Component, Input, OnInit } from '@angular/core';
import { TaskProjectProperty } from 'src/model/propriedade/task-project-property';

@Component({
  selector: 'app-propriedade-tarefa',
  templateUrl: './propriedade-tarefa.component.html',
  styleUrls: ['./propriedade-tarefa.component.scss']
})
export class PropriedadeTarefaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  @Input()
  property : TaskProjectProperty = new TaskProjectProperty();

}
