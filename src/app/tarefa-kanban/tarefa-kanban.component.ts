import { Component, Input, OnInit, Output, EventEmitter, AfterContentInit, AfterViewInit, OnChanges, HostListener } from '@angular/core';
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
import { User } from 'src/model/user';
import { CookiesService } from 'src/service/cookies-service.service';
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
  dropTarefa : boolean = false
  dropStatus: boolean = true
  selectOpen: boolean = false
  optionsSelect: Array<string>=[];
  IconsOptionsSelect: Array<string> =[];
  statusId : number = 0

  
  ;

  private currentDraggableEvent?: DragEvent;
  private currentDragEffectMsg?: string;

  constructor(private service: BackendEVOLVEService,
    private cookies_service:CookiesService) {

    this.optionsSelect =[
      "deletar", "renomear", "alterar cor"
    ]
   }
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
        this.service.updateStatusList(this.project.id, status); 
        console.log("passei uma vez ein")
      })
      this.project.statusList = list


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
      

      list.map(async(task : Task) =>{
        task.statusListIndex=list.indexOf(task)
        task.project = {
          id: this.project.id
        }
        console.log(task);
        await this.service.putTarefa(task,this.loggedUser.id);
         
      })
      this.taskList == list;
    }else{
      console.log("status ");
      
    }
 
     
    }
   
  }
  @HostListener('document:click', ['$event'])
  closeSelect(event: MouseEvent){
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.select-container')) {
      this.selectOpen = false;
    }
  }
  openSelect(id : number, event: MouseEvent){
    event.stopPropagation();
      this.statusId= id;
      this.selectOpen=!this.selectOpen
      this.optionsSelect=[
        "deletar", "renomear", "alterar cor"
      ]

  }

    loggedUser : User = new User;
 
   async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookies_service.getLoggedUser().then((user)=>{return user})
    }
    
  booleanTask: boolean = false;
  tarefaSelecionada: Task = new Task();
  tarefaNova: Task = new Task();
  projeto :Project = new Project()
async openTask(tarefa: Task): Promise<void> {
    this.booleanTask = true;

    this.tarefaSelecionada = tarefa;
    if(this.tarefaSelecionada.project.id!=undefined){
       this.projeto = await this.service.getOne("projeto", this.tarefaSelecionada.project.id)

    }
  }
    closeTask(event: boolean) {
      if (event) {
        this.tarefaNova = new Task();
        this.booleanTask = false;
      }
    }  

 }
