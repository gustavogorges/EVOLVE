  import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,Input, Output, EventEmitter } from '@angular/core';
  import { Tarefa } from 'src/model/tarefa';
  import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

  @Component({
    selector: 'app-tarefa-card-padrao',
    templateUrl: './tarefa-card-padrao.component.html',
    styleUrls: ['./tarefa-card-padrao.component.scss']
  })
  export class TarefaCardPadraoComponent  {
  @Input() tarefaAtual!:Tarefa

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
      if(this.tarefaAtual.favoritado){
        this.caminhoEstrela = "assets/estrelaMarcada.svg"
      }else{
        this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
      }
      this.valorBarra = 60 +"%"; 
  
    
    }

    favoritar(){
      if (this.caminhoEstrela == "assets/estrelaNaoMarcada.svg"){
        this.caminhoEstrela = "assets/estrelaMarcada.svg"
        this.tarefaAtual.favoritado=true;
      } else {
        this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
        this.tarefaAtual.favoritado=false;

      }
      console.log(this.tarefaAtual)
      this.service.putTarefa(this.tarefaAtual)
      this.newItem.emit(true);

      this.service.getOne("tarefa",this.tarefaAtual.id)

    }

    trocaCor(){
      if(this.tarefaAtual.statusAtual.nome =="pendente"){
        this.corStatus="#7CD5F4"
      }else if(this.tarefaAtual.statusAtual.nome =="em progresso"){
        this.corStatus="#FCEC62"
      }else  if(this.tarefaAtual.statusAtual.nome =="Concluido"){
        this.corStatus="#86C19F"
      }
      else  if(this.tarefaAtual.statusAtual.nome =="não atribuido"){
        this.corStatus="#9CA3AE"
      }
    }
      
    }




