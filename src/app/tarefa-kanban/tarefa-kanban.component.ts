import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
import {
  CdkDragDrop,
  CdkDragMove,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tarefa-kanban',
  templateUrl: './tarefa-kanban.component.html',
  styleUrls: ['./tarefa-kanban.component.scss'],
})
export class TarefaKanbanComponent implements OnInit {
  @Input() listaTarefas!: Array<Task>;
  @Input() listaStatus!: Array<Status>;

  constructor(private service: BackendEVOLVEService) { }
  ngOnInit(): void { }

  filtrarLista(status: Status): Array<Task> {
    let listaFiltrada = this.listaTarefas
      .filter((task: Task) => task.currentStatus.name === status.name)
      .sort((a, b) => a.statusListIndex - b.statusListIndex);

    return listaFiltrada;
  }

  async drop(
    event: CdkDragDrop<Task[]>,
    status: Status,
    list: Array<Task>
  ) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      (event.item.data as Task).currentStatus = status;
      this.service.putTarefa(event.item.data);
    }

    if (event.container.data.length == 0) {
      (event.item.data as Task).currentStatus = status;

      (event.item.data as Task).statusListIndex = event.currentIndex;

      this.service.putTarefa(event.item.data);
      await console.log(this.service.getOne('tarefa', event.item.data.id));
    } else {
      for (let i of event.container.data) {
        let novoIndex = event.container.data.indexOf(i);
        i.statusListIndex = novoIndex;
        this.service.putTarefa(i);
      }
    }
  }
  dropTudo(event: CdkDragDrop<any[]>){    
    console.log(event.container)
    console.log(event.previousContainer)
    console.log(this.listaStatus)


      moveItemInArray(
        this.listaStatus,
        event.previousIndex,
        event.currentIndex
      );
      console.log(this.listaStatus)
    
  }
  updateListOrder(event: CdkDragMove<any>) {
    console.log(event.delta)
    console.log(event.event)
    console.log(event.pointerPosition);
    console.log(event.source)
    
   
    // if (previousIndex !== undefined) {
    //   // Atualiza a ordem da listaStatus
    //   const status = this.listaStatus.splice(currentIndex, 1)[0];
    //   this.listaStatus.splice(previousIndex, 0, status);
    // }
  }
}
