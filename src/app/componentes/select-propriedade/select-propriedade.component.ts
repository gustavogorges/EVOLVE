import { Component, Input, OnInit } from '@angular/core';
import { Propriedade } from 'src/model/propriedade/property';
import { TarefaProjetoPropriedade } from 'src/model/propriedade/task-project-property';
import { Tarefa } from 'src/model/tarefa';

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

  @Input()
  tarefa: Tarefa = new Tarefa();

  elemento: TarefaProjetoPropriedade = new TarefaProjetoPropriedade();

  constructor() {}

  ngOnInit(): void {
    console.log(this.tarefa);
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
}
