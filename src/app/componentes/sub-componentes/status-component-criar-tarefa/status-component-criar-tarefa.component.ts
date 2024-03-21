import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-status-component-criar-tarefa',
  templateUrl: './status-component-criar-tarefa.component.html',
  styleUrls: ['./status-component-criar-tarefa.component.scss']
})
export class StatusComponentCriarTarefaComponent implements OnChanges {

  constructor(private service:BackendEVOLVEService) { }

  status = new Status()

  @Input() projeto!:Project
  @Input() isVisible:Boolean = false
  @Output() projetoNew:EventEmitter<Project> = new EventEmitter<Project>()

  ngOnChanges(): void {
    if(this.projeto){
      this.atualizaStatus()
    }
  }
  
  adicionarStatus(){
    this.status.name = ''
    this.status.backgroundColor = ''
    this.adicionar = !this.adicionar
  }

  async criarStatus(){
    if(this.status.name != ''){
      if(this.status.backgroundColor === ''){
        this.status.backgroundColor = '#FF0000'
      }
      this.projeto.statusList.push(this.status as Status)
      await this.service.putProjeto(this.projeto)
      this.EventEmitter()
      this.atualizaStatus()
      this.adicionar = true
      this.editando = false
    }
    this.status.name = ''
    this.status.backgroundColor = ''
  }

  async atualizaStatus(){
    this.statusPadrao = []
    this.statusNovo = []
    this.projeto = await this.service.getOne('project',this.projeto.id)
    this.projeto.statusList.forEach(e => {
      if((e.name === 'não atribuido' ||
      e.name === 'concluido' ||
      e.name === 'pendente' ||
      e.name === 'em progresso') && !this.statusPadrao.includes(e)){
        this.statusPadrao.push(e)
      }else{
        this.statusNovo.push(e)
      }
    })
    this.statusNovo.reverse()
  }

  EventEmitter(){
    localStorage.setItem('projeto', JSON.stringify(this.projeto))
    this.projetoNew.emit(this.projeto)
  }

  removeStatusNovo(status:Status){
    this.projeto.statusList.splice(this.projeto.statusList.indexOf(status), 1)
    this.statusNovo.splice(this.statusNovo.indexOf(status), 1)
    this.EventEmitter()
  }

  removeStatusPadrao(status:Status){
    status.enabled = !status.enabled
    this.EventEmitter()
  }

  desabilitaAdicionar(){
    if(!this.adicionar){
      this.adicionar = true
      this.editando = false
      this.atualizaStatus()
    }
  }

  editar(status:Status){
    this.adicionar = true
    this.editando = true
    this.statusEditando = JSON.stringify(status)
    setTimeout(() => {
      this.adicionar = false
      this.status = status
    }, 1);
    this.status.name = ''
    this.status.backgroundColor = ''
  }

  statusEditando:any

  async salvar(){
    this.projeto.statusList[this.projeto.statusList.indexOf(JSON.parse(this.statusEditando))] = this.status
    await this.service.putProjeto(this.projeto)
    this.EventEmitter()
    this.atualizaStatus()
    this.editando = false
    this.adicionar = true
  }

  editando = false
  adicionar = true
  statusPadrao:Status[] = []
  statusNovo:Status[] = []
}
