import { Component, Input, OnInit } from '@angular/core';
import { Priority } from 'src/model/priority';
import { TaskProjectProperty } from 'src/model/propriedade/task-project-property';

@Component({
  selector: 'app-propriedade-tarefa',
  templateUrl: './propriedade-tarefa.component.html',
  styleUrls: ['./propriedade-tarefa.component.scss']
})
export class PropriedadeTarefaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(this.property.type == 'INTEGER') {
      this.property.icon = 'pi pi-hashtag'
    } else if(this.property.type == 'TEXT') {
      this.property.icon = 'pi pi-book'
    }  else if(this.property.type == 'DOUBLE') {
      this.property.icon = 'pi pi-dollar'
    }  else if(this.property.type == 'DATE') {
      this.property.icon = 'pi pi-calendar'
    }  else if(this.property.type == 'MULTISELECT') {
      this.property.icon = 'pi pi-tags'
    }  else if(this.property.type == 'UNISELECT') {
      this.property.icon = 'pi pi-tag'
    }  else if(this.property.type == 'ASSOCIATES') {
      this.property.icon = 'pi pi-users'
    }
  }

  @Input()
  property : TaskProjectProperty = new TaskProjectProperty();

}
