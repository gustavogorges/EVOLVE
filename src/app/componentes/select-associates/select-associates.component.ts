import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Property } from 'src/model/propriedade/property';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { Option } from 'src/model/propriedade/option';
import { AssociatesValue } from 'src/model/propriedade/property-values/associatesValue';
import { User } from 'src/model/user';
import { Task } from 'src/model/task';
import { Project } from 'src/model/project';

@Component({
  selector: 'app-select-associates',
  templateUrl: './select-associates.component.html',
  styleUrls: ['./select-associates.component.scss']
})
export class SelectAssociatesComponent implements OnInit {

  booleanAddAssociate : boolean = false;
  booleanTeste : boolean = false;
  color : string = "";

  associate : User = new User();

  arrayForce !: Array<any>;

  @Input()
  project : Project = new Project();

  @Input()
  task : Task = new Task();

  @Output() newItem = new EventEmitter<Array<User>>();

  constructor(
    private service : BackendEVOLVEService
  ) { }

  ngOnInit(): void {
    console.log(this.project);
  }

  saveAssociate(associate:User) { 
    this.task.associates.push(associate)
    this.service.patchAssociate(this.task.id, this.task.associates, this.project.id);
  }

  eventEmitterFunc() : void {
    this.arrayForce = this.task.associates;
    console.log(this.arrayForce);
    this.newItem.emit(this.arrayForce);
  }


  removeAssociate(associate:User) {
    this.task?.associates?.forEach(elementFor => {
      if(elementFor.id == associate.id) {
        const index:number =  this.task.associates.indexOf(elementFor);
        this.task.associates.splice(index,1)
        this.service.removeAssociate(this.task.id, elementFor.id, this.project.id);
      }
    });
  }

  verifyIfAssociateExists(associate:User) : boolean {
    return this.task.associates.some(associateFind =>
       associateFind.id == associate.id
       );
  }

  addAssociateBooleanFunc() {
    this.booleanAddAssociate = !this.booleanAddAssociate;
  }
}
