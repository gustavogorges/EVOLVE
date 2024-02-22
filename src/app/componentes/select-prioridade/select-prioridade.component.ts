import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Priority } from 'src/model/priority';
import { PriorityRecord } from 'src/model/priorityRecord';
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
   
    this.prioritiesStandard = this.listPriorities;
    
  }

  prioritiesStandard !: PriorityRecord[];

  @Input()
  task : Task = new Task();

  @Input()
  listPriorities !: PriorityRecord[];

  @Output()
  eventEmitter: EventEmitter<boolean> = new EventEmitter();

  savePriority(priority : PriorityRecord) {
    this.task.priority = priority;
    console.log()
    this.eventEmitter.emit(false);
  }


}
