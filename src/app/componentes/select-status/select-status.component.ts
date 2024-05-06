import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class SelectStatusComponent implements OnInit{

  booleanAddStatus : boolean = false;
  booleanTeste : boolean = false;
  color : string = "";
  boolEditStatus : boolean = false;

  status : Status = new Status();

  @Input()
  projeto : Project = new Project;

  @Input()
  tarefa : Task = new Task;

  @Input()
  loggedUser : User = new User;

  @Output() newItem = new EventEmitter<boolean>();
  @Output() addNewStatus = new EventEmitter<Status>();

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

  isContrastSufficient(textColor: string, backgroundColor: string, threshold: number = 500): boolean {
    const intensity = (color: string) => {
        const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        if (!rgb) return 0;
        const r = parseInt(rgb[1], 16);
        const g = parseInt(rgb[2], 16);
        const b = parseInt(rgb[3], 16);
        return r + g + b; // Soma dos componentes de cor
    };

    const textColorIntensity = intensity(textColor);
    const backgroundColorIntensity = intensity(backgroundColor);
    const contrast = Math.abs(textColorIntensity - backgroundColorIntensity);

    console.log("Intensidade do texto:", textColorIntensity);
    console.log("Intensidade do fundo:", backgroundColorIntensity);
    console.log("Contraste:", contrast);

    return contrast >= threshold;
  }

  addStatus() {
    this.booleanAddStatus = !this.booleanAddStatus;
  }

  async novoStatus(): Promise<void> {

    if(this.status.name != ''){
      if(this.status.backgroundColor === ''){
        this.status.backgroundColor = "#ff0000"
      }
      this.status.backgroundColor.toUpperCase();
      console.log(this.status.backgroundColor);
      
      console.log(this.isContrastSufficient('#000000', this.status.backgroundColor));
      
      if(!this.isContrastSufficient('#000000', this.status.backgroundColor)){
        this.status.textColor = "#F4F4F4";
      } else {
        this.status.textColor = "#000000";
      }
      this.addNewStatus.emit(this.status);
      this.addStatus();
    }
    this.status = new Status();
  }


  editStatus(status:Status){
    this.status = status
    this.boolEditStatus = true
    this.booleanAddStatus = false
  }

  async editStatusPut(){
    this.boolEditStatus = false
    this.booleanAddStatus = false
    if(!this.isContrastSufficient('#000000', this.status.backgroundColor)){
      this.status.textColor = "#F4F4F4";
    } else {
      this.status.textColor = "#000000";
    }
    this.status = new Status
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
  }

  async deleteStatus(status:Status){
    if(this.projeto.id != null){
      this.projeto = await this.service.deleteStatus(this.projeto.id, status)
    }else{
      this.projeto.statusList.splice(this.projeto.statusList.indexOf(status), 1)
    }
  }

}
