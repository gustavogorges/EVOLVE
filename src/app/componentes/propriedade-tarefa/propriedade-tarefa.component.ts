import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Priority } from 'src/model/priority';
import { PropertyType } from 'src/model/propriedade/propertyType';
import { Property } from 'src/model/propriedade/property';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { PropertyValue } from 'src/model/propriedade/propertyValue';
import { ValueText } from 'src/model/propriedade/property-values/valueText';
import { ValueInteger } from 'src/model/propriedade/property-values/valueInteger';
import { ValueDouble } from 'src/model/propriedade/property-values/valueDouble';
import { ValueData } from 'src/model/propriedade/property-values/valueData';
import { ValueMultiSelect } from 'src/model/propriedade/property-values/valueMultiSelect';
import { ValueUniSelect } from 'src/model/propriedade/property-values/valueUniSelect';

@Component({
  selector: 'app-propriedade-tarefa',
  templateUrl: './propriedade-tarefa.component.html',
  styleUrls: ['./propriedade-tarefa.component.scss']
})
export class PropriedadeTarefaComponent implements OnInit {

  constructor(private service : BackendEVOLVEService) { }

  // instanciando o objeto especifico o método funcionaria de acordo
  // porém seriam vários if's, tentar achar uma maneira de não usar 
  // tantos if's
  newPropertyObject:any;
  propertyValue : any;

  ngOnInit(): void {
    this.propertyValue = this.property.propertyValues[0]
    console.log(this.propertyValue);
    
  
    this.eventsSubscription = 
    this.events.subscribe(() => 
    this.oldValueFunction()
    );
    
    
    if(this.property.editable == undefined) {
      this.property.editable = false;
    }
    // LÓGICA DE ICONES A DE SER MUDADA TAMBÉM DE ACORDO COM AS NOVAS MODELS

     if(this.property.propertyType.toString() == "IntegerValue") {
       this.newPropertyObject = new ValueInteger();
       this.property.icon = 'pi pi-hashtag'
     } else if(this.property.propertyType.toString() == "TextValue") {
      this.newPropertyObject = new ValueText();
       this.property.icon = 'pi pi-book'
     }  else if(this.property.propertyType.toString() == "DoubleValue") {
      this.newPropertyObject = new ValueDouble();
       this.property.icon = 'pi pi-dollar'
     }  else if(this.property.propertyType.toString() == "DataValue") {
      this.newPropertyObject = new ValueData();
       this.property.icon = 'pi pi-calendar'
     }  else if(this.property.propertyType.toString() == "MultiSelectValue") {
      this.newPropertyObject = new ValueMultiSelect();
       this.property.icon = 'pi pi-tags'
     }  else if(this.property.propertyType.toString() == "UniSelectValue") {
      this.newPropertyObject = new ValueUniSelect();
       this.property.icon = 'pi pi-tag'
     }  else if(this.property.propertyType.toString() == "UniSelectValue") {
      this.newPropertyObject = new ValueUniSelect();
       this.property.icon = 'pi pi-users'
     }

     if(this.property.propertyValues.length != 0) {
      
       this.booleanEditProperty = true;
     }
     
  }

  booleanEditProperty : boolean = false;
  INTEGER : string = "INTEGER";
  DOUBLE : string = "DOUBLE";
  TEXT : string = "TEXT";

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

  saveProperty(property:Property) : void {

    // LÓGICA DE SALVAR AS PROPRIEDADES DEVE SER MUDADA DE ACORDO COM AS NOVAS MODELS
     if(property.propertyValues[0] != undefined) {
      
       this.oldValue = this.propertyValue.toString();
     }
     property.propertyValues = new Array;
   
     this.newPropertyObject.value = this.newPropertyValue;
        
     property.propertyValues.push(this.newPropertyObject)

    this.stackProperty = property;
    
    property.editable = false;
    this.booleanEditProperty = true;

    console.log("Log property, no property save");
    
    console.log(property);
    

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
