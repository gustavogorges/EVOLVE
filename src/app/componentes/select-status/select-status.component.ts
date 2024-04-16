import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-select-status',
  templateUrl: './select-status.component.html',
  styleUrls: ['./select-status.component.scss']
})
export class SelectStatusComponent implements OnInit {

  booleanAddStatus : boolean = false;
  booleanTeste : boolean = false;
  color : string = "";

  status : Status = new Status();

  @Input()
  projeto : Project = new Project;

  @Input()
  tarefa : Task = new Task;

  @Input()
  loggedUser : User = new User;

  @Output() newItem = new EventEmitter<boolean>();


  constructor(
    private service : BackendEVOLVEService
  ) { }

  ngOnInit(): void {
    
  }

  salvarStatus(status:Status) {
    this.tarefa.currentStatus = status;
    this.service.updateCurrentStatus(this.tarefa.id,this.loggedUser.id,status);
    this.newItem.emit(false);
  }

  addStatus() {
    this.booleanAddStatus = !this.booleanAddStatus;
  }

  async novoStatus(): Promise<void> {
    this.status.textColor = "#000000";
    this.projeto.id=1;

    this.projeto = await this.service.updateStatusList(this.projeto.id,this.status);

    this.addStatus();
  }

}
