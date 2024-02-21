import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';

interface Tarefa{
  nome : string,
  prazo : String,
  progresso : number,
  status : string
}

@Component({
  selector: 'app-projeto-remastered',
  templateUrl: './projeto-remastered.component.html',
  styleUrls: ['./projeto-remastered.component.scss']
})
export class ProjetoRemasteredComponent implements OnInit {

  constructor() { }

  tarefas : Tarefa[] = []
  
  @Input() projeto!:Project;

  ngOnInit(): void {
    this.criaTarefa()
  }

  @Input() projectOpen !: Boolean
  @Output() noCloseProject : EventEmitter<any> = new EventEmitter()

  openAgain(){
    this.noCloseProject.emit()
  }

  criaTarefa(){
    const task: Tarefa = {
      nome : 'Nome tarefa',
      prazo : '10/02',
      progresso : 60,
      status : 'Doing'
    }
    this.tarefas.push(task)
    this.tarefas.push(task)
    this.tarefas.push(task)
    this.tarefas.push(task)
  }

  verifyImage(user:User){
    if(user.profilePicture.length>10){
      return false
    }else{
      return true
    }
  }

}
