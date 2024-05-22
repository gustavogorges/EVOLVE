import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';
import { hasPermissionProject } from 'src/app/shared/check-permissions';

@Component({
  selector: 'app-project-task-approval',
  templateUrl: './project-task-approval.component.html',
  styleUrls: ['./project-task-approval.component.scss']
})
export class ProjectTaskApprovalComponent implements OnInit {

  constructor(private service : BackendEVOLVEService,
    private cookies_service:CookiesService
  ) { }

  loggedUser:User = new User;
  hasPermission : boolean = false;
  @Output()
  eventEmitter : EventEmitter<Task> = new EventEmitter<Task>();
  

  async ngOnInit() {
    this.loggedUser = await this.cookies_service.getLoggedUser();
    this.verifyPermission();
  }

  @Input()
  project : Project = new Project();

  verifyConcludedTasks() : Array<Task>{
    let concludedTasks : Array<Task> = new Array<Task>();
    this.project.tasks.forEach(task => {
      if((task.currentStatus.name == "concluido" || task.currentStatus.name === '已完成' || task.currentStatus.name === 'completado' || task.currentStatus.name === 'completed') && task.concluded == false){
        concludedTasks.push(task);
      }
    });
    return concludedTasks;
  }

  async taskSetConcluded(task: Task){
    task.concluded = true;
    this.service.setTaskConcluded(task.id);
  }

  taskChangeStatus(task : Task) {
    this.project.statusList.forEach(status => {
      if(status.name == "em progresso" || status.name === '进展中' || status.name === 'en progreso' || status.name === 'in progress'){
        task.currentStatus = status;
        this.service.updateCurrentStatus(task.id,this.loggedUser.id,status);
      }
    });
  }

  verifyPermission(){
    hasPermissionProject(this.loggedUser.id,this.project,"MANAGE_MEMBERS") ? this.hasPermission = true : this.hasPermission = false;
  }

  sendEmitter(task: Task){
    this.eventEmitter.emit(task);
  }
  

}
