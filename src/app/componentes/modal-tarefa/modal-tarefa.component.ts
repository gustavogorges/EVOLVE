import { Component, ComponentFactoryResolver, EventEmitter, HostListener, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { LogarithmicScale } from 'chart.js';
import { Subject } from 'rxjs';
import { Priority } from 'src/model/priority';
import { PriorityRecord } from 'src/model/priorityRecord';
import { Project } from 'src/model/project';
import { Property } from 'src/model/propriedade/property';
import { PropertyValue } from 'src/model/propriedade/propertyValue';
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
  booleanCalendarioFinalDate: boolean = false;
  booleanCalendariosScheduling : boolean = false;
  booleanDescription: boolean = false;
  booleanFoco: boolean = false;
  booleanSelectPrioridade : boolean = false;
  booleanAddPropriedade: boolean = false;
  statusAntigo: Status = new Status();
  descricaoAntiga: string = '';
  nomeAntigo: string = '';
  booleanPlayPause : boolean = false; 

  propertyStack : Property = new Property;
  propertyValueStack : PropertyValue = new PropertyValue;

  propertiesList : Array<Property> = new Array();

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

  finishEditPriority() {
    this.booleanSelectPrioridade = false;
  }

  updatePropertiesList() : void {
      this.propertiesList = this.tarefa.properties;
      this.booleanAddPropriedade = false;
  }


  
  constructor(private service: BackendEVOLVEService) {}
  @Input() tarefa: Task = new Task();
  @Input() projeto: Project = new Project();
  @Output() closeModalTask = new EventEmitter<boolean>();

  sendEventEmitter():void {
    this.closeModalTask.emit(true);
  }
  tarefaNova: Task = new Task();

  listPriorities !: PriorityRecord[];

  async ngOnInit(): Promise<void> {
    
    this.listPriorities = await this.service.getAllPriorities()
    this.propertiesList = this.tarefa.properties;

    // this.verificaTamanhoString();
    if (this.tarefa.id == 0) {      
      this.booleanEdit = true;
      this.booleanCalendarioFinalDate = true;
      this.tarefa = this.tarefaNova;
      this.tarefa.currentStatus.name = "sem status";
      this.tarefa.priority.name = "NENHUMA"
      this.tarefa.priority.backgroundColor = "#cccccc"
    } else if (this.tarefa.id != 0) {
      this.statusAntigo = this.tarefa.currentStatus;
      this.descricaoAntiga = this.tarefa.description;
      this.nomeAntigo = this.tarefa.name;
    }
  }

  editNoValue() : void {
    if(this.booleanEdit == false) {
      this.edit();
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
    }
  }

  edit() {
    this.booleanEdit = !this.booleanEdit;
    this.booleanCalendarioFinalDate = !this.booleanCalendarioFinalDate;
    this.booleanCalendariosScheduling = !this.booleanCalendariosScheduling
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

  editPriority() {
    if (this.booleanEdit) {
      this.booleanEdit = true;
      this.booleanSelectPrioridade = !this.booleanSelectPrioridade;
    } else {
      this.booleanSelectPrioridade = !this.booleanSelectPrioridade;
      this.booleanEdit = !this.booleanEdit;
    }
  }

  editDataFinalDate() {
    this.booleanCalendarioFinalDate = !this.booleanCalendarioFinalDate;
    if(!this.booleanEdit) {
      this.booleanEdit = !this.booleanEdit;
    }
  }

  editDataScheduling() {
    this.booleanCalendariosScheduling = !this.booleanCalendariosScheduling;
    if(!this.booleanEdit) {
      this.booleanEdit = !this.booleanEdit;
    }
  }


  eventsSubject: Subject<Property> = new Subject<Property>();
  eventsSubject2: Subject<PropertyValue> = new Subject<PropertyValue>();

  booleanEditFalse() {
    this.booleanEdit = false;
    this.booleanCalendarioFinalDate = false;
    this.booleanStatus = false;
    this.tarefa.currentStatus = this.statusAntigo;
    this.tarefa.description = this.descricaoAntiga;
    this.tarefa.name = this.nomeAntigo;
    this.eventsSubject.next(this.propertyStack);
    this.eventsSubject2.next(this.propertyValueStack);
  }

  async salvarTarefa() {
    console.log(this.tarefa);
  
    if (this.tarefa.id != 0) {
      this.service.putTarefa(this.tarefa);
      if(this.propertyStack != null ) {
        console.log("Log property stack");
        console.log(this.propertyStack);
        console.log("Log propertyValue stack");
        console.log(this.propertyValueStack);
        
        
        this.service.putPropertyValue(this.propertyStack.id,this.propertyValueStack)
      }

    } else if (this.tarefa.id == 0) {
      this.tarefa.project.id = 1;
      this.tarefa.creator.id = 1;
      this.service.postTarefa(this.tarefa);
      //if(this.propertyStack != null ) {
      //  this.service.putPropertyValue(this.propertyStack.id,this.propertyStack)
      //}
    }

    if (this.booleanCalendarioFinalDate == true) {
      this.booleanCalendarioFinalDate = false;
    }
    if(this.booleanCalendariosScheduling == true) {
      this.booleanCalendariosScheduling = false;
    }
    if (this.booleanStatus == true) {
      this.booleanStatus = false;
    }
    this.booleanEdit = !this.booleanEdit;
  }

  setPropertyValue(property:Property) {
    console.log("Log property recebida");
    this.propertyStack = property;
  }

  setPropertyValue2(propertyValue:PropertyValue) {
    console.log("Log propertyValue recebida");
    this.propertyValueStack= propertyValue;
  }

  startFocus() {
    this.booleanFoco = true;
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