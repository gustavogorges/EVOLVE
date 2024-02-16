import { Component, Input, OnInit, Output, EventEmitter, AfterContentInit, AfterViewInit, OnChanges } from '@angular/core';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';

import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import {
  DndDraggableDirective,
  DndDragImageRefDirective,
  DndDropEvent,
  DndDropzoneDirective,
  DndHandleDirective,
  DndPlaceholderRefDirective,
  DropEffect,
} from 'ngx-drag-drop';
import { Project } from 'src/model/project';
interface NestableListItem {
  content: string;
  disable?: boolean;
  handle?: boolean;
  customDragImage?: boolean;
  children?: NestableListItem[];
}
@Component({
  selector: 'app-tarefa-kanban',
  templateUrl: './tarefa-kanban.component.html',
  styleUrls: ['./tarefa-kanban.component.scss'],
})
export class TarefaKanbanComponent  implements OnChanges{

  
  @Input() taskList!: Array<Task>;
  start: number =0;
  statusList: Array<Status> = new Array<Status>;
  @Input() project: Project = new Project;
  taskMoved : Task = new Task;
  dropTarefa : boolean = true
  dropStatus: boolean = true

  
  ;

  private currentDraggableEvent?: DragEvent;
  private currentDragEffectMsg?: string;

  constructor(private service: BackendEVOLVEService) { }
  ngOnChanges(): void {

    this.statusListOrdenation();
  }
  statusListOrdenation(){
  
    this.statusList = this.project.statusList.sort(this.compareStatus)
    this.taskList = this.taskList.sort(this.compareTask)
  }
  compareStatus(a: Status, b : Status){
      return a.columnIndex - b.columnIndex
  }
  compareTask(a: Task, b : Task){
    return a.statusListIndex - b.statusListIndex
}

  onDragStart(event: any) {
    this.currentDragEffectMsg = '';
    this.currentDraggableEvent = event;
    console.log(event.toElement.id)
    this.start = event.toElement.id

  }
  onDragStartTask(event: any) {
    this.dropTarefa = true; 
    this.dropStatus = false 
    console.log(this.dropTarefa)
    this.start = event.toElement.id


  }
  onDragStartStatus(event: any) {
    this.dropTarefa = false; 
    this.dropStatus = true 
    console.log(event.toElement.id)
    this.start = event.toElement.id


  }

  onDraggedTask(item: Task, list: any[], effect: DropEffect) {
    this.dropTarefa = true; 
    this.dropStatus = false 
    this.taskMoved = item
    console.log(this.dropTarefa)
  
  //   if (effect === 'move') {
  //     const index = list.indexOf(item);
  //     list.splice(index, 1);
    
  // }
}


  onDragEnd(event: DragEvent) {
    this.currentDraggableEvent = event;
    
   
     
  }

   onDrop(event: DndDropEvent, list?: Status[]) {
    console.log(event.index)

    if(event.data == this.taskMoved ){
      console.log("sou pika");
      
    }
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {

      let index = event.index!;

      list.splice(list.findIndex((item)=> item.id == event.data.id), 1);

      if (this.start>index){
        list.splice(index, 0, event.data);
      } else {
        list.splice(index-1, 0, event.data);
      }

    
     
      list.map((status : Status)=>{
        status.columnIndex=list.indexOf(status)
        console.log("passei uma vez ein")
      })
      this.project.statusList = list
      this.service.putProjeto(this.project); 

    }
    
  }
   async onDropTask(event: DndDropEvent, list: Task[], item?:any) {

    if((event.data as Task).currentStatus){
      console.log("sou pika");
      
    
   
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      let index = event.index!;

   
      let task1 : Task =  event.data; 
      task1.currentStatus=item;

      list.splice(list.findIndex((abc)=> abc.id == event.data.id), 1);

      if (this.start>index){
        list.splice(index, 0, task1);
      } else {
        list.splice(index-1, 0, task1);
      }
      

      list.map((task : Task)=>{
        task.statusListIndex=list.indexOf(task)
        this.service.putTarefa(task)
      })
      this.taskList == list;
    }else{
      console.log("status ");
      
    }
 
     
    }
  }
  teste(item : Status){
    console.log(item)
    console.log(this.statusList)
  }
 
//   ngOnInit(): void { }

//   filtrarLista(status: Status): Array<Task> {
//     let listaFiltrada = this.listaTarefas
//       .filter((task: Task) => task.currentStatus.name === status.name)
//       .sort((a, b) => a.statusListIndex - b.statusListIndex);

//     return listaFiltrada;
//   }

//   async drop(
//     event: CdkDragDrop<Task[]>,
//     status: Status,
//     list: Array<Task>
//   ) {
//     if (event.previousContainer === event.container) {
//       moveItemInArray(
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex
//       );
//     } else {
//       (event.item.data as Task).currentStatus = status;
//       this.service.putTarefa(event.item.data);
//     }

//     if (event.container.data.length == 0) {
//       (event.item.data as Task).currentStatus = status;

//       (event.item.data as Task).statusListIndex = event.currentIndex;

//       this.service.putTarefa(event.item.data);
//       await console.log(this.service.getOne('task', event.item.data.id));
//     } else {
//       for (let i of event.container.data) {
//         let novoIndex = event.container.data.indexOf(i);
//         i.statusListIndex = novoIndex;
//         this.service.putTarefa(i);
//       }
//     }
//   }
//   dropTudo(event: CdkDragDrop<any[]>){    
//     console.log(event.container)
//     console.log(event.previousContainer)
//     console.log(this.listaStatus)


//       moveItemInArray(
//         this.listaStatus,
//         event.previousIndex,
//         event.currentIndex
//       );
//       console.log(this.listaStatus)
    
//   }
//   updateListOrder(event: CdkDragMove<any>) {
//     console.log(event.delta)
//     console.log(event.event)
//     console.log(event.pointerPosition);
//     console.log(event.source)
    
   
//     // if (previousIndex !== undefined) {
//     //   // Atualiza a ordem da listaStatus
//     //   const status = this.listaStatus.splice(currentIndex, 1)[0];
//     //   this.listaStatus.splice(previousIndex, 0, status);
//     // }
//   }
 }
