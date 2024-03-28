import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-select-status',
  templateUrl: './select-status.component.html',
  styleUrls: ['./select-status.component.scss']
})
export class SelectStatusComponent implements OnInit{

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
    // this.projeto.statusList.reverse()
    this.getProject()
  }
  
  async getProject(){
    this.projeto = await this.service.getOne("project", this.projeto.id)
  }

  salvarStatus(status:Status) {
    this.tarefa.currentStatus = status;
    this.newItem.emit(false);
  }

  addStatus() {
    this.booleanAddStatus = !this.booleanAddStatus;
  }

  async novoStatus(): Promise<void> {
    if(this.status.name != ''){
      if(this.status.backgroundColor === ''){
        this.status.backgroundColor = "#ff0000"
      }
      this.status.backgroundColor.toUpperCase()
      this.status.textColor = "#000000";
      this.projeto = await this.service.updateStatusList(this.projeto.id,this.status);
      this.addStatus();
    }
    // this.projeto.statusList.reverse()

  }

  editStatus(status:Status){
    this.status = status
    this.boolEditStatus = true
    this.booleanAddStatus = false
  }

  async editStatusPut(){
    this.projeto = await this.service.updateStatusList(this.projeto.id,this.status);
    this.boolEditStatus = false
    this.booleanAddStatus = false
    this.status = new Status
    // this.projeto.statusList.reverse()

  }

  verifyStatusDefault(status:Status){
    if(status.name === 'não atribuido' ||
    status.name === 'concluido' ||
    status.name === 'pendente' ||
    status.name === 'em progresso'){
      return true
    }
    return false
  }

  async enableStatus(status:Status){
    status.enabled = !status.enabled
    this.projeto = await this.service.updateStatusList(this.projeto.id, status);
    // this.projeto.statusList.reverse()
  }

  async deleteStatus(status:Status){
    this.projeto = await this.service.deleteStatus(this.projeto.id, status);
    // this.projeto.statusList.reverse()
  }

}
