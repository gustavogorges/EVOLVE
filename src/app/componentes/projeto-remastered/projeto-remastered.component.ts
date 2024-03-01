import { Component,EventEmitter,Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

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

  constructor(private route:Router, private service:BackendEVOLVEService) { }


  tarefas : Tarefa[] = []
  
  @Input() projeto!:Project;

  ngOnInit(): void {
    this.criaTarefa()
  }

  date: string = ''
  progresso = 0
  md: any
  corAtual: string = ''
  valorProgresso = 0;

  
  @Input() projectOpen !: Boolean

  @Output() noCloseProject : EventEmitter<any> = new EventEmitter()

  @Output() deletar:EventEmitter<number> = new EventEmitter<number>()

  @Output() openProjeto: EventEmitter<Project> = new EventEmitter<Project>()

  @Output() salvarProjeto: EventEmitter<Project> = new EventEmitter<Project>()

  @Output() editProject: EventEmitter<Boolean> = new EventEmitter<Boolean>()


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
    this.tarefas.push(task)
    this.tarefas.push(task)
    this.tarefas.push(task)
    this.tarefas.push(task)
    this.tarefas.push(task)
    this.tarefas.push(task)
    this.tarefas.push(task)
    this.tarefas.push(task)
    this.tarefas.push(task)
    this.tarefas.push(task)
  }

  verifyImg(user:User){
    return true
  }

  deletarProjeto(id:number){
    this.deletar.emit(id)
  }

  salvaProjeto(){
    this.salvarProjeto.emit(this.projeto)
    this.editProjectEmit(false)
  }

  openEfechaProjeto(){
    if(!this.projeto.editOn){
      this.openProjeto.emit(this.projeto)
    }
  }

  editProjectEmit(bol:Boolean){
    this.editProject.emit(bol)
  }

  async irParaProjeto(){
    this.route.navigate(['view-project'])
  }

  async cancelEdit(){
    var projeto = await this.service.getOne("project", this.projeto.id) as Project
    this.projeto.name = projeto.name
    this.projeto.description = projeto.description
    this.projeto.finalDate = projeto.finalDate
    this.editProjectEmit(false)
  }

}
