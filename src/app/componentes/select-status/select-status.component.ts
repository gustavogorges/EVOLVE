import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
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
  boolEditStatus : boolean = false;

  status : Status = new Status();

  @Input()
  projeto : Project = new Project;

  @Input()
  statusLista : Array<Status> = new Array

  @Input()
  tarefa : Task = new Task;

  @Output() newItem = new EventEmitter<boolean>();


  constructor(
    private service : BackendEVOLVEService
  ) { }

  ngOnInit(): void {
    console.log(this.projeto)
  }

  salvarStatus(status:Status) {
    this.tarefa.currentStatus = status;
    console.log(this.tarefa.currentStatus)
    this.newItem.emit(false);
  }

  addStatus() {
    this.booleanAddStatus = !this.booleanAddStatus;
  }

  async novoStatus(): Promise<void> {
    this.status.textColor = "#000000";

    console.log(this.status);


    this.projeto = await this.service.updateStatusList(this.projeto.id,this.status);
    
    console.log(this.projeto)

    this.addStatus();
  }

  editStatus(status:Status){
    this.status.name = status.name
    this.status.backgroundColor = status.backgroundColor
    this.boolEditStatus = true
    this.booleanAddStatus = false
  }

  async editStatusPut(){
    this.projeto = await this.service.updateStatusList(this.projeto.id,this.status);
  }

}
