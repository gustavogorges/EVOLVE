import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Projeto } from 'src/model/project';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-modal-tarefa',
  templateUrl: './modal-tarefa.component.html',
  styleUrls: ['./modal-tarefa.component.scss'],
})
export class ModalTarefaComponent implements OnInit {
  booleanDesc: boolean = false;
  page_task: string = 'sub-tarefas';
  nomeGrande: string = '';
  editBoolean: boolean = false;
  booleanEdit: boolean = false;
  booleanStatus: boolean = false;
  booleanCalendario: boolean = false;
  booleanDescription: boolean = false;
  booleanFoco: boolean = false;
  booleanAddPropriedade: boolean = false;
  statusAntigo: Status = new Status();
  descricaoAntiga: string = '';
  nomeAntigo: string = '';
  booleanPlayPause : boolean = false; 

  interval : any;

  timerString : string = '00:00';
  seconds : number = 0;
  secondsString : string = '';
  minutes : number = 0;
  minutesString : string = '00';
  hours : number = 0
  hoursString : string = ' ';


  startTimer() {
    this.booleanPlayPause = false;
    this.interval = setInterval(() => {
      if(this.seconds <= 59) {
        if(this.seconds < 9) {
          this.seconds++;
          this.secondsString = '0' + this.seconds.toString();
        } else {
          this.seconds++;
          this.secondsString = this.seconds.toString();
        }
      } 
      if(this.seconds > 59) {
        this.seconds = 0;
        this.secondsString = '0' + this.seconds.toString();
        if(this.minutes < 59) {
          if(this.minutes < 10) {
            this.minutes++;
            this.minutesString = '0' + this.minutes.toString();
          } else {
            this.minutes++;
            this.minutesString = this.minutes.toString();
            this.seconds = 0;
            this.secondsString = this.seconds.toString();
          }
        } else {
          this.minutes=0;
          this.hours++;
          this.hoursString = this.hours.toString() + ' : '
        }
      }

      this.timerString = this.hoursString + this.minutesString + ':' + this.secondsString
    },1000)
  }

  stopTimer() {
    this.booleanPlayPause = true;
    clearInterval(this.interval);
  }

  
  constructor(private service: BackendEVOLVEService) {}
  @Input() tarefa: Task = new Task();
  tarefaTeste : Task = this.tarefa;
  projeto: Projeto = new Projeto();
  tarefaNova: Task = new Task();

  async ngOnInit(): Promise<void> {
    console.log(this.tarefa);
    // this.verificaTamanhoString();
    if (this.tarefa.id == 0) {
      this.booleanEdit = true;
      this.booleanCalendario = true;
      this.tarefa = this.tarefaNova;
      this.tarefaNova.currentStatus.name = 'sem status';
    } else if (this.tarefa.id != 0) {
      this.statusAntigo = this.tarefa.currentStatus;
      this.descricaoAntiga = this.tarefa.description;
      this.nomeAntigo = this.tarefa.name;
    }
    let projetos = await this.service.getAllSomething('projeto');
    for (let projeto of projetos) {
      if (projeto.id == this.tarefa.project.id) {
        this.projeto = projeto;
      }
    }
  }


  @HostListener('click', ['$event'])
  clicouFora(event:any){
   const element = event.target.getAttributeNames().find((name: string | string[]) => name.includes('c71') || name.includes('c72'))
     if(!element){
       
      this.closeAddPropertie();
     }
  }

  openDesc(): void {
    this.booleanDesc = !this.booleanDesc;
  }

  changePage(name_page: string): void {
    if (name_page == 'sub-tarefas') {
      this.page_task = 'sub-tarefas';
    } else if (name_page == 'comentarios') {
      this.page_task = 'comentarios';
    } else if (name_page == 'historicos') {
      this.page_task = 'historicos';
    } else if (name_page == 'anexos') {
      this.page_task = 'anexos';
    } else if (name_page == 'automacao') {
      this.page_task = 'automacao';
    } else if (name_page == 'integracao') {
      this.page_task = 'integracao';
    }
  }

  verificaTamanhoString() {
    if (this.tarefa.name.length > 20) {
      this.nomeGrande = this.tarefa.name;
      let nome = this.tarefa.name.split(' ', 4).toString();
      this.tarefa.name = nome.replace(/,/g, ' ');
      console.log(this.tarefa.name);
    }
  }

  edit() {
    this.booleanEdit = !this.booleanEdit;
    this.booleanCalendario = !this.booleanCalendario;
  }

  editStatus() {
    if (this.booleanEdit) {
      this.booleanEdit = true;
      this.booleanStatus = !this.booleanStatus;
    } else {
      this.booleanStatus = !this.booleanStatus;
      this.booleanEdit = !this.booleanEdit;
    }
  }

  editData() {
    this.booleanCalendario = !this.booleanCalendario;
    this.booleanEdit = !this.booleanEdit;
  }

  editDescription() {
    console.log(this.editBoolean);
  }

  booleanEditFalse() {
    this.booleanEdit = false;
    this.booleanCalendario = false;
    this.booleanStatus = false;
    this.tarefa.currentStatus = this.statusAntigo;
    this.tarefa.description = this.descricaoAntiga;
    this.tarefa.name = this.nomeAntigo;
  }

  salvarTarefa() {
    if (this.tarefa.id != 0) {
      this.service.putTarefa(this.tarefa);
    } else if (this.tarefa.id == 0) {
      console.log('entrou');
      this.tarefa.creator.id = 303;
      this.tarefa.project.id = 2652;
      this.service.postTarefa(this.tarefa);
      this.tarefa.id = 0;
    }

    if (this.booleanCalendario == true) {
      this.booleanCalendario = false;
    }
    if (this.booleanStatus == true) {
      this.booleanStatus = false;
    }
    this.booleanEdit = !this.booleanEdit;
  }

  startFocus() {
    console.log('entrou no teste');
    this.booleanFoco = true;
    console.log(this.booleanFoco);
    this.startTimer();
  }

  finishFocus() {
    this.booleanFoco = false;
  }

  addPropertie() {
    this.booleanAddPropriedade = true;
  }

  closeAddPropertie() {
    this.booleanAddPropriedade = false;
  }
}
