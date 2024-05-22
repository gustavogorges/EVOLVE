import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output()
  @Output() customEvent = new EventEmitter<number>();
  
 

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
    
    this.tarefa?.subtasks?.push(subtarefaNova);
    this.tarefa = await this.service.patchSubtask(subtarefaNova,this.tarefa.id, this.loggedUser.id);
    this.subtarefa.nome = ''
    this.booleanSubtarefa();
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

  async removeSubtarefa(subtarefa : Subtask, i : number) {
      this.tarefa.subtasks.map(subtask => subtask.id != subtarefa.id)
      
    this.tarefa = await this.service.deleteSubtask(subtarefa.id, this.tarefa.id, this.loggedUser.id);
  }

  verifyApprovament() :boolean {
    if(this.tarefa.concluded == true || this.tarefa.currentStatus.name == "Concluído"){
      return true
    }
   return false;
  }

  confirmEdit(subtarefa : Subtask) {
    console.log(this.listaSubtarefas)
    subtarefa.name = this.newNameEdit;
    subtarefa.editable = false;
    this.service.putTarefa(this.tarefa, this.loggedUser.id);
  }
  async completed(sub : Subtask){
      console.log(sub);
      if(sub.concluded){
        sub.concluded=false;
      }else{
        sub.concluded=true;
      }
      this.tarefa.subtasks.map((s)=>{
        if(s.id ==sub.id){
          s.concluded=sub.concluded
        }
      })

     let task : Task =  await this.service.putTarefa(this.tarefa, this.loggedUser.id); 
      this.customEvent.emit(task.progress)

      }
      cancelar(){
        this.booleanAddSubtarefa = false
        this.subtarefa.nome = ""
      }

}