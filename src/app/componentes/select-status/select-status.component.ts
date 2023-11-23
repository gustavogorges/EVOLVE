import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Projeto } from 'src/model/projeto';
import { Status } from 'src/model/status';
import { Tarefa } from 'src/model/tarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-select-status',
  templateUrl: './select-status.component.html',
  styleUrls: ['./select-status.component.scss']
})
export class SelectStatusComponent implements OnInit {

  booleanAddStatus : boolean = false;
  booleanTeste : boolean = false;
  color : string = "";
  status : Status = new Status();

  @Input()
  projeto : Projeto = new Projeto;

  @Input()
  statusLista : Array<Status> = new Array

  @Input()
  tarefa : Tarefa = new Tarefa;

  @Output() newItem = new EventEmitter<boolean>(); 

  constructor(
    private service : BackendEVOLVEService
  ) { }

  ngOnInit(): void {
    console.log(this.statusLista)
    console.log(this.projeto)
  }

  salvarStatus(status:Status) {
    this.tarefa.statusAtual = status;
    this.newItem.emit(false);
  }

  addStatus() {
    this.booleanAddStatus = !this.booleanAddStatus;
  }

  novoStatus() {
    this.status.corTexto = "#000000";
    this.projeto.listaStatus.push(this.status)
    this.service.putProjeto(this.projeto)
    console.log(this.projeto)
    this.addStatus();
  }

}
