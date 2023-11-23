import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-tarefa',
  templateUrl: './sub-tarefa.component.html',
  styleUrls: ['./sub-tarefa.component.scss']
})
export class SubTarefaComponent implements OnInit {

  booleanAddSubtarefa : boolean = false;

  checked:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  adicionarSubtarefa() {
    this.booleanAddSubtarefa = !this.booleanAddSubtarefa;
  }

}
