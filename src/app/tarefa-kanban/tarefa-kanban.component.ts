import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Status } from 'src/model/status';
import { Tarefa } from 'src/model/tarefa';
import {
  CdkDragDrop,
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
  @Input() listaTarefas!: Array<Tarefa>;
  @Input() listaStatus!: Array<Status>;

  constructor(private service: BackendEVOLVEService) { }
  ngOnInit(): void { }

  filtrarLista(status: Status): Array<Tarefa> {
    let listaFiltrada = this.listaTarefas
      .filter((tarefa: Tarefa) => tarefa.statusAtual.nome === status.nome)
      .sort((a, b) => a.statusListIndex - b.statusListIndex);

    return listaFiltrada;
  }

  async drop(
    event: CdkDragDrop<Tarefa[]>,
    status: Status,
    list: Array<Tarefa>
  ) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      (event.item.data as Tarefa).statusAtual = status;
      this.service.putTarefa(event.item.data);
    }

    if (event.container.data.length == 0) {
      (event.item.data as Tarefa).statusAtual = status;

      (event.item.data as Tarefa).statusListIndex = event.currentIndex;

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
  // dropTudo(event: CdkDragDrop<any[]>){    
  //   console.log(event.container)
  //   console.log(event.previousContainer)
  //   console.log(this.listaStatus)


  //     moveItemInArray(
  //       this.listaStatus,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //     console.log(this.listaStatus)
    
  // }
}
