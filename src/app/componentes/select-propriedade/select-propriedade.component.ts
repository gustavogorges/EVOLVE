import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNullOrUndef } from 'chart.js/dist/helpers/helpers.core';
import { PropertyType } from 'src/model/propriedade/propertyType';
import { Option } from 'src/model/propriedade/option';
import { Property } from 'src/model/propriedade/property';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

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

  @Output() 
  newItemEvent = new EventEmitter<Array<Property>>();

  newPropertie:Property = new Property();
  
  elemento: Property = new Property();

  constructor(
    private service : BackendEVOLVEService
  ) {}

  ngOnInit(): void {
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
      text: 'número double',
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
    {
      text: 'associados',
      icon: 'pi pi-users',
      showing: true
    }
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

  savePropertie() {
    if(this.optionType == 'numero inteiro') {
       this.newPropertie.propertyType = PropertyType.IntegerValue;
        this.tarefa.properties.push(this.newPropertie);
        this.service.patchProperty(this.newPropertie,this.tarefa.id);
      } else if(this.optionType == 'data') {
        this.newPropertie.propertyType = PropertyType.DataValue;
        this.tarefa.properties.push(this.newPropertie);
        this.service.patchProperty(this.newPropertie,this.tarefa.id);
      }  else if(this.optionType == 'seleção única') {
        this.newPropertie.propertyType = PropertyType.UniSelectValue;
        this.newPropertie.options = this.listOptions;
        this.tarefa.properties.push(this.newPropertie);
        this.service.patchProperty(this.newPropertie,this.tarefa.id);
      }  else if(this.optionType == 'seleção múltipla') {
        this.newPropertie.propertyType = PropertyType.MultiSelectValue;
        this.newPropertie.options = this.listOptions;
        this.tarefa.properties.push(this.newPropertie);
        this.service.patchProperty(this.newPropertie,this.tarefa.id);
      }  else if(this.optionType == 'número double') {
        this.newPropertie.propertyType = PropertyType.DoubleValue;
        this.tarefa.properties.push(this.newPropertie);
        this.service.patchProperty(this.newPropertie,this.tarefa.id);
      }  else if(this.optionType == 'texto') {
        this.newPropertie.propertyType = PropertyType.TextValue;
        this.tarefa.properties.push(this.newPropertie);
        this.service.patchProperty(this.newPropertie,this.tarefa.id);
      }  else if(this.optionType == 'associados') {
        //Há de ser implementado ainda no enum, ou de algum outra forma
        //this.newPropertie.propertyType = PropertyType;
        this.tarefa.properties.push(this.newPropertie);
        this.service.patchProperty(this.newPropertie,this.tarefa.id);
      }
    this.newItemEvent.emit()  
  }
}
