import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Priority } from 'src/model/priority';
import { PropertyType } from 'src/model/propriedade/propertyType';
import { Property } from 'src/model/propriedade/property';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-propriedade-tarefa',
  templateUrl: './propriedade-tarefa.component.html',
  styleUrls: ['./propriedade-tarefa.component.scss']
})
export class PropriedadeTarefaComponent implements OnInit {

  constructor(private service : BackendEVOLVEService) { }

  ngOnInit(): void {
    this.eventsSubscription = 
    this.events.subscribe(() => 
    this.oldValueFunction()
    );
    
    
    if(this.property.editable == undefined) {
      this.property.editable = false;
    }
    // LÓGICA DE ICONES A DE SER MUDADA TAMBÉM DE ACORDO COM AS NOVAS MODELS

    // if(this.property.type == 'INTEGER') {
    //   this.property.icon = 'pi pi-hashtag'
    // } else if(this.property.type == 'TEXT') {
    //   this.property.icon = 'pi pi-book'
    // }  else if(this.property.type == 'DOUBLE') {
    //   this.property.icon = 'pi pi-dollar'
    // }  else if(this.property.type == 'DATE') {
    //   this.property.icon = 'pi pi-calendar'
    // }  else if(this.property.type == 'MULTISELECT') {
    //   this.property.icon = 'pi pi-tags'
    // }  else if(this.property.type == 'UNISELECT') {
    //   this.property.icon = 'pi pi-tag'
    // }  else if(this.property.type == 'ASSOCIATES') {
    //   this.property.icon = 'pi pi-users'
    // }

    // if(this.property.values.length != 0) {
      
    //   this.booleanEditProperty = true;
    // }
  }

  booleanEditProperty : boolean = false;
  INTEGER : string = "INTEGER";
  DOUBLE : string = "DOUBLE";
  TEXT : string = "TEXT";

  newPropertyObject:Text = new Text;
  newPropertyValue:string = '';

  oldValue : string = '';

  booleanTeste : boolean = false;

  eventsSubscription !: Subscription;

  stackProperty : Property = new Property;

  @Input()
  events!:Observable<Property>

  @Input()
  booleanEdit !: boolean;

  @Input()
  property : Property = new Property();

  @Output()
  eventEmitter = new EventEmitter();

  @Output()
  eventEmitterValue = new EventEmitter<Property>();

  addPropertyValue(property : Property): void {
    this.booleanEditProperty = true;
    property.editable = true;
    
    this.eventEmitter.emit();
  }

  checkEditable(property:Property) : boolean {
    if(property.editable == false) {
      if(this.booleanEditProperty == true) {
        return true;
      }
    }
    return false;
  
  }

  propertyValueTest : Text = new Text;

  saveProperty(property:Property) : void {

    // LÓGICA DE SALVAR AS PROPRIEDADES DEVE SER MUDADA DE ACORDO COM AS NOVAS MODELS
    // if(property.values[0] != undefined) {
    //   console.log("ta aqui");
    //   console.log(property.values);
      
    //   this.oldValue = property.propertyValues[0].value;
    // }
    // property.values = new Array;
   
   
    // this.newPropertyObject.value = this.newPropertyValue;
      
    // property.values.push(this.newPropertyObject)

    this.stackProperty = property;
    
    property.editable = false;
    this.booleanEditProperty = true;

    this.eventEmitterValue.emit(property);
  }

  oldValueFunction() {
    // LÓGICA A SER MUDADA
    // this.stackProperty.values[0].value = this.oldValue;
    this.newPropertyValue = this.oldValue;
  }


  editPropertyValue(property:Property):void {
    this.eventEmitter.emit();
    property.editable = true;
  }


}
