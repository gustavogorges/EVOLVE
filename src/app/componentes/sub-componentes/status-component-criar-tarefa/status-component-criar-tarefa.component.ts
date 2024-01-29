import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Projeto } from 'src/model/projeto';
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

  @Input() projeto!:Projeto
  @Input() isVisible:Boolean = false
  @Output() projetoNew:EventEmitter<Projeto> = new EventEmitter<Projeto>()

  ngOnChanges(): void {
    if(this.projeto){
      this.atualizaStatus()
    }
  }
  
  adicionarStatus(){
    this.status.nome = ''
    this.status.corFundo = ''
    this.adicionar = !this.adicionar
  }

  async criarStatus(){
    if(this.status.nome != ''){
      if(this.status.corFundo === ''){
        this.status.corFundo = '#FF0000'
      }
      this.projeto.listaStatus.push(this.status as Status)
      await this.service.putProjeto(this.projeto)
      this.EventEmitter()
      this.atualizaStatus()
      this.adicionar = true
      this.editando = false
    }
    this.status.nome = ''
    this.status.corFundo = ''
  }

  async atualizaStatus(){
    for (let i = this.statusNovo.length -1 ; i >= 0; i-- ){
      this.statusNovo.splice(this.statusNovo.indexOf(this.statusNovo[i]), 1)
    }
    for (let i = this.statusPadrao.length -1 ; i >= 0; i-- ){
      this.statusPadrao.splice(this.statusPadrao.indexOf(this.statusPadrao[i]), 1)
    }
    this.projeto = await this.service.getOne('projeto',this.projeto.id)
    this.projeto.listaStatus.forEach(e => {
      if((e.nome === 'não atribuido' ||
      e.nome === 'concluido' ||
      e.nome === 'pendente' ||
      e.nome === 'em progresso') && !this.statusPadrao.includes(e)){
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
    this.projeto.listaStatus.splice(this.projeto.listaStatus.indexOf(status), 1)
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
    this.status.nome = ''
    this.status.corFundo = ''
  }

  statusEditando:any

  async salvar(){
    this.projeto.listaStatus[this.projeto.listaStatus.indexOf(JSON.parse(this.statusEditando))] = this.status
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
