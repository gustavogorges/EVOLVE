import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';


@Component({
  selector: 'app-modal-dependecias',
  templateUrl: './modal-dependecias.component.html',
  styleUrls: ['./modal-dependecias.component.scss']
})
export class ModalDependeciasComponent implements OnInit {

  @Input()
  project !: Project 
  @Input()
  task !: Task
  @Output() taskToAdd = new EventEmitter<Task>();
  @Output() closeModal = new EventEmitter<any>();

  constructor() { }
  taskList : Array<Task> = new Array

  ngOnInit(): void {
    this.taskList = this.project.tasks.filter((t)=> t.currentStatus.name != "concluido" && t.id !=this.task.id)
    this.taskList = this.taskList.filter( (t) => !this.task.dependencies.find((t2) => t2.id==t.id)) 

  }
  sendTask(task : Task){
this.taskToAdd.emit(task)
  }
  close(){
    this.closeModal.emit(false)
  } 
}
