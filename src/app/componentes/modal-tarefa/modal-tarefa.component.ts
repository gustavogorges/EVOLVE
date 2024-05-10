import { Component, ComponentFactoryResolver, EventEmitter, HostListener, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { LogarithmicScale } from 'chart.js';
import { UsuarioTarefa } from 'src/model/userTask';
import { Subject } from 'rxjs';
import { Priority } from 'src/model/priority';
import { PriorityRecord } from 'src/model/PriorityRecord';
import { Project } from 'src/model/project';
import { Property } from 'src/model/propriedade/property';
import { PropertyValue } from 'src/model/propriedade/propertyValue';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

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
  booleanStatus: boolean = false;
  booleanCalendarioFinalDate: boolean = false;
  booleanCalendariosScheduling : boolean = false;
  booleanDescription: boolean = false;
  booleanFoco: boolean = false;
  booleanSelectPrioridade : boolean = false;
  booleanSelectAssociates : boolean = false;
  booleanAddPropriedade: boolean = false;
  statusAntigo: Status = new Status();
  descricaoAntiga: string = '';
  nomeAntigo: string = '';
  booleanPlayPause : boolean = false; 

  propertyStack : Property = new Property;
  propertiesStack : Array<Property> = new Array;

  propertyValueStack : PropertyValue = new PropertyValue;
  propertiesValuesStack : Array<PropertyValue> = new Array;

  propertiesList : Array<Property> = new Array();

  booleanEditName : boolean = false;

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

  updatePropertiesList() : void {
      this.propertiesList = this.tarefa.properties;
      this.booleanAddPropriedade = false;
  }

  async sendTimeFocus() : Promise<void> {
    let userTask : UsuarioTarefa;
    userTask = await this.service.getUserWorkedTime(this.loggedUser.id,this.tarefa.id);
    if(userTask.userId == 0 || userTask.userId == null) {
      userTask.userId = this.loggedUser.id;
      userTask.taskId = this.tarefa.id;
    }
    if(userTask.workedSeconds + this.seconds >= 60) {
      userTask.workedMinutes += 1;
      userTask.workedSeconds = userTask.workedSeconds + this.seconds - 60;
    } else {
      userTask.workedSeconds += this.seconds;
    }
    if(userTask.workedMinutes + this.minutes >= 60) {
      userTask.workedHours += 1;
      userTask.workedMinutes = userTask.workedMinutes + this.minutes - 60;
    } else {
      userTask.workedMinutes += this.minutes;
    }
    userTask.workedHours += this.hours;
    console.log(userTask);
    console.log(this.seconds);
    
    this.service.updateUserWorkedTime(userTask);
    this.finishFocus();
  }

  constructor(private service: BackendEVOLVEService,
    private cookies_service:CookiesService) {}
  @Input() tarefa: Task = new Task();
  @Input() projeto: Project = new Project();
  @Output() closeModalTask = new EventEmitter<boolean>();

  sendEventEmitter():void {
    this.closeModalTask.emit(true);
  }
  booleanDeleteProperty:boolean = false;

  tarefaNova: Task = new Task();

  listPriorities !: PriorityRecord[];
  listAssociates !: Array<any>;
  loggedUser : User = new User;
  taskUnchanged : Task = new Task;

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookies_service.getLoggedUser().then((user)=>{return user})
    
    this.listAssociates = this.tarefa.associates;

    
    this.listPriorities = await this.service.getAllPriorities()
    this.propertiesList = this.tarefa.properties;

    // this.verificaTamanhoString();
    if (this.tarefa.name == '') {      
      this.booleanCalendarioFinalDate = true;
      this.tarefa.currentStatus.name = "sem status";
      this.tarefa.priority.name = "NENHUMA"
      this.tarefa.priority.backgroundColor = "#cccccc"
    } else if (this.tarefa.id != 0) {
      this.statusAntigo = this.tarefa.currentStatus;
      this.descricaoAntiga = this.tarefa.description;
      this.nomeAntigo = this.tarefa.name;
    }
  }

  

  listAssociatesVerify() : boolean {
    if(this.tarefa.associates == null || this.tarefa.associates.length == 0) {
      if(this.booleanSelectAssociates == false) {
        return true;
      }
    }
    return false;
  }

  saveProperty() : void {
    console.log(this.tarefa.finalDate);
    
    this.service.updateTaskFinalDate(this.tarefa.id,this.loggedUser.id,this.tarefa.finalDate)
    this.booleanCalendarioFinalDate = false;
  }

  saveProperty2() : void {
    console.log(this.tarefa.scheduledDate);
    
    this.service.updateTaskScheludeDate(this.tarefa.id,this.loggedUser.id,this.tarefa.scheduledDate)
    this.booleanCalendariosScheduling = !this.booleanCalendariosScheduling;
  }

  async saveName() : Promise<void> {
    this.tarefa = await this.service.updateTaskName(this.tarefa.id,this.loggedUser.id,this.tarefa.name);
    this.booleanEditName = false;
  }

  openSelectAssociates() : void {
    this.booleanSelectAssociates = true;
  }

  updateAssociatesList(arrayForce : Array<User>) : void {
    this.listAssociates = arrayForce;
    this.booleanSelectAssociates = false;
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
  editStatus() {
      this.booleanStatus = !this.booleanStatus;
  }

  editPriority() {
 
      this.booleanSelectPrioridade = !this.booleanSelectPrioridade;
    
  }

  editDataFinalDate() {
    this.booleanCalendarioFinalDate = !this.booleanCalendarioFinalDate;
   
  }

  editDataScheduling() {
    this.booleanCalendariosScheduling = !this.booleanCalendariosScheduling;
    
  }


  eventsSubject: Subject<Property> = new Subject<Property>();
  eventsSubject2: Subject<PropertyValue> = new Subject<PropertyValue>();

  async salvarTarefa() {
    if (this.tarefa.id != 0 && this.tarefa.id != null) {
      //this.service.putTarefa(this.tarefa,this.loggedUser.id);

      this.propertiesStack.forEach(propertieStackFor => {
        if(propertieStackFor.name != '' ) {
          this.propertiesValuesStack.forEach(propertiesValueStackFor => {
            if(propertiesValueStackFor.property == propertieStackFor) {
              this.service.putPropertyValue(propertieStackFor.id,propertiesValueStackFor,this.loggedUser.id,this.tarefa.id)
            }
          })
          
        }
      })

      if (this.tarefa.currentStatus != this.taskUnchanged.currentStatus) {
        // implementar novo patch para status aqui
        this.tarefa = await this.service.updateCurrentStatus(this.tarefa.id, this.loggedUser.id, this.tarefa.currentStatus);
      }

      if(this.tarefa.priority.name != this.taskUnchanged.priority.name) {
        this.tarefa = await this.service.updateCurrentPriority(this.tarefa.id, this.loggedUser.id, this.tarefa.priority);
      }

      if (this.listAssociates != null) {
        let associates: Array<Pick<User, "id">> = new Array;
        this.listAssociates.forEach(associate => associates.push({ "id": associate.id }))
        this.service.patchAssociate(this.tarefa.id, associates, this.loggedUser.id);
      }

    } else if (this.tarefa.id == 0) {
      this.tarefa.project.id = 1;
      this.tarefa.creator.id = this.loggedUser.id; 
      this.service.postTarefa(this.tarefa);
    }

    this.verifyBooleans();
  }

  
  finishEditPriority(priority:PriorityRecord) {
    this.tarefa.priority = priority;
    this.booleanSelectPrioridade = false;
  }

  verifyBooleans() : void {
    if (this.booleanCalendarioFinalDate == true) {
      this.booleanCalendarioFinalDate = false;
    }
    if(this.booleanCalendariosScheduling == true) {
      this.booleanCalendariosScheduling = false;
    }
    if (this.booleanStatus == true) {
      this.booleanStatus = false;
    }
  }

  setPropertyValue(property:Property) {
    this.propertyStack = property;
    this.propertiesStack.push(this.propertyStack);
  }

  setPropertyValue2(propertyValue:PropertyValue) {
    this.propertyValueStack = propertyValue;
    this.propertiesValuesStack.push(this.propertyValueStack);
  }

  startFocus() {
    this.booleanFoco = true;
    this.startTimer();
  }

  finishFocus() {
    clearInterval(this.interval);
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.timerString = "00:00"
    this.booleanFoco = false;
  }

  addPropertie() {
    this.booleanAddPropriedade = true;
  }

  closeAddPropertie() {
    this.booleanAddPropriedade = false;
  }

  deleteTask() {
    this.service.deleteTask(this.tarefa.id);
    this.closeModalTask.emit(true);
  }
  async updateTask(){
    this.tarefa = await this.service.getOne("task", this.tarefa.id) 
  }
}