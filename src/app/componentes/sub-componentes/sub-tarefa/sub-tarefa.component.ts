import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/model/task';
import { Subtask } from 'src/model/subtask';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { User } from 'src/model/user';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-sub-tarefa',
  templateUrl: './sub-tarefa.component.html',
  styleUrls: ['./sub-tarefa.component.scss']
})
export class SubTarefaComponent implements OnInit {

  booleanAddSubtarefa : boolean = false;
  
  checked:boolean = false;

  modalSubtarefa:boolean = false;

  newNameEdit : string = '';

  @Input()
  tarefa : Task = new Task;
  @Input()
  listaSubtarefas : Array<Subtask> = new Array;
  subtarefa  = {
    nome: ''
  };
  
 

  constructor(
    private service : BackendEVOLVEService,
    private cookies_service:CookiesService
  ) { }

  loggedUser : User = new User;
 
  async ngOnInit(): Promise<void> {
   this.loggedUser = await this.cookies_service.getLoggedUser().then((user)=>{return user})
   }

  async adicionarSubtarefa() {
    const subtarefaNova = new Subtask()
    subtarefaNova.name= this.subtarefa.nome
   
    console.log(subtarefaNova);
    
    this.tarefa.subtasks.push(subtarefaNova);
    await this.service.putTarefa(this.tarefa, this.loggedUser.id)
    this.tarefa = await this.service.getOne("task", this.tarefa.id)
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
    this.tarefa.subtasks.splice(i,1)
    console.log(this.listaSubtarefas)
    this.service.putTarefa(this.tarefa, this.loggedUser.id);
  }

  confirmEdit(subtarefa : Subtask) {
    console.log(this.listaSubtarefas)
    subtarefa.name = this.newNameEdit;
    subtarefa.editable = false;
    console.log(this.listaSubtarefas)
    console.log(this.tarefa.subtasks)
    this.service.putTarefa(this.tarefa, this.loggedUser.id);
  }
  async completed(sub : Subtask){
      console.log(sub);
      if(sub.concluded){
        sub.concluded=false;
      }else{
        sub.concluded=true;
      }
      console.log(sub.id);
      this.tarefa.subtasks.map((s)=>{
        if(s.id ==sub.id){
          s.concluded=sub.concluded
        }
      })

      await this.service.putTarefa(this.tarefa, this.loggedUser.id); 
      
      }

}