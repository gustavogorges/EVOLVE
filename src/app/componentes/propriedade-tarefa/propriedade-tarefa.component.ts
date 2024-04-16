import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Priority } from 'src/model/priority';
import { PropertyType } from 'src/model/propriedade/propertyType';
import { Property } from 'src/model/propriedade/property';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { PropertyValue } from 'src/model/propriedade/propertyValue';
import { IntegerValue } from 'src/model/propriedade/property-values/integerValue';
import { TextValue } from 'src/model/propriedade/property-values/textValue';
import { DoubleValue } from 'src/model/propriedade/property-values/doubleValue';
import { DataValue } from 'src/model/propriedade/property-values/dataValue';
import { MultiSelectValue } from 'src/model/propriedade/property-values/multiSelectValue';
import { UniSelectValue } from 'src/model/propriedade/property-values/uniSelectValue';
import { AssociatesValue } from 'src/model/propriedade/property-values/associatesValue';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';

@Component({
  selector: 'app-propriedade-tarefa',
  templateUrl: './propriedade-tarefa.component.html',
  styleUrls: ['./propriedade-tarefa.component.scss']
})
export class PropriedadeTarefaComponent implements OnInit {
  
  @Input()
  task : Task = new Task();

  constructor(private service : BackendEVOLVEService) { }

  newPropertyObject:any;
  propertyValue : any;

  ngOnInit(): void {
    console.log(this.task);
    

    this.propertyValue = this.property.propertyValues[0]

    if(this.property.currentOptions.length > 0) {
      this.booleanValueOption = true;
    }
  
    this.eventsSubscription = 
    this.events.subscribe(() => 
    this.oldValueFunction()
    );
    
    
    if(this.property.editable == undefined) {
      this.property.editable = false;
    }
    // LÓGICA DE ICONES A DE SER MUDADA TAMBÉM DE ACORDO COM AS NOVAS MODELS

     if(this.property.propertyType.toString() == "IntegerValue") {
       this.newPropertyObject = new IntegerValue();
       this.property.icon = 'pi pi-hashtag'
     } else if(this.property.propertyType.toString() == "TextValue") {
      this.newPropertyObject = new TextValue();
       this.property.icon = 'pi pi-book'
     }  else if(this.property.propertyType.toString() == "DoubleValue") {
      this.newPropertyObject = new DoubleValue();
       this.property.icon = 'pi pi-dollar'
     }  else if(this.property.propertyType.toString() == "DataValue") {
      this.newPropertyObject = new DataValue();
       this.property.icon = 'pi pi-calendar'
     }  else if(this.property.propertyType.toString() == "MultiSelectValue") {
      this.newPropertyObject = new MultiSelectValue();
       this.property.icon = 'pi pi-tags'
     }  else if(this.property.propertyType.toString() == "UniSelectValue") {
      this.newPropertyObject = new UniSelectValue();
       this.property.icon = 'pi pi-tag'
     }  else if(this.property.propertyType.toString() == "AssociatesValue") {
      this.newPropertyObject = new AssociatesValue();
       this.property.icon = 'pi pi-users'
     }

     if(this.property.propertyValues.length != 0 ||
        this.property.currentOptions.length != 0) {
      
       this.booleanEditProperty = true;
     }
     
  }

  booleanEditProperty : boolean = false;
  INTEGER : string = "INTEGER";
  DOUBLE : string = "DOUBLE";
  TEXT : string = "TEXT";

  
  propertyValueObject : PropertyValue = new PropertyValue;

  propertyTest : Property = new Property;

  newPropertyValue:string = '';

  oldValue : string = '';

  booleanTeste : boolean = false;

  eventsSubscription !: Subscription;

  propertyStack : Property = new Property;
  propertyValueStack : PropertyValue = new PropertyValue;
  
  booleanSelectOption : boolean = false;

  @Input()
  events!:Observable<Property>

  @Input()
  booleanEdit !: boolean;

  @Input()
  loggedUser : User = new User();

  booleanValue : boolean = false;

  booleanValueOption : boolean = false;

  @Input()
  property : Property = new Property();

  @Output()
  eventEmitter = new EventEmitter();

  @Output()
  eventEmitterValue = new EventEmitter<Property>();

  @Output()
  eventEmitterValue2 = new EventEmitter<PropertyValue>();

  addPropertyValue(property : Property): void {
    this.booleanEditProperty = true;
    this.booleanValue = true;
    property.editable = true;

    if(property.propertyType.toString() == 'UniSelectValue' ||
    property.propertyType.toString() == 'MultiSelectValue') {
      this.booleanSelectOption = true;
    }
    
  }

  checkEditable(property:Property) : boolean {
    if(property.editable == false) {
      if(this.booleanEditProperty == true) {
        return true;
      }
    }
    return false;
  }

  confirmButtonCheck() : boolean {
    if(this.property.editable) {
      if(this.property.propertyType.toString() == 'UniSelectValue' ||
      this.property.propertyType.toString() == 'MultiSelectValue') {
        return false;
      }
      return true;
    }
    return false;
  }

  checkTypeValue() : boolean {
   return this.booleanValue;
  }

  editOption() : void {
    this.booleanSelectOption = true;
  }

  selectOptionEmitter() : void {
    this.booleanSelectOption = false;
    this.booleanValueOption = true;
    this.property.editable = false;
  }

  selectOptionTypeCheck() : boolean {
    if(this.booleanSelectOption) {
      if(this.property.propertyType.toString() == 'UniSelectValue' ||
         this.property.propertyType.toString() == 'MultiSelectValue'
      ) {
        return true;
      }
    }
    return false;
  }

  saveProperty(property:Property) : void {


     if(property.propertyValues[property.propertyValues.length] != undefined) {
      
       this.oldValue = this.propertyValue.toString();
     }
     property.propertyValues = new Array;
   
     this.newPropertyObject.value = this.newPropertyValue;
     this.newPropertyObject.property = this.property;
        
     this.propertyValue = this.newPropertyObject;

     this.propertyTest = property;
     
     this.propertyValueObject.property = this.propertyTest;
     this.propertyValueObject.value = this.newPropertyObject;
     this.propertyValueObject.value.propertyType = property.propertyType.toString();

     property.propertyValues.push(this.propertyValueObject)

     this.propertyTest.propertyValues = [];

     if(this.propertyValue.value.value == null) {
      this.booleanValue = true;
     }
     
      this.service.putPropertyValue(this.property.id,this.propertyValueObject,this.loggedUser.id,this.task.id)
    
    property.editable = false;
    this.booleanEditProperty = true;
    

    this.eventEmitterValue.emit(property);
    this.eventEmitterValue2.emit(this.propertyValueStack);
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
