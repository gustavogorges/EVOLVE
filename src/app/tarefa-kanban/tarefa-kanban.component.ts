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
  // @Input() status!: Status;
  @Input() listaTarefas!: Array<Tarefa>;
  @Input() listaStatus!: Array<Status>;

  // listaFiltrada: Array<Tarefa> = [];
  constructor(private service: BackendEVOLVEService) {}
  ngOnInit(): void {}

  filtrarLista(status: Status): Array<Tarefa> {
    let listaFiltrada = this.listaTarefas.filter(
      (tarefa: Tarefa) => tarefa.statusAtual.nome === status.nome
    );
    return listaFiltrada;
  }


  drop(event: CdkDragDrop<Tarefa[]>, status: Status, list:Array<Tarefa>) {


    
    if (event.previousContainer === event.container) {
      const prevIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    // Remove o item da posição anterior
    const removedItem = this.listaTarefas.splice(prevIndex, 1)[0];

    // Adiciona o item na nova posição
    this.listaTarefas.splice(currentIndex, 0, removedItem);

    console.log(this.listaTarefas);
    
      

      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      (event.item.data as Tarefa).statusAtual = status;
      console.log(event.item.data);
     
    }
  }

  a(a: any, b: any): void {
    console.log(a);
    console.log(b);
  }
}
