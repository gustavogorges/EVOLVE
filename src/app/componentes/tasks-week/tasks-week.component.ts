import { formatDate } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tasks-week',
  templateUrl: './tasks-week.component.html',
  styleUrls: ['./tasks-week.component.scss']
})
export class TasksWeekComponent implements OnInit {
  @Input()
  taskList!: Array<Task>;
  tasks: Array<Task> = [];

  @Input()
  day !: Date;

  indice : number =0
  constructor(private service: BackendEVOLVEService,) { }

  ngOnInit(): void {
  
      if(this.taskList.length>=4){
        this.tasks.push(this.taskList[0])
        this.tasks.push(this.taskList[1])
        this.tasks.push(this.taskList[2])
        this.tasks.push(this.taskList[3])


    

      }else{
        this.tasks = this.taskList
      }
    }

   
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  isSameDay( date2: Date | string) {
    if (typeof date2 === 'string') {
      // Converta a string para objeto Date, se necessário
      date2 = new Date(date2);
    }
    this.day = new Date(this.day)
   

    return this.day.getFullYear() === date2.getFullYear() &&
      this.day.getMonth() === date2.getMonth() &&
      this.day.getDate() === date2.getDate();
  }
  scrollLeft() {
   if(this.indice>=0){
    console.log(this.indice);

    this.indice-=1;
    console.log(this.indice);
    
    this.tasks = [this.taskList[this.indice],this.taskList[this.indice+1],this.taskList[this.indice+2],this.taskList[this.indice+3] ]
    console.log(this.tasks);
    
   }
  }
  
  scrollRight() {
    if(this.indice+4<this.taskList.length){
      this.indice+=1;
      console.log(this.indice);
      
      this.tasks = [this.taskList[this.indice],this.taskList[this.indice+1],this.taskList[this.indice+2],this.taskList[this.indice+3] ]
      console.log(this.tasks);
      
     }
 
     
  }
  booleanTask: boolean = false;
  tarefaSelecionada: Task = new Task();
  tarefaNova: Task = new Task();
  projeto :Project = new Project()
async openTask(tarefa: Task): Promise<void> {
    let projetoId : number = tarefa.project.id!; 
    this.tarefaSelecionada = await this.service.getOne("task", tarefa.id);
    this.projeto = await this.service.getOne("project",projetoId)
    console.log(this.tarefaSelecionada.project);
    console.log(this.tarefaSelecionada);
    this.booleanTask = true;
    
  }
    closeTask(event: boolean) {
      if (event) {
        this.tarefaNova = new Task();
        this.booleanTask = false;
      }
    }  


}
