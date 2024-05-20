import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

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

  async ngOnInit() {
    console.log(this.project.tasks);
    this.loggedUser = await this.cookies_service.getLoggedUser();
  }

  @Input()
  project : Project = new Project();

  verifyConcludedTasks() : Array<Task>{
    let concludedTasks : Array<Task> = new Array<Task>();
    this.project.tasks.forEach(task => {
      if(task.currentStatus.name == "Concluído" && task.concluded == false){
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
      if(status.name == "Em Progresso"){
        task.currentStatus = status;
        this.service.updateCurrentStatus(task.id,this.loggedUser.id,status);
      }
    });
  }
  

}
