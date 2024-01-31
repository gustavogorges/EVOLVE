import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/model/task';
import { Subtask } from 'src/model/subtask';
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

  modalSubtarefa:boolean = false;

  newNameEdit : string = '';

  @Input()
  tarefa : Task = new Task;
  
  @Input()
  listaSubtarefas : Array<Subtask> = new Array;

  constructor(
    private service : BackendEVOLVEService
  ) { }

  ngOnInit(): void {

  }

  adicionarSubtarefa() {
    const subtarefaNova: Subtask = {
      name: this.subtarefa.nome,
      concluded: false,
      id: 0,
      modalEdit : false,
      editable: false
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

  openModalSubtarefa(subtarefa : Subtask) {
    subtarefa.modalEdit = !subtarefa.modalEdit;
  }

  editSubtarefa(subtarefa : Subtask) {
    subtarefa.modalEdit = false;
    subtarefa.editable = true;
  }

  removeSubtarefa(subtarefa : Subtask, i : number) {
    this.listaSubtarefas.splice(i,1)
    console.log(this.listaSubtarefas)
    this.service.putTarefa(this.tarefa);
  }

  confirmEdit(subtarefa : Subtask) {
    console.log(this.listaSubtarefas)
    subtarefa.name = this.newNameEdit;
    subtarefa.editable = false;
    console.log(this.listaSubtarefas)
    console.log(this.tarefa.subtasks)
    this.service.putTarefa(this.tarefa);
  }

}