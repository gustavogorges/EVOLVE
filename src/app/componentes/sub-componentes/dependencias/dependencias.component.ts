import { Component, Input, OnInit } from '@angular/core';
import { TarefaCardListaComponent } from 'src/app/tarefa-card-lista/tarefa-card-lista.component';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-dependencias',
  templateUrl: './dependencias.component.html',
  styleUrls: ['./dependencias.component.scss']
})
export class DependenciasComponent implements OnInit {

  @Input()
  task : Task = new Task;
  
  @Input()
  project : Project = new Project;

  taskList : Array<Task> = new Array
  taskConclued : Array<Task> = new Array

  constructor(private service: BackendEVOLVEService,  private cookies_service:CookiesService) { }

  loggedUser !: User
  async ngOnInit(): Promise<void> {
    console.log(this.task);
    this.taskList = this.task.dependencies.filter((t)=> {t.currentStatus.name != "concluido" })
    this.taskConclued = this.task.dependencies.filter((t)=> t.currentStatus.name == "concluido" && t.concluded)
    this.loggedUser = await this.cookies_service.getLoggedUser();
  }
  verifyApprovament() :boolean {
    if(this.task.concluded == true || this.task.currentStatus.name == "concluido"){
      return true
    }
   return false;
  }
  modal = false
  openModal(){
    this.modal = !this.modal
  }
  async addTask(taskToAdd : Task){
    this.modal = false
    this.task.dependencies.push(taskToAdd);
    this.task = await this.service.patchTaskDependencies(this.task.id, this.task.dependencies ,this.loggedUser.id )
    this.taskList = this.task.dependencies.filter((t)=> t.currentStatus.name != "concluido")


  }
 async removeTask(task2 :Task, index :number){
  console.log(task2);
  
  this.task.dependencies = this.task.dependencies.filter(item => item.id !== task2.id);

    
    this.taskList.splice(index, 1)
    console.log(this.task);
    
    this.task = await this.service.patchTaskDependencies(this.task.id, this.task.dependencies ,this.loggedUser.id )
  }

}
