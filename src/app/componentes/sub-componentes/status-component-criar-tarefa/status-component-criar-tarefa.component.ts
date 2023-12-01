import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  ngOnChanges(): void {
    if(this.projeto){
      this.separaPadraoENovo()
    }
  }

  separaPadraoENovo(){
    console.log(this.statusPadrao);
    
    this.projeto.listaStatus.forEach(e => {
      if(e.nome === 'não atribuido' ||
      e.nome === 'concluido' ||
      e.nome === 'pendente' ||
      e.nome === 'em progresso'){
        this.statusPadrao.push(e)
      }
    })
  }

  adicionarStatus(){
    this.adicionar = !this.adicionar
  }

  criarStatus(){
    console.log(this.status.nome);
    
    this.status.corTexto = "#000000";
    this.statusNovo.push(this.status)
    this.status.corFundo = this.status.corFundo.toUpperCase()
    this.projeto.listaStatus.push(this.status)
    console.log(this.projeto.listaStatus);
    
    this.service.putProjeto(this.projeto)
    console.log(this.service.getOne('projeto',this.projeto.id))

    console.log(this.projeto);
  }

  adicionar = true
  statusPadrao:Status[] = []
  statusNovo:Status[] = []
  adicionado = false
}
