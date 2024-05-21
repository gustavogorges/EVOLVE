import { Component, ComponentFactoryResolver, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { LogarithmicScale } from 'chart.js';
import { UsuarioTarefa } from 'src/model/userTask';
import { Subject } from 'rxjs';
import { Priority } from 'src/model/priority';
import { PriorityRecord } from 'src/model/PriorityRecord';
// import { PriorityRecord } from 'src/model/priorityRecord';
import { Project } from 'src/model/project';
import { Property } from 'src/model/propriedade/property';
import { PropertyValue } from 'src/model/propriedade/propertyValue';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';
import { NgIf } from '@angular/common';
declare var createGoogleEvent  : any;


@Component({
  selector: 'app-modal-tarefa',
  templateUrl: './modal-tarefa.component.html',
  styleUrls: ['./modal-tarefa.component.scss'],
})
export class ModalTarefaComponent implements OnInit, OnChanges {

  modalFelipeGorges = false;

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


  alternateModalAviso(){
    this.modalFelipeGorges = !this.modalFelipeGorges
  }

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

  verifyAprovament() : boolean {
    if((this.tarefa.currentStatus.name == 'concluido' || this.tarefa.currentStatus.name === '已完成' || this.tarefa.currentStatus.name === 'completado' || this.tarefa.currentStatus.name === 'completed') && this.tarefa.concluded == false) {
      return true;
    }
    return false;
  }

  updatePropertiesList() : void {
      this.propertiesList = this.tarefa.properties;
      this.booleanAddPropriedade = false;
  }

  async sendTimeFocus() : Promise<void> {
    let userTask : UsuarioTarefa = new UsuarioTarefa();
    
    try{
      userTask = (await this.service.getUserWorkedTime(this.loggedUser.id,this.tarefa.id)).data
    } catch{
      userTask.userId = this.loggedUser.id;
      userTask.taskId = this.tarefa.id;
    }

    //console.log(await this.service.getUserWorkedTime(this.loggedUser.id,this.tarefa.id));


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
    
    
    this.service.updateUserWorkedTime(userTask, this.tarefa.id);
    this.finishFocus();
  }

  constructor(private service: BackendEVOLVEService,
    private cookies_service:CookiesService) {}

  ngOnChanges(){
    this.translatePriorities()
    this.translateTaskPriority()
    this.translateStatus()
  }

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


    this.listPriorities = await this.service.getAllPriorities(this.projeto.id)
    // this.listPriorities = await this.service.getAllPriorities()

    if(this.tarefa.name != '') {
      this.translatePriorities()
      this.translateTaskPriority()
      this.translateStatus()
    }

    setTimeout(() => {
      this.projeto.properties.forEach(propertyFor => {
        if(!this.propertiesList.find(property => property.id == propertyFor.id)) {
          this.propertiesList.push(propertyFor);
        }
      })
    },10);
    this.propertiesList = this.tarefa.properties;

    

    // this.verificaTamanhoString();
    if (this.tarefa.name == '') {      
      this.tarefa.currentStatus.name = "sem status";
      this.tarefa.priority.name = "NENHUMA"
      this.tarefa.priority.backgroundColor = "#cccccc"
    } else if (this.tarefa.id != 0) {
      this.statusAntigo = this.tarefa.currentStatus;
      this.descricaoAntiga = this.tarefa.description;
      this.nomeAntigo = this.tarefa.name;
    }

    if(this.tarefa.currentStatus.name == "concluido" || this.tarefa.currentStatus.name === '已完成' || this.tarefa.currentStatus.name === 'completado' || this.tarefa.currentStatus.name === 'completed') {
      this.modalFelipeGorges = true;
    }
  }

  translateStatus() {
    const lang = localStorage.getItem('lang');
    if (lang === 'ch') {
            if (this.tarefa.currentStatus.name === 'pendente' || this.tarefa.currentStatus.name === 'pendiente' || this.tarefa.currentStatus.name === 'pending') {
                this.tarefa.currentStatus.name = '待定';
            } else if (this.tarefa.currentStatus.name === 'em progresso' || this.tarefa.currentStatus.name === 'en progreso' || this.tarefa.currentStatus.name === 'in progress') {
                this.tarefa.currentStatus.name = '进展中';
            } else if (this.tarefa.currentStatus.name === 'concluido' || this.tarefa.currentStatus.name === 'completado' || this.tarefa.currentStatus.name === 'completed') {
                this.tarefa.currentStatus.name = '已完成';
            } else if (this.tarefa.currentStatus.name === 'não atribuido' || this.tarefa.currentStatus.name === 'Sin asignar' || this.tarefa.currentStatus.name === 'Unassigned') {
                this.tarefa.currentStatus.name = '未分配';
            }
    } else if (lang === 'pt') {
            if (this.tarefa.currentStatus.name === '待定' || this.tarefa.currentStatus.name === 'pendiente' || this.tarefa.currentStatus.name === 'pending') {
                this.tarefa.currentStatus.name = 'pendente';
            } else if (this.tarefa.currentStatus.name === '进展中' || this.tarefa.currentStatus.name === 'en progreso' || this.tarefa.currentStatus.name === 'in progress') {
                this.tarefa.currentStatus.name = 'em progresso';
            } else if (this.tarefa.currentStatus.name === '已完成' || this.tarefa.currentStatus.name === 'completado' || this.tarefa.currentStatus.name === 'completed') {
                this.tarefa.currentStatus.name = 'concluido';
            } else if (this.tarefa.currentStatus.name === '未分配' || this.tarefa.currentStatus.name === 'Sin asignar' || this.tarefa.currentStatus.name === 'Unassigned') {
                this.tarefa.currentStatus.name = 'não atribuido';
            }
    } else if (lang === 'es') {
            if (this.tarefa.currentStatus.name === '待定' || this.tarefa.currentStatus.name === 'pendente' || this.tarefa.currentStatus.name === 'pending') {
                this.tarefa.currentStatus.name = 'pendiente';
            } else if (this.tarefa.currentStatus.name === '进展中' || this.tarefa.currentStatus.name === 'em progresso' || this.tarefa.currentStatus.name === 'in progress') {
                this.tarefa.currentStatus.name = 'en progreso';
            } else if (this.tarefa.currentStatus.name === '已完成' || this.tarefa.currentStatus.name === 'concluido' || this.tarefa.currentStatus.name === 'completed') {
                this.tarefa.currentStatus.name = 'completado';
            } else if (this.tarefa.currentStatus.name === '未分配' || this.tarefa.currentStatus.name === 'não atribuido' || this.tarefa.currentStatus.name === 'Unassigned') {
                this.tarefa.currentStatus.name = 'Sin asignar';
            }
    } else if (lang === 'en') {
            if (this.tarefa.currentStatus.name === '待定' || this.tarefa.currentStatus.name === 'pendente' || this.tarefa.currentStatus.name === 'pendiente') {
                this.tarefa.currentStatus.name = 'pending';
            } else if (this.tarefa.currentStatus.name === '进展中' || this.tarefa.currentStatus.name === 'em progresso' || this.tarefa.currentStatus.name === 'en progreso') {
                this.tarefa.currentStatus.name = 'in progress';
            } else if (this.tarefa.currentStatus.name === '已完成' || this.tarefa.currentStatus.name === 'concluido' || this.tarefa.currentStatus.name === 'completado') {
                this.tarefa.currentStatus.name = 'completed';
            } else if (this.tarefa.currentStatus.name === '未分配' || this.tarefa.currentStatus.name === 'não atribuido' || this.tarefa.currentStatus.name === 'Sin asignar') {
                this.tarefa.currentStatus.name = 'Unassigned';
            }
    }
}

  translatePriorities(){
    const lang = localStorage.getItem('lang');
    if (lang === 'es') {
      this.listPriorities?.forEach(prioridade => {
        switch (prioridade.name) {
          case 'NENHUMA':
            prioridade.name = 'NINGUNA';
            break;
          case 'MUITO_BAIXA':
            prioridade.name = 'MUY BAJA';
            break;
          case 'BAIXA':
            prioridade.name = 'BAJA';
            break;
          case 'MEDIA':
            prioridade.name = 'MEDIA';
            break;
          case 'ALTA':
            prioridade.name = 'ALTA';
            break;
          case 'URGENTE':
            prioridade.name = 'URGENTE';
            break;
        }
      });
    } else if (lang === 'ch') {
      this.listPriorities?.forEach(prioridade => {
        switch (prioridade.name) {
          case 'NENHUMA':
            prioridade.name = '无';
            break;
          case 'MUITO_BAIXA':
            prioridade.name = '非常低';
            break;
          case 'BAIXA':
            prioridade.name = '低';
            break;
          case 'MEDIA':
            prioridade.name = '中';
            break;
          case 'ALTA':
            prioridade.name = '高';
            break;
          case 'URGENTE':
            prioridade.name = '紧急';
            break;
        }
      });
    } else if (lang === 'en') {
      this.listPriorities?.forEach(prioridade => {
        switch (prioridade.name) {
          case 'NENHUMA':
            prioridade.name = 'NONE';
            break;
          case 'MUITO_BAIXA':
            prioridade.name = 'VERY LOW';
            break;
          case 'BAIXA':
            prioridade.name = 'LOW';
            break;
          case 'MEDIA':
            prioridade.name = 'MEDIUM';
            break;
          case 'ALTA':
            prioridade.name = 'HIGH';
            break;
          case 'URGENTE':
            prioridade.name = 'URGENT';
            break;
        }
      });
    }
    else if (lang === 'pt') {
      this.listPriorities?.forEach(prioridade => {
        switch (prioridade.name) {
          case 'NENHUMA':
            prioridade.name = 'NENHUMA';
            break;
          case 'MUITO_BAIXA':
            prioridade.name = 'MUITO BAIXA';
            break;
          case 'BAIXA':
            prioridade.name = 'BAIXA';
            break;
          case 'MEDIA':
            prioridade.name = 'MÉDIA';
            break;
          case 'ALTA':
            prioridade.name = 'ALTA';
            break;
          case 'URGENTE':
            prioridade.name = 'URGENTE';
            break;
        }
      });
    }
  }

  translateTaskPriority(){
    const lang = localStorage.getItem('lang');
    if (lang === 'es') {
        switch (this.tarefa.priority.name) {
          case 'NENHUMA':
            this.tarefa.priority.name = 'NINGUNA';
            break;
          case 'MUITO_BAIXA':
            this.tarefa.priority.name = 'MUY BAJA';
            break;
          case 'BAIXA':
            this.tarefa.priority.name = 'BAJA';
            break;
          case 'MEDIA':
            this.tarefa.priority.name = 'MEDIA';
            break;
          case 'ALTA':
            this.tarefa.priority.name = 'ALTA';
            break;
          case 'URGENTE':
            this.tarefa.priority.name = 'URGENTE';
            break;
        }
    } else if (lang === 'ch') {
        switch (this.tarefa.priority.name) {
          case 'NENHUMA':
            this.tarefa.priority.name = '无';
            break;
          case 'MUITO_BAIXA':
            this.tarefa.priority.name = '非常低';
            break;
          case 'BAIXA':
            this.tarefa.priority.name = '低';
            break;
          case 'MEDIA':
            this.tarefa.priority.name = '中';
            break;
          case 'ALTA':
            this.tarefa.priority.name = '高';
            break;
          case 'URGENTE':
            this.tarefa.priority.name = '紧急';
            break;
        }
    } else if (lang === 'en') {
        switch (this.tarefa.priority.name) {
          case 'NENHUMA':
            this.tarefa.priority.name = 'NONE';
            break;
          case 'MUITO_BAIXA':
            this.tarefa.priority.name = 'VERY LOW';
            break;
          case 'BAIXA':
            this.tarefa.priority.name = 'LOW';
            break;
          case 'MEDIA':
            this.tarefa.priority.name = 'MEDIUM';
            break;
          case 'ALTA':
            this.tarefa.priority.name = 'HIGH';
            break;
          case 'URGENTE':
            this.tarefa.priority.name = 'URGENT';
            break;
        }
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
  submitToGoogleCalendar(){
    if(this.tarefa.finalDate){
      const startTime = new Date(this.tarefa.finalDate) .toISOString().slice(0, 18);
      const endTime = new Date(this.tarefa.finalDate) .toISOString().slice(0, 18) ;
      const eventDetails = {
        email: this.loggedUser.email,
        startTime: startTime,
        endTime: endTime,
        taskName : this.tarefa.name,
        description: "projeto:"+this.projeto.name+" status da tarefa:"+this.tarefa.currentStatus.name
  
      };
      createGoogleEvent(eventDetails)

    }
 
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
      this.service.postTarefa(this.tarefa, this.projeto.id);

  
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

  async deleteTask() {
  await  this.service.deleteTask(this.tarefa.id);
    this.closeModalTask.emit(true);
  }
  async updateTask(){
    this.tarefa = await this.service.getOne("task", this.tarefa.id) 
  }
}