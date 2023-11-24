import { Component, Input, OnInit } from '@angular/core';
import { Tarefa } from 'src/model/tarefa';
import { Subtarefa } from 'src/model/subtarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-sub-tarefa',
  templateUrl: './sub-tarefa.component.html',
  styleUrls: ['./sub-tarefa.component.scss']
})
export class SubTarefaComponent implements OnInit {

  booleanAddSubtarefa : boolean = false;
  subtarefa  = {
    nome: ''
  };
  checked:boolean = false;

  @Input()
  tarefa : Tarefa = new Tarefa;
  
  @Input()
  listaSubtarefas : Array<Subtarefa> = new Array;

  constructor(
    private service : BackendEVOLVEService
  ) { }

  ngOnInit(): void {

  }

  adicionarSubtarefa() {
    const subtarefaNova: Subtarefa = {
      nome: this.subtarefa.nome,
      concluido: false,
      id: 0
    }
    this.listaSubtarefas.push(subtarefaNova);
    this.service.putTarefa(this.tarefa)
    this.subtarefa.nome = ''
    this.booleanSubtarefa();
    console.log(this.tarefa)
  }

  booleanSubtarefa() {
    this.booleanAddSubtarefa = !this.booleanAddSubtarefa;
  }

}
