import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { PriorityRecord } from 'src/model/PriorityRecord';
import { cloneDeep } from 'lodash';

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

  @Input()
  loggedUser : User = new User;
  
  @Output()
  eventEmitter: EventEmitter<PriorityRecord> = new EventEmitter();
  
  async savePriority(priority : PriorityRecord) {
    
    let prioritySave:any = cloneDeep(priority);

        switch (prioritySave.name) {
          case 'NINGUNA':
            prioritySave.name = 'NENHUMA';
            break;
          case 'MUY BAJA':
            prioritySave.name = 'MUITO_BAIXA';
            break;
          case 'BAJA':
            prioritySave.name = 'BAIXA';
            break;
          case 'MEDIA':
            prioritySave.name = 'MEDIA';
            break;
          case 'ALTA':
            prioritySave.name = 'ALTA';
            break;
          case 'URGENTE':
            prioritySave.name = 'URGENTE';
            break;
          case '无':
            prioritySave.name = 'NENHUMA';
            break;
          case '非常低':
            prioritySave.name = 'MUITO_BAIXA';
            break;
          case '低':
            prioritySave.name = 'BAIXA';
            break;
          case '中':
            prioritySave.name = 'MEDIA';
            break;
          case '高':
            prioritySave.name = 'ALTA';
            break;
          case '紧急':
            prioritySave.name = 'URGENTE';
            break;
          case 'NONE':
            prioritySave.name = 'NENHUMA';
            break;
          case 'VERY LOW':
            prioritySave.name = 'MUITO_BAIXA';
            break;
          case 'LOW':
            prioritySave.name = 'BAIXA';
            break;
          case 'MEDIUM':
            prioritySave.name = 'MEDIA';
            break;
          case 'HIGH':
            prioritySave.name = 'ALTA';
            break;
          case 'URGENT':
            prioritySave.name = 'URGENTE';
            break;
    }
    
    this.task.priority = priority;
    await this.service.updateCurrentPriority(this.task.id, this.loggedUser.id, prioritySave)
    this.eventEmitter.emit(this.task.priority);
  }

}
