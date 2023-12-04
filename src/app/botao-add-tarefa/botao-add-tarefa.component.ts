import { Component, Input, OnInit } from '@angular/core';
import { Tarefa } from 'src/model/tarefa';

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
