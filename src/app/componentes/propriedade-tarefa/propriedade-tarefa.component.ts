import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Priority } from 'src/model/priority';
import { PropertyType } from 'src/model/propriedade/propertyType';
import { TaskProjectProperty } from 'src/model/propriedade/task-project-property';
import { Text } from 'src/model/propriedade/text';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-propriedade-tarefa',
  templateUrl: './propriedade-tarefa.component.html',
  styleUrls: ['./propriedade-tarefa.component.scss']
})
export class PropriedadeTarefaComponent implements OnInit {

  constructor(private service : BackendEVOLVEService) { }

  ngOnInit(): void {
    if(this.property.editable == undefined) {
      this.property.editable = false;
    }
    

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

    if(this.property.values.length != 0) {
      
      this.booleanEditProperty = true;
    }
  }

  booleanEditProperty : boolean = false;
  INTEGER : string = "INTEGER";
  DOUBLE : string = "DOUBLE";
  TEXT : string = "TEXT";

  newPropertyObject:Text = new Text;
  newPropertyValue:string = '';

  @Input()
  property : TaskProjectProperty = new TaskProjectProperty();

  @Output()
  eventEmitter = new EventEmitter();

  //propertyValue(property : TaskProjectProperty) {
  //  console.log(this.property.values.length);
    
  //    if(this.property.values.length > 0 ) {
  //      this.booleanEditProperty = false;
  //    } else {
  //      this.booleanEditProperty = true;
  //    }
  //    if(property.editable == false) {
  //      this.booleanEditProperty = false;
  //    } else {
  //      this.booleanEditProperty = true;
  //    }
    
  //}

  addPropertyValue(property : TaskProjectProperty): void {
    //console.log(property);
    //this.propertyValue(property)
    this.booleanEditProperty = true;
    property.editable = true;
    console.log(this.property.type);
    
    this.eventEmitter.emit();
  }

  checkEditable(property:TaskProjectProperty) : boolean {
    if(property.editable == false) {
      if(this.booleanEditProperty == true) {
        return true;
      }
    }
    return false;
  
  }

  propertyValueTest : Text = new Text;

  saveProperty(property:TaskProjectProperty) : void {
    property.values = new Array;
   
      this.newPropertyObject.value = this.newPropertyValue;
      
      property.values.push(this.newPropertyObject)
  
      this.service.putPropertyValue(property.id,property)
      property.editable = false;
      this.booleanEditProperty = true;
  }


  editPropertyValue(property:TaskProjectProperty):void {
    this.eventEmitter.emit();
    property.editable = true;
  }


}
