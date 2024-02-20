import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Priority } from 'src/model/priority';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-select-prioridade',
  templateUrl: './select-prioridade.component.html',
  styleUrls: ['./select-prioridade.component.scss']
})
export class SelectPrioridadeComponent implements OnInit {

  constructor(private service:BackendEVOLVEService) { }

  ngOnInit(): void {
    
  }

  priorities : any[] = [
    {
      name : 'nenhuma',
      backgroundColor : '#cccccc'
    },
    {
      name : 'muito baixa',
      backgroundColor : '#6bbcfa'
    },
    {
      name : 'baixa',
      backgroundColor : '#4db339'
    },
    {
      name : 'media',
      backgroundColor : '#f5e020'
    },
    {
      name : 'alta',
      backgroundColor : '#f57520'
    },
    {
      name : 'urgente',
      backgroundColor : '#e32910'
    }
  ]

  @Input()
  task : Task = new Task();

  @Output()
  eventEmitter: EventEmitter<boolean> = new EventEmitter();

  savePriority() {
    // if(priority.name == "nenhuma") {
    //    this.task.currentPriority = Priority.NONE;
    // } else if(priority.name == "muito baixa") {
    //  this.task.currentPriority = Priority.VERY_LOW;
    // } else if(priority.name == "baixa") {
    //  this.task.currentPriority = Priority.LOW;
    // } else if(priority.name == "media") {
    //  this.task.currentPriority = Priority.AVERAGE;
    // } else if(priority.name == "alta") {
    //  this.task.currentPriority = Priority.HIGH;
    // }  else if(priority.name == "urgente") {
    //  this.task.currentPriority = Priority.URGENT;
    // }

    // this.service.patchPriority(this.task.currentPriority.valueOf(),this.task.id);
    // this.task.currentPriority = priority;
    // this.eventEmitter.emit(false);
     
  }


}
