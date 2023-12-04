
import { Component, Input, OnInit } from '@angular/core';
import { Tarefa } from 'src/model/tarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';


@Component({
  selector: 'app-entrega-prox',
  templateUrl: './entrega-prox.component.html',
  styleUrls: ['./entrega-prox.component.scss']
})
export class EntregaProxComponent implements OnInit {


  @Input() tarefa: Tarefa = new Tarefa

  constructor(private service: BackendEVOLVEService) { }

  ngOnInit(): void {
    //retirar quando fizer o calculo automatico
    this.tarefa.porcentagemConclusao = 75
  }

  alterarTarefaFavoritado(){
    this.tarefa.favoritado = !this.tarefa.favoritado;
    this.salvarTarefa()
  }

  salvarTarefa(){
    this.service.putTarefa(this.tarefa);
  }

}
