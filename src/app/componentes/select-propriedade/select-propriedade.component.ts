import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNullOrUndef } from 'chart.js/dist/helpers/helpers.core';
import { PropertyType } from 'src/model/propriedade/propertyType';
import { Option } from 'src/model/propriedade/option';
import { Property } from 'src/model/propriedade/property';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { User } from 'src/model/user';
import { CookiesService } from 'src/service/cookies-service.service';
import { Project } from 'src/model/project';

@Component({
  selector: 'app-select-propriedade',
  templateUrl: './select-propriedade.component.html',
  styleUrls: ['./select-propriedade.component.scss'],
})
export class SelectPropriedadeComponent implements OnInit {
  propertieSelected: boolean = false;

  propertieSelectedName: string = '';

  booleanPropertieSelect: boolean = false;

  checked: boolean = false;

  creatingOptionBoolean : boolean = false;

  creatingOptionTest : boolean = false;

  optionName:string = '';

  optionType : string = '';

  selectOption : Option = new Option;

  listOptions : Array<Option> = new Array;

  @Input()
  tarefa: Task = new Task();

  @Input()
  projectId !: number;

  @Output() 
  newItemEvent = new EventEmitter<Array<Property>>();

  newPropertie:Property = new Property();
  
  elemento: Property = new Property();
  loggedUser: User = new User;
  checkboxProperty: boolean = false;
  propertiesUpdatedList: Array<Property> = new Array;

  constructor(
    private service : BackendEVOLVEService,
    private cookies_service : CookiesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookies_service.getLoggedUser().then((user)=>{return user});
  }

  options: any[] = [
    {
      text: 'data',
      icon: 'pi pi-calendar',
      showing: true
    },
    {
      text: 'seleção única',
      icon: 'pi pi-tag',
      showing: true
    },
    {
      text: 'número decimal',
      icon: 'pi pi-dollar',
      showing: true
    },
    {
      text: 'numero inteiro',
      icon: 'pi pi-hashtag',
      showing: true
    },
    {
      text: 'seleção múltipla',
      icon: 'pi pi-tags',
      showing: true
    },
    {
      text: 'texto',
      icon: 'pi pi-book',
      showing: true
    },
  
  ];

  clickDate(option: any) {
    this.options.forEach((options) => {
      options.showing = false;
    });
    option.showing = true;
    this.anySelected();
    this.optionType = option.text;
  }

  anySelected(): void {
    this.options.forEach((option) => {
      if (option.showing == true) {
        if (
          option.text == 'seleção múltipla' ||
          option.text == 'seleção única'
        ) {
          this.booleanPropertieSelect = true;
        } else {
          this.booleanPropertieSelect = false;
        }
        this.propertieSelected = true;
      }
    });
  }

  addOptions() {
    this.booleanPropertieSelect = false;
    this.creatingOptionBoolean = true;
  }

  addOneOption() {
    const newOption: Option = {
      value: this.selectOption.value,
      backgroundColor: this.selectOption.backgroundColor,
      id: 0
    }
    this.listOptions.push(newOption);
    this.selectOption.value = '';
  }

  async savePropertie() {
    if(this.optionType == 'numero inteiro') {
       this.newPropertie.propertyType = PropertyType.IntegerValue
       this.tarefa.properties.push(this.newPropertie);
       if(this.checkboxProperty){
        this.newPropertie.global = true;
       }
       this.service.patchProperty(this.newPropertie,this.tarefa.id, this.loggedUser.id);
       let updatedTask : Task = await this.service.getOne("task",this.tarefa.id)
        this.propertiesUpdatedList = updatedTask.properties;
      } else if(this.optionType == 'data') {
        this.newPropertie.propertyType = PropertyType.DataValue;
        this.tarefa.properties.push(this.newPropertie);
        if(this.checkboxProperty){
          this.newPropertie.global = true;
         }
        this.service.patchProperty(this.newPropertie,this.tarefa.id, this.loggedUser.id);
        let updatedTask : Task = await this.service.getOne("task",this.tarefa.id)
        this.propertiesUpdatedList = updatedTask.properties;
      }  else if(this.optionType == 'seleção única') {
        this.newPropertie.propertyType = PropertyType.UniSelectValue;
        this.newPropertie.options = this.listOptions;
        this.tarefa.properties.push(this.newPropertie);
        if(this.checkboxProperty){
          this.newPropertie.global = true;
         }
        this.service.patchProperty(this.newPropertie,this.tarefa.id, this.loggedUser.id);
        let updatedTask : Task = await this.service.getOne("task",this.tarefa.id)
        this.propertiesUpdatedList = updatedTask.properties;
      }  else if(this.optionType == 'seleção múltipla') {
        this.newPropertie.propertyType = PropertyType.MultiSelectValue;   
        this.newPropertie.options = this.listOptions;
        this.tarefa.properties.push(this.newPropertie);
        if(this.checkboxProperty){
          this.newPropertie.global = true;
         }
        this.service.patchProperty(this.newPropertie,this.tarefa.id, this.loggedUser.id);
        let updatedTask : Task = await this.service.getOne("task",this.tarefa.id)
        this.propertiesUpdatedList = updatedTask.properties;
      }  else if(this.optionType == 'número decimal') {
        this.newPropertie.propertyType = PropertyType.DoubleValue;   
        this.tarefa.properties.push(this.newPropertie);
        if(this.checkboxProperty){
          this.newPropertie.global = true;
         }
        this.service.patchProperty(this.newPropertie,this.tarefa.id, this.loggedUser.id);
        let updatedTask : Task = await this.service.getOne("task",this.tarefa.id)
        this.propertiesUpdatedList = updatedTask.properties;
      }  else if(this.optionType == 'texto') {
        this.newPropertie.propertyType = PropertyType.TextValue;
        this.tarefa.properties.push(this.newPropertie);
        if(this.checkboxProperty){
          this.newPropertie.global = true;
         }
        this.service.patchProperty(this.newPropertie,this.tarefa.id, this.loggedUser.id);
        let updatedTask : Task = await this.service.getOne("task",this.tarefa.id)
        this.propertiesUpdatedList = updatedTask.properties;
      }  else if(this.optionType == 'associados') {
        this.tarefa.properties.push(this.newPropertie); 
        if(this.checkboxProperty){
          this.newPropertie.global = true;
         }
        this.service.patchProperty(this.newPropertie,this.tarefa.id, this.loggedUser.id);
        let updatedTask : Task = await this.service.getOne("task",this.tarefa.id)
        this.propertiesUpdatedList = updatedTask.properties;
      }
      
    this.newItemEvent.emit(this.propertiesUpdatedList)  
  }
}
