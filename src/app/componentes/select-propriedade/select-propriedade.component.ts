import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/model/propriedade/property';
import { SelectOption } from 'src/model/propriedade/selectOption';
import { TaskProjectProperty } from 'src/model/propriedade/task-project-property';
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

  selectOption : SelectOption = new SelectOption;

  listOptions : Array<SelectOption> = new Array;

  @Input()
  tarefa: Task = new Task();

  newPropertie:TaskProjectProperty = new TaskProjectProperty();
  
  elemento: TaskProjectProperty = new TaskProjectProperty();

  constructor(
    private service : BackendEVOLVEService
  ) {}

  ngOnInit(): void {
    console.log(this.tarefa);
    console.log(this.selectOption.backgroundColor)
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
      text: 'text',
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
    const newOption: SelectOption = {
      name: this.selectOption.name,
      backgroundColor: this.selectOption.backgroundColor,
      id: 0
    }
    this.listOptions.push(newOption);
    this.selectOption.name = '';
  }

  savePropertie() {
    console.log(this.tarefa)
    this.tarefa.properties.push(this.newPropertie);
    this.service.putTarefa(this.tarefa);
    console.log(this.service.getAllSomething("tarefa"))
    console.log(this.tarefa.properties);
  }
}
