import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Priority } from 'src/model/priority';
import { PropertyType } from 'src/model/propriedade/propertyType';
import { TaskProjectProperty } from 'src/model/propriedade/task-project-property';
import { Text } from 'src/model/propriedade/text';

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

    console.log(this.property.type);
  }

  booleanEditProperty : boolean = false;
  INTEGER : string = "INTEGER";
  DOUBLE : string = "DOUBLE";
  TEXT : string = "TEXT";

  @Input()
  property : TaskProjectProperty = new TaskProjectProperty();

  @Output()
  eventEmitter = new EventEmitter();

  propertyValue(property : TaskProjectProperty) {
    if (property.type != PropertyType.ASSOCIATES) {
      if(this.property.value.length == 0 ) {
        this.booleanEditProperty = false;
      }
      if(property.editable == false) {
        this.booleanEditProperty = false;
      }
    } 
    this.booleanEditProperty = true;
  }

  addPropertyValue(property : TaskProjectProperty): void {
    console.log(property);
    this.propertyValue(property)
    property.editable = true;
    this.eventEmitter.emit();
  }

  checkEditable(property:TaskProjectProperty) : boolean {
    if(property.editable == false) {
      if(this.booleanEditProperty) {
        return true;
      }
    }
    return false;
  
  }

  propertyValueTest : Text = new Text;

  stringfyProperty(property:TaskProjectProperty) : void {
    // Lógica para adicionar um valor a propriedade, lebrando que os valores fazem parte de uma array 
    //property.value.

    //property.value.push()
    console.log(typeof(property.value));
    property.value.values.toString();
    console.log(typeof(property.value.values));
  }


  //checkTypeOfProperty(property:TaskProjectProperty) : boolean {
  //  if(property.type == PropertyType.INTEGER) {
  //    console.log("ENTROU NO NUMBER")
  //    if(property.editable == true) {
  //      return true;
  //    }
  //  }
  //  if(property.type == PropertyType.TEXT) {
  //    console.log("ENTROU NO TEXTO")
  //    if(property.editable == true) {
  //      return true;
  //    }
  //  }
  //  return false;
  //}

}
