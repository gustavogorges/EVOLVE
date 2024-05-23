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
  taskList: Array<Task> = [];
  tasks: Array<Task> = [];

  @Input()
  day: Date = new Date();

  indice: number = 0;

  constructor(private service: BackendEVOLVEService) { }

  ngOnInit(): void {
    this.initializeTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskList']) {
      this.initializeTasks();
    }
  }

  initializeTasks() {
    if (this.taskList.length >= 4) {
      this.tasks = this.taskList.slice(0, 4);
    } else {
      this.tasks = this.taskList;
    }
  }

  isSameDay(date2: Date | string): boolean {
    if (!this.day) {
      return false;
    }
  
    if (typeof date2 === 'string') {
      date2 = new Date(date2);
    }
  
    if (!date2) {
      return false;
    }
  
    this.day = new Date(this.day);
  
    return this.day.getFullYear() === date2.getFullYear() &&
      this.day.getMonth() === date2.getMonth() &&
      this.day.getDate() === date2.getDate();
  }
  

  scrollLeft() {
    if (this.indice > 0) {
      this.indice -= 1;
      this.updateTasks();
    }
  }

  scrollRight() {
    if (this.indice + 4 < this.taskList.length) {
      this.indice += 1;
      this.updateTasks();
    }
  }

  updateTasks() {
    if (this.indice >= 0 && this.indice + 4 <= this.taskList.length) {
      this.tasks = this.taskList.slice(this.indice, this.indice + 4);
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
    this.booleanTask = true;

  }

  closeTask(event: boolean) {
    if (event) {
      this.tarefaNova = new Task();
      this.booleanTask = false;
    }


  }
}
