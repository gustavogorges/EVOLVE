import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Status } from 'src/model/status';
import { Tarefa } from 'src/model/tarefa';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tarefa-kanban',
  templateUrl: './tarefa-kanban.component.html',
  styleUrls: ['./tarefa-kanban.component.scss']
})
export class TarefaKanbanComponent implements OnInit {
  // @Input() status!: Status;
  @Input() listaTarefas!: Array<Tarefa>;
  @Input() listaStatus!: Array<Status>

  // listaFiltrada: Array<Tarefa> = [];

  ngOnInit(): void {

  }

  filtrarLista(status:Status): Array<Tarefa> {
    let listaFiltrada = this.listaTarefas.filter(
      (tarefa: Tarefa) => tarefa.statusAtual.nome === status.nome
    );
    return listaFiltrada
  }
  onDrop(event: CdkDragDrop<Tarefa[]>, status:Status): void {
    // console.log(event.item.data);
    // console.log(event);
    
    

    // const task = event.item.data;

    // task.statusAtual = status;
    // console.log(status);
    
    

    


    // if (event.previousContainer === event.container) {
    //     // Reorder within the same list
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
    //   // Move item to a different list
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );

      // Update the status of the task in your data model
      // const movedTask: Tarefa = event.container.data[event.currentIndex];
      // movedTask.statusAtual = status;
    }

    a(a: any, b: any): void {
      console.log(a);
      console.log(b);
      
      
    }
  }
  