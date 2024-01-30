import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/model/task';

@Component({
  selector: 'app-botao-add-tarefa',
  templateUrl: './botao-add-tarefa.component.html',
  styleUrls: ['./botao-add-tarefa.component.scss']
})
export class BotaoAddTarefaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
