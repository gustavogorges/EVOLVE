  import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,Input, Output, EventEmitter } from '@angular/core';
  import { Task } from 'src/model/task';
  import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

  @Component({
    selector: 'app-tarefa-card-padrao',
    templateUrl: './tarefa-card-padrao.component.html',
    styleUrls: ['./tarefa-card-padrao.component.scss']
  })
  export class TarefaCardPadraoComponent  {
  @Input() tarefaAtual!:Task

  valorBarra="0%";
    caminho = "assets/naoVector.svg"
    caminhoEstrela="assets/estrelaNaoMarcada.svg"
    nomeGrande ="";
    corStatus=""; 
    @Input() id: string = "";
    @Output() newItem = new EventEmitter<boolean>();

  data : Date = new Date

  

    constructor(private service : BackendEVOLVEService ) {
  
    }

    ngOnInit(): void {
  
      this.trocaCor()
      if(this.tarefaAtual.favorited){
        this.caminhoEstrela = "assets/estrelaMarcada.svg"
      }else{
        this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
      }
      this.valorBarra = 60 +"%"; 
  
    
    }

    favoritar(){
      if (this.caminhoEstrela == "assets/estrelaNaoMarcada.svg"){
        this.caminhoEstrela = "assets/estrelaMarcada.svg"
        this.tarefaAtual.favorited=true;
      } else {
        this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
        this.tarefaAtual.favorited=false;

      }
      console.log(this.tarefaAtual)
      this.service.putTarefa(this.tarefaAtual)
      this.newItem.emit(true);

      this.service.getOne("task",this.tarefaAtual.id)

    }

    trocaCor(){
      if(this.tarefaAtual.currentStatus.name =="pendente"){
        this.corStatus="#7CD5F4"
      }else if(this.tarefaAtual.currentStatus.name =="em progresso"){
        this.corStatus="#FCEC62"
      }else  if(this.tarefaAtual.currentStatus.name =="Concluido"){
        this.corStatus="#86C19F"
      }
      else  if(this.tarefaAtual.currentStatus.name =="não atribuido"){
        this.corStatus="#9CA3AE"
      }
    }
      
    }




